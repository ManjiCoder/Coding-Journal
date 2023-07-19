import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import * as Yup from "yup";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password should be atleast 5 characters")
    .max(30, "Password should be maximum 30 characters"),
});

export function pretifyUserInfo(obj) {
  const user = JSON.parse(JSON.stringify(obj));
  delete user.password;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.passwordHistory;
  return user;
}
export async function sign(payload, secret, iat, exp) {
  // const iat = Math.floor(Date.now() / 1000);
  // const exp = iat + 60 * 60 * 24 * 7; // one week

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function POST(req) {
  try {
    const body = await req.json().catch((error) => {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    });
    const { email, password } = body;

    // For user-input validation
    await loginSchema.validate(body, { abortEarly: false });

    await dbConnect();

    const user = await UserModel.findOne({ email });

    // If user don't have an account
    if (!user) {
      return NextResponse.json(
        {
          message: "Incorrect email",
        },
        { status: 404 }
      );
    }

    // Comparing Password
    const comparePassword = await bcrypt.compare(password, user.password);

    // If Password is incorrect
    if (!comparePassword) {
      return NextResponse.json(
        {
          message: "Incorrect password",
        },
        { status: 404 }
      );
    }

    // JWT-Token
    const payload = {
      userId: {
        id: user._id,
        user: user,
      },
    };

    // Signing JWT
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7; // one week
    const authToken = await sign(
      payload,
      process.env.JWT_PRIVATE_KEY,
      iat,
      exp
    );

    cookies().set({
      name: "token",
      value: authToken,
      secure: true,
      expires: exp * 1000,
      path: "/",
    });
    const userInfo = pretifyUserInfo(user);
    return NextResponse.json(
      {
        message: "Login Sucessfully",
        user: userInfo,
        authToken,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);
    if (
      error.message ===
      "this must be a `object` type, but the final value was: `{}`."
    ) {
      return NextResponse.json(
        {
          message: "Login fields are required",
        },
        { status: 400 }
      );
    }
    if (error.errors) {
      return NextResponse.json(
        {
          message: error.errors.join(" & "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
import { object, string } from "yup";
import { NextResponse } from "next/server";

const loginSchema = object({
  email: string().required(),
  password: string()
    .required()
    .min(8, "Password should be atleast 8 characters")
    .max(30, "Password should be maximum 30 characters"),
});
export function pretifyUserInfo(obj) {
  const user = JSON.parse(JSON.stringify(obj));
  delete user.password;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;
  return user;
}
export async function sign(payload, secret) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // one week

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
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
      },
    };

    // Signing JWT
    const authToken = await sign(payload, process.env.JWT_PRIVATE_KEY);
    const userInfo = pretifyUserInfo(user);
    // const authToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log({ payload, authToken });

    return NextResponse.json(
      {
        message: "Login Sucessfully",
        user: userInfo,
        authToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

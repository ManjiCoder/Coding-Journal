import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
import { NextResponse } from "next/server";
import { pretifyUserInfo, sign } from "../login/route";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Enter your nickname"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password should be atleast 5 characters")
    .max(30, "Password should be maximum 30 characters"),
});
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, role, password } = body;
    // For user-input validation
    await signUpSchema.validate(body, { abortEarly: false });

    await dbConnect();
    const user = await UserModel.findOne({ email });

    // If user already have an account
    if (user) {
      return NextResponse.json(
        {
          message: "User with this email already exists.",
        },
        { status: 404 }
      );
    }
    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword);

    // Saving into the db
    const newUser = await UserModel.create({
      name,
      email,
      role,
      password: hashPassword,
    });
    // console.log(newUser);

    // JWT-Token
    const payload = {
      userId: {
        id: newUser._id,
      },
    };

    // Signing JWT
    // const authToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    const authToken = await sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log({ payload, authToken });
    const userInfo = pretifyUserInfo(newUser);
    return NextResponse.json(
      { message: "Account Created Sucessfully", authToken, user: userInfo },
      { status: 200 }
    );
  } catch (error) {
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
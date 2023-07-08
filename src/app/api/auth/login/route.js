import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { object, string } from "yup";
import { NextResponse } from "next/server";

const loginSchema = object({
  email: string().required(),
  password: string()
    .required()
    .min(8, "Password should be atleast 8 characters")
    .max(30, "Password should be maximum 30 characters"),
});

export async function POST(req, res) {
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
    const authToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log({ payload, authToken });

    return NextResponse.json(
      {
        message: "Login Sucessfully",
        user,
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

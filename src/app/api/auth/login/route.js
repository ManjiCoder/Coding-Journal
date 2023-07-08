import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    await dbConnect();
    // console.log(email, password);

    const user = await UserModel.findOne({ email });

    // If user already have an account
    if (!user) {
      return NextResponse.json(
        {
          message: "Try to create an account & then login.",
        },
        { status: 200 }
      );
    }

    // Comparing Password
    const comparePassword = await bcrypt.compare(password, user.password);
    // console.log(comparePassword);

    // If Password is incorrect
    if (!comparePassword) {
      return NextResponse.json(
        {
          message: "Incorrect Password",
        },
        { status: 200 }
      );
    }

    const payload = {
      userId: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log({ payload, authToken });
    return NextResponse.json(
      { message: "Login Sucessfully", authToken },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Try to create an account & then login.",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

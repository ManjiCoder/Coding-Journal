import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { name, email, role, password } = await req.json();
    await dbConnect();
    const user = await UserModel.findOne({ email });

    // If user already have an account
    if (user) {
      return NextResponse.json(
        {
          message: "User with this email already exists.",
        },
        { status: 400 }
      );
    }
    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword);
    // console.log(name, email, role, password);

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

    const authToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log({ payload, authToken });
    return NextResponse.json(
      { message: "Account Created Sucessfully", authToken },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "User with this email already exists.", error: error.message },
      { status: 400 }
    );
  }
}

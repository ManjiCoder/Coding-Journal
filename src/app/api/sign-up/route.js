import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { name, email, role, password } = await req.json();
    await dbConnect();
    console.log(name, email, role, password);
    const newUser = await UserModel.create({
      name,
      email,
      role,
      password,
    });
    console.log(newUser);
    return NextResponse.json(
      { message: "Account Created Sucessfully", newUser },
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

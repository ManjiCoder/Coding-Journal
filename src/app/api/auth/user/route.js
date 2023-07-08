import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const userId = req.headers.get("userId");
  if (userId) {
    console.log(JSON.parse(userId).id);
    const user = await UserModel.find(
      { _id: JSON.parse(userId).id },
      { _id: 1, name: 1, email: 1, role: 1, friends: 1 }
    );
    return NextResponse.json({ user }, { status: 200 });
  }
  // console.log(req.cookies.get("userId"));
}

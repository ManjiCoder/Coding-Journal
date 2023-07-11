import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { pretifyUserInfo, sign } from "../login/route";

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  // console.log(userId);
  const { password } = await req.json();
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  const user = await UserModel.findOne({ _id: userId.id });
  if (!user) {
    return NextResponse.json(
      { message: "User doesn't exists" },
      { status: 401 }
    );
  }
  try {
    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // JWT-Token
    const payload = {
      userId: {
        id: user._id,
      },
    };

    // Signing JWT
    const authToken = await sign(payload, process.env.JWT_PRIVATE_KEY);
    // console.log(authToken, payload);
    const isPreviousPassword = await bcrypt.compare(password, user.password);
    // console.log({ isPreviousPassword });
    if (isPreviousPassword) {
      return NextResponse.json(
        { message: "New password must be different from previous password" },
        { status: 401 }
      );
    }
    const newPassword = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $push: { passwordHistory: { date: new Date().toISOString() } },
        password: hashPassword,
      },
      { new: true }
    );
    // Future TODO: passwordHistory must be less than 20 change in montth
    const userInfo = pretifyUserInfo(newPassword);
    return NextResponse.json({ authToken, user: userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

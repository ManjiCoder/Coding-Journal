import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { pretifyUserInfo } from "../../auth/login/route";
import { object } from "yup";

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log(userId);
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }

  try {
    const { id } = await req.json();
    if (userId.id === id) {
      return NextResponse.json(
        { message: "You can't add yourself" },
        { status: 401 }
      );
    }
    const user = await UserModel.findOne({ _id: userId.id });
    const userFriend = await UserModel.findById(id).select("name");
    if (!user || !userFriend) {
      return NextResponse.json(
        { message: "User doesn't exists" },
        { status: 401 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $pull: { friends: { id: id } },
      },
      { new: true }
    );
    const userInfo = pretifyUserInfo(updatedUser);
    return NextResponse.json(
      { message: `Friend remove successfully`, user: userInfo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

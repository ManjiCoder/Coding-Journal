import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { pretifyUserInfo } from "../../auth/login/route";
import { object } from "yup";
import dbConnect from "@/utils/dbConnect";
import { idSchema } from "../add/route";

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log(userId);
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }

  const { id } = await req.json().catch((error) => {
    return NextResponse.json({ message: error.message }, { status: 401 });
  });
  if (userId.id === id) {
    return NextResponse.json(
      { message: "You can't add yourself" },
      { status: 400 }
    );
  }
  try {
    await idSchema.validate({ id });
    await dbConnect();
    const user = await UserModel.findOne({ _id: userId.id });
    const userFriend = await UserModel.findById(id).select("name");
    if (!user || !userFriend) {
      return NextResponse.json(
        { message: "User doesn't exists" },
        { status: 400 }
      );
    }

    const isFriend = user.friends.filter((v) => v.id.toString() === id);
    if (isFriend.length === 0) {
      return NextResponse.json(
        { message: `user is not your friend` },
        { status: 400 }
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
    // console.log(error.errors);
    if (error.errors) {
      return NextResponse.json(
        {
          message: error.errors.join(" & "),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

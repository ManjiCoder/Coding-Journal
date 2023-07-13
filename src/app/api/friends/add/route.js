import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { pretifyUserInfo } from "../../auth/login/route";
import * as Yup from "yup";
import dbConnect from "@/utils/dbConnect";

export const idSchema = Yup.object().shape({
  id: Yup.string()
    .required("id is required")
    .min(24, "invalid id")
    .max(24, "invalid id"),
});

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
      { status: 401 }
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
    if (isFriend.length !== 0) {
      return NextResponse.json(
        { message: `${userFriend.name} is already your friend` },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $push: { friends: { name: userFriend.name, id: userFriend._id } },
      },
      { new: true }
    );
    const userInfo = pretifyUserInfo(updatedUser);
    return NextResponse.json(
      { message: `Friend added successfully`, user: userInfo },
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
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

import solutionModel from "@/models/Solution";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { idSchema } from "../add/route";
import UserModel from "@/models/User";

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  const { id } = await req.json().catch((error) => {
    return NextResponse.json({ message: error.message }, { status: 401 });
  });
  if (id === userId.id) {
    return NextResponse.json(
      {
        message: "You can't use it for self",
      },
      { status: 400 }
    );
  }
  try {
    await idSchema.validate({ id });
    await dbConnect();

    const user = await UserModel.findById(userId.id).select("friends");
    const isFriend = user["friends"].filter((obj) => obj.id.toString() === id);

    if (isFriend.length === 0) {
      return NextResponse.json(
        {
          message: "You don't have access",
        },
        { status: 401 }
      );
    }
    const solutions = await solutionModel
      .find({ user: id })
      .sort({ questionNo: -1 })
      .select("-user");

    return NextResponse.json(
      {
        message: "Solution fetch successfully",
        solutions,
        nbHits: solutions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);
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

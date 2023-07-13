import solutionModel from "@/models/Solution";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { idSchema } from "../add/route";

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

  try {
    await idSchema.validate({ id });
    await dbConnect();

    // const solutions = await solutionModel.aggregate([
    //   ({
    //     $match: {
    //       user: id,
    //     },
    //   },
    //   {
    //     $sort: {
    //       questionNo: -1,
    //     },
    //   }),
    //   {
    //     $unset: ["__v"],
    //   },
    // ]);
    const solutions = await solutionModel.find({ user: id });
    return NextResponse.json(
      { message: "Solution fetch successfully", solutions },
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

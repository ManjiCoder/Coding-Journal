import solutionModel from "@/models/Solution";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  try {
    const solutions = await solutionModel.aggregate([
      ({
        $match: {
          user: userId.id,
        },
      },
      {
        $sort: {
          questionNo: -1,
        },
      }),
      {
        $unset: ["__v", "user"],
      },
    ]);
    // console.log({ solutions });
    return NextResponse.json(
      { message: "Solution added successfully", solutions },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

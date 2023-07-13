import solutionModel from "@/models/Solution";
import dbConnect from "@/utils/dbConnect";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  // console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  try {
    await dbConnect();
    const solutions = await solutionModel
      .find({ user: userId.id })
      .sort({ questionNo: -1 })
      .select(["-user"]);
    // console.log({ solutions });
    return NextResponse.json(
      {
        message: "Solution fetch successfully",
        solutions,
        nbHits: solutions.length,
      },
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

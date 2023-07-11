import solutionModel from "@/models/Solution";
import { NextResponse } from "next/server";

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  const {
    title,
    questionNo,
    status,
    level,
    language,
    accuracy,
    code,
    time,
    score,
  } = await req.json();

  try {
    const solution = await solutionModel.create({
      user: userId.id,
      title,
      questionNo,
      status,
      level,
      language,
      accuracy,
      code,
      time,
      score,
    });
    return NextResponse.json(
      { message: "Solution added successfully", solution },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

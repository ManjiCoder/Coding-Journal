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
    id,
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
    const match = await solutionModel.findById(id);
    const updateSolution = {};
    if (title) updateSolution.title = title;
    if (questionNo) updateSolution.questionNo = questionNo;
    if (status) updateSolution.status = status;
    if (level) updateSolution.level = level;
    if (language) updateSolution.language = language;
    if (accuracy) updateSolution.accuracy = accuracy;
    if (code) updateSolution.code = code;
    if (time) updateSolution.time = time;
    if (score) updateSolution.score = score;

    if (Object.keys(updateSolution).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 200 }
      );
    }
    if (match !== null) {
      const solution = await solutionModel.findByIdAndUpdate(
        id,
        { $set: updateSolution },
        { new: true }
      );
      return NextResponse.json(
        { message: "Solution updated successfully", solution },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Solution not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

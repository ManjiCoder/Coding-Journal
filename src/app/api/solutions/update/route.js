import solutionModel from "@/models/Solution";
import { NextResponse } from "next/server";
import * as Yup from "yup";

const solutionSchema = Yup.object().shape({
  id: Yup.string().min(24, "invalid id").max(24, "invalid id"),
  title: Yup.string(),
  questionNo: Yup.string(),
  status: Yup.string(),
  level: Yup.number("Level must be number"),
  language: Yup.string(),
  accuracy: Yup.number(),
  code: Yup.string(),
  time: Yup.string(),
  score: Yup.number(),
});

export async function POST(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  //   console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
  const body = await req.json().catch((error) => {
    return NextResponse.json({ message: error.message }, { status: 400 });
  });
  try {
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
    } = body;
    await solutionSchema.validate(body, { abortEarly: false });
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
    console.log(error.errors);
    if (
      error.message ===
      "this must be a `object` type, but the final value was: `{}`."
    ) {
      return NextResponse.json(
        {
          message: "update solution fields are required",
        },
        { status: 400 }
      );
    }
    // console.log(error.errors);
    else if (error.errors) {
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

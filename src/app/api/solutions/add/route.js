import solutionModel from "@/models/Solution";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import * as Yup from "yup";

const solutionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  questionNo: Yup.number(),
  status: Yup.string().required("Status is required"),
  level: Yup.number("Level must be number").required("Level is required"),
  language: Yup.string().required("Language is required"),
  accuracy: Yup.number().required("Accuracy is required"),
  code: Yup.string().required("Code is required"),
  time: Yup.string().required("Time is required"),
  score: Yup.number().required("Score is required"),
  note: Yup.string(),
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
    return NextResponse.json({ message: "error.message" }, { status: 401 });
  });

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
    note,
  } = body;
  try {
    await solutionSchema.validate(body, { abortEarly: false });
    await dbConnect();
    const solutions = await solutionModel.find({ user: userId.id });
    const solution = await solutionModel.create({
      user: userId.id,
      title,
      questionNo: questionNo || solutions.length + 1,
      status,
      level,
      language,
      accuracy,
      code,
      time,
      score,
      note,
    });
    return NextResponse.json(
      { message: "Solution added successfully", solution },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message ===
      "this must be a `object` type, but the final value was: `{}`."
    ) {
      return NextResponse.json(
        {
          message: "solution fields is required",
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

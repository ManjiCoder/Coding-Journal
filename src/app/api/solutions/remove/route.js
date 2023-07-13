import solutionModel from "@/models/Solution";
import { NextResponse } from "next/server";
import { idSchema } from "../../friends/add/route";

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
    const match = await solutionModel.findById(id);
    if (match !== null) {
      const solution = await solutionModel.findByIdAndDelete(id);
      return NextResponse.json(
        { message: "Solution added successfully", solution },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Solution not found" },
      { status: 404 }
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

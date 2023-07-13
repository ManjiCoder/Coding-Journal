import solutionModel from "@/models/Solution";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = JSON.parse(req.headers.get("userId"));
  console.log({ userId });
  if (!userId) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }

  try {
    const deletedSolution = await solutionModel.deleteMany({ user: userId.id });
    return NextResponse.json(
      { message: "All Solutions Deleted successfully", deletedSolution },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

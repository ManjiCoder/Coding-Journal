import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";
import { isValidObjectId } from "mongoose";
import { idSchema } from "./remove";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    try {
      await idSchema.validate({ id: query.id });
      await dbConnect();
      let solutions = await solutionModel.findById(query.id);
      if (!solutions) {
        return res.status(404).json({ message: "Not found" });
      }
      if (isValidObjectId(query.id) === false) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({
        message:
          solutions.length === 0
            ? `Sorry, No Result Found`
            : "Solution fetch successfully!",
        solutions,
        nbHit: solutions.length,
      });
      return;
    } catch (error) {
      // console.log(error.errors);
      if (error.errors) {
        res.status(400).json({
          message: error.errors.join(" & "),
        });
        return;
      }
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
  res.status(401).json({ message: "Not allowed" });
}

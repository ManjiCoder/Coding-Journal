import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET" && query.title !== "" && query.createdAt !== "") {
    try {
      await dbConnect();
      let solutions = await solutionModel.findOne({ title: query.title });
      if (
        !solutions ||
        new Date(solutions.createdAt).getTime() !== parseInt(query.createdAt)
      ) {
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
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
  res.status(401).json({ message: "Not allowed" });
}

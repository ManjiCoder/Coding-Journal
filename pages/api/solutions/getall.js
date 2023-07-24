import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const id = req.headers["user-id"];
      await dbConnect();
      const solutions = await solutionModel
        .find({ user: id })
        .sort({ createdAt: -1 })
        .select(["-user"]);
      res
        .status(200)
        .json({ message: "Solution fetch successfully!", solutions });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
  res.status(401).json({ message: "Not allowed" });
}

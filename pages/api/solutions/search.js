import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET" && query.q) {
    try {
      let { q } = query;
      q = q.trim().toLowerCase();
      // console.log(q);
      const id = req.headers["user-id"];
      await dbConnect();

      let solutions = await solutionModel.find({ user: id });
      // .select(["title", "-_id"]);

      solutions = solutions.filter((obj) =>
        obj.title.toLowerCase().includes(q)
      );
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

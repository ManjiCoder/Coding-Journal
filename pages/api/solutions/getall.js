import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";

export default async function handler(req, res) {
  const { method, query } = req;
  const { sort, order } = query;
  const sortByFields = [
    "score",
    "questionNo",
    "createdAt",
    "updatedAt",
    "level",
    "accuracy",
  ];
  const sortByOrders = ["ascending", "descending"];

  if (
    (method === "GET") & sortByFields.includes(sort) &&
    sortByOrders.includes(order)
  ) {
    try {
      const id = req.headers["user-id"];
      await dbConnect();

      // Adding Filter based on query for sorting
      const filterObj = {};
      filterObj[sort] = order === "ascending" ? 1 : -1;

      const solutions = await solutionModel
        .find({ user: id })
        .sort(filterObj)
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

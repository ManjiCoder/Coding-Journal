import dbConnect from "@/utils/dbConnect";
import solutionModel from "@/models/Solution";

import * as Yup from "yup";

const solutionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  questionNo: Yup.number(),
  status: Yup.string().required("Status is required"),
  level: Yup.number("Level must be number").required("Level is required"),
  link: Yup.string().required("Link is required"),
  language: Yup.string().required("Language is required"),
  accuracy: Yup.number().required("Accuracy is required"),
  code: Yup.string().required("Code is required"),
  time: Yup.string().required("Time is required"),
  score: Yup.number().required("Score is required"),
  note: Yup.string(),
});

export default async function handler(req, res) {
  const { method } = req;
  //   console.log({ method });
  if (method === "POST") {
    try {
      const id = req.headers["user-id"];
      const { body } = req;
      await solutionSchema.validate(body, { abortEarly: false });
      const {
        title,
        questionNo,
        status,
        level,
        link,
        language,
        accuracy,
        code,
        time,
        score,
        note,
      } = body;
      await dbConnect();

      const userSolutions = await solutionModel.find({ user: id });
      const newSolution = await solutionModel.create({
        user: id,
        title,
        questionNo: questionNo || userSolutions.length + 1,
        status,
        level,
        link,
        language,
        accuracy,
        code,
        time,
        score,
        note,
      });
      res.status(200).json({
        message: "Solution added successfully!",
        solutions: newSolution,
      });
      return;
    } catch (error) {
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

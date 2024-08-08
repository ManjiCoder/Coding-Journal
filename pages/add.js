import solutionModel from '@/models/Solution';
import dbConnect from '@/utils/dbConnect';

import { solutionSchema } from '@/lib/yup';

export default async function handler(req, res) {
  const { method } = req;
  //   console.log({ method });
  if (method === 'POST') {
    try {
      const id = req.headers['user-id'];
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
        message: 'Solution added successfully!',
        solutions: newSolution,
      });
      return;
    } catch (error) {
      if (error.errors) {
        res.status(400).json({
          message: error.errors.join(' & '),
        });
        return;
      }
      res
        .status(500)
        .json({ message: error.message || 'Internal server error' });
    }
  }
  res.status(401).json({ message: 'Not allowed' });
}

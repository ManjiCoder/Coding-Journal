import solutionModel from '@/models/Solution';
import dbConnect from '@/utils/dbConnect';

import { idSchema } from '@/lib/yup';

export default async function handler(req, res) {
  const { method } = req;
  //   console.log({ method });
  if (method === 'DELETE') {
    try {
      //   const id = req.headers["user-id"];
      const { body } = req;
      if (body === '') {
        return res.status(401).json({ message: 'Not allowed' });
      }
      await idSchema.validate(body, { abortEarly: false });
      const { id: updateSolutionId } = body;
      await dbConnect();

      const matchSolution = await solutionModel.findById(updateSolutionId);
      if (matchSolution === null) {
        return res.status(401).json({ message: 'Solutions not found' });
      }

      const updatedsolution = await solutionModel.findByIdAndDelete(
        updateSolutionId
      );
      res.status(200).json({
        message: 'Solution remove successfully!',
        solutions: updatedsolution,
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

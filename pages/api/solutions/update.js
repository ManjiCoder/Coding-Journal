import solutionModel from '@/models/Solution';
import dbConnect from '@/utils/dbConnect';

import { updateSchema } from '@/lib/yup';

export default async function handler(req, res) {
  const { method } = req;
  //   console.log({ method });
  if (method === 'PUT') {
    try {
      const id = req.headers['user-id'];
      const { body } = req;
      if (body === '') {
        return res.status(401).json({ message: 'Not allowed' });
      }
      await updateSchema.validate(body, { abortEarly: false });
      const {
        id: updateSolutionId,
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
      const updateSolution = {};
      if (title) updateSolution.title = title;
      if (questionNo) updateSolution.questionNo = questionNo;
      if (status) updateSolution.status = status;
      if (level) updateSolution.level = level;
      if (link) updateSolution.link = link;
      if (language) updateSolution.language = language;
      if (accuracy) updateSolution.accuracy = accuracy;
      if (code) updateSolution.code = code;
      if (time) updateSolution.time = time;
      if (score) updateSolution.score = score;

      const matchSolution = await solutionModel.findById(updateSolutionId);
      if (matchSolution === null) {
        return res.status(401).json({ message: 'Solution not found' });
      }
      if (Object.keys(updateSolution).length === 0) {
        return res.status(200).json({ message: 'Nothing to update' });
      }
      const updatedsolution = await solutionModel.findByIdAndUpdate(
        updateSolutionId,
        { $set: updateSolution },
        { new: true }
      );
      res.status(200).json({
        message: 'Solution updated successfully!',
        id,
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

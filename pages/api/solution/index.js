import { idSchema, solutionSchema, updateSchema } from '@/lib/yup';
import solutionModel from '@/models/Solution';
import dbConnect from '@/utils/dbConnect';
import { isValidToken } from '@/utils/server-utils';

export default async function handler(req, res) {
  const { method, query } = req;
  const { sort, page, limit } = query;
  const sortByFields = [
    'score',
    'questionNo',
    'createdAt',
    'updatedAt',
    'level',
    'accuracy',
  ];
  const sortByOrders = {
    ASC: 1,
    DESC: -1,
  };

  if (method === 'GET') {
    try {
      const token = req.headers['authorization'];

      const userId = await isValidToken(token);
      //   console.log(userId);
      if (!userId) {
        res
          .status(401)
          .json({ message: 'Please authenticate using valid token' });
      }

      const id = userId.id;
      await dbConnect();
      // Adding Filter based on query for sorting
      const filterObj = {};
      if (sort) {
        const [sortField, order] = sort.split(',');
        filterObj[sortField] = sortByOrders[order];
      } else if (!sort) {
        filterObj.createdAt = -1;
      }

      const skip = (parseInt(page) - 1) * limit;
      const totalResults = await solutionModel.find({ user: id });
      const solutions = await solutionModel
        .find({ user: id })
        .sort(filterObj)
        .select(['-user'])
        .skip(skip)
        .limit(limit || 15);
      return res.status(200).json({
        message: 'Solution fetch successfully!',
        solutions,
        totalResults: totalResults.length,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || 'Internal server error' });
    }
  }

  if (method === 'POST') {
    try {
      const token = req.headers['authorization'];
      const userId = await isValidToken(token);
      if (!userId) {
        res
          .status(401)
          .json({ message: 'Please authenticate using valid token' });
      }

      const id = userId.id;
      await dbConnect();
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

  if (method === 'PATCH') {
    try {
      const token = req.headers['authorization'];
      const userId = await isValidToken(token);
      if (!userId) {
        res
          .status(401)
          .json({ message: 'Please authenticate using valid token' });
      }

      const id = userId.id;
      await dbConnect();
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
      if (note) updateSolution.note = note;

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

  if (method === 'DELETE') {
    try {
      const token = req.headers['authorization'];
      const userId = await isValidToken(token);
      if (!userId) {
        res
          .status(401)
          .json({ message: 'Please authenticate using valid token' });
      }

      const id = userId.id;
      await dbConnect();
      const { body } = req;
      if (body === '') {
        return res.status(401).json({ message: 'Not allowed' });
      }
      await idSchema.validate(body, { abortEarly: false });
      const { id: deleteSolutionId } = body;
      await dbConnect();

      const matchSolution = await solutionModel.findById(deleteSolutionId);
      if (matchSolution === null) {
        return res.status(401).json({ message: 'Solutions not found' });
      }

      const updatedsolution = await solutionModel.findByIdAndDelete(
        deleteSolutionId
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

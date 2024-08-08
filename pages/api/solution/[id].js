import solutionModel from '@/models/Solution';

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === 'GET') {
    try {
      const { id } = query;
      const solution = await solutionModel.findById(id);
      return res.status(200).json({ solution });
    } catch (error) {
      return res.status(400).json({ message: 'Please authenticate using valid solution ID' });
    }
  }
  res.status(401).json({ message: 'Not allowed' });
}

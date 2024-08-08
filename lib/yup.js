import * as Yup from 'yup';

export const solutionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  questionNo: Yup.number(),
  status: Yup.string().required('Status is required'),
  level: Yup.number('Level must be number').required('Level is required'),
  link: Yup.string().required('Link is required'),
  language: Yup.string().required('Language is required'),
  accuracy: Yup.number().required('Accuracy is required'),
  code: Yup.string().required('Code is required'),
  time: Yup.string().required('Time is required'),
  score: Yup.number().required('Score is required'),
  note: Yup.string(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().min(24, 'invalid id').max(24, 'invalid id'),
  title: Yup.string(),
  questionNo: Yup.string(),
  status: Yup.string(),
  level: Yup.number('Level must be number'),
  link: Yup.string(),
  language: Yup.string(),
  accuracy: Yup.number(),
  code: Yup.string(),
  time: Yup.string(),
  score: Yup.number(),
});

export const idSchema = Yup.object().shape({
  id: Yup.string().min(24, 'invalid id').max(24, 'invalid id'),
});

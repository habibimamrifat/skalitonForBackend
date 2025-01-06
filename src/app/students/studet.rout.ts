import express from 'express';
import { studentController } from './student.controller';
import validate from '../middleware/validatorMiddleWre';
import studentValidationZodSchema from './student.Zod.Validation';
import auth from '../middleware/auth';
import { upload } from '../util/sendImgToCludnary';

const studentRouter = express.Router();

studentRouter.post(
  '/createStudent',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validate(studentValidationZodSchema),
  studentController.creatStudent,
);
studentRouter.get(
  '/allStudennts',
  auth(),
  studentController.getAllStudentsFromDb,
);
studentRouter.get(
  '/findSingleStudent/:id',
  studentController.findSingleStudent,
);
studentRouter.delete(
  '/deleteSingleStudent/:id',
  studentController.deleteSingleStudent,
);

export const StudentRouts = studentRouter;

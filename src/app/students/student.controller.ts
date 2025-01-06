import { Request, Response } from 'express';
import { studentServices } from './student.services';
import catchAsync from '../util/catchAsync';
import golbalRespnseHandeller from '../util/globalResponseHandeller';


const creatStudent = catchAsync(async (req, res, next) => {
  const file= req.file
  const studentData = req.body

  // console.log(file,"file")
  // console.log(studentData,"studentData")

  const result = await studentServices.createStudentInDB(file,studentData);
  golbalRespnseHandeller(res, {
    statusCode: 200,
    success: true,
    message: 'sttudent created Successfully',
    data: result,
  });
});


const getAllStudentsFromDb = async (req: Request, res: Response) => {
const query = req.query
  try {
    const result = await studentServices.getAllStudentsFromDB(query);
    res.status(200).json({
      success: true,
      message: 'all students are here',
      body: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: 'couldnt find all student',
      error: err,
    });
  }
};

const findSingleStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.findSingleStudent(req.params.id);
    res.status(200).json({
      success: true,
      message: 'foud student',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: 'couldnt find a student',
      error: err,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.deleteStudent(req.params.id);
    res.status(200).json({
      success: true,
      message: 'deleted student',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: 'couldnt delete a student',
      error: err,
    });
  }
};

export const studentController = {
  creatStudent,
  getAllStudentsFromDb,
  findSingleStudent,
  deleteSingleStudent,
};

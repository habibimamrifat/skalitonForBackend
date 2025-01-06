import QueryBuilder from '../builders/QueryBuilder';
import { sendPhotoToCloudinary } from '../util/sendImgToCludnary';
import { Student } from './student.innterface';
import { StudentModel } from './student.model';
import { studentsSearchField } from './studentsConstents';

const createStudentInDB = async (file: any, student: Student) => {
  const studentInstance = new StudentModel(student);
  if (await StudentModel.isUsereExist(student.id)) {
    throw new Error('yooo this man alrady esxists');
  } else {
    const profileImg = await sendPhotoToCloudinary(student.id, file.path);
    console.log(profileImg, 'profileImg');
    if (profileImg) {
      student.profileImg = profileImg.url;
    }
    const result = await studentInstance.save();
    return result;
  }
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentsSearchField)
    .filter()
    .select()
    .limit()
    .sort()
    .paginate();
  const result = await studentQuery.modelQuery;
  return result;
};

const findSingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });

  return result;
};

const deleteStudent = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentInDB,
  getAllStudentsFromDB,
  findSingleStudent,
  deleteStudent,
};

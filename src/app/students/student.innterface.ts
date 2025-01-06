// import { Schema, model, connect } from 'mongoose';

import { Model } from "mongoose";


// creating a interface we can use type instade of interface it representing a document in MongoDB ensures how the document will be, what will be the structure

export type MonthlyDeposit ={
submissanDate :Date;
installmentMonth: Date | string;
installmentAmmounnt:number;
}

export type Gurdian = {
  fathersName: string;
  fathersOccupation: string;
  fathersMobileNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersMobileNo: string;
};

export type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Student = {
  id: string;
  passWord:string,
  name: Name;
  birthDate: string;
  gender: 'Male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  contactNo: string;
  emmergencyContactNo: string;
  email: string;
  gurdian: Gurdian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
  isDeleted:true | false;
  deposit:[MonthlyDeposit]
};


// creating a custom instance method 
// export type studentMathods ={
//   doesUserExist(studentid:string):  Promise<Student | null>
// }

// creating a custom instance method
// export type studentModelWithMathod =  Model<Student,Record<string,never>,studentMathods>


// creating static mathods

export interface studentStaticMathods extends Model<Student>
{
  isUsereExist( id : string ):Promise<Student | null>
}
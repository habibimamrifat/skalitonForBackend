import { Schema, model } from 'mongoose';
import {
  Gurdian,
  MonthlyDeposit,
  Name,
  Student,
  studentStaticMathods,
} from './student.innterface';
import validator  from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

// creating deposit schema 
 const depositSchima = new Schema<MonthlyDeposit>({
  submissanDate :{type:Date , required:true, default:()=>new Date()},
  installmentMonth: {
    type: Date,
    required: true,
    // Setter to handle both Date and string inputs
    set: (value: string | Date) => (typeof value === "string" ? new Date(value) : value),
  },
  installmentAmmounnt:{type:Number, required:true},
 })

// Create Name schema
const nameSchima = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, 'name can nobe more than 20 char'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: 'First name value is not capitalized',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    maxlength: [20, 'name can nobe more than 20 char'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE}name can be only of string type',
    },
  },
});

// Create Gurdian schema
const gurdianSchima = new Schema<Gurdian>({
  fathersName: { type: String, required: [true, 'First name is required'] },
  fathersOccupation: { type: String, required: true },
  fathersMobileNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersMobileNo: { type: String, required: true },
});

// Create Student schema
const studentSchima = new Schema<Student, studentStaticMathods>({
  id: { type: String, required: true, unique: true },
  name: { type: nameSchima, required: true }, // Reference the nested schema directly
  passWord: { type: String, required: true,maxlength:[20 ,"can not be more than 20 chars"] }, // Reference the nested schema directly
  birthDate: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'female'], required: true }, // Use 'enum' for restricted values
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'value is optinal',
    },
    required: true,
  }, // Enum for bloodGroup
  contactNo: { type: String, required: true },
  emmergencyContactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gurdian: { type: gurdianSchima, required: true }, // Reference nested gurdian schema
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: { values: ['active', 'inactive'], message: '{VALUE} is here' },
    required: true,
    default: 'active',
  }, // Enum for isActive
  isDeleted:{type:Boolean,default:false},
  deposit:[depositSchima]
},{
  toJSON:
  {
    virtuals:true
  }
});

// creating a model with student mathods

studentSchima.methods.doesUserExist = async function (id:string){
 const isUserExist = await  StudentModel.findOne({id})
 return isUserExist
}

// creating static mathod
studentSchima.statics.isUsereExist = async function (id) {
  const exists = await StudentModel.findOne({ id });
  return exists;
};

// creating middleware document middleWare
// pre
studentSchima.pre('save', async function (next) {
  // console.log("pre saving",this)
  const user = this
  user.passWord =await  bcrypt.hash(user.passWord, Number(config.bcrypt_salt_rounds));
  next()
});


// post
studentSchima.post('save', async function (doc,next) {
  doc.passWord=" "

  console.log("post saviung..........",doc)
  next()
});


// creatinng query middleWare
studentSchima.pre('find', function (next){
 this.find({isDeleted : {$ne :true}})
 next()
})

studentSchima.pre("findOne",function(next){
  this.findOne({isDeleted: {$ne :true}})
  next()
})

studentSchima.pre("aggregate",function(next){
  this.pipeline().unshift({$match: {isDelrted : true}})
  next()
})

studentSchima.virtual("fullname").get(function(){
  return this.name.firstName + this.name.middleName +  this.name.lastName
})

// Export the Student model
export const StudentModel = model<Student, studentStaticMathods>(
  'Student',
  studentSchima,
);

import config from "../../config";
import { StudentModel } from "../students/student.model";
import { TlogIn } from "./auth.interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const logIn = async (payload:TlogIn)=>{
    // console.log(payload)

    const find_user =await StudentModel.findOne({email:payload.email})
    // console.log("the user is",find_user)
    if(!find_user)
    {
            throw Error("student not found")
    }

    const accessPayload = {
        gender:find_user.gender,
        bloodGroup:find_user.bloodGroup
    }
    const match = await bcrypt.compare(payload.password, find_user?.passWord);
    if(!match)
    {
      throw Error ("password is not matched")
    }
    const accessToken = jwt.sign(accessPayload, config.jwt_accessSecret as string,{expiresIn:"10d"});
    return{
        id:find_user.id,
        accessToken:accessToken
    }
}

export  const authServices = {
    logIn
}
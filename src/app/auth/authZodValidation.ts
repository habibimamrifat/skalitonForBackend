import { z } from "zod";

const logInSchema = z.object({
    email:z.string({required_error:"The email is requared"}),
    password:z.string({required_error:"The password is requared"})
})
const changePasswordSchema = z.object({
    oldPassword:z.string({required_error:"The email is requared"}),
    newPassword:z.string({required_error:"The password is requared"})
   
})

import catchAsync from "../util/catchAsync";
import golbalRespnseHandeller from "../util/globalResponseHandeller";
import { authServices } from "./auth.services";

const logIn = catchAsync(async(req, res, next)=>{
    const result = await authServices.logIn(req.body)
    golbalRespnseHandeller(res,{
        statusCode: 200,
    success: true,
    message: "student found",
    data: result
    })
})


export const authController ={
    logIn
}
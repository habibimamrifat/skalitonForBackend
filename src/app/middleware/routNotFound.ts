import { NextFunction, Request, Response } from "express";

const routNotFoiund=(req:Request,res:Response,next:NextFunction)=>{
    res.status(404).json({
        message:"rout not found"
    })
}

export default routNotFoiund
import { NextFunction, Request, Response } from 'express';

import catchAsync from '../util/catchAsync';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) =>  {

    const token=req.headers?.authorization
    if(!token)
    {
     throw Error("invalid user")
    }
    })
};

export default auth
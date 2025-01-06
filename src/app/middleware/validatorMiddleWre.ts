import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate = (validator:AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) =>  {
    // console.log("i am being called zod error")
    try {
      // Parse and validate the request body
      validator.parse(req.body);
      next(); // Proceed to the next middleware if validation succeeds
    } catch (error) {
      // if (error instanceof ZodError) {
      //   // Pass the error to the global error handler
      //   next({
      //     statusCode: 400,
      //     success: false,
      //     message: "Validation error",
      //     errors: error.errors, // Forward Zod error details
      //   });
      // } else {
      //   next(error); // Pass non-validation errors to the global error handler
      // }

      next(error);
    }
}
};

export default validate
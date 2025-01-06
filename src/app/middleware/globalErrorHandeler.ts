import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';
import config from '../../config';
import reformZodError from '../errors/handleZodError';
import mongoseErrorHandeller from '../errors/mongoseErrorHandeler';
import { TErrorSource } from '../interfaces/globalInterfases';
import dublicateErrorHandellerr from '../errors/dublicateError';

const globalErrorhandeler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default value

  let statusCode = err.statusCode || 500;
  let message = err.message || 'something Went Wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const handaleZoderror = reformZodError(err);
    statusCode = 400;
    message = 'validation error';
    errorSource = handaleZoderror;
  } else if (err?.name === 'ValidationError') {
    const mongoseErrorHandellerr = mongoseErrorHandeller(err);
    statusCode = mongoseErrorHandellerr?.statusCode;
    errorSource = mongoseErrorHandellerr?.errorSource;
    message = mongoseErrorHandellerr.message;
  } else if (err?.errorResponse?.code === 11000) {
    const dublicateErrorHandeller = dublicateErrorHandellerr(err);
    statusCode = dublicateErrorHandeller.statuscode;
    message = dublicateErrorHandeller.message;
    errorSource = dublicateErrorHandeller.errorSource;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    // theError:err,
    stack: config.environment === 'development' ? err.stack : null,
  });
};

export default globalErrorhandeler;

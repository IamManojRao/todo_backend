import { ErrorRequestHandler } from 'express';
import createError from 'http-errors';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (createError.isHttpError(err)) {
     res.status(err.statusCode).json({
      error: err.message,
      details: err.details || undefined
    });
  }

  console.error(err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export default errorHandler;
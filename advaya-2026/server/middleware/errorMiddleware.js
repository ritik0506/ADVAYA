import logger from './logger.js';

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  logger.error(err.message, {
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  const isProduction = (process.env.NODE_ENV || 'development') === 'production';

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: isProduction ? undefined : err.stack,
  });
};

const multer = require('multer');
const { errorResponse } = require('../utils/response');

const notFound = (req, res, next) => {
  errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof multer.MulterError) {
    return errorResponse(res, err.message, 400);
  }

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.reduce((acc, e) => {
      acc[e.path] = e.message;
      return acc;
    }, {});
    return errorResponse(res, 'Validation error', 422, errors);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return errorResponse(res, 'Resource already exists', 409);
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return errorResponse(res, 'Invalid reference', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  errorResponse(res, message, statusCode);
};

module.exports = { notFound, globalErrorHandler };
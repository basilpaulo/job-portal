const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = error.msg;
      }
      return acc;
    }, {});
    return errorResponse(res, 'Validation failed', 422, errorMessages);
  }
  next();
};

module.exports = validate;
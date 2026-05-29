const { verifyAccessToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Access token required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error.message || 'Authentication failed', 401);
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return errorResponse(res, 'Admin access required', 403);
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return errorResponse(res, 'User access required', 403);
  }
  next();
};

module.exports = { authenticate, authorizeAdmin, authorizeUser };
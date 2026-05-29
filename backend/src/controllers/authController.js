const { User } = require('../models');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { name, email, password, phone, location, role } = req.body;

    const existingUser = await User.scope('withPassword').findOne({
      where: { email }
    });

    if (existingUser) {
      return errorResponse(res, 'Email already registered', 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      location,
      role: role === 'admin' ? 'user' : (role || 'user')
    });

    const { accessToken, refreshToken } = generateTokens(user);

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    return successResponse(res, {
      user: user.toJSON(),
      accessToken,
      refreshToken
    }, 'Registration successful', 201);
  } catch (error) {
    console.error('Register error:', error);
    return errorResponse(res, error.message || 'Registration failed', 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.scope('withPassword').findOne({
      where: { email }
    });

    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'Account is deactivated. Contact support.', 403);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    const safeUser = await User.findByPk(user.id);

    return successResponse(res, {
      user: safeUser.toJSON(),
      accessToken,
      refreshToken
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 'Login failed', 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return errorResponse(res, 'Refresh token required', 401);
    }

    const decoded = verifyRefreshToken(token);
    const user = await User.scope('withPassword').findByPk(decoded.id);

    if (!user || user.refresh_token !== token) {
      return errorResponse(res, 'Invalid refresh token', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'Account deactivated', 403);
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    await User.update(
      { refresh_token: newRefreshToken },
      { where: { id: user.id } }
    );

    return successResponse(res, {
      accessToken,
      refreshToken: newRefreshToken
    }, 'Token refreshed successfully');
  } catch (error) {
    return errorResponse(res, 'Token refresh failed', 401);
  }
};

const logout = async (req, res) => {
  try {
    await User.update(
      { refresh_token: null },
      { where: { id: req.user.id } }
    );
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    return errorResponse(res, 'Logout failed', 500);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, { user }, 'User fetched successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to fetch user', 500);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, bio, skills } = req.body;
    await User.update(
      { name, phone, location, bio, skills },
      { where: { id: req.user.id } }
    );
    const updatedUser = await User.findByPk(req.user.id);
    return successResponse(res, { user: updatedUser }, 'Profile updated successfully');
  } catch (error) {
    return errorResponse(res, 'Profile update failed', 500);
  }
};

module.exports = { register, login, refreshToken, logout, getMe, updateProfile };
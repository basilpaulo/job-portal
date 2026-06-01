const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getDashboardStats
} = require('../controllers/jobController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const { verifyAccessToken } = require('../utils/jwt');
    try {
      const token = authHeader.split(' ')[1];
      req.user = verifyAccessToken(token);
    } catch (e) {
      // Continue without auth
    }
  }
  next();
};

const jobValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 50 }).withMessage('Description must be at least 50 characters'),
  body('requirements').trim().notEmpty().withMessage('Requirements are required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('job_type').isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote']).withMessage('Invalid job type'),
  body('experience_level').isIn(['entry', 'junior', 'mid', 'senior', 'lead', 'executive']).withMessage('Invalid experience level'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('salary_min').optional().isNumeric().withMessage('Salary must be a number'),
  body('salary_max').optional().isNumeric().withMessage('Salary must be a number'),
  body('openings').optional().isInt({ min: 1 }).withMessage('Must have at least 1 opening'),
  body('deadline').optional({ checkFalsy: true }).isISO8601().withMessage('Deadline must be a valid date')
];

// Admin routes
router.get('/admin/dashboard', authenticate, authorizeAdmin, getDashboardStats);
router.get('/admin/jobs', authenticate, authorizeAdmin, getAllJobs);
router.post('/admin/jobs', authenticate, authorizeAdmin, jobValidation, validate, createJob);
router.put('/admin/jobs/:id', authenticate, authorizeAdmin, jobValidation, validate, updateJob);
router.delete('/admin/jobs/:id', authenticate, authorizeAdmin, deleteJob);
router.patch('/admin/jobs/:id/status', authenticate, authorizeAdmin, toggleJobStatus);

// Public routes
router.get('/', optionalAuth, getAllJobs);
router.get('/:id', optionalAuth, getJobById);

module.exports = router;
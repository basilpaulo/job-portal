const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  applyForJob,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

router.post('/jobs/:job_id/apply',
  authenticate,
  upload.single('resume'),
  [
    body('cover_letter').optional().isLength({ max: 2000 }).withMessage('Cover letter max 2000 chars'),
    body('years_of_experience').optional().isInt({ min: 0 }).withMessage('Must be a valid number')
  ],
  validate,
  applyForJob
);

router.get('/my-applications', authenticate, getUserApplications);
router.get('/admin/applications', authenticate, authorizeAdmin, getAllApplications);
router.patch('/admin/applications/:id/status', authenticate, authorizeAdmin,
  [body('status').isIn(['pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'])],
  validate,
  updateApplicationStatus
);

module.exports = router;
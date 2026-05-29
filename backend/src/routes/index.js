const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/', applicationRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Job Portal API is running!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
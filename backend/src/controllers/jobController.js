const { Op } = require('sequelize');
const { Job, User, Application } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { getPagination, getPaginationData } = require('../utils/pagination');

const getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      experience_level,
      job_type,
      status,
      is_remote,
      is_featured,
      salary_min,
      salary_max,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const { limit: limitNum, offset } = getPagination(page, limit);

    const whereClause = {};

    // For public routes, only show active jobs
    if (!req.user || req.user.role !== 'admin') {
      whereClause.status = 'active';
    } else if (status) {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { company: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (category) whereClause.category = category;
    if (experience_level) whereClause.experience_level = experience_level;
    if (job_type) whereClause.job_type = job_type;
    if (is_remote !== undefined) whereClause.is_remote = is_remote === 'true';
    if (is_featured !== undefined) whereClause.is_featured = is_featured === 'true';

    if (salary_min || salary_max) {
      if (salary_min) whereClause.salary_min = { [Op.gte]: parseFloat(salary_min) };
      if (salary_max) whereClause.salary_max = { [Op.lte]: parseFloat(salary_max) };
    }

    const allowedSortFields = ['created_at', 'updated_at', 'title', 'salary_min', 'views_count', 'applications_count'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { count, rows } = await Job.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit: limitNum,
      offset,
      order: [[sortField, sortDirection]],
      distinct: true
    });

    const pagination = getPaginationData(count, rows, page, limitNum);

    return paginatedResponse(res, rows, pagination, 'Jobs fetched successfully');
  } catch (error) {
    console.error('Get jobs error:', error);
    return errorResponse(res, 'Failed to fetch jobs', 500);
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }

    // Increment view count
    await job.increment('views_count');

    // Check if user has applied
    let hasApplied = false;
    if (req.user && req.user.role === 'user') {
      const application = await Application.findOne({
        where: { user_id: req.user.id, job_id: id }
      });
      hasApplied = !!application;
    }

    return successResponse(res, { job, hasApplied }, 'Job fetched successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to fetch job', 500);
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title, company, company_logo, description, requirements,
      responsibilities, category, job_type, experience_level,
      location, is_remote, salary_min, salary_max, salary_currency,
      skills, benefits, status, deadline, openings, is_featured
    } = req.body;

    const job = await Job.create({
      title, company, company_logo, description, requirements,
      responsibilities, category, job_type, experience_level,
      location, is_remote, salary_min, salary_max, salary_currency,
      skills: Array.isArray(skills) ? skills : skills?.split(',').map(s => s.trim()) || [],
      benefits: Array.isArray(benefits) ? benefits : benefits?.split(',').map(b => b.trim()) || [],
      status: status || 'active',
      deadline,
      openings: openings || 1,
      is_featured: is_featured || false,
      admin_id: req.user.id
    });

    return successResponse(res, { job }, 'Job created successfully', 201);
  } catch (error) {
    console.error('Create job error:', error);
    return errorResponse(res, error.message || 'Failed to create job', 500);
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);

    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }

    const updateData = { ...req.body };

    if (updateData.skills && !Array.isArray(updateData.skills)) {
      updateData.skills = updateData.skills.split(',').map(s => s.trim());
    }
    if (updateData.benefits && !Array.isArray(updateData.benefits)) {
      updateData.benefits = updateData.benefits.split(',').map(b => b.trim());
    }

    await job.update(updateData);

    const updatedJob = await Job.findByPk(id, {
      include: [{ model: User, as: 'admin', attributes: ['id', 'name', 'email'] }]
    });

    return successResponse(res, { job: updatedJob }, 'Job updated successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to update job', 500);
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);

    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }

    await job.destroy();
    return successResponse(res, null, 'Job deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete job', 500);
  }
};

const toggleJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const job = await Job.findByPk(id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }

    await job.update({ status });
    return successResponse(res, { job }, 'Job status updated');
  } catch (error) {
    return errorResponse(res, 'Failed to update job status', 500);
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const { Job: JobModel, Application: AppModel, User: UserModel } = require('../models');

    const [
      totalJobs,
      activeJobs,
      totalApplications,
      totalUsers,
      recentJobs,
      recentApplications
    ] = await Promise.all([
      JobModel.count(),
      JobModel.count({ where: { status: 'active' } }),
      AppModel.count(),
      UserModel.count({ where: { role: 'user' } }),
      JobModel.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'company', 'status', 'applications_count', 'created_at']
      }),
      AppModel.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        include: [
          { model: UserModel, as: 'applicant', attributes: ['id', 'name', 'email'] },
          { model: JobModel, as: 'job', attributes: ['id', 'title', 'company'] }
        ]
      })
    ]);

    const jobsByCategory = await JobModel.findAll({
      attributes: [
        'category',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['category'],
      raw: true
    });

    const applicationsByStatus = await AppModel.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    return successResponse(res, {
      stats: {
        totalJobs,
        activeJobs,
        totalApplications,
        totalUsers,
        closedJobs: totalJobs - activeJobs
      },
      recentJobs,
      recentApplications,
      jobsByCategory,
      applicationsByStatus
    }, 'Dashboard data fetched successfully');
  } catch (error) {
    console.error('Dashboard error:', error);
    return errorResponse(res, 'Failed to fetch dashboard data', 500);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getDashboardStats
};
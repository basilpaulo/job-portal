const { Application, Job, User } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { getPagination, getPaginationData } = require('../utils/pagination');

const applyForJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { cover_letter, resume_url, expected_salary, years_of_experience } = req.body;
    const uploadedResume = req.file;

    const job = await Job.findByPk(job_id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }

    if (job.status !== 'active') {
      return errorResponse(res, 'This job is not accepting applications', 400);
    }

    const existingApplication = await Application.findOne({
      where: { user_id: req.user.id, job_id }
    });

    if (existingApplication) {
      return errorResponse(res, 'You have already applied for this job', 409);
    }

    const finalResumeUrl = uploadedResume ? `/uploads/resumes/${uploadedResume.filename}` : resume_url;

    if (!finalResumeUrl) {
      return errorResponse(res, 'Resume link or file is required', 400);
    }

    const application = await Application.create({
      user_id: req.user.id,
      job_id,
      cover_letter,
      resume_url: finalResumeUrl,
      expected_salary,
      years_of_experience
    });

    await job.increment('applications_count');

    return successResponse(res, { application }, 'Application submitted successfully', 201);
  } catch (error) {
    console.error('Apply error:', error);
    return errorResponse(res, 'Failed to submit application', 500);
  }
};

const getUserApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const { limit: limitNum, offset } = getPagination(page, limit);

    const whereClause = { user_id: req.user.id };
    if (status) whereClause.status = status;

    const { count, rows } = await Application.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location', 'job_type', 'status', 'company_logo']
        }
      ],
      limit: limitNum,
      offset,
      order: [['created_at', 'DESC']],
      distinct: true
    });

    const pagination = getPaginationData(count, rows, page, limitNum);
    return paginatedResponse(res, rows, pagination, 'Applications fetched successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to fetch applications', 500);
  }
};

const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, job_id } = req.query;
    const { limit: limitNum, offset } = getPagination(page, limit);

    const whereClause = {};
    if (status) whereClause.status = status;
    if (job_id) whereClause.job_id = job_id;

    const { count, rows } = await Application.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'name', 'email', 'phone', 'location', 'skills']
        },
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location', 'job_type']
        }
      ],
      limit: limitNum,
      offset,
      order: [['created_at', 'DESC']],
      distinct: true
    });

    const pagination = getPaginationData(count, rows, page, limitNum);
    return paginatedResponse(res, rows, pagination, 'Applications fetched successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to fetch applications', 500);
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findByPk(id);
    if (!application) {
      return errorResponse(res, 'Application not found', 404);
    }

    await application.update({ status, notes });

    return successResponse(res, { application }, 'Application status updated');
  } catch (error) {
    return errorResponse(res, 'Failed to update application', 500);
  }
};

module.exports = {
  applyForJob,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus
};
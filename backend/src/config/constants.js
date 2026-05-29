const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

const JOB_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CLOSED: 'closed'
};

const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  FREELANCE: 'freelance',
  INTERNSHIP: 'internship',
  REMOTE: 'remote'
};

const EXPERIENCE_LEVELS = {
  ENTRY: 'entry',
  JUNIOR: 'junior',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
  EXECUTIVE: 'executive'
};

const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted'
};

const CATEGORIES = [
  'Technology',
  'Marketing',
  'Finance',
  'Healthcare',
  'Education',
  'Design',
  'Sales',
  'Engineering',
  'Operations',
  'Human Resources'
];

module.exports = {
  ROLES,
  JOB_STATUS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  APPLICATION_STATUS,
  CATEGORIES
};
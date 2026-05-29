export const CATEGORIES = [
  'Technology', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Design', 'Sales', 'Engineering',
  'Operations', 'Human Resources'
];

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' }
];

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' }
];

export const JOB_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'closed', label: 'Closed' }
];

export const APPLICATION_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'reviewing', label: 'Reviewing', color: 'blue' },
  { value: 'shortlisted', label: 'Shortlisted', color: 'purple' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'accepted', label: 'Accepted', color: 'green' }
];

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800',
  'full-time': 'bg-blue-100 text-blue-800',
  'part-time': 'bg-orange-100 text-orange-800',
  contract: 'bg-purple-100 text-purple-800',
  freelance: 'bg-pink-100 text-pink-800',
  internship: 'bg-cyan-100 text-cyan-800',
  remote: 'bg-teal-100 text-teal-800'
};

export const EXPERIENCE_COLORS = {
  entry: 'bg-gray-100 text-gray-700',
  junior: 'bg-green-100 text-green-700',
  mid: 'bg-blue-100 text-blue-700',
  senior: 'bg-purple-100 text-purple-700',
  lead: 'bg-orange-100 text-orange-700',
  executive: 'bg-red-100 text-red-700'
};

export const CATEGORY_ICONS = {
  Technology: '💻',
  Marketing: '📢',
  Finance: '💰',
  Healthcare: '🏥',
  Education: '📚',
  Design: '🎨',
  Sales: '🛒',
  Engineering: '⚙️',
  Operations: '📊',
  'Human Resources': '👥'
};
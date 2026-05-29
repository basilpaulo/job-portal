import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon, ClockIcon, CurrencyDollarIcon,
  BuildingOfficeIcon, UsersIcon, StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import Badge from '../common/Badge';
import { formatSalary, formatRelativeDate, formatExperienceLevel } from '../../utils/helpers';
import { STATUS_COLORS } from '../../utils/constants';

const JobCard = ({ job, showActions = false, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-primary-300 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-2xl font-bold text-primary-700 border border-primary-100">
            {job.company_logo ? (
              <img src={job.company_logo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
            ) : (
              job.company?.[0]?.toUpperCase() || 'C'
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {job.is_featured && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <StarSolidIcon className="h-3 w-3" />
                  Featured
                </span>
              )}
              <Badge type="jobType" value={job.job_type} />
              <Badge type="experience" value={job.experience_level} />
            </div>

            <Link
              to={`/jobs/${job.id}`}
              className="block mt-1 text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors truncate group-hover:text-primary-600"
            >
              {job.title}
            </Link>

            <div className="flex items-center gap-1 mt-1">
              <BuildingOfficeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 font-medium">{job.company}</span>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPinIcon className="h-3.5 w-3.5" />
                {job.location}
                {job.is_remote && <span className="text-green-600 font-medium ml-1">(Remote OK)</span>}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <CurrencyDollarIcon className="h-3.5 w-3.5" />
                {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <UsersIcon className="h-3.5 w-3.5" />
                {job.applications_count || 0} applicants
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <ClockIcon className="h-3.5 w-3.5" />
                {formatRelativeDate(job.created_at)}
              </span>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                    +{job.skills.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          {showActions ? (
            <>
              <span className={`badge ${STATUS_COLORS[job.status]}`}>
                {job.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(job)}
                  className="text-xs px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <Link
              to={`/jobs/${job.id}`}
              className="btn-primary text-sm whitespace-nowrap"
            >
              View Job
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';

const JobFilters = ({ filters, onChange, onClear, showStatusFilter = false }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== 'created_at' && v !== 'DESC');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
          >
            <XMarkIcon className="h-3.5 w-3.5" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Search jobs..."
            className="input-field pl-9"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
          <select name="category" value={filters.category || ''} onChange={handleChange} className="input-field">
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Experience Level</label>
          <select name="experience_level" value={filters.experience_level || ''} onChange={handleChange} className="input-field">
            <option value="">All Levels</option>
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Job Type</label>
          <select name="job_type" value={filters.job_type || ''} onChange={handleChange} className="input-field">
            <option value="">All Types</option>
            {JOB_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Status (admin only) */}
        {showStatusFilter && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select name="status" value={filters.status || ''} onChange={handleChange} className="input-field">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}

        {/* Remote */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Work Type</label>
          <select name="is_remote" value={filters.is_remote || ''} onChange={handleChange} className="input-field">
            <option value="">On-site & Remote</option>
            <option value="true">Remote Only</option>
            <option value="false">On-site Only</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Salary Range (USD)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="salary_min"
              value={filters.salary_min || ''}
              onChange={handleChange}
              placeholder="Min"
              className="input-field"
            />
            <input
              type="number"
              name="salary_max"
              value={filters.salary_max || ''}
              onChange={handleChange}
              placeholder="Max"
              className="input-field"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Sort By</label>
          <select name="sortBy" value={filters.sortBy || 'created_at'} onChange={handleChange} className="input-field">
            <option value="created_at">Newest First</option>
            <option value="salary_min">Salary</option>
            <option value="views_count">Most Viewed</option>
            <option value="applications_count">Most Applied</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
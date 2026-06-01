import React from 'react';
import { CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, JOB_STATUS } from '../../utils/constants';

const AdminJobForm = ({
  form,
  errors,
  onChange,
  onFileChange,
  onSubmit,
  isSubmitting,
  submitLabel,
  title,
  description,
  onCancel
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} type="button" className="text-sm text-primary-600 hover:text-primary-700">
            Cancel
          </button>
        )}
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            disabled={isSubmitting}
            className={`input-field ${errors?.title ? 'input-error' : ''}`}
            placeholder="Senior Product Designer"
          />
          {errors?.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            disabled={isSubmitting}
            className={`input-field ${errors?.company ? 'input-error' : ''}`}
            placeholder="Acme Studio"
          />
          {errors?.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            disabled={isSubmitting}
            className="input-field"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Job type</label>
            <select
              name="job_type"
              value={form.job_type}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field"
            >
              {JOB_TYPES.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
            <select
              name="experience_level"
              value={form.experience_level}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            disabled={isSubmitting}
            className={`input-field ${errors?.location ? 'input-error' : ''}`}
            placeholder="New York, NY"
          />
          {errors?.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={onChange}
            disabled={isSubmitting}
            className={`input-field ${errors?.description ? 'input-error' : ''}`}
            placeholder="Describe the role"
          />
          {errors?.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Requirements</label>
          <textarea
            name="requirements"
            rows="4"
            value={form.requirements}
            onChange={onChange}
            disabled={isSubmitting}
            className={`input-field ${errors?.requirements ? 'input-error' : ''}`}
            placeholder="List job requirements (skills, experience, education, etc.)"
          />
          {errors?.requirements && <p className="text-xs text-red-600 mt-1">{errors.requirements}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min salary</label>
            <input
              type="number"
              name="salary_min"
              value={form.salary_min}
              onChange={onChange}
              disabled={isSubmitting}
              className={`input-field ${errors?.salary_min ? 'input-error' : ''}`}
            />
            {errors?.salary_min && <p className="text-xs text-red-600 mt-1">{errors.salary_min}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Max salary</label>
            <input
              type="number"
              name="salary_max"
              value={form.salary_max}
              onChange={onChange}
              disabled={isSubmitting}
              className={`input-field ${errors?.salary_max ? 'input-error' : ''}`}
            />
            {errors?.salary_max && <p className="text-xs text-red-600 mt-1">{errors.salary_max}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
          <input
            name="skills"
            value={form.skills}
            onChange={onChange}
            disabled={isSubmitting}
            className="input-field"
            placeholder="React, Node.js, SQL"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Benefits</label>
          <input
            name="benefits"
            value={form.benefits}
            onChange={onChange}
            disabled={isSubmitting}
            className="input-field"
            placeholder="Remote work, health insurance"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Openings</label>
            <input
              type="number"
              name="openings"
              value={form.openings}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field"
            >
              {JOB_STATUS.map((statusOption) => (
                <option key={statusOption.value} value={statusOption.value}>{statusOption.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={onChange}
            disabled={isSubmitting}
            className="input-field"
          />
          <p className="text-xs text-gray-500 mt-1">Optional - when applications close</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div>
            <p className="font-medium text-gray-900">Featured job</p>
            <p className="text-xs text-gray-500">Highlight on homepage</p>
          </div>
          <input
            type="checkbox"
            name="is_featured"
            checked={Boolean(form.is_featured)}
            onChange={onChange}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300 text-primary-600"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div>
            <p className="font-medium text-gray-900">Remote friendly</p>
            <p className="text-xs text-gray-500">Allow remote applicants</p>
          </div>
          <input
            type="checkbox"
            name="is_remote"
            checked={Boolean(form.is_remote)}
            onChange={onChange}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300 text-primary-600"
          />
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {submitLabel}
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminJobForm;

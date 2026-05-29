import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob, deleteJob, fetchAdminJobs, selectAdminJobs, selectAdminLoading, selectAdminPagination, selectEditingJob, selectAdminFilters, setAdminFilters, clearAdminFilters, setEditingJob, clearEditingJob } from '../store/slices/adminSlice';
import { updateJob } from '../store/slices/adminSlice';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import { CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, JOB_STATUS } from '../utils/constants';

const initialForm = {
  title: '',
  company: '',
  description: '',
  requirements: '',
  responsibilities: '',
  category: 'Technology',
  job_type: 'full-time',
  experience_level: 'mid',
  location: '',
  is_remote: false,
  salary_min: '',
  salary_max: '',
  salary_currency: 'USD',
  skills: '',
  benefits: '',
  status: 'active',
  deadline: '',
  openings: '1',
  is_featured: false
};

const AdminJobsPage = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectAdminJobs);
  const isLoading = useSelector(selectAdminLoading);
  const pagination = useSelector(selectAdminPagination);
  const editingJob = useSelector(selectEditingJob);
  const filters = useSelector(selectAdminFilters);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (editingJob) {
      setForm({
        ...initialForm,
        ...editingJob,
        skills: (editingJob.skills || []).join(', '),
        benefits: (editingJob.benefits || []).join(', '),
        salary_min: editingJob.salary_min || '',
        salary_max: editingJob.salary_max || '',
        openings: editingJob.openings || 1,
        is_featured: Boolean(editingJob.is_featured),
        is_remote: Boolean(editingJob.is_remote),
        deadline: editingJob.deadline ? editingJob.deadline.slice(0, 10) : ''
      });
    } else {
      setForm(initialForm);
    }
  }, [editingJob]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.company.trim()) newErrors.company = 'Company is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.salary_min) newErrors.salary_min = 'Minimum salary is required';
    if (!form.salary_max) newErrors.salary_max = 'Maximum salary is required';
    if (Number(form.salary_min) > Number(form.salary_max)) newErrors.salary_max = 'Max salary must be greater than min salary';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      salary_min: Number(form.salary_min),
      salary_max: Number(form.salary_max),
      openings: Number(form.openings),
      is_remote: form.is_remote === true || form.is_remote === 'true',
      is_featured: form.is_featured === true || form.is_featured === 'true',
      skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
      benefits: form.benefits.split(',').map((item) => item.trim()).filter(Boolean)
    };

    if (editingJob) {
      await dispatch(updateJob({ id: editingJob.id, data: payload }));
      dispatch(clearEditingJob());
    } else {
      await dispatch(createJob(payload));
    }

    setForm(initialForm);
    dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
  };

  const handleFilterChange = (updatedFilters) => {
    dispatch(setAdminFilters({ ...updatedFilters, page: 1 }));
  };

  const handleClearFilters = () => {
    dispatch(clearAdminFilters());
  };

  const handleEdit = (job) => {
    dispatch(setEditingJob(job));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await dispatch(deleteJob(id));
    dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary-600">Job management</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Manage listings</h1>
          <p className="mt-2 text-gray-600">Create, edit, and manage all job postings from a centralized dashboard.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px,1fr] gap-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{editingJob ? 'Edit Job' : 'Create Job'}</h2>
              <p className="text-sm text-gray-500">{editingJob ? 'Update existing listing details' : 'Add a new vacancy to the portal'}</p>
            </div>
            {editingJob && (
              <button onClick={() => dispatch(clearEditingJob())} className="text-xs text-primary-600 font-medium">Cancel</button>
            )}
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleFormChange} className={`input-field ${errors.title ? 'input-error' : ''}`} placeholder="Senior Product Designer" />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
              <input name="company" value={form.company} onChange={handleFormChange} className={`input-field ${errors.company ? 'input-error' : ''}`} placeholder="Acme Studio" />
              {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleFormChange} className="input-field">
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Job type</label>
                <select name="job_type" value={form.job_type} onChange={handleFormChange} className="input-field">
                  {JOB_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
                <select name="experience_level" value={form.experience_level} onChange={handleFormChange} className="input-field">
                  {EXPERIENCE_LEVELS.map((level) => <option key={level.value} value={level.value}>{level.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location} onChange={handleFormChange} className={`input-field ${errors.location ? 'input-error' : ''}`} placeholder="New York, NY" />
              {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" rows="4" value={form.description} onChange={handleFormChange} className={`input-field ${errors.description ? 'input-error' : ''}`} placeholder="Describe the role" />
              {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Min salary</label>
                <input type="number" name="salary_min" value={form.salary_min} onChange={handleFormChange} className={`input-field ${errors.salary_min ? 'input-error' : ''}`} />
                {errors.salary_min && <p className="text-xs text-red-600 mt-1">{errors.salary_min}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Max salary</label>
                <input type="number" name="salary_max" value={form.salary_max} onChange={handleFormChange} className={`input-field ${errors.salary_max ? 'input-error' : ''}`} />
                {errors.salary_max && <p className="text-xs text-red-600 mt-1">{errors.salary_max}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
              <input name="skills" value={form.skills} onChange={handleFormChange} className="input-field" placeholder="React, Node.js, SQL" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Benefits</label>
              <input name="benefits" value={form.benefits} onChange={handleFormChange} className="input-field" placeholder="Remote work, health insurance" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Openings</label>
                <input type="number" name="openings" value={form.openings} onChange={handleFormChange} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleFormChange} className="input-field">
                  {JOB_STATUS.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <p className="font-medium text-gray-900">Featured job</p>
                <p className="text-xs text-gray-500">Highlight on homepage</p>
              </div>
              <input type="checkbox" name="is_featured" checked={Boolean(form.is_featured)} onChange={handleFormChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <p className="font-medium text-gray-900">Remote friendly</p>
                <p className="text-xs text-gray-500">Allow remote applicants</p>
              </div>
              <input type="checkbox" name="is_remote" checked={Boolean(form.is_remote)} onChange={handleFormChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
            </div>

            <button type="submit" className="btn-primary w-full">{editingJob ? 'Update Job' : 'Create Job'}</button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <JobFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} showStatusFilter />
          </div>

          {isLoading ? (
            <LoadingSpinner text="Loading admin jobs" />
          ) : jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showActions
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">No jobs found. Create your first listing using the form.</div>
          )}

          <Pagination pagination={pagination} onPageChange={(page) => dispatch(setAdminFilters({ page }))} />
        </section>
      </div>
    </div>
  );
};

export default AdminJobsPage;

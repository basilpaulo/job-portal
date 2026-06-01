import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminJobForm from '../components/admin/AdminJobForm';
import { createJob, selectAdminSubmitting, selectFormErrors, clearFormErrors, selectAdminFilters, fetchAdminJobs } from '../store/slices/adminSlice';

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

const AdminCreateJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSubmitting = useSelector(selectAdminSubmitting);
  const formErrors = useSelector(selectFormErrors);
  const filters = useSelector(selectAdminFilters);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearFormErrors());
  }, [dispatch]);

  useEffect(() => {
    if (formErrors) {
      setErrors((prev) => ({ ...prev, ...formErrors }));
    }
  }, [formErrors]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required';
    if (!form.company.trim()) nextErrors.company = 'Company is required';
    if (!form.description.trim()) nextErrors.description = 'Description is required';
    if (!form.requirements.trim()) nextErrors.requirements = 'Requirements are required';
    if (!form.location.trim()) nextErrors.location = 'Location is required';
    if (!form.salary_min) nextErrors.salary_min = 'Minimum salary is required';
    if (!form.salary_max) nextErrors.salary_max = 'Maximum salary is required';
    if (Number(form.salary_min) > Number(form.salary_max)) nextErrors.salary_max = 'Max salary must be greater than min salary';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      salary_min: Number(form.salary_min),
      salary_max: Number(form.salary_max),
      openings: Number(form.openings),
      is_remote: Boolean(form.is_remote),
      is_featured: Boolean(form.is_featured),
      deadline: form.deadline || null,
      skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
      benefits: form.benefits.split(',').map((item) => item.trim()).filter(Boolean)
    };

    const result = await dispatch(createJob(payload));
    if (createJob.fulfilled.match(result)) {
      dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
      navigate('/admin/jobs');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AdminJobForm
        title="Create Job"
        description="Add a new job posting for your team and publish it to the admin job list."
        form={form}
        errors={errors}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create Job"
        onCancel={() => navigate('/admin/jobs')}
      />
    </div>
  );
};

export default AdminCreateJobPage;

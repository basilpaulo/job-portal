import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdminJobForm from '../components/admin/AdminJobForm';
import { fetchJobById, clearSelectedJob, selectSelectedJob, selectJobLoading } from '../store/slices/jobsSlice';
import { updateJob, selectAdminSubmitting, selectFormErrors, clearFormErrors, selectAdminFilters, fetchAdminJobs } from '../store/slices/adminSlice';

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

const AdminEditJobPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedJob = useSelector(selectSelectedJob);
  const isJobLoading = useSelector(selectJobLoading);
  const isSubmitting = useSelector(selectAdminSubmitting);
  const formErrors = useSelector(selectFormErrors);
  const filters = useSelector(selectAdminFilters);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearFormErrors());
    dispatch(fetchJobById(id));

    return () => {
      dispatch(clearSelectedJob());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedJob) {
      setForm({
        title: selectedJob.title || '',
        company: selectedJob.company || '',
        description: selectedJob.description || '',
        requirements: selectedJob.requirements || '',
        responsibilities: selectedJob.responsibilities || '',
        category: selectedJob.category || 'Technology',
        job_type: selectedJob.job_type || 'full-time',
        experience_level: selectedJob.experience_level || 'mid',
        location: selectedJob.location || '',
        is_remote: Boolean(selectedJob.is_remote),
        salary_min: selectedJob.salary_min || '',
        salary_max: selectedJob.salary_max || '',
        salary_currency: selectedJob.salary_currency || 'USD',
        skills: (selectedJob.skills || []).join(', '),
        benefits: (selectedJob.benefits || []).join(', '),
        status: selectedJob.status || 'active',
        deadline: selectedJob.deadline ? selectedJob.deadline.slice(0, 10) : '',
        openings: selectedJob.openings || 1,
        is_featured: Boolean(selectedJob.is_featured)
      });
    }
  }, [selectedJob]);

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

    const result = await dispatch(updateJob({ id, data: payload }));
    if (updateJob.fulfilled.match(result)) {
      dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
      navigate('/admin/jobs');
    }
  };

  if (isJobLoading || !selectedJob) {
    return <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AdminJobForm
        title="Edit Job"
        description="Update the selected job posting and save your changes."
        form={form}
        errors={errors}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Save Changes"
        onCancel={() => navigate('/admin/jobs')}
      />
    </div>
  );
};

export default AdminEditJobPage;

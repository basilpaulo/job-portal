import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { MapPinIcon, BuildingOfficeIcon, CurrencyDollarIcon, ClockIcon, UsersIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { fetchJobById, clearSelectedJob, selectSelectedJob, selectJobLoading, selectHasApplied } from '../store/slices/jobsSlice';
import { applyForJob } from '../store/slices/applicationsSlice';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import { formatSalary, formatDate, formatExperienceLevel, truncateText } from '../utils/helpers';

const initialFormState = {
  cover_letter: '',
  resume_url: '',
  expected_salary: '',
  years_of_experience: '',
  resumeFile: null
};

const JobDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedJob = useSelector(selectSelectedJob);
  const isJobLoading = useSelector(selectJobLoading);
  const hasApplied = useSelector(selectHasApplied);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(clearSelectedJob());
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({
      ...prev,
      resumeFile: file,
      resume_url: file ? '' : prev.resume_url
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const result = await dispatch(applyForJob({
      jobId: id,
      data: {
        ...form,
        expected_salary: form.expected_salary ? Number(form.expected_salary) : undefined,
        years_of_experience: form.years_of_experience ? Number(form.years_of_experience) : undefined,
        resumeFile: form.resumeFile || undefined
      }
    }));

    if (applyForJob.fulfilled.match(result)) {
      setSubmitted(true);
    }
  };

  if (isJobLoading || !selectedJob) {
    return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><LoadingSpinner text="Loading job details" /></div>;
  }

  const alreadyApplied = submitted || hasApplied;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
        <section className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold">
                  {selectedJob.company?.[0]?.toUpperCase() || 'C'}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge type="jobType" value={selectedJob.job_type} />
                    <Badge type="experience" value={selectedJob.experience_level} />
                    {selectedJob.is_featured && <span className="badge bg-amber-100 text-amber-700">Featured</span>}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>
                  <p className="mt-1 text-base text-gray-600 font-medium">{selectedJob.company}</p>
                </div>
              </div>
              <span className={`badge ${selectedJob.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedJob.status}</span>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="rounded-xl bg-gray-50 p-3 flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-gray-500" /> {selectedJob.location}{selectedJob.is_remote ? ' • Remote friendly' : ''}</div>
              <div className="rounded-xl bg-gray-50 p-3 flex items-center gap-2"><CurrencyDollarIcon className="h-4 w-4 text-gray-500" /> {formatSalary(selectedJob.salary_min, selectedJob.salary_max, selectedJob.salary_currency)}</div>
              <div className="rounded-xl bg-gray-50 p-3 flex items-center gap-2"><BuildingOfficeIcon className="h-4 w-4 text-gray-500" /> {selectedJob.category}</div>
              <div className="rounded-xl bg-gray-50 p-3 flex items-center gap-2"><UsersIcon className="h-4 w-4 text-gray-500" /> {selectedJob.applications_count || 0} applicants</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Job Overview</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{selectedJob.description}</p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900">Requirements</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {(selectedJob.requirements || '').split('\n').filter(Boolean).map((item) => <li key={item} className="flex gap-2"><span className="text-primary-600">•</span><span>{item}</span></li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Responsibilities</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {(selectedJob.responsibilities || '').split('\n').filter(Boolean).map((item) => <li key={item} className="flex gap-2"><span className="text-primary-600">•</span><span>{item}</span></li>)}
                </ul>
              </div>
            </div>

            {selectedJob.skills?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900">Key skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="bg-white rounded-2xl border border-gray-200 p-6 h-fit space-y-6">
          <div>
            <p className="text-sm font-medium text-primary-600">Quick facts</p>
            <div className="mt-3 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Experience</span>
                <span className="font-medium text-gray-900">{formatExperienceLevel(selectedJob.experience_level)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Posted</span>
                <span className="font-medium text-gray-900">{formatDate(selectedJob.created_at)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Deadline</span>
                <span className="font-medium text-gray-900">{selectedJob.deadline ? formatDate(selectedJob.deadline) : 'Open until filled'}</span>
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Apply for this role</p>
                  <p className="text-xs text-gray-500 mt-1">Logged in as {user?.name}</p>
                </div>
                {alreadyApplied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : null}
              </div>

              {alreadyApplied ? (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                  You have already applied for this job. Keep an eye on your application status.
                </div>
              ) : (
                <form className="mt-4 space-y-3" onSubmit={handleApply}>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Cover letter</label>
                    <textarea name="cover_letter" rows="4" value={form.cover_letter} onChange={handleChange} className="input-field" placeholder="Tell us why you're a great fit" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Experience</label>
                      <input type="number" name="years_of_experience" min="0" value={form.years_of_experience} onChange={handleChange} className="input-field" placeholder="Years" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Expected salary</label>
                      <input type="number" name="expected_salary" min="0" value={form.expected_salary} onChange={handleChange} className="input-field" placeholder="USD" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Resume link</label>
                    <input type="url" name="resume_url" value={form.resume_url} onChange={handleChange} className="input-field" placeholder="https://example.com/resume.pdf" required={!form.resumeFile} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Upload resume file</label>
                    <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-primary-600 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white" />
                    {form.resumeFile && <p className="mt-1 text-xs text-gray-500">Selected file: {form.resumeFile.name}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full">Submit Application</button>
                </form>
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Sign in to apply</p>
              <p className="mt-2">Create an account or log in to submit your application and track progress.</p>
              <div className="mt-4 flex gap-2">
                <Link to="/login" className="btn-primary text-sm">Log in</Link>
                <Link to="/register" className="btn-secondary text-sm">Register</Link>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-primary-50 border border-primary-100 p-4 text-sm text-primary-700">
            <p className="font-semibold">Hiring tip</p>
            <p className="mt-1">Applications close on {selectedJob.deadline ? formatDate(selectedJob.deadline) : 'rolling basis'}.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetailPage;

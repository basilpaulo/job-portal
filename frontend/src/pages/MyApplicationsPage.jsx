import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../store/slices/applicationsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const resolveResumeUrl = (resumeUrl) => {
  if (!resumeUrl) return '';
  if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
    return resumeUrl;
  }
  if (resumeUrl.startsWith('/')) {
    return `${BACKEND_BASE_URL}${resumeUrl}`;
  }
  return `${BACKEND_BASE_URL}/${resumeUrl}`;
};

const MyApplicationsPage = () => {
  const dispatch = useDispatch();
  const myApplications = useSelector((state) => state.applications.myApplications);
  const pagination = useSelector((state) => state.applications.pagination);
  const isLoading = useSelector((state) => state.applications.isLoading);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMyApplications({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary-600">Applications</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">My applications</h1>
        <p className="mt-2 text-gray-600">Track every application you submitted and follow its latest status.</p>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Loading your applications" />
      ) : myApplications.length > 0 ? (
        <div className="space-y-3">
          {myApplications.map((application) => (
            <article key={application.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{application.job?.title || 'Job'}</p>
                  <p className="text-sm text-gray-500">{application.job?.company} • {application.job?.location}</p>
                </div>
                <span className={`badge ${application.status === 'accepted' ? 'bg-green-100 text-green-700' : application.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{application.status}</span>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm text-gray-600">
                <div className="rounded-lg bg-gray-50 p-3">Applied on {new Date(application.created_at).toLocaleDateString()}</div>
                <div className="rounded-lg bg-gray-50 p-3">Experience: {application.years_of_experience || 0} years</div>
                <div className="rounded-lg bg-gray-50 p-3">Expected salary: ${application.expected_salary || 0}</div>
              </div>

              {application.resume_url && (
                <div className="mt-3 rounded-lg bg-primary-50 border border-primary-100 p-3 text-sm text-primary-700">
                  <span className="font-semibold">Resume:</span>{' '}
                  <a href={resolveResumeUrl(application.resume_url)} target="_blank" rel="noreferrer" className="underline hover:text-primary-800">View uploaded resume</a>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📝"
          title="You haven't applied yet"
          description="Browse roles and submit your first application to start tracking opportunities."
        />
      )}

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default MyApplicationsPage;

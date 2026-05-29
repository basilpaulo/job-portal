import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BriefcaseIcon, UsersIcon, ClipboardDocumentListIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { fetchDashboardStats, selectDashboard } from '../store/slices/adminSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const statCards = [
  { key: 'totalJobs', label: 'Total Jobs', icon: BriefcaseIcon, color: 'bg-primary-100 text-primary-600' },
  { key: 'activeJobs', label: 'Active Jobs', icon: CheckCircleIcon, color: 'bg-green-100 text-green-600' },
  { key: 'totalApplications', label: 'Applications', icon: ClipboardDocumentListIcon, color: 'bg-blue-100 text-blue-600' },
  { key: 'totalUsers', label: 'Applicants', icon: UsersIcon, color: 'bg-purple-100 text-purple-600' }
];

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (!dashboard) {
    return <LoadingSpinner text="Loading admin dashboard" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary-600">Admin Overview</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor job health, application activity, and recent employer updates in one place.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{dashboard.stats?.[card.key] || 0}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
              <p className="text-sm text-gray-500">Latest active postings and status updates</p>
            </div>
          </div>
          <div className="space-y-3">
            {(dashboard.recentJobs || []).map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium text-gray-900">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.company} • {job.applications_count} applicants</p>
                </div>
                <span className={`badge ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{job.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <p className="text-sm text-gray-500">New candidate activity across openings</p>
            </div>
          </div>
          <div className="space-y-3">
            {(dashboard.recentApplications || []).map((application) => (
              <div key={application.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium text-gray-900">{application.applicant?.name || 'Candidate'}</p>
                  <p className="text-xs text-gray-500">Applied for {application.job?.title || 'role'}</p>
                </div>
                <span className={`badge ${application.status === 'accepted' ? 'bg-green-100 text-green-700' : application.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{application.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllApplications } from '../store/slices/applicationsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const AdminApplicationsPage = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.allApplications);
  const isLoading = useSelector((state) => state.applications.isLoading);

  useEffect(() => {
    dispatch(fetchAllApplications({ page: 1, limit: 20 }));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary-600">Applications</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">All applications</h1>
        <p className="mt-2 text-gray-600">Review candidate submissions and manage their progress.</p>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Loading applications" />
      ) : applications.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Candidate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Job</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{application.applicant?.name || 'Unknown'} </p>
                      <p className="text-xs text-gray-500">{application.applicant?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{application.job?.title || 'Role'}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${application.status === 'accepted' ? 'bg-green-100 text-green-700' : application.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{application.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(application.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState icon="📋" title="No applications yet" description="New submissions will appear here once candidates start applying." />
      )}
    </div>
  );
};

export default AdminApplicationsPage;

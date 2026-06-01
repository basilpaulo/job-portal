import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteJob, fetchAdminJobs, selectAdminJobs, selectAdminLoading, selectAdminPagination, selectAdminFilters, setAdminFilters, clearAdminFilters } from '../store/slices/adminSlice';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import ConfirmModal from '../components/common/ConfirmModal';

const AdminJobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector(selectAdminJobs);
  const isLoading = useSelector(selectAdminLoading);
  const pagination = useSelector(selectAdminPagination);
  const filters = useSelector(selectAdminFilters);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, jobId: null, jobTitle: '' });

  useEffect(() => {
    dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
  }, [dispatch, filters]);

  const handleFilterChange = (updatedFilters) => {
    dispatch(setAdminFilters({ ...updatedFilters, page: 1 }));
  };

  const handleClearFilters = () => {
    dispatch(clearAdminFilters());
  };

  const handleEdit = (job) => {
    navigate(`/admin/jobs/${job.id}/edit`);
  };

  const handleDelete = (id, title) => {
    setDeleteConfirm({ isOpen: true, jobId: id, jobTitle: title });
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteJob(deleteConfirm.jobId));
    dispatch(fetchAdminJobs({ ...filters, page: filters.page, limit: filters.limit }));
    setDeleteConfirm({ isOpen: false, jobId: null, jobTitle: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary-600">Job management</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Manage listings</h1>
          <p className="mt-2 text-gray-600">Filter, review, and maintain your job postings in one place.</p>
        </div>
        <button onClick={() => navigate('/admin/jobs/new')} className="btn-primary w-full sm:w-auto">
          Create Job
        </button>
      </div>

      <div className="grid lg:grid-cols-[300px,1fr] gap-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <JobFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} showStatusFilter />
        </section>

        <section className="space-y-4">
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
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">No jobs found. Create your first listing using the button above.</div>
          )}

          <Pagination pagination={pagination} onPageChange={(page) => dispatch(setAdminFilters({ page }))} />
        </section>
      </div>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, jobId: null, jobTitle: '' })}
        onConfirm={handleConfirmDelete}
        title="Delete Job"
        message={`Are you sure you want to delete the job "${deleteConfirm.jobTitle}"? This action cannot be undone.`}
        confirmText="Delete Job"
        isLoading={isLoading}
        variant="danger"
      />
    </div>
  );
};

export default AdminJobsPage;

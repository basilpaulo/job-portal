import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchJobs, setFilters, setPage, selectJobs, selectJobsLoading, selectJobsFilters, selectJobsPagination } from '../store/slices/jobsSlice';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const JobsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const jobs = useSelector(selectJobs);
  const isLoading = useSelector(selectJobsLoading);
  const filters = useSelector(selectJobsFilters);
  const pagination = useSelector(selectJobsPagination);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    if (category && category !== filters.category) {
      dispatch(setFilters({ category, page: 1 }));
    }
  }, [dispatch, searchParams, filters.category]);

  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page: pagination.currentPage, limit: 9 }));
  }, [dispatch, filters, pagination.currentPage]);

  const handleFilterChange = (updatedFilters) => {
    dispatch(setFilters(updatedFilters));
    dispatch(setPage(1));
  };

  const handleClearFilters = () => {
    dispatch(setFilters({
      search: '',
      category: '',
      experience_level: '',
      job_type: '',
      is_remote: '',
      salary_min: '',
      salary_max: '',
      sortBy: 'created_at',
      sortOrder: 'DESC'
    }));
    dispatch(setPage(1));
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary-600">Job marketplace</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">Explore current opportunities</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">Use advanced filtering to narrow by category, experience, work type, and salary to find the right role faster.</p>
      </div>

      <div className="grid lg:grid-cols-[300px,1fr] gap-6">
        <aside className="lg:sticky lg:top-24 self-start">
          <JobFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
        </aside>

        <section className="space-y-4">
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-4">
            <div>
              <p className="font-semibold text-gray-900">{pagination.totalItems || 0} jobs found</p>
              <p className="text-sm text-gray-500">Page {pagination.currentPage} of {pagination.totalPages || 1}</p>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner text="Searching jobs" />
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔎"
              title="No jobs match your filters"
              description="Try adjusting your search terms or clearing a few filters to broaden the results."
            />
          )}

          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </section>
      </div>
    </div>
  );
};

export default JobsPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, ArrowRightIcon, SparklesIcon, BuildingOfficeIcon, UsersIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { fetchFeaturedJobs, fetchJobs, selectFeaturedJobs, selectJobs, selectJobsLoading, selectJobsPagination } from '../store/slices/jobsSlice';
import JobCard from '../components/jobs/JobCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CATEGORIES, CATEGORY_ICONS } from '../utils/constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const featuredJobs = useSelector(selectFeaturedJobs);
  const jobs = useSelector(selectJobs);
  const isLoading = useSelector(selectJobsLoading);
  const pagination = useSelector(selectJobsPagination);

  useEffect(() => {
    dispatch(fetchFeaturedJobs());
    dispatch(fetchJobs({ limit: 12 }));
  }, [dispatch]);

  const categoryGroups = CATEGORIES.map((category) => ({
    category,
    jobs: jobs.filter((job) => job.category === category).slice(0, 3)
  })).filter((group) => group.jobs.length > 0);

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-primary-100 border border-white/10">
                <SparklesIcon className="h-4 w-4" />
                Trusted by 1,200+ companies
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Find your next great opportunity.</h1>
              <p className="mt-5 text-lg text-blue-100 max-w-xl">
                Browse curated openings, connect with top employers, and apply in minutes through a modern job portal built for fast hiring.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
                <Link to="/login" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg transition-colors">Post a Resume</Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { label: 'Live Jobs', value: pagination.totalItems || 0 },
                  { label: 'Companies', value: '350+' },
                  { label: 'Applications', value: '12k+' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl border border-white/10 p-3 backdrop-blur-sm">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-blue-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-2xl p-5 text-gray-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Top Hiring Trends</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$120k avg. salary</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="font-semibold text-gray-900">Remote</p>
                    <p className="mt-1">38% of openings</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="font-semibold text-gray-900">Hybrid</p>
                    <p className="mt-1">26% of openings</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                      <UsersIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Community</p>
                      <p className="text-sm text-blue-100">Job seekers network</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                      <CheckBadgeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Verified</p>
                      <p className="text-sm text-blue-100">Employer listings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-primary-600">Featured openings</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">Highlighted roles handpicked for you</h2>
          </div>
          <Link to="/jobs" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
            View all jobs
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Loading featured jobs" />
        ) : featuredJobs.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center text-gray-500">No featured jobs available right now.</div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-primary-600">Browse by category</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">Popular job groups</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryGroups.map((group) => (
            <div key={group.category} className="card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">
                    {CATEGORY_ICONS[group.category] || '💼'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.category}</h3>
                    <p className="text-xs text-gray-500">{group.jobs.length} openings</p>
                  </div>
                </div>
                <Link to={`/jobs?category=${encodeURIComponent(group.category)}`} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Explore
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {group.jobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="block rounded-lg border border-gray-100 p-3 hover:border-primary-200 hover:bg-primary-50/40 transition-colors">
                    <p className="font-medium text-gray-900 text-sm">{job.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{job.company} • {job.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

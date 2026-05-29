import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobsAPI } from '../../services/api';
import toast from 'react-hot-toast';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getById(id);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Job not found';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchFeaturedJobs = createAsyncThunk(
  'jobs/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getAll({ is_featured: true, limit: 6 });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch featured jobs');
    }
  }
);

const initialState = {
  jobs: [],
  featuredJobs: [],
  selectedJob: null,
  hasApplied: false,
  pagination: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10
  },
  filters: {
    search: '',
    category: '',
    experience_level: '',
    job_type: '',
    is_remote: '',
    salary_min: '',
    salary_max: '',
    sortBy: 'created_at',
    sortOrder: 'DESC'
  },
  isLoading: false,
  isFeaturedLoading: false,
  isJobLoading: false,
  error: null
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
      state.hasApplied = false;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchJobById.pending, (state) => {
        state.isJobLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isJobLoading = false;
        state.selectedJob = action.payload.job;
        state.hasApplied = action.payload.hasApplied;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isJobLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.isFeaturedLoading = true;
      })
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.isFeaturedLoading = false;
        state.featuredJobs = action.payload;
      })
      .addCase(fetchFeaturedJobs.rejected, (state) => {
        state.isFeaturedLoading = false;
      });
  }
});

export const { setFilters, clearFilters, clearSelectedJob, setPage } = jobsSlice.actions;
export default jobsSlice.reducer;

export const selectJobs = (state) => state.jobs.jobs;
export const selectFeaturedJobs = (state) => state.jobs.featuredJobs;
export const selectSelectedJob = (state) => state.jobs.selectedJob;
export const selectHasApplied = (state) => state.jobs.hasApplied;
export const selectJobsPagination = (state) => state.jobs.pagination;
export const selectJobsFilters = (state) => state.jobs.filters;
export const selectJobsLoading = (state) => state.jobs.isLoading;
export const selectJobLoading = (state) => state.jobs.isJobLoading;
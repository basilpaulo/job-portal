import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobsAPI } from '../../services/api';
import toast from 'react-hot-toast';

export const fetchAdminJobs = createAsyncThunk(
  'admin/fetchJobs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.adminGetAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

export const createJob = createAsyncThunk(
  'admin/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.create(jobData);
      toast.success('Job created successfully!');
      return response.data.data.job;
    } catch (error) {
      const errors = error.response?.data?.errors;
      const message = error.response?.data?.message || 'Failed to create job';
      toast.error(message);
      return rejectWithValue({ message, errors });
    }
  }
);

export const updateJob = createAsyncThunk(
  'admin/updateJob',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.update(id, data);
      toast.success('Job updated successfully!');
      return response.data.data.job;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update job';
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'admin/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      await jobsAPI.delete(id);
      toast.success('Job deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete job');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateJobStatus = createAsyncThunk(
  'admin/updateJobStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.updateStatus(id, status);
      toast.success('Job status updated!');
      return response.data.data.job;
    } catch (error) {
      toast.error('Failed to update status');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getDashboard();
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard data');
    }
  }
);

const initialState = {
  jobs: [],
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
    status: '',
    page: 1,
    limit: 10
  },
  dashboard: null,
  editingJob: null,
  isLoading: false,
  isDashboardLoading: false,
  isSubmitting: false,
  error: null,
  formErrors: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearAdminFilters: (state) => {
      state.filters = initialState.filters;
    },
    setEditingJob: (state, action) => {
      state.editingJob = action.payload;
    },
    clearEditingJob: (state) => {
      state.editingJob = null;
    },
    clearFormErrors: (state) => {
      state.formErrors = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdminJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createJob.pending, (state) => {
        state.isSubmitting = true;
        state.formErrors = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.jobs.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isSubmitting = false;
        state.formErrors = action.payload?.errors;
      });

    builder
      .addCase(updateJob.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isSubmitting = false;
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        state.editingJob = null;
      })
      .addCase(updateJob.rejected, (state) => {
        state.isSubmitting = false;
      });

    builder
      .addCase(deleteJob.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.jobs = state.jobs.filter(j => j.id !== action.payload);
        state.pagination.totalItems -= 1;
      })
      .addCase(deleteJob.rejected, (state) => {
        state.isSubmitting = false;
      });

    builder
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      });

    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isDashboardLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isDashboardLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.isDashboardLoading = false;
      });
  }
});

export const {
  setAdminFilters, clearAdminFilters,
  setEditingJob, clearEditingJob, clearFormErrors
} = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminJobs = (state) => state.admin.jobs;
export const selectAdminPagination = (state) => state.admin.pagination;
export const selectAdminFilters = (state) => state.admin.filters;
export const selectDashboard = (state) => state.admin.dashboard;
export const selectEditingJob = (state) => state.admin.editingJob;
export const selectAdminLoading = (state) => state.admin.isLoading;
export const selectAdminSubmitting = (state) => state.admin.isSubmitting;
export const selectFormErrors = (state) => state.admin.formErrors;
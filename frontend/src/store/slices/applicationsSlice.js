import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applicationsAPI } from '../../services/api';
import toast from 'react-hot-toast';

export const applyForJob = createAsyncThunk(
  'applications/apply',
  async ({ jobId, data }, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.apply(jobId, data);
      toast.success('Application submitted successfully!');
      return response.data.data.application;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit application';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMine',
  async (params, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.getMine(params);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch applications');
    }
  }
);

export const fetchAllApplications = createAsyncThunk(
  'applications/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch applications');
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status, notes }, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.updateStatus(id, { status, notes });
      toast.success('Application status updated!');
      return response.data.data.application;
    } catch (error) {
      toast.error('Failed to update status');
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  myApplications: [],
  allApplications: [],
  pagination: { totalItems: 0, totalPages: 0, currentPage: 1 },
  isLoading: false,
  isApplying: false,
  error: null
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearApplicationError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.isApplying = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.isApplying = false;
        state.myApplications.unshift(action.payload);
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.isApplying = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myApplications = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMyApplications.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchAllApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allApplications = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllApplications.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.allApplications.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.allApplications[index] = action.payload;
        }
      });
  }
});

export const { clearApplicationError } = applicationsSlice.actions;
export default applicationsSlice.reducer;

export const selectMyApplications = (state) => state.applications.myApplications;
export const selectAllApplications = (state) => state.applications.allApplications;
export const selectApplicationsLoading = (state) => state.applications.isLoading;
export const selectIsApplying = (state) => state.applications.isApplying;
import axios from 'axios';
import store from '../store';
import { refreshAccessToken, clearAuth } from '../store/slices/authSlice';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await store.dispatch(refreshAccessToken());
        if (result.type === 'auth/refreshToken/fulfilled') {
          const newToken = result.payload.accessToken;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          processQueue(new Error('Token refresh failed'), null);
          store.dispatch(clearAuth());
          window.location.href = '/login';
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(clearAuth());
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  logout: () => axiosInstance.post('/auth/logout'),
  refreshToken: (token) => axiosInstance.post('/auth/refresh-token', { refreshToken: token }),
  getMe: () => axiosInstance.get('/auth/me'),
  updateProfile: (data) => axiosInstance.put('/auth/profile', data)
};

// Jobs API
export const jobsAPI = {
  getAll: (params) => axiosInstance.get('/jobs', { params }),
  getById: (id) => axiosInstance.get(`/jobs/${id}`),
  adminGetAll: (params) => axiosInstance.get('/jobs/admin/jobs', { params }),
  create: (data) => axiosInstance.post('/jobs/admin/jobs', data),
  update: (id, data) => axiosInstance.put(`/jobs/admin/jobs/${id}`, data),
  delete: (id) => axiosInstance.delete(`/jobs/admin/jobs/${id}`),
  updateStatus: (id, status) => axiosInstance.patch(`/jobs/admin/jobs/${id}/status`, { status }),
  getDashboard: () => axiosInstance.get('/jobs/admin/dashboard')
};

// Applications API
export const applicationsAPI = {
  apply: (jobId, data) => {
    if (data?.resumeFile instanceof File) {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'resumeFile') {
          if (value) formData.append('resume', value);
          return;
        }

        if (value === undefined || value === null || value === '') {
          return;
        }

        formData.append(key, value);
      });

      return axiosInstance.post(`/jobs/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

    return axiosInstance.post(`/jobs/${jobId}/apply`, data);
  },
  getMine: (params) => axiosInstance.get('/my-applications', { params }),
  getAll: (params) => axiosInstance.get('/admin/applications', { params }),
  updateStatus: (id, data) => axiosInstance.patch(`/admin/applications/${id}/status`, data)
};

export default axiosInstance;
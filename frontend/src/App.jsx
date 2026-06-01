import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminJobsPage from './pages/AdminJobsPage';
import AdminCreateJobPage from './pages/AdminCreateJobPage';
import AdminEditJobPage from './pages/AdminEditJobPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import FooterLinkPage from './pages/FooterLinkPage';
import NotFoundPage from './pages/NotFoundPage';
import { fetchCurrentUser, selectAccessToken } from './store/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [accessToken, dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <HomePage />
            </main>
            <Footer />
          </div>
        }
      />

      <Route
        path="/jobs"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <JobsPage />
            </main>
            <Footer />
          </div>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <JobDetailPage />
            </main>
            <Footer />
          </div>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <MyApplicationsPage />
              </main>
              <Footer />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminJobsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/new"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminCreateJobPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/:id/edit"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminEditJobPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/applications"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminApplicationsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/info/:slug"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <FooterLinkPage />
            </main>
            <Footer />
          </div>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

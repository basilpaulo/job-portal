import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, selectAuth, selectIsAuthenticated, selectUser } from '../store/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin/dashboard' : '/');
    }
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(form));
  };

  const errorMessage = auth.error?.message || auth.error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-primary-600">Welcome back</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-500">Access the portal, apply to jobs, or manage listings as an admin.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Enter password" required />
          </div>

          {errorMessage && <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">{errorMessage}</p>}

          <button type="submit" className="btn-primary w-full" disabled={auth.isLoading}>
            {auth.isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          New here? <Link to="/register" className="font-medium text-primary-600">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

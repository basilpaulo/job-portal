import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, selectAuth, selectIsAuthenticated } from '../store/slices/authSlice';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(form));
  };

  const errorMessage = auth.error?.message || auth.error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-primary-600">Create account</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Join JobPortal</h1>
          <p className="mt-2 text-sm text-gray-500">Sign up to browse openings, apply, and manage your applications in one place.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Jordan Smith" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+1 555 1234" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Create a password" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="input-field" placeholder="Remote / New York, NY" />
          </div>

          {errorMessage && <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">{errorMessage}</p>}

          <button type="submit" className="btn-primary w-full" disabled={auth.isLoading}>
            {auth.isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="font-medium text-primary-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-primary-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-gray-600 max-w-md">The page you’re looking for doesn’t exist or may have moved.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/jobs" className="btn-secondary">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

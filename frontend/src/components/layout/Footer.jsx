import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const links = {
    'Company': [
      { label: 'About Us', to: '/info/about-us' },
      { label: 'Blog', to: '/info/blog' },
      { label: 'Press', to: '/info/press' },
      { label: 'Careers', to: '/info/careers' }
    ],
    'For Job Seekers': [
      { label: 'Browse Jobs', to: '/jobs' },
      { label: 'Career Resources', to: '/info/career-resources' },
      { label: 'Salary Guide', to: '/info/salary-guide' },
      { label: 'Resume Builder', to: '/info/resume-builder' }
    ],
    'For Employers': [
      { label: 'Post a Job', to: '/admin/jobs' },
      { label: 'Pricing', to: '/info/pricing' },
      { label: 'Recruiter Tools', to: '/info/recruiter-tools' },
      { label: 'HR Resources', to: '/info/hr-resources' }
    ],
    'Support': [
      { label: 'Help Center', to: '/info/help-center' },
      { label: 'Privacy Policy', to: '/info/privacy-policy' },
      { label: 'Terms of Service', to: '/info/terms-of-service' },
      { label: 'Contact Us', to: '/info/contact-us' }
    ]
  };

  const categories = [
    'Technology', 'Marketing', 'Finance', 'Healthcare', 'Design'
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Job<span className="text-primary-400">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Connecting talented professionals with their dream careers. Find opportunities that match your skills and ambitions.
            </p>
            <div>
              <p className="text-white text-sm font-medium mb-3">Browse by Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    to={`/jobs?category=${cat}`}
                    className="text-xs px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/info/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/info/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/info/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
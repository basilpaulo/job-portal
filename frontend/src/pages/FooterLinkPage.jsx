import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PAGE_CONTENT = {
  'about-us': {
    title: 'About JobPortal',
    description: 'JobPortal brings together ambitious talent and hiring teams with a simple, modern workflow for discovering opportunities and managing roles.',
    highlights: [
      { label: 'Fast matching', value: 'Smart filters and recommendations' },
      { label: 'Verified roles', value: 'Employer-posted listings' },
      { label: 'Built-in hiring', value: 'Application tracking and admin tools' }
    ],
    sections: [
      {
        title: 'What we do',
        body: 'Candidates can browse curated openings, explore detailed job information, and apply in minutes. Hiring teams can manage listings, review applications, and track progress through the admin portal.'
      },
      {
        title: 'Why teams choose us',
        body: 'From startup hiring to enterprise recruiting, JobPortal offers responsive layouts, clear dashboards, and a streamlined flow designed to keep recruiting organized.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Contact us', to: '/info/contact-us' }
    ]
  },
  blog: {
    title: 'Blog',
    description: 'Read hiring insights, interview prep tips, salary trends, and practical advice for job seekers and employers.',
    highlights: [
      { label: 'Weekly insights', value: 'Recruiting and career updates' },
      { label: 'Talent advice', value: 'Interview and resume guidance' },
      { label: 'Market trends', value: 'Salary and hiring snapshots' }
    ],
    sections: [
      {
        title: 'Latest articles',
        body: 'Explore articles covering remote hiring, candidate engagement, skill-based hiring, and how teams build stronger pipelines.'
      },
      {
        title: 'For every stage',
        body: 'Whether you are applying for your first role or scaling a recruiting team, our content helps you stay current and confident.'
      }
    ],
    actions: [
      { label: 'View jobs', to: '/jobs' },
      { label: 'Resume guidance', to: '/info/resume-builder' }
    ]
  },
  press: {
    title: 'Press',
    description: 'See the latest announcements, company updates, and media resources for JobPortal.',
    highlights: [
      { label: 'Media kit', value: 'Brand assets and story materials' },
      { label: 'Newsroom', value: 'Company milestones and product updates' },
      { label: 'Contact', value: 'Press inquiries available on request' }
    ],
    sections: [
      {
        title: 'Company milestones',
        body: 'JobPortal continues to grow with stronger employer partnerships, wider job coverage, and more refined applicant tracking capabilities.'
      },
      {
        title: 'Media resources',
        body: 'Press materials, product highlights, and partnership details are available for media, analysts, and community partners.'
      }
    ],
    actions: [
      { label: 'Contact us', to: '/info/contact-us' },
      { label: 'View careers', to: '/info/careers' }
    ]
  },
  careers: {
    title: 'Careers',
    description: 'Join a team building smarter hiring experiences. We are growing product, operations, and recruiting support roles.',
    highlights: [
      { label: 'Remote-first', value: 'Flexible working options' },
      { label: 'Mission-led', value: 'Meaningful product impact' },
      { label: 'Growth paths', value: 'Learning and leadership opportunities' }
    ],
    sections: [
      {
        title: 'What we value',
        body: 'We prioritize clarity, ownership, and customer-first thinking. Every teammate helps shape how hiring teams discover and hire great talent.'
      },
      {
        title: 'Current opportunities',
        body: 'Open roles include product, growth, support, and operations positions. Reach out to learn how your skills can contribute to the platform.'
      }
    ],
    actions: [
      { label: 'See openings', to: '/info/careers' },
      { label: 'Contact hiring', to: '/info/contact-us' }
    ]
  },
  'career-resources': {
    title: 'Career Resources',
    description: 'Helpful guides, skill-building articles, and job search tips tailored for ambitious professionals.',
    highlights: [
      { label: 'Interview prep', value: 'Practice-ready guidance' },
      { label: 'Growth tips', value: 'Career planning content' },
      { label: 'Market view', value: 'Salary and demand insights' }
    ],
    sections: [
      {
        title: 'Job search support',
        body: 'Learn how to tailor applications, structure your portfolio, and present your experience across interviews and networking situations.'
      },
      {
        title: 'Career planning',
        body: 'Explore learning tracks, growth strategies, and practical ways to move into higher-value roles.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Salary guide', to: '/info/salary-guide' }
    ]
  },
  'salary-guide': {
    title: 'Salary Guide',
    description: 'Get a clear overview of salary ranges across popular roles, regions, and hiring categories.',
    highlights: [
      { label: 'Benchmarking', value: 'Competitive salary snapshots' },
      { label: 'Role-based', value: 'Reference ranges across levels' },
      { label: 'Market context', value: 'Hiring demand insights' }
    ],
    sections: [
      {
        title: 'How it works',
        body: 'Salary ranges are curated from active openings and hiring patterns across the platform, helping candidates compare opportunities more effectively.'
      },
      {
        title: 'Use it well',
        body: 'Use the guide as a negotiation reference, a planning tool, and a way to compare offers across companies and regions.'
      }
    ],
    actions: [
      { label: 'Explore jobs', to: '/jobs' },
      { label: 'Career resources', to: '/info/career-resources' }
    ]
  },
  'resume-builder': {
    title: 'Resume Builder',
    description: 'Build a polished, recruiter-friendly resume structure with practical prompts and layout tips.',
    highlights: [
      { label: 'Structure tips', value: 'Clean sections and impact statements' },
      { label: 'Professional phrasing', value: 'Action-oriented language' },
      { label: 'Ready to apply', value: 'Standout format suggestions' }
    ],
    sections: [
      {
        title: 'Resume essentials',
        body: 'Strong resumes highlight measurable wins, concise summaries, and clear skills. Pair them with a strong cover letter to boost application quality.'
      },
      {
        title: 'Apply with confidence',
        body: 'Once your resume is ready, return to the job listings and apply to opportunities that match your background and goals.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Career resources', to: '/info/career-resources' }
    ]
  },
  'post-a-job': {
    title: 'Post a Job',
    description: 'Post opportunities and manage all employer listings from the admin workflow designed for fast, organized hiring.',
    highlights: [
      { label: 'Job management', value: 'Create and edit postings' },
      { label: 'Candidate review', value: 'Track applications in one place' },
      { label: 'Hiring visibility', value: 'Promote active openings' }
    ],
    sections: [
      {
        title: 'Employer workflow',
        body: 'Admins can add new roles, update listings, and keep open positions active from the dashboard. Each posting can be highlighted and managed with clear status controls.'
      },
      {
        title: 'Getting started',
        body: 'Sign in as an administrator to access the job management dashboard and start posting roles to the portal.'
      }
    ],
    actions: [
      { label: 'Open admin jobs', to: '/admin/jobs' },
      { label: 'Login', to: '/login' }
    ]
  },
  pricing: {
    title: 'Pricing',
    description: 'See pricing options for teams looking to publish openings, manage applicants, and deliver a polished hiring experience.',
    highlights: [
      { label: 'Starter', value: 'For growing recruiters' },
      { label: 'Scale', value: 'For larger hiring teams' },
      { label: 'Flexible', value: 'Simple plans with clear value' }
    ],
    sections: [
      {
        title: 'For hiring teams',
        body: 'Whether you are managing a few openings or coordinating multiple roles, the platform supports organized posting, reporting, and applicant handling.'
      },
      {
        title: 'What you gain',
        body: 'Transparent listing controls, searchable roles, and a responsive hiring dashboard designed for busy recruiters.'
      }
    ],
    actions: [
      { label: 'Post a job', to: '/info/post-a-job' },
      { label: 'Contact sales', to: '/info/contact-us' }
    ]
  },
  'recruiter-tools': {
    title: 'Recruiter Tools',
    description: 'Tools and workflows that help recruiters manage applications, organize pipelines, and improve response speed.',
    highlights: [
      { label: 'Pipeline view', value: 'Application tracking' },
      { label: 'Candidate notes', value: 'Structured review history' },
      { label: 'Fast actions', value: 'Status updates with clarity' }
    ],
    sections: [
      {
        title: 'Recruiter workflow',
        body: 'HR and recruiting teams can keep openings active, review applications, and move candidates quickly through each hiring stage.'
      },
      {
        title: 'Operational clarity',
        body: 'Clear dashboards and role-level insights help hiring managers focus on progress instead of manual tracking.'
      }
    ],
    actions: [
      { label: 'Admin dashboard', to: '/admin/dashboard' },
      { label: 'Applications', to: '/admin/applications' }
    ]
  },
  'hr-resources': {
    title: 'HR Resources',
    description: 'Practical resources for people operations, people managers, and talent teams seeking better hiring communication.',
    highlights: [
      { label: 'People ops', value: 'Internal hiring best practices' },
      { label: 'Team guides', value: 'Culture and onboarding support' },
      { label: 'Talent insights', value: 'People operations updates' }
    ],
    sections: [
      {
        title: 'People operations support',
        body: 'Find practical guidance around interviewing, candidate communication, and building a consistent hiring process.'
      },
      {
        title: 'Team support',
        body: 'Resources for HR and operational leaders who want smoother internal collaboration and stronger candidate experience.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Contact us', to: '/info/contact-us' }
    ]
  },
  'help-center': {
    title: 'Help Center',
    description: 'Find answers to common questions around browsing jobs, applying, and managing employer accounts.',
    highlights: [
      { label: 'Job seekers', value: 'Browse, apply, and track' },
      { label: 'Employers', value: 'Post and manage roles' },
      { label: 'Support', value: 'Guidance for common issues' }
    ],
    sections: [
      {
        title: 'Common questions',
        body: 'How do I apply, how do I edit a listing, and what happens after submitting an application? These are the most common points of support.'
      },
      {
        title: 'Support paths',
        body: 'Candidates can review open roles and application status, while admins can access the dashboard and manage postings.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Contact support', to: '/info/contact-us' }
    ]
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'This page outlines how JobPortal handles personal data, applicant information, and platform security.',
    highlights: [
      { label: 'Data handling', value: 'Applicant and user privacy controls' },
      { label: 'Security', value: 'Secure access and role-based management' },
      { label: 'Transparency', value: 'Clear platform privacy practices' }
    ],
    sections: [
      {
        title: 'What we collect',
        body: 'We collect account details, application data, and role-based usage information needed to operate the hiring platform responsibly.'
      },
      {
        title: 'How we use it',
        body: 'Data is used to support job discovery, application processing, account access, and reporting for hiring teams.'
      }
    ],
    actions: [
      { label: 'Back to home', to: '/' },
      { label: 'Contact us', to: '/info/contact-us' }
    ]
  },
  'terms-of-service': {
    title: 'Terms of Service',
    description: 'Understand the terms that govern using JobPortal for job discovery, applications, and admin management.',
    highlights: [
      { label: 'Platform use', value: 'How the portal is used' },
      { label: 'Application rules', value: 'Submission and hiring process expectations' },
      { label: 'Governance', value: 'Account and operational terms' }
    ],
    sections: [
      {
        title: 'Use of the service',
        body: 'Users agree to use the platform responsibly when browsing jobs, submitting applications, and managing hiring activity.'
      },
      {
        title: 'Platform responsibilities',
        body: 'JobPortal is a service for recruiting and job discovery, and all users should follow the expectations for fair and accurate use.'
      }
    ],
    actions: [
      { label: 'Privacy policy', to: '/info/privacy-policy' },
      { label: 'Help center', to: '/info/help-center' }
    ]
  },
  'contact-us': {
    title: 'Contact Us',
    description: 'Need help, partnership support, or product feedback? Reach out and our team will respond with the right next step.',
    highlights: [
      { label: 'Support', value: 'Help with accounts and applications' },
      { label: 'Partners', value: 'Recruiting and employer outreach' },
      { label: 'Product feedback', value: 'Share improvements and ideas' }
    ],
    sections: [
      {
        title: 'How to connect',
        body: 'For candidate support, employer setup, or platform feedback, reach out through the contact channels on the page and our team will respond promptly.'
      },
      {
        title: 'Common requests',
        body: 'Support includes login help, application guidance, posting questions, and general product feedback.'
      }
    ],
    actions: [
      { label: 'Browse jobs', to: '/jobs' },
      { label: 'Admin jobs', to: '/admin/jobs' }
    ]
  },
  cookies: {
    title: 'Cookies',
    description: 'Understand how cookies support session management, preferences, and platform personalization on JobPortal.',
    highlights: [
      { label: 'Session support', value: 'Login and account continuity' },
      { label: 'Preferences', value: 'Saved filters and interface choices' },
      { label: 'Personalization', value: 'Relevant job and content recommendations' }
    ],
    sections: [
      {
        title: 'Cookie usage',
        body: 'Cookies help the platform remember your session, maintain preferences, and improve browsing performance across job searches.'
      },
      {
        title: 'How to manage',
        body: 'You can manage browser settings to control cookie behavior, although some platform features may rely on cookies for full functionality.'
      }
    ],
    actions: [
      { label: 'Privacy policy', to: '/info/privacy-policy' },
      { label: 'Back to home', to: '/' }
    ]
  }
};

const FooterLinkPage = () => {
  const { slug } = useParams();
  const page = PAGE_CONTENT[slug] || {
    title: 'Page not found',
    description: 'This content page is not available yet.',
    sections: [
      {
        title: 'Need help?',
        body: 'Return to the homepage or browse the available jobs to continue.'
      }
    ],
    actions: [
      { label: 'Back home', to: '/' },
      { label: 'Browse jobs', to: '/jobs' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <p className="text-sm font-medium text-primary-600">Resource page</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{page.title}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">{page.description}</p>

          {page.highlights && (
            <div className="mt-6 grid md:grid-cols-3 gap-3">
              {page.highlights.map((item) => (
                <div key={item.label} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{item.label}</p>
                  <p className="mt-2 text-sm text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 space-y-5">
            {page.sections.map((section) => (
              <section key={section.title} className="rounded-xl border border-gray-200 p-5 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {page.actions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="btn-primary text-sm"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinkPage;

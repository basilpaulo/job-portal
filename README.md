# Job Portal

A full-stack job portal built with React, Redux, Express, Sequelize, and PostgreSQL.

## Features

- Candidate registration, login, and profile access
- Job browsing, filtering, and detail pages
- Application submission with optional resume link/file upload
- Admin dashboard for managing jobs and applications
- Backend API with PostgreSQL migrations and seed data

## Project Structure

- `frontend/` — React frontend built with CRA/Tailwind
- `backend/` — Node.js/Express backend with Sequelize and PostgreSQL

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database (local or Neon)

## Environment Setup

### Backend

1. Navigate to `backend/`
2. Copy `.env.example` if present, or create `.env` with values like:

```env
DATABASE_URL=postgres://user:password@host:5432/dbname
JWT_ACCESS_SECRET=replace-with-strong-secret
JWT_REFRESH_SECRET=replace-with-strong-secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

3. Install dependencies:

```bash
npm install
```

4. Run migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

5. Start the backend:

```bash
npm start
```

### Frontend

1. Navigate to `frontend/`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm start
```

## Useful Commands

### Backend

```bash
npm run db:migrate
npm run db:seed
npm run db:reset
npm start
```

### Frontend

```bash
npm start
npm run build
```

## Notes

- Uploaded resumes are stored under `backend/uploads/resumes` and served as static files.
- The application uses role-based access for regular users and admins.

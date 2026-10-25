## About the Project

**Medium Hub** is a full-stack blogging platform inspired by Medium.
Readers can discover and read published blogs, writers can create and
manage their own content, and administrators can manage users and
platform content.

The project is designed to demonstrate full-stack development, REST API
design, authentication, role-based access control, database modeling,
and responsive UI/UX.

## Features

### Readers

-   Browse published blogs.
-   Search, filter, sort, and paginate blog listings.
-   View blog details and public author profiles.
-   Explore blogs by category.

### Registered Users

-   Register and log in.
-   Create, edit, publish, unpublish, and delete their own blogs.
-   Save drafts.
-   Like and bookmark blogs.
-   Comment on blogs and optionally reply to comments.
-   Manage their profile.
-   View their blogs and bookmarks in a dashboard.

### Administrators

-   View platform statistics.
-   Manage users and roles.
-   Activate or suspend accounts.
-   Create and manage categories.
-   Manage and feature blogs.
-   Moderate comments.

### User Experience

-   Responsive layouts for mobile, tablet, and desktop.
-   Form validation and useful error messages.
-   Loading, empty, and error states.
-   Reusable UI components.

## Technology Stack

  Area             Technologies
  ---------------- ------------------------------------------------
  Frontend         Next.js App Router, TypeScript, Tailwind CSS
  UI Components    shadcn/ui (planned/optional)
  Backend          Node.js, Express.js, TypeScript
  Database         PostgreSQL
  ORM              Prisma
  Validation       Zod
  Authentication   Better Auth or JWT (choose one approach)
  Deployment       Vercel (frontend), Render or Railway (backend)

## Project Structure

The frontend and backend are maintained as separate
projects/repositories.

### Frontend

``` text
medium-hub-client/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── blogs/
│   │   │   ├── categories/
│   │   │   ├── authors/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   └── admin/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   └── types/
├── .env.example
└── package.json
```

### Backend

``` text
medium-hub-server/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── config/
│   ├── lib/
│   ├── middlewares/
│   ├── error-helpers/
│   ├── utils/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── blogs/
│   │   ├── categories/
│   │   ├── comments/
│   │   ├── likes/
│   │   └── bookmarks/
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── .env.example
└── package.json
```

## User Roles

  -----------------------------------------------------------------------
  Role                                Permissions
  ----------------------------------- -----------------------------------
  Guest                               Read published blogs, search, and
                                      view public author profiles

  User                                Guest permissions, plus manage own
                                      blogs, like, bookmark, comment, and
                                      edit own profile

  Admin                               Manage users, roles, categories,
                                      blogs, and comments
  -----------------------------------------------------------------------

> **Note:** Guest is an unauthenticated visitor, not a database role.
> The database roles are planned as `USER` and `ADMIN`. All
> authorization rules must be enforced by the backend.


## API Overview

Base path: `/api/v1`

  Method   Endpoint                    Description                Access
  -------- --------------------------- -------------------------- --------
  GET      `/health`                   API health check           Public
  GET      `/blogs`                    List published blogs       Public
  GET      `/blogs/:slug`              Get blog details           Public
  GET      `/blogs/featured`           Get featured blogs         Public
  GET      `/categories`               List categories            Public
  GET      `/categories/:slug/blogs`   List blogs in a category   Public
  GET      `/users/:username`          Public author profile      Public
  POST     `/blogs`                    Create a blog or draft     User
  PATCH    `/blogs/:id`                Update own blog            Owner
  DELETE   `/blogs/:id`                Delete own blog            Owner
  POST     `/blogs/:blogId/like`       Like a blog                User
  POST     `/blogs/:blogId/bookmark`   Bookmark a blog            User
  POST     `/blogs/:blogId/comments`   Add a comment              User
  GET      `/admin/users`              List users                 Admin
  POST     `/categories`               Create a category          Admin

This is a high-level overview; see the project PRD for the full planned
endpoint list. Authentication endpoint paths may differ if Better Auth
handles authentication directly.

## Getting Started

### Prerequisites

Install the following before running the project:

-   Node.js (LTS recommended)
-   npm
-   PostgreSQL database
-   Git

### 1. Clone the repositories

The frontend and backend are separate repositories. Replace the
placeholders with your actual GitHub repository URLs.

``` bash
git clone <FRONTEND_REPOSITORY_URL>
git clone <BACKEND_REPOSITORY_URL>
```

### 2. Install dependencies

Run in each project directory:

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in each project using its `.env.example`. See
[Environment Variables](#environment-variables).

### 4. Set up the database

From the backend directory, after configuring `DATABASE_URL` and Prisma:

``` bash
npx prisma generate
npx prisma migrate dev
```

If a seed script is configured, run it using the command defined in the
backend `package.json`.

### 5. Start the development servers

Run in the backend directory:

``` bash
npm run dev
```

Run in the frontend directory:

``` bash
npm run dev
```

The local URLs below are examples; use the ports configured in your
project.

-   Frontend: `http://localhost:3000`
-   Backend: `http://localhost:5000`
-   API base path: `http://localhost:5000/api/v1`

## Environment Variables

### Frontend `.env.example`

``` env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Only expose variables prefixed with `NEXT_PUBLIC_` if the browser needs
them. Never put private secrets in frontend variables.

### Backend `.env.example`

``` env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
FRONTEND_URL=http://localhost:3000
```

Add authentication secrets or provider configuration only if required by
the chosen authentication method. Do not commit real credentials.

## Development Scripts

The exact scripts depend on the installed packages and project
configuration. Common examples:

  Command                    Purpose
  -------------------------- --------------------------------------
  `npm run dev`              Start the development server
  `npm run build`            Build the application
  `npm run start`            Start the production server
  `npx prisma generate`      Generate Prisma Client
  `npx prisma migrate dev`   Create/apply a development migration

Check each repository's `package.json` for the actual available scripts.

## Security and Validation

-   Validate request bodies and query parameters with Zod.
-   Enforce authentication, role, and resource ownership on the backend.
-   Prevent users from changing their own role to `ADMIN`.
-   Do not expose secrets or stack traces in production responses.
-   Use environment variables for credentials.
-   Configure CORS for the deployed frontend origin.
-   Return consistent API responses and handle errors centrally.

## Deployment

Typical deployment plan:

1.  Create a managed PostgreSQL database.
2.  Deploy the backend to Render or Railway.
3.  Set production environment variables and run Prisma migrations.
4.  Deploy the frontend to Vercel.
5.  Configure the frontend API URL and backend CORS origin.
6.  Test authentication, blog CRUD, permissions, and error states on the
    live site.

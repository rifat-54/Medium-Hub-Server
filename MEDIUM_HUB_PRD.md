Medium Hub - Product Requirements Document (PRD)

Project Overview

Item                 Details

Project Name     Medium Hub
Type             Medium-inspired blogging platform
Frontend         Next.js App Router, TypeScript, Tailwind CSS
Backend          Node.js, Express.js, TypeScript
Database         PostgreSQL with Prisma ORM
Authentication   Better Auth or JWT (choose one approach)
Validation       Zod
Deployment       Vercel (frontend), Render/Railway (backend)

Medium Hub lets readers discover and read blogs, while registered users
can write, publish, edit, and manage their own blogs. Admins manage
users, categories, blogs, and comments.

1. Core Features

User Features

Register and log in securely.

Browse, search, filter, sort, and paginate published blogs.

Read a blog and view its author profile.

Create, edit, publish, unpublish, and delete own blogs.

Save blogs as drafts.

Like and bookmark blogs.

Comment on blogs and optionally reply to comments.

Manage profile information and avatar.

View own blogs and bookmarks in a dashboard.

Admin Features

View platform statistics.

View and manage users.

Change user roles or suspend accounts.

Manage categories.

View, publish/unpublish, feature, or remove blogs.

Moderate comments.

Public Homepage

Navbar and footer.

Hero section.

Featured blogs.

Latest/popular blogs.

Popular categories/topics.

Call-to-action or newsletter section.

2. Roles and Access

Role                                Permissions

GUEST                             Browse published blogs, search,
view public profiles

USER                              Guest permissions plus
create/manage own blogs, like,
bookmark, comment, manage profile

Implementation note: GUEST is not stored as a user role; it
represents an unauthenticated visitor. Database roles are USER and
ADMIN. Every permission must be enforced by the backend, not just by
frontend route guards.

3. Frontend Structure

medium-hub-client/
├── public/
│   ├── images/
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                       # Home
│   │   │   ├── blogs/page.tsx                 # Blog listing/search
│   │   │   ├── blogs/[slug]/page.tsx           # Blog details
│   │   │   ├── categories/page.tsx
│   │   │   ├── categories/[slug]/page.tsx
│   │   │   ├── authors/[username]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── page.tsx                   # Overview
│   │   │       ├── blogs/page.tsx              # My blogs
│   │   │       ├── blogs/new/page.tsx          # Create blog
│   │   │       ├── blogs/[id]/edit/page.tsx    # Edit blog
│   │   │       ├── bookmarks/page.tsx
│   │   │       ├── profile/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx                       # Admin overview
│   │   │   ├── users/page.tsx
│   │   │   ├── blogs/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   └── comments/page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/                             # Navbar, footer, sidebar
│   │   ├── home/                               # Hero, featured blogs, topics
│   │   ├── blogs/                              # Blog cards, editor, filters
│   │   ├── comments/                           # Comment form/list
│   │   ├── profile/                            # Author/profile components
│   │   ├── admin/                              # Admin tables and stats
│   │   ├── shared/                             # Pagination, states, dialogs
│   │   └── ui/                                 # shadcn/ui components
│   ├── services/                               # API calls
│   ├── hooks/
│   ├── lib/                                    # API client and helpers
│   ├── providers/
│   └── types/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json

4. Backend Structure

medium-hub-server/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── config/env.ts
│   ├── lib/prisma.ts
│   ├── lib/auth.ts                             # If using Better Auth
│   ├── middlewares/
│   │   ├── check-auth.ts
│   │   ├── require-role.ts
│   │   ├── validate-request.ts
│   │   ├── not-found.ts
│   │   └── global-error-handler.ts
│   ├── error-helpers/app-error.ts
│   ├── utils/
│   │   ├── send-response.ts
│   │   ├── catch-async.ts
│   │   └── slug.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── blogs/
│   │   ├── categories/
│   │   ├── comments/
│   │   ├── likes/
│   │   └── bookmarks/
│   ├── routes/index.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json

Each backend module should contain route, controller, service, and
validation files where needed.

📘 API Endpoints

Authentication

| Method | Endpoint                | Description       | Auth |
| ------ | ----------------------- | ----------------- | ---- |
| POST   | `/api/v1/auth/register` | User registration | ❌    |
| POST   | `/api/v1/auth/login`    | User login        | ❌    |
| POST   | `/api/v1/auth/logout`   | User logout       | User |
| GET    | `/api/v1/auth/me`       | Get current user  | User |


Blogs

| Method | Endpoint                      | Description                 | Auth  |
| ------ | ----------------------------- | --------------------------- | ----- |
| GET    | `/api/v1/blogs`               | Get all published blogs     | ❌     |
| GET    | `/api/v1/blogs/featured`      | Get featured blogs          | ❌     |
| GET    | `/api/v1/blogs/:slug`         | Get blog details            | ❌     |
| GET    | `/api/v1/blogs/mine`          | Get logged-in user's blogs  | User  |
| POST   | `/api/v1/blogs`               | Create a blog               | User  |
| PATCH  | `/api/v1/blogs/:id`           | Update own blog             | User  |
| DELETE | `/api/v1/blogs/:id`           | Delete own blog             | User  |
| PATCH  | `/api/v1/blogs/:id/publish`   | Publish own blog            | User  |
| PATCH  | `/api/v1/blogs/:id/unpublish` | Unpublish a blog            | User  |
| PATCH  | `/api/v1/blogs/:id/feature`   | Feature or unfeature a blog | Admin |

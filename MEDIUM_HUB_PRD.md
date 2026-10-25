# Medium Hub - Product Requirements Document (PRD)

## Project Overview

| Item               | Details                                      |
| ------------------ | -------------------------------------------- |
| **Project Name**   | Medium Hub                                   |
| **Type**           | Medium-inspired blogging platform            |
| **Frontend**       | Next.js App Router, TypeScript, Tailwind CSS |
| **Backend**        | Node.js, Express.js, TypeScript              |
| **Database**       | PostgreSQL with Prisma ORM                   |
| **Authentication** | Better Auth or JWT (choose one approach)     |
| **Validation**     | Zod                                          |
| **Deployment**     | Vercel (frontend), Render/Railway (backend)  |

Medium Hub is a blogging platform where readers can discover and read blogs, registered users can write and manage their own blogs, and admins can manage users, categories, blogs, and comments.

## 1. Core Features

### User Features

* Register and log in securely.
* Browse, search, filter, sort, and paginate published blogs.
* Read blogs and view author profiles.
* Create, edit, publish, unpublish, and delete their own blogs.
* Save blogs as drafts.
* Like and bookmark blogs.
* Comment on blogs and optionally reply to comments.
* Manage profile information and avatar.
* View their blogs and bookmarks in a dashboard.

### Admin Features

* View platform statistics.
* View and manage users.
* Change user roles and suspend accounts.
* Create, update, and delete categories.
* Manage, feature, publish, unpublish, or remove blogs.
* Moderate comments.

### Public Homepage

* Navbar and footer.
* Hero section.
* Featured blogs.
* Latest and popular blogs.
* Popular categories and topics.
* Call-to-action or newsletter section.

## 2. Roles and Access

| Role    | Permissions                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| `GUEST` | Browse published blogs, search blogs, and view public profiles.                                               |
| `USER`  | Guest permissions, plus create and manage their own blogs, like, bookmark, comment, and manage their profile. |
| `ADMIN` | Manage users, roles, categories, all blogs, and comments.                                                     |

**Implementation Note:** `GUEST` is not stored in the database. It represents an unauthenticated visitor. The database roles are `USER` and `ADMIN`.

All permissions must be enforced by the backend, not just by frontend route guards.



3. Frontend Structure

## 3. Frontend Structure

```text
medium-hub-client/
├── public/
│   ├── images/
│   └── logo.svg
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── blogs/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── authors/[username]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── blogs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── bookmarks/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── blogs/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   └── comments/page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── blogs/
│   │   ├── comments/
│   │   ├── profile/
│   │   ├── admin/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── services/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   └── types/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

Backend Structure



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


Categories
| Method | Endpoint                         | Description           | Auth  |
| ------ | -------------------------------- | --------------------- | ----- |
| GET    | `/api/v1/categories`             | Get all categories    | ❌     |
| GET    | `/api/v1/categories/:slug/blogs` | Get blogs by category | ❌     |
| POST   | `/api/v1/categories`             | Create a category     | Admin |
| PATCH  | `/api/v1/categories/:id`         | Update a category     | Admin |
| DELETE | `/api/v1/categories/:id`         | Delete a category     | Admin |

Comments

| Method | Endpoint                         | Description        | Auth  |
| ------ | -------------------------------- | ------------------ | ----- |
| GET    | `/api/v1/blogs/:blogId/comments` | Get blog comments  | ❌     |
| POST   | `/api/v1/blogs/:blogId/comments` | Add a comment      | User  |
| PATCH  | `/api/v1/comments/:id`           | Update own comment | User  |
| DELETE | `/api/v1/comments/:id`           | Delete own comment | User  |
| GET    | `/api/v1/admin/comments`         | Get all comments   | Admin |
| DELETE | `/api/v1/admin/comments/:id`     | Delete any comment | Admin |

Likes

| Method | Endpoint                     | Description   | Auth |
| ------ | ---------------------------- | ------------- | ---- |
| POST   | `/api/v1/blogs/:blogId/like` | Like a blog   | User |
| DELETE | `/api/v1/blogs/:blogId/like` | Remove a like | User |

Bookmarks
| Method | Endpoint                         | Description          | Auth |
| ------ | -------------------------------- | -------------------- | ---- |
| GET    | `/api/v1/bookmarks`              | Get user's bookmarks | User |
| POST   | `/api/v1/blogs/:blogId/bookmark` | Bookmark a blog      | User |
| DELETE | `/api/v1/blogs/:blogId/bookmark` | Remove a bookmark    | User |


Users

| Method | Endpoint                         | Description               | Auth  |
| ------ | -------------------------------- | ------------------------- | ----- |
| GET    | `/api/v1/users/:username`        | Get public author profile | ❌     |
| PATCH  | `/api/v1/users/me`               | Update own profile        | User  |
| GET    | `/api/v1/admin/users`            | Get all users             | Admin |
| PATCH  | `/api/v1/admin/users/:id/role`   | Update user role          | Admin |
| PATCH  | `/api/v1/admin/users/:id/status` | Update user status        | Admin |
| DELETE | `/api/v1/admin/users/:id`        | Delete a user             | Admin |

Admin Dashboard
| Method | Endpoint                  | Description                     | Auth  |
| ------ | ------------------------- | ------------------------------- | ----- |
| GET    | `/api/v1/admin/stats`     | Get dashboard statistics        | Admin |
| GET    | `/api/v1/admin/blogs`     | Get all blogs, including drafts | Admin |
| DELETE | `/api/v1/admin/blogs/:id` | Delete any blog                 | Admin |


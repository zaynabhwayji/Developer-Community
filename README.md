# TechTalks

TechTalks is a full-stack developer community platform built with **Next.js 16 (App Router)**. Developers can sign up with email/password or GitHub, build a public developer profile, and publish, edit, and discuss community posts.

Built as a Final Bootcamp Assignment for Full Stack Development.

## Features

- **Authentication** with Auth.js (NextAuth v5)
  - Email/password sign up & sign in with validation
  - "Sign in with GitHub" (OAuth)
  - Authenticated users are linked to a MongoDB `User` document, and the session carries that user's database `_id`
- **Route architecture**
  - Route groups separating the authenticated app shell (shared navbar/layout) from the auth pages (separate layout)
  - Nested routes for related sections (e.g. posts, profiles)
  - Dynamic routes for individual post details (`/posts/[id]`) and developer profiles (`/developers/[id]`)
- **Developer profiles**
  - Server-rendered profile pages
  - Create/edit profile forms powered by Server Actions
- **Community posts**
  - Post model in MongoDB via Mongoose
  - List posts (server-rendered) and individual post detail pages
  - Create/edit posts via Server Actions
  - Only the post owner can edit or delete their own post
  - Full CRUD available through API Route Handlers (`GET`, `POST`, `PUT`/`PATCH`, `DELETE`)
- **Client-side data fetching** in at least one section using `useState`/`useEffect`, with the rest of the app rendered server-side
- **Polish**
  - Custom error boundary, custom 404 page, custom loading states
  - Route-specific metadata (title/description per route)
  - Custom favicon, app name, and description
  - Google Font
  - Styled with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Auth | Auth.js (`next-auth` v5 beta) — Credentials + GitHub OAuth |
| Database | MongoDB with Mongoose |
| Validation | Zod |
| Language | TypeScript |

## Getting Started

### 1. Prerequisites

- Node.js 18.18+ (LTS recommended)
- A MongoDB database (local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [GitHub OAuth App](https://github.com/settings/developers) for GitHub sign-in

### 2. Clone and install

```bash
git clone https://github.com/zaynabhwayji/Developer-Community.git
cd Developer-Community
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Auth.js
AUTH_SECRET=your_generated_auth_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret

# Base URL of the app (used by Auth.js for callback URLs)
NEXTAUTH_URL=http://localhost:3000
```

**Generating `AUTH_SECRET`:**

```bash
npx auth secret
# or
openssl rand -base64 32
```

**Setting up the GitHub OAuth App:**

1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Set **Homepage URL** to `http://localhost:3000`
3. Set **Authorization callback URL** to:
   ```
   http://localhost:3000/api/auth/callback/github
   ```
4. Copy the generated **Client ID** and **Client Secret** into `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`

When deploying (e.g. to Vercel), add a second GitHub OAuth App (or a second callback URL) pointing at your production domain, and update `NEXTAUTH_URL` and the environment variables in your hosting provider's dashboard accordingly.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | Connection string for your MongoDB database |
| `AUTH_SECRET` | Yes | Secret used by Auth.js to sign/encrypt session tokens |
| `AUTH_GITHUB_ID` | Yes | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | Yes | GitHub OAuth App Client Secret |
| `NEXTAUTH_URL` | Yes (prod) | Full base URL of the deployed app |

## Project Structure

```
.
├── app/                # App Router routes, route groups, layouts, pages
├── components/         # Shared UI components (navbar, forms, cards, etc.)
├── lib/                # Database connection and shared utilities
├── models/             # Mongoose models (User, Post)
├── public/             # Static assets, favicon
├── auth.ts             # Auth.js configuration (Node.js runtime: GitHub + Mongoose)
├── auth.config.ts      # Edge-safe Auth.js config used by proxy.ts
├── proxy.ts            # Next.js 16 proxy (replaces middleware.ts) for route protection
└── ...
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## License

This project was built as an educational bootcamp assignment.

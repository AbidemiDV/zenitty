# Zenitty

A beautiful, minimal to-do list app with a soft mint-green aesthetic.

## Screenshots

<!-- TODO: Add screenshots here -->

## Features

- Task CRUD (create, read, update, delete)
- Priority and category badges
- Dashboard stats (today, overdue, all, completed this week)
- Search, filter, and sort
- Dark mode with system preference detection
- Fully responsive (laptop, tablet, mobile)

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + TanStack Query
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite via Prisma
- **Validation**: Zod

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations and seed
npm run db:migrate
npm run db:seed

# Start dev servers
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client and server in dev mode |
| `npm run build` | Build both workspaces |
| `npm run lint` | Lint both workspaces |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed the database |

## Project Structure

```
zenitty/
├── client/    # React + Vite frontend
├── server/    # Express + TypeScript backend
└── package.json
```

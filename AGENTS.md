# Zenitty — Agent Guide

## Project Overview

Zenitty is a full-stack, single-user to-do list web app with a soft mint-green aesthetic. It features task CRUD, priority/category badges, dashboard stats, search/filter/sort, dark mode, and fully responsive layouts.

## Tech Stack

- **Monorepo**: npm workspaces
- **Client**: React 18 + Vite + TypeScript + Tailwind CSS + TanStack Query
- **Server**: Node.js + Express + TypeScript
- **Database**: SQLite via Prisma (swappable to PostgreSQL)
- **Validation**: Zod
- **Linting**: ESLint + TypeScript strict mode

## Folder Structure

```
zenitty/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # Shared TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Root component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Tailwind + global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── package.json
├── server/                  # Express + TypeScript backend
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed script
│   ├── src/
│   │   ├── routes/         # Express route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── types/          # Server types
│   │   ├── app.ts          # Express app setup
│   │   └── index.ts        # Server entry point
│   └── package.json
├── package.json            # Root workspace config
├── AGENTS.md               # This file
└── README.md
```

## Commands

```bash
# Install dependencies
npm install

# Run dev servers (client + server)
npm run dev

# Build both workspaces
npm run build

# Lint both workspaces
npm run lint

# Database
npm run db:generate        # Generate Prisma client
npm run db:migrate         # Run migrations
npm run db:seed            # Seed the database
```

## Coding Conventions

- **TypeScript strict mode** — no `any`, explicit types everywhere
- **Functional React components** — no class components
- **Tailwind only** — no inline styles, no CSS modules
- **Theme tokens only** — never hardcode colors; use Tailwind theme tokens
- **Conventional Commits** — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`

## API Contract

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List tasks (query: search, status, priority, category, sort) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/stats` | Dashboard statistics |

### Error Shape

```json
{
  "error": {
    "message": "Human-readable error message",
    "details": "Optional additional details"
  }
}
```

## Data Model

### Task

| Field | Type | Notes |
|-------|------|-------|
| id | string | UUID |
| title | string | Required |
| description | string | Optional |
| status | enum | TODO, IN_PROGRESS, COMPLETED |
| priority | enum | LOW, MEDIUM, HIGH |
| category | string | Default: Work, Personal, Health, Shopping, Other |
| dueDate | datetime | Optional |
| completedAt | datetime | Nullable |
| createdAt | datetime | Auto-set |
| updatedAt | datetime | Auto-set |

## Git Rules

- Default branch: `main`
- Branch naming: `chore/`, `feature/`, `fix/`, `docs/`
- One branch per feature, merged via PR
- Conventional Commits required
- Delete branches after merge

## Design Rules

### Palette

| Token | Light | Dark |
|-------|-------|------|
| Background | `#E3F1EA` (mint-100) | `#121B17` (charcoal-900) |
| Card | `#FFFFFF` | `#1E2B25` (charcoal-800) |
| Primary | `#2F6B4F` (forest-600) | `#7FC4A3` (mint-500) |
| Today | `#BFE3CF` (mint-300) | `#2F6B4F` (forest-600) |
| Overdue | `#F8D9D0` (peach-100) | `#F0A896` (peach-300) |
| All | `#D7ECD9` (sage-100) | `#3D8B6A` (forest-500) |
| Completed | `#D9D2F0` (lavender-100) | `#A89BE0` (lavender-300) |

### Typography

- Font: **Nunito** (Google Fonts)
- Stat numbers: very large, bold (text-5xl font-extrabold)

### Radius & Shadows

- Cards: 18px radius, soft shadow
- Sheets/modals: 20px radius

### Breakpoints

| Width | Layout |
|-------|--------|
| >=1024px | Left sidebar + main + right detail panel |
| 768-1023px | Collapsible sidebar, detail as modal |
| <768px | Single column, 2x2 stats, floating + button, full-screen sheets |

## Definition of Done

- [ ] Works on laptop (>=1024px) and mobile (360px)
- [ ] Works in light and dark mode
- [ ] No console errors
- [ ] Lint passes
- [ ] README/AGENTS.md updated if needed

## Roadmap / Not in v1

- Subtasks
- Auth and multi-user support
- PostgreSQL deployment

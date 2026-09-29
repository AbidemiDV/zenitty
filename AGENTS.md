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
- **Icons**: lucide-react (stroke 2)

## Folder Structure

```
zenitty/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # Shared TypeScript types
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
│   │   ├── validation/     # Zod schemas
│   │   ├── types/          # Server types
│   │   ├── app.ts          # Express app setup
│   │   └── index.ts        # Server entry point
│   └── package.json
├── docs/design/             # Design mockups (source of truth)
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
- **Always compare UI against /docs/design/*.png**

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
| Background | `#E3F1EA` | `#0F1A16` |
| Surface | `#FFFFFF` | `#172520` |
| Subtle surface | `#F4FAF7` | `#1E2E28` |
| List rows | `#F6FBF8` | `#1E2E28` |
| Border | `#D3E6DC` | `#2A3D35` |
| Input border | `#C5DDD0` | `#2A3D35` |
| Primary | `#2F6B4F` | `#8FD1B0` |
| Primary text | `#1E4D38` | `#8FD1B0` |
| Text | `#17332A` | `#E6F2EC` |
| Secondary text | `#34503F` | `#B8CFC4` |
| Muted text | `#4F6B60` | `#9DB5AB` |
| Danger | `#B23A22` | `#E07B6A` |

### Stat Cards

| Card | Background | Label |
|------|-----------|-------|
| Due today | `#BFE3CF` | `#1E4D38` |
| Overdue | `#F8D9D0` | `#7A2E1D` |
| All tasks | `#D7ECD9` | `#1E4D38` |
| Completed this week | `#D9D2F0` | `#43357A` |

Dark: `#24473A`, `#4A2E2A`, `#22392E`, `#332D4A` with pastel labels.

### Priority Badges

| Priority | Background | Text |
|----------|-----------|------|
| High | `#F8D9D0` | `#7A2E1D` |
| Medium | `#FBE9C4` | `#6E4A0B` |
| Low | `#D7ECD9` | `#1E4D38` |

### Category Dots

| Category | Color |
|----------|-------|
| Work | `#2F6B4F` |
| Personal | `#7B6BC0` |
| Health | `#D0664E` |
| Shopping | `#C9962B` |
| Other | `#6F8A7E` |

### Typography

- Font: **Nunito** (Google Fonts), weights 400–900
- Greeting: 26px/800 laptop, 20px/800 mobile
- Stat numbers: 68px/900 laptop, 52px/900 mobile
- Task titles: 15px/800
- Meta text: 12–13px/700 muted
- Section labels: uppercase, 12px/800, letter-spacing 1px

### Shapes

- Radius: stat cards 20px, rows 14–16px, inputs/buttons 12–14px, floating "+" 20px, chips/badges fully rounded
- Everything flat. Only shadow is soft green on floating "+" button.

### Icons

- lucide-react (stroke 2)
- Task checkbox: 22px circle with 2px primary border inside 44×44 button
- Done: filled primary circle with white check, title struck through in muted
- Overdue meta line in danger red

### Breakpoints

| Width | Layout |
|-------|--------|
| >=1024px | Left sidebar (248px) + main + right detail panel (360px) |
| 768-1023px | Collapsible sidebar (icons only), detail as modal |
| <768px | Single column, 2x2 stats (118px), floating + (60px), full-screen sheets |

## Definition of Done

- [ ] Works on laptop (>=1024px) and mobile (360px)
- [ ] Works in light and dark mode
- [ ] No console errors
- [ ] Lint passes
- [ ] Matches mockup (/docs/design/*.png)
- [ ] README/AGENTS.md updated if needed

## Roadmap / Not in v1

- Subtasks
- Auth and multi-user support
- PostgreSQL deployment

# Zenitty

A beautiful, minimal to-do list app with a soft mint-green aesthetic.

## Screenshots

<!-- TODO: Add screenshots here -->

## Features

- **Task CRUD** — Create, edit, delete tasks with confirmation dialogs
- **Priority & Category** — Color-coded badges for easy organization
- **Dashboard Stats** — Today, overdue, all tasks, and completed this week
- **Search, Filter & Sort** — Live search with URL-persisted filter state
- **Dark Mode** — System preference detection with localStorage persistence
- **Fully Responsive** — Optimized for laptop, tablet, and mobile (360px+)
- **Accessible** — WCAG AA contrast, keyboard navigation, visible focus rings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS + TanStack Query |
| Backend | Node.js + Express + TypeScript |
| Database | SQLite via Prisma (swappable to PostgreSQL) |
| Validation | Zod |
| Linting | ESLint + TypeScript strict mode |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd zenitty

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed
```

### Development

```bash
# Start both client and server
npm run dev
```

The app will be available at `http://localhost:5173` with the API running on `http://localhost:3001`.

### Build

```bash
# Build both workspaces
npm run build
```

### Lint

```bash
# Lint both workspaces
npm run lint
```

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
├── package.json            # Root workspace config
├── AGENTS.md               # Agent guide
└── README.md
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List tasks (query: search, status, priority, category, sort) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/stats` | Dashboard statistics |

## License

MIT

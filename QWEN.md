# ArchCour - Project Context

## Project Overview

**ArchCour** is a modern digital correspondence management system designed for Ferhat Abbas University of Sétif 1 (Algeria). The application digitizes administrative mail management with a multi-tenant architecture, enabling different administrative units (General Secretariat, Faculties, Institutes) to operate on a unified platform while maintaining data isolation.

### Core Features

- **Multi-Tenancy**: Isolated workspaces for each administrative unit with centralized super-admin control
- **Correspondence Management**: Full CRUD operations for incoming/outgoing mail with automatic numbering
- **Hierarchical Classification**: Categories and types (internal/external, incoming/outgoing)
- **Advanced Search**: Real-time search with multiple criteria and sortable results
- **Transfer System**: Internal mail forwarding with notifications and sharing capabilities
- **Role-Based Access**: Super Admin, Admin, User, and Viewer permission levels
- **Audit Logging**: Complete operation tracking for compliance
- **Internationalization**: Arabic (ar) and French (fr) support via Paraglide

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | SvelteKit 2.50+ with Svelte 5.5+ |
| **Language** | TypeScript 5.9+ |
| **Database** | SQLite (LibSQL) with Drizzle ORM 0.45+ |
| **Authentication** | Better Auth 1.4+ |
| **Styling** | Tailwind CSS 4.1+ with Forms & Typography plugins |
| **i18n** | Inlang Paraglide JS 2.10+ |
| **Build Tool** | Vite 7.3+ |
| **Linting** | ESLint 9.39+ with TypeScript ESLint |
| **Formatting** | Prettier 3.8+ with Svelte & Tailwind plugins |

## Project Structure

```
archicour/
├── src/
│   ├── lib/
│   │   ├── assets/          # Static assets (images, icons)
│   │   ├── paraglide/       # Generated i18n files (auto-generated)
│   │   └── server/
│   │       ├── db/
│   │       │   ├── auth.schema.ts   # Better Auth tables (user, account)
│   │       │   ├── index.ts         # Database connection export
│   │       │   └── schema.ts        # Application tables (tenant, correspondence, etc.)
│   │       └── auth.ts              # Better Auth configuration
│   │   └── index.ts         # $lib alias entry point
│   ├── routes/
│   │   ├── app/             # Authenticated application routes
│   │   │   ├── categories/
│   │   │   ├── correspondences/
│   │   │   ├── correspondents/
│   │   │   ├── dashboard/
│   │   │   ├── logout/
│   │   │   └── settings/
│   │   ├── demo/            # Demo/example routes
│   │   ├── login/           # Authentication pages
│   │   └── *.svelte         # Root layout and pages
│   ├── app.d.ts             # TypeScript type declarations
│   ├── app.html             # HTML template
│   ├── hooks.server.ts      # Server hooks (auth, i18n middleware)
│   └── hooks.ts             # Shared hooks
├── messages/                # i18n message files (ar.json, fr.json)
├── project.inlang/          # Inlang i18n project configuration
├── scripts/
│   └── seed.ts              # Database seeding script
├── static/                  # Static assets served at root
└── [config files]
```

## Database Schema

### Core Tables

| Table | Description |
|-------|-------------|
| `tenant` | Administrative units (secretariats, faculties) |
| `user_tenant_role` | User-to-tenant role assignments |
| `category` | Correspondence categories per tenant |
| `correspondent` | Senders/recipients (internal/external) |
| `correspondence` | Main correspondence records |
| `attachment` | PDF attachments linked to correspondences |
| `correspondence_link` | Many-to-many correspondence relationships |
| `transfer` | Mail transfers between users |
| `tenant_settings` | Per-tenant configuration (academic year, deletion grace period) |
| `audit_log` | Operation audit trail |

### Auth Tables (Better Auth)

| Table | Description |
|-------|-------------|
| `user` | User accounts |
| `account` | Authentication credentials |

## Building and Running

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
# Database (SQLite file path)
DATABASE_URL=file:local.db

# Application origin (required for auth)
ORIGIN=http://localhost:5173

# Auth secret (32+ characters, high entropy for production)
BETTER_AUTH_SECRET=your-secret-key-here
```

### Development

```bash
# Start development server
npm run dev

# Start and open in browser
npm run dev -- --open
```

### Database Commands

```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema to database (development)
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

**Default credentials after seeding:**
- Email: `admin@univ-setif.dz`
- Password: `admin123`

### Auth Schema Generation

```bash
# Generate Better Auth schema
npm run auth:schema
```

### Build & Preview

```bash
# Type check
npm run check

# Watch mode type checking
npm run check:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Development Conventions

### Code Style

- **Indentation**: Tabs (see `.prettierrc`)
- **Quotes**: Single quotes
- **Trailing Commas**: None
- **Print Width**: 100 characters
- **File Extensions**: `.svelte.ts` for Svelte-specific TypeScript files

### Architecture Patterns

1. **Multi-Tenancy**: All application tables include `tenantId` for data isolation
2. **Server-Side Auth**: Session management via `hooks.server.ts` using Better Auth
3. **i18n Middleware**: Paraglide middleware in `hooks.server.ts` for locale handling
4. **Database Access**: Single `db` export from `$lib/server/db/index.ts`

### Testing Practices

- Type checking via `svelte-check` (strict mode enabled in `tsconfig.json`)
- ESLint with TypeScript and Svelte plugins
- Prettier for consistent formatting

### Commit Conventions

Follow conventional commits when applicable. Review recent commits with:
```bash
git log -n 5 --oneline
```

## Key Configuration Files

| File | Purpose |
|------|---------|
| `svelte.config.js` | SvelteKit adapter configuration |
| `vite.config.ts` | Vite plugins (Tailwind, SvelteKit, Paraglide) |
| `drizzle.config.ts` | Drizzle ORM schema and migration settings |
| `tsconfig.json` | TypeScript strict mode with bundler module resolution |
| `eslint.config.js` | Flat config with TypeScript, Svelte, and Prettier |
| `.prettierrc` | Code formatting rules |
| `project.inlang/` | Inlang i18n project settings |

## Important Notes

- The adapter is set to `@sveltejs/adapter-auto` - for production deployment, configure the appropriate adapter for your target environment
- Database uses SQLite with LibSQL client - suitable for development and small deployments
- The `prepare` script runs `svelte-kit sync` to ensure type generation before other commands
- All entity tables use UUID primary keys with `crypto.randomUUID()`
- Soft-delete pattern: entities have `createdAt`/`updatedAt` timestamps; hard deletes use cascade

## Common Workflows

### Adding a New Feature

1. Create route in `src/routes/app/`
2. Add database schema if needed in `src/lib/server/db/schema.ts`
3. Generate migration: `npm run db:generate`
4. Apply migration: `npm run db:push` (dev) or `npm run db:migrate` (prod)
5. Add i18n messages in `messages/*.json`
6. Run type check: `npm run check`

### Adding a New Tenant

1. Insert into `tenant` table with unique slug
2. Assign user roles via `user_tenant_role`
3. Initialize `tenant_settings`
4. Create default categories

## Troubleshooting

- **Database not found**: Ensure `DATABASE_URL` points to existing file or use `file:local.db` to create
- **Auth errors**: Verify `ORIGIN` matches development server URL and `BETTER_AUTH_SECRET` is set
- **Type errors**: Run `npm run svelte-kit sync` manually if types are out of sync
- **i18n issues**: Check `project.inlang` configuration and regenerate with `npm run dev`

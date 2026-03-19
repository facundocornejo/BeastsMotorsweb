# CLAUDE.md — Beast Motors Dealership Website

## Project Overview

Beast Motors is a car dealership in Paraná, Entre Ríos, Argentina. This project is a catalog website to showcase their inventory (used cars, 0km, used motorcycles, and imported Chinese vehicles under the "Next Generation" sub-brand) and drive WhatsApp inquiries.

**This is NOT an e-commerce site.** It's a digital catalog optimized for generating WhatsApp consultations. Every design and technical decision should serve this goal.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3+
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Image Storage:** Cloudinary (NOT Supabase Storage)
- **Hosting:** Vercel (free tier initially)
- **Analytics:** GA4 + Microsoft Clarity
- **Fonts:** Plus Jakarta Sans (body) + Fraunces (display headings) via next/font

## Key Architecture Decisions

- **Mobile-first**: Design and build for mobile FIRST, then adapt to desktop. 80%+ users will be on phones.
- **SSR/ISR for SEO**: Public pages use ISR (revalidate: 60s). Catalog with filters uses SSR. Admin is client-side only.
- **No Vercel-specific features**: Do NOT use `@vercel/og`, `@vercel/analytics`, `@vercel/kv`, or Edge Runtime. The project will migrate to Oracle Cloud VPS in ~3 months. Use only standard Node.js runtime.
- **Cloudinary for images**: All vehicle photos go through Cloudinary. Store Cloudinary URLs in the database, never store images in Supabase Storage or locally.
- **WhatsApp as primary CTA**: Every vehicle card, every vehicle page, and the floating button should lead to WhatsApp with a pre-built message including vehicle name, price, and page URL.
- **Single admin user**: One email/password login via Supabase Auth. No roles, no multi-tenancy.

## Color Palette (APPROVED)

| Token | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Primary | `--blue-deep` | `#03588C` | Main brand, headers, primary buttons |
| Secondary | `--blue-mid` | `#0578A6` | Secondary elements, links |
| Accent Light | `--blue-light` | `#24A3BF` | Hover states, highlights |
| Accent/CTA | `--rose` | `#D91E50` | CTA buttons, badges, highlights |
| Accent Dark | `--rose-dark` | `#B8183F` | Hover/active state for CTAs |
| Background | `--cream-bg` | `#FBF7F2` | Page background |
| Surface Soft | `--cream-soft` | `#F8F1E8` | Alternate sections |
| Surface Warm | `--cream` | `#F2DCC2` | Warm accent surfaces |
| Surface | `--white` | `#FFFFFF` | Card backgrounds |
| Text Primary | `--dark-900` | `#0D1B1E` | Main text |
| Text Secondary | `--dark-600` | `#244550` | Secondary text |
| Text Muted | `--gray-400` | `#7A9099` | Placeholders, captions |
| Border | `--gray-200` | `#C8D5DA` | Borders, dividers |
| WhatsApp | `--green-wa` | `#25D366` | WhatsApp buttons indicator |

Design tokens: `--radius: 10px`, `--radius-sm: 6px`

Full palette reference: `docs/colors-pending.md`

## Design Guidelines

- **Typography**: Fraunces (serif, italic for emphasis) for headings and display numbers. Plus Jakarta Sans for body text, labels, buttons.
- **Spacing**: Generous whitespace. Don't crowd elements. Let photos breathe.
- **Cards**: Rounded corners (border-radius: 10px), subtle shadows, hover lifts with translateY(-3px). Photo on top, info below.
- **Buttons**: Primary CTAs in solid dark/accent color. WhatsApp buttons always include a small green dot indicator.
- **Badges**: "Nuevo", "Destacado", "0km", "Moto" — small uppercase tags on vehicle photos.
- **Layout**: V4 mockup as reference (see docs/ folder). Hero → Filters → Featured carousel → Catalog grid → Finance → Sell your car → Happy sales → About → Footer.
- **NO generic SaaS aesthetics**: No purple gradients, no glow effects, no Inter/Roboto fonts. The design should feel like a refined automotive catalog.

## Custom Skills (installed in `.claude/skills/`)

### Development Workflow Skills
- **`/feature-dev`** — Full feature orchestrator: discovery → codebase exploration → clarifying questions → architecture design → implementation → review → summary. Use for ANY non-trivial feature.
- **`/code-explorer`** — Deep codebase analysis: traces execution paths, maps architecture layers, documents dependencies. Used as subagent by `/feature-dev` or standalone to understand existing code.
- **`/code-architect`** — Designs feature architectures: analyzes patterns, provides implementation blueprints with specific files, data flows, and build sequences. Used as subagent by `/feature-dev` or standalone.
- **`/code-reviewer`** — Code review with confidence scoring (only reports issues ≥80% confidence). Reviews bugs, security, conventions, quality. Run after implementation.
- **`/code-simplifier`** — Refines recently modified code for clarity and consistency without changing behavior. Run after each feature to clean up. Uses Opus model.

### Design & Security Skills
- **`/frontend-design`** — Creates distinctive, production-grade UI. Anti-generic aesthetics. Bold typography, color, and motion choices. Use when building visual components.
- **`/backend-security-coder`** — Secure backend coding: input validation, auth, API security, DB protection, CSRF, SSRF prevention. Use when implementing API routes, auth, or file uploads.

### SEO Skills (Phase 3)
- **`/seo-keyword-strategist`** — Keyword density analysis, LSI keywords, entity mapping, over-optimization detection. Use when writing page content.
- **`/seo-meta-optimizer`** — Optimized meta titles, descriptions, URL structure. Character limit compliance, A/B variations. Use when creating page metadata.

### Recommended Flow Per Feature
```
/feature-dev "feature name"
  ├── Internally uses /code-explorer (understand codebase)
  ├── Internally uses /code-architect (design solution)
  ├── Apply /frontend-design (if UI work)
  ├── Apply /backend-security-coder (if API/auth work)
  ├── Run /code-reviewer (quality gate)
  └── Run /code-simplifier (final cleanup)
```

## Model Selection Strategy

- **Planning & Architecture**: For medium to complex tasks, use **Opus 4.5/4.6** to draft the plan, analyze constraints, and define the architecture.
- **Implementation**: Once the plan is approved, use **Sonnet 4.6** for the actual coding and implementation phases to ensure speed and efficiency.

## Token Management & Continuity

- **Active Monitoring**: Constantly analyze remaining token capacity during a session.
- **Graceful Cutoff**: If tokens are running low and the task is unlikely to be completed, STOP processing before hitting the limit. 
- **The "handoff" Protocol**: Use the remaining tokens to create/update a `tasks/TODO.md` file. This file must explicitly state:
    1. What has been successfully implemented.
    2. The exact point where the execution stopped.
    3. Detailed instructions/context for the next session to resume without loss of information.
- **Session Logging**: After every task (completed or partial), create or update `tasks/changelog.md` to maintain a persistent record of all modifications and project evolution.

## Workflow Orchestration

### 1. Planning Mode by Default
- Enter planning mode for ANY non-trivial task (more than 3 steps or architectural decisions)
- If something goes wrong, STOP and re-plan immediately; don't keep pushing
- Use planning mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Sub-agent Strategy
- Use sub-agents frequently to keep the main context window clean
- Delegate research, exploration, and parallel analysis to sub-agents
- For complex problems, devote more compute via sub-agents
- One task per sub-agent for focused execution

### 3. Self-Improvement Loop
- After ANY user correction: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Iterate relentlessly on these lessons until error rate decreases
- Review lessons at session start for the corresponding project

### 4. Verify Before Completing
- Never mark a task as complete without demonstrating it works
- Compare behavioral diff between main branch and your changes when relevant
- Ask yourself: "Would a Staff Engineer approve this?"
- Run tests, check logs, and demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes; don't over-engineer
- Question your own work before presenting it

### 6. Autonomous Bug Fixing
- When receiving a bug report: just fix it. Don't ask to be hand-held.
- Identify logs, errors, or failing tests and then resolve them.
- Zero need for user context switching.
- Go fix failing CI tests without being told how.

### 7. Persistent Progress Tracking
- Every time a task or sub-task is finished, update `tasks/history.md` or a similar persistent log to ensure a clear audit trail of the work performed.

## Task Management

1. **Plan First**: Write the plan in `tasks/todo.md` with checkable items
2. **Verify Plan**: Confirm before starting implementation
3. **Track Progress**: Check off items as you complete them
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add a review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Affect the minimum code necessary.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's needed. Avoid introducing bugs.

## File Structure

See `docs/ARCHITECTURE.md` for the complete folder structure.

Key convention: feature-based organization inside `src/components/` (not file-type based).

```
src/components/
├── ui/          # Reusable base components (Button, Input, Card, Badge)
├── layout/      # Header, Footer, Navigation, WhatsAppFloat
├── vehicles/    # VehicleCard, VehicleGrid, VehicleFilters, VehicleGallery
├── home/        # HeroSection, FeaturedSection, FinanceSection, SellSection
└── admin/       # VehicleForm, ImageUploader, AdminSidebar
```

## Database Schema

See `docs/ARCHITECTURE.md` for full schema. Key tables:
- `vehicles` — all vehicles (cars, motorcycles, next-gen)
- `happy_sales` — sold vehicles with client photos
- `site_config` — key-value store for WhatsApp number, address, etc.

All tables have RLS enabled. Public can only SELECT non-sold vehicles. Only authenticated users can INSERT/UPDATE/DELETE.

## Important Constraints

- **Stock is small**: 3-14 vehicles at any time. The UI must look good with minimal inventory.
- **Single admin**: One shared login. Keep the admin UI extremely simple.
- **Migration-ready**: In ~3 months we'll move to Oracle Cloud VPS with Docker. No Vercel lock-in.
- **Budget is tight**: USD 600 total. Be efficient. Don't over-engineer.
- **WhatsApp is king**: No web forms for customer contact. Everything goes through WhatsApp links.

## SEO Requirements

- Dynamic meta tags per page (title, description, og:image)
- Auto-generated sitemap.xml including all vehicle pages
- Schema.org Vehicle markup on each vehicle page
- Clean URLs: `/vehiculos/toyota-corolla-xei-2023` not `/vehiculos/123`
- Target keywords: "autos usados", "autos 0km", "Haval oficial", "concesionaria Paraná", "venta de autos", "motos usadas"

## Environment Variables

All secrets in `.env.local` (never committed). See `.env.local.example` for the template.

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`

## Git Workflow

- `main` branch is production
- Feature branches: `feature/vehicle-crud`, `feature/catalog-filters`, etc.
- Commit messages in English, descriptive
- Push to main triggers auto-deploy on Vercel

## Testing Strategy

- TypeScript strict mode catches type errors
- Manual testing for UI (no unit test requirement given budget)
- Lighthouse audits for performance/SEO
- Security plugin catches common vulnerabilities
- Browser testing: Chrome mobile, Safari mobile, Chrome desktop

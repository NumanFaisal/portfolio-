# Numan Faisal — Portfolio

Production-grade personal portfolio built with Next.js App Router, Tailwind CSS v4, React Three Fiber, GSAP, and Framer Motion.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript strict
- **Styling**: Tailwind CSS v4 + CSS variables design tokens
- **3D**: React Three Fiber + @react-three/drei
- **Animation**: GSAP + ScrollTrigger, Framer Motion, Lenis
- **Data validation**: Zod (build-time, fails build on invalid data)
- **Email**: Resend
- **Deployment**: Vercel

## Setup

```bash
# 1. Clone
git clone https://github.com/NumanFaisal/portfolio
cd portfolio

# 2. Install
npm install

# 3. Environment variables
cp .env.example .env.local
# Fill in your values (see below)

# 4. Run dev server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | Optional | GitHub PAT for pinned repo sync |
| `RESEND_API_KEY` | For prod | Resend API key for contact form |
| `REVALIDATE_SECRET` | For prod | Random string to protect `/api/revalidate` |
| `CONTACT_TO_EMAIL` | Optional | Email address to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | For prod | Your deployed URL, e.g. `https://numanfaisal.dev` |

## How to Add a Project

1. Open `data/projects.json`
2. Add a new object matching the `ProjectSchema` in `data/schemas/project.ts`
3. Set `"featured": true` to show it in the bento grid (max 6 shown)
4. Add a screenshot to `public/images/projects/your-project.png`
5. Done — the site, sitemap, and resume page update automatically

## How to Add a Job

1. Open `data/experience.json`
2. Add a new object matching the `ExperienceSchema` in `data/schemas/experience.ts`
3. Done — timeline, resume page, and PDF all update automatically

## Project Structure

```
app/                    # Next.js App Router routes
  api/
    contact/route.ts    # Contact form API (Resend)
    og/route.tsx        # Dynamic OG image generation
    revalidate/route.ts # On-demand ISR revalidation
  projects/[slug]/      # Case study pages
  resume/               # Online resume page
  not-found.tsx         # Custom 404
  layout.tsx            # Root layout + metadata
  page.tsx              # Home page
components/
  layout/               # Nav, Footer
  providers/            # ThemeProvider, LenisProvider
  sections/             # Hero, ProofStrip, Projects, Experience, About, Skills, Education, Contact
  three/                # HeroCanvas (React Three Fiber)
  ui/                   # Button, Chip, Badge, SectionHeading, Toaster, CustomCursor
data/
  profile.json          # Personal info, stats, links
  experience.json       # Work history
  projects.json         # Project data
  schemas/              # Zod schemas (validated at build time)
lib/
  utils.ts              # Helper functions
public/
  images/               # Project screenshots, photos
.github/workflows/      # CI/CD pipeline
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set all environment variables in Vercel dashboard
4. Deploy

The GitHub Action (`.github/workflows/ci.yml`) runs lint, typecheck, and build on every push, then triggers a Vercel deploy hook and cache revalidation.

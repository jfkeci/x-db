# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

x-db is an exercise database website built with Astro 5. It features a fitness-focused blog and an exercise collection with detailed guides. The site deploys to GitHub Pages at `https://jfkeci.github.io/x-db`.

## Commands

```bash
npm run dev      # Start dev server (localhost:4322/x-db/)
npm run build    # Build to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

**Content Collections** (`src/content.config.ts`):
- `blog` - Blog posts with title, description, pubDate, heroImage
- `exercises` - Exercise guides with name, category (Strength/Cardio/Core/Flexibility/Compound), muscleGroups, difficulty (Beginner/Intermediate/Advanced), equipment

**Key Configuration** (`astro.config.mjs`):
- Base path is `/x-db` - all internal links must use `${import.meta.env.BASE_URL}` prefix
- Integrations: MDX, Sitemap, Tailwind CSS

**Page Routes**:
- `/` - Home with workout cards
- `/exercises/` - Exercise collection grid
- `/exercises/[slug]/` - Individual exercise detail
- `/blog/` - Blog listing
- `/blog/[slug]/` - Individual blog post

**Styling**:
- Tailwind CSS with glassmorphism design (`glass`, `glass-card` classes in `src/styles/global.css`)
- Dark mode support via class toggling on `<html>`
- Animated background blobs on all pages

**Global Constants** (`src/consts.ts`):
- `SITE_TITLE`, `SITE_DESCRIPTION` - Import these for consistent metadata

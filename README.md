# x-db

An exercise database website built with [Astro 5](https://astro.build). Features a fitness-focused blog and an exercise collection with detailed guides.

**Live site:** https://jfkeci.github.io/x-db

## About

x-db is a fitness resource designed to help users discover and learn exercises. The website provides a searchable collection of exercises organized by category, muscle group, and difficulty level. Each exercise includes step-by-step instructions and equipment requirements. The blog section offers fitness tips, workout guides, and training advice.

The codebase uses Astro's content collections to manage exercises and blog posts as MDX files, making it easy to add new content. The UI features a modern glassmorphism design with dark mode support, built using Tailwind CSS utility classes.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (runs at localhost:4322/x-db/)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── content/
│   ├── blog/          # Blog posts (MDX)
│   └── exercises/     # Exercise guides (MDX)
├── layouts/           # Page layouts
├── pages/
│   ├── blog/          # Blog routes
│   └── exercises/     # Exercise routes
├── components/        # Reusable components
├── styles/            # Global CSS
└── consts.ts          # Site constants
```

## Content Collections

### Blog
Posts with title, description, pubDate, and heroImage.

### Exercises
Exercise guides with:
- **category**: Strength, Cardio, Core, Flexibility, Compound
- **muscleGroups**: Target muscles
- **difficulty**: Beginner, Intermediate, Advanced
- **equipment**: Required equipment

## Tech Stack

- [Astro 5](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Content authoring

## Deployment

The site deploys to GitHub Pages. All internal links use the `/x-db` base path.

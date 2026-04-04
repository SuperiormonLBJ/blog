# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on port 3001
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Start production server on port 3001
```

There are no tests in this project.

## Architecture

This is a single-page personal portfolio/blog built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

**Key files:**
- `src/app/layout.tsx` — Root layout with fixed navbar, background music player (`/music.mp3`), and footer. Marked `"use client"` to handle audio state.
- `src/app/page.tsx` — The entire site is a single page with three animated sections: Hero (with About Me toggle), Featured Projects, Passion Beyond Tech (hobbies), and Contact.
- `src/data/featured-posts.ts` — Add/edit tech project cards here. Each entry needs a `tags` array of filenames (e.g. `"java.png"`) that must exist in `/public/`.
- `src/data/hobby-posts.ts` — Hobby card data; images are auto-resolved from `/public/hobby/<category>.png`.
- `src/types/post.ts` — Shared `Post`, `FeaturedPost`, and `HobbyPost` interfaces.
- `src/components/PretextMultiline.tsx` — Custom text layout component using `@chenglou/pretext` for canvas-measured responsive text rendering. Used for the hero heading/subheading animations.

**Styling:**
- Dark theme enforced via CSS variables defined in `globals.css` (e.g. `--background: #000`, `--accent: #0066cc`).
- Use `var(--accent)`, `var(--card-background)`, etc. rather than hardcoded colors.
- Reusable Tailwind component classes are defined in `globals.css` under `@layer components`: `.apple-container`, `.apple-heading`, `.apple-button`, `.apple-card`, `.nav-link`, `.floating`.

**Content updates:**
- To add a project: add an entry to `src/data/featured-posts.ts` and place the card image in `public/Tech-Project/` and any tag icon PNGs in `public/`.
- To add a hobby: add an entry to `src/data/hobby-posts.ts` and place the image at `public/hobby/<category-lowercase>.png`.

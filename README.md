# A1 Buller Auto — Next.js Local Business Website

An enterprise-grade, multi-page marketing site for **A1 Buller Auto**, built with the
Next.js **Pages Router** (`src/pages/`), **Tailwind CSS**, and **Framer Motion**.
It ships a unified typographic system, a light/dark theme context, high-fidelity
motion, and a **programmatic SEO (pSEO)** engine for local lead generation.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm run start
```

> Requires Node.js 18.18+ (Next.js 15).

Copy `.env.example` to `.env.local` and provide the Resend values
before testing form delivery. `UPLIFTAI_API_TOKEN` is optional and only powers
the remote blog feed.

## What's included

- **Unified typography** — Plus Jakarta Sans (headings, `font-display` /
  `--font-jakarta`) + Inter (body, `font-sans` / `--font-inter`), both
  self-hosted via `next/font` for a consistent, layout-shift-free type system.
- **Service catalog + appointment requests** — `/services` lists all 11 core
  service categories with local imagery, service details, and a preferred
  date/time selector. Requests are persisted in the cart until they are emailed
  to the shop through the real booking API.
- **True navigation** — the navbar uses real page redirection: Home `/`,
  Services `/services`, Contact Us `/contact` (no inner-page anchor scrolling).
- **Theme context** — Light (white + cobalt/sapphire) and Dark (deep black +
  metallic slate) modes via a `dark` class on `<html>`, persisted to
  `localStorage`, with a pre-hydration script in `_document.jsx` to prevent a
  flash of the wrong theme.
- **Framer Motion** — staggered page-load sequences, scroll reveals, hover
  micro-interactions, animated theme toggle, mobile slide-in drawer, and modal
  transitions. Reduced-motion is respected globally in `globals.css`.
- **Service imagery** — locally hosted, optimized service images appear on the
  homepage, catalog cards, detail views, and image lightbox without third-party
  hotlinks.
- **Lead-capture form** — full name, email, message, and a drag-and-drop /
  click-to-upload area for damage photos, with client-side validation and an
  animated success state.
- **Programmatic SEO** — `src/pages/services/[service]/[location].jsx` generates
  a unique, statically rendered landing page for every service × location, each
  with custom title, meta description, H1, body copy, JSON-LD, and internal links.

## Project structure

```
a1bullerautocollision/
├── next.config.js
├── postcss.config.js
├── tailwind.config.js          # dark mode: 'class', brand + metal palettes, font var
├── jsconfig.json               # '@/*' path alias -> src/*
├── public/
│   └── favicon.svg
└── src/
    ├── context/
    │   ├── ThemeContext.jsx     # light/dark provider + persistence
    │   └── CartContext.jsx      # appointment request cart + localStorage
    ├── data/
    │   ├── seo.js               # programmatic-SEO services/locations
    │   └── servicesCatalog.js   # the 11 core services + 30-min TIME_SLOTS
    ├── components/
    │   ├── ui/                  # Button, Input/Textarea, Card, ModeToggle, Modal
    │   ├── layout/             # Navbar (true routes + cart badge), Footer, LayoutWrapper
    │   └── sections/           # Hero, Intro, ContactSection
    ├── pages/
    │   ├── _app.jsx            # providers (Theme/Cart) + fonts + layout shell
    │   ├── _document.jsx       # <html lang> + no-flash theme script
    │   ├── index.jsx           # homepage (Hero + Intro + ContactSection)
    │   ├── services.jsx        # 11-service visual catalog + request scheduler
    │   ├── checkout.jsx        # appointment request review + customer details
    │   ├── contact.jsx         # dedicated contact page
    │   ├── certifications.jsx
    │   └── services/
    │       └── [service]/
    │           └── [location].jsx   # pSEO engine (getStaticPaths/getStaticProps)
    └── styles/
        └── globals.css        # Tailwind layers + theme CSS variables
```

## How the pSEO engine works

`src/data/seo.js` defines two dictionaries — `services` and `locations`. The
dynamic route multiplies them:

- `getStaticPaths` enumerates every `service × location` pair (`getAllPaths()`),
  with `fallback: 'blocking'` so newly added combinations render on first
  request and are then cached.
- `getStaticProps` resolves the pair, returns `notFound` for junk URLs, and
  calls `buildSeo(service, location)` to assemble the page's title, meta
  description, H1, keywords, and canonical URL.

Example generated URLs:

```
/services/tesla-aluminum-repair/burnaby
/services/frame-racking/vancouver
/services/icbc-collision-repair/new-westminster
```

Add a service or a Metro Vancouver service area to the dictionaries and new optimized pages are
minted automatically.

## Form delivery

Contact and appointment-request forms post to server-side API routes, validate
the submitted data, apply a lightweight honeypot check, and send through Resend
when the required environment variables are configured. The site does not
present demo accounts, fake repair tracking, unverified online prices, or a
pretend live-availability calendar.

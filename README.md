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

> Requires Node.js 18.18+ (Next.js 14).

## What's included

- **Unified typography** — Plus Jakarta Sans (headings, `font-display` /
  `--font-jakarta`) + Inter (body, `font-sans` / `--font-inter`), both
  self-hosted via `next/font` for a consistent, layout-shift-free type system.
- **Service catalog + cart** — `/services` lists all 10 core service categories
  with sub-items and an inline 30-minute-interval scheduler (9:00 AM–4:30 PM).
  "Add to Cart" pushes `{ serviceName, date, time }` into `CartContext`
  (persisted to `localStorage`); the navbar shows a live animated badge count.
- **Checkout intercept** — `/checkout` reviews the cart; clicking
  "Confirm Booking" while signed out surfaces the `AuthModal` (login / register
  redirect). Browsing and adding to cart stay fully anonymous.
- **True navigation** — the navbar uses real page redirection: Home `/`,
  Services `/services`, Contact Us `/contact` (no inner-page anchor scrolling).
- **Theme context** — Light (white + cobalt/sapphire) and Dark (deep black +
  metallic slate) modes via a `dark` class on `<html>`, persisted to
  `localStorage`, with a pre-hydration script in `_document.jsx` to prevent a
  flash of the wrong theme.
- **Framer Motion** — staggered page-load sequences, scroll reveals, hover
  micro-interactions, animated theme toggle, mobile slide-in drawer, and modal
  transitions. Reduced-motion is respected globally in `globals.css`.
- **Optional auth + booking intercept** — browsing is never gated. Clicking
  "Book an Appointment" (or submitting the contact form) while signed out opens
  a modal inviting login / registration, with a "continue as guest" escape.
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
    │   ├── AuthContext.jsx      # optional mock auth + booking-intercept state
    │   └── CartContext.jsx      # booking cart (add/remove/clear) + localStorage
    ├── data/
    │   ├── seo.js               # programmatic-SEO services/locations
    │   └── servicesCatalog.js   # the 10 core services + 30-min TIME_SLOTS
    ├── components/
    │   ├── ui/                  # Button, Input/Textarea, Card, ModeToggle, Modal, BookingPromptModal, AuthModal
    │   ├── layout/             # Navbar (true routes + cart badge), Footer, LayoutWrapper
    │   └── sections/           # Hero, Intro, ContactSection
    ├── pages/
    │   ├── _app.jsx            # providers (Theme/Auth/Cart) + fonts + layout shell
    │   ├── _document.jsx       # <html lang> + no-flash theme script
    │   ├── index.jsx           # homepage (Hero + Intro + ContactSection)
    │   ├── services.jsx        # 10-service catalog + inline scheduler + add-to-cart
    │   ├── checkout.jsx        # cart review + AuthModal login intercept
    │   ├── contact.jsx         # dedicated contact page
    │   ├── login.jsx
    │   ├── register.jsx
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
/services/tesla-aluminum-repair/astoria
/services/frame-racking/jamaica
/services/uber-tlc-inspection/long-island-city
```

Add a service or a neighborhood to the dictionaries and new optimized pages are
minted automatically.

## Notes on the mock layer

Authentication and form submission are front-end mocks for demonstration.
Replace the bodies of `AuthContext.login/register` and the `actuallySubmit`
handler in `ContactSection.jsx` with real API / CRM calls (or NextAuth) for
production. All contact/booking data and uploaded files are held in component
state only until you wire a backend.

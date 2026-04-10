# Orbitly — SaaS Landing Page Template

> A free, open-source Next.js landing page template for SaaS products. Built by [Antimatter AI](https://antimatterai.com) as part of the [Open Antimatter](https://github.com/mattantimatter) template collection.

![Orbitly Preview](https://jdw6cqbfdn8.manus.space)

---

## Overview

**Orbitly** is a production-ready, single-page SaaS landing page template built with React 19, Tailwind CSS 4, and Framer Motion. It's designed to look and feel like a premium, agency-built product site — not a generic template.

This template is part of the **Open Antimatter** collection: a curated set of open-source landing page templates for modern startups, agencies, and AI products.

---

## What's Included

| Section | Description |
|---|---|
| **Navbar** | Scroll-aware glass blur, active section indicator, mobile hamburger menu |
| **Hero** | Animated headline, live activity ticker, dashboard mockup, CTA buttons |
| **Logo Marquee** | Seamless infinite scroll with real company logos (Stripe, Notion, Vercel, GitHub, Slack, Supabase) |
| **Features** | Bento grid layout with glassmorphic cards and scroll-reveal animations |
| **How It Works** | Animated step-by-step process with count-up stats |
| **Testimonials** | Masonry card layout with real stock photo avatars, G2 and Product Hunt badges |
| **Pricing** | Monthly/annual toggle with animated pill, three-tier pricing cards |
| **CTA + Footer** | Email capture CTA, full footer with links and social icons |

---

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **Marquee:** react-fast-marquee
- **Routing:** Wouter
- **Language:** TypeScript

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repo
git clone https://github.com/mattantimatter/orbitly-template.git
cd orbitly-template

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
```

Output is in the `dist/` directory. Deploy to Vercel, Netlify, or any static host.

---

## Customization Guide

### 1. Replace the Brand

All brand-specific content is in clearly labeled component files under `client/src/components/`. Start here:

| File | What to change |
|---|---|
| `Navbar.tsx` | Logo, brand name, nav links |
| `Hero.tsx` | Headline, subheadline, CTA text, dashboard mockup image |
| `Features.tsx` | Feature cards, icons, descriptions |
| `Pricing.tsx` | Plan names, prices, feature lists |
| `Footer.tsx` | Company name, links, social handles |

### 2. Update Colors

All design tokens live in `client/src/index.css`. The primary accent is `--orbitly-purple`. To change the brand color, update these CSS variables:

```css
:root {
  --orbitly-purple: #696aac;       /* Primary accent */
  --orbitly-purple-light: #8b8fd4; /* Hover states */
  --orbitly-purple-glow: rgba(105, 106, 172, 0.15); /* Glow effects */
}
```

### 3. Update Fonts

Fonts are loaded via Google Fonts in `client/index.html`. The template uses:

- **Outfit** — Display headings
- **DM Sans** — Body copy
- **Fira Code** — Code/monospace accents

Replace the `<link>` tags in `client/index.html` to swap fonts.

### 4. Replace the Dashboard Mockup

The hero mockup image is referenced in `Hero.tsx`. Replace the `src` URL with your own product screenshot or Figma export:

```tsx
// In Hero.tsx — find the mockup img tag
<img src="YOUR_SCREENSHOT_URL" alt="Product dashboard" />
```

Upload your image to a CDN (Cloudinary, Vercel Blob, etc.) and use the public URL.

### 5. Update the Logo Marquee

The company logos in the marquee are inline SVGs in `Hero.tsx` inside the `CompanyLogos` array. Add, remove, or replace entries as needed.

### 6. Update Testimonials

Testimonial data is in `Testimonials.tsx` in the `testimonials` array. Each entry has:

```ts
{
  name: string;
  role: string;
  company: string;
  avatar: string; // Unsplash or CDN URL
  quote: string;
  rating: number;
}
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
pnpm build
# Drag and drop the dist/ folder to Netlify Drop
```

### Docker

```bash
docker build -t orbitly .
docker run -p 3000:3000 orbitly
```

---

## Part of Open Antimatter

This template is one of five in the **Open Antimatter** collection — a free, open-source set of professional landing page templates built by [Antimatter AI](https://antimatterai.com).

| Template | Category | Repo |
|---|---|---|
| **Orbitly** | SaaS | [github.com/mattantimatter/orbitly-template](https://github.com/mattantimatter/orbitly-template) |
| **Nexus AI** | Enterprise AI | Coming soon |
| **Studio Veil** | Creative Agency | Coming soon |
| **Prism** | Chat / Conversational AI | Coming soon |
| **Fieldwork** | Home Services | Coming soon |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/my-improvement`)
5. Open a Pull Request

---

## License

MIT — free to use for personal and commercial projects. Attribution appreciated but not required.

---

## Built by Antimatter AI

[Antimatter AI](https://antimatterai.com) is an AI-first product, design, and engineering company building intelligent software, agentic systems, and high-end digital experiences.

**⭐ If this template saved you time, please star the repo — it helps others find it.**

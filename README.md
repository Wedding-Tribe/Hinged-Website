# Hinged Website (`Hinged-Website`) 💍

> **Public showcase landing website & lead capture suite** for [Hinged](https://github.com/Wedding-Tribe/hinged) — The WhatsApp-first, open-source wedding coordination hub designed specifically for multi-day Indian celebrations.

[![Live Showcase](https://img.shields.io/badge/Live_Showcase-GitHub_Pages-brightgreen)](https://wedding-tribe.github.io/Hinged-Website/)
[![License: MIT](https://img.shields.io/badge/License-MIT-burgundy.svg)](https://github.com/Wedding-Tribe/hinged/blob/main/LICENSE)
[![Stack](https://img.shields.io/badge/Stack-React_18_%7C_Vite_5_%7C_Tailwind_CSS-amber)](https://github.com/Wedding-Tribe/hinged)
[![Lead Capture](https://img.shields.io/badge/Lead_Engine-Active-emerald)](https://wedding-tribe.github.io/Hinged-Website/)

---

## 🌐 Overview

This repository is the standalone **satellite showcase website** for **Hinged**, created to highlight the product in portfolio presentations and capture demand from engaged couples, families, and luxury wedding planners.

### Key Interactive Capabilities:
- **Identical Brand Parity:** Exact match with Hinged design language — ivory canvas (`#FAF7F2`), regal jewel burgundy (`#800020`), champagne gold, and Playfair serif typography.
- **Interactive 3-Theme Switcher:** Live preview across *Royal Indian*, *Modern Editorial*, and *Floral Celebration* stationery themes.
- **Interactive Catering Plate & Food Waste Calculator:** Real-time slider simulator demonstrating how strict household RSVP caps save ₹2,00,000 to ₹8,50,000+ in wasted catering plates for 400+ guest weddings.
- **Comprehensive Lead Forms & Interest Logging:**
  - **Couple & Family Early Access Form:** Captures wedding city/destination, date, expected guests, and preferred theme.
  - **Wedding Planner & Agency Partnership Form:** Captures agency scale, annual weddings, and multi-wedding enterprise requirements.
  - **Founder Connect Walkthrough Modal:** Direct 1-on-1 walkthrough booking with Founder Harshit Agarwal.
  - **Formspree Integration:** Automated lead logging to central webhook pipeline with instant feedback toasts.
- **Zero-Friction GitHub Pages CI/CD:** Ready for one-click static hosting with relative base path support.

---

## 🏛️ Related Repositories

| Repository | Purpose |
|---|---|
| [**Hinged (Monorepo)**](https://github.com/Wedding-Tribe/hinged) | Full product platform — Next.js 14 App Router, Supabase DAL, Host Dashboard, CSV Importer, WhatsApp Center & Scoped Guest RSVP |
| **Hinged-Website** (this repo) | Public marketing website & interactive portfolio showcase with lead capture |

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** + Custom Hinged Design Tokens
- **Lucide React** Icons
- **Canvas Confetti** for celebration feedback
- Pure client-side interactions with zero backend lock-in

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3200)
npm run dev

# 3. Build production bundle (outputs to dist/)
npm run build

# 4. Preview production build
npm run preview
```

---

## 🚢 Deployment

Builds to static `dist/` directory, automated via GitHub Actions workflow (`.github/workflows/deploy.yml`) to GitHub Pages. Also compatible with Vercel, Netlify, and Cloudflare Pages.

---

## 👤 Founder & Organization

- **Founder:** Harshit Agarwal ([@1997agarwal](https://github.com/1997agarwal))
- **Organization:** [Wedding-Tribe](https://github.com/Wedding-Tribe)
- **License:** MIT License

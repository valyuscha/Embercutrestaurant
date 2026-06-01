# EmberCut Restaurant Landing Page

## Project Overview
Running the EmberCut Restaurant landing page from the GitHub repository `valyuscha/Embercutrestaurant`.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite (port 3000)
- **Backend**: FastAPI minimal server (port 8001)
- **Styling**: Tailwind CSS v4
- **UI Libraries**: Radix UI, MUI, Lucide React

## Source Repository
`https://github.com/valyuscha/Embercutrestaurant`

## What's Been Implemented
- Cloned and set up the Vite + React + TypeScript restaurant landing page
- Configured Vite with `allowedHosts: true` and polling-based file watcher (to bypass ENOSPC inotify limit)
- Created minimal FastAPI backend server
- Installed all dependencies with Yarn
- Both frontend (port 3000) and backend (port 8001) running via supervisor
- **[2026-02]** About section: fixed responsive layout — changed `lg:grid-cols-2` → `sm:grid-cols-2` so image+text are side by side from 640px+; reduced image aspect from 4/5 → 3/4 and badge from 144→108px
- **[2026-02]** Location section: replaced Google Maps iframe with atmospheric restaurant exterior photo (cobblestone street at night) + address overlay (Świętego Krzyża 17 · KRAKÓW, POLSKA)
- **[2026-02]** Replaced broken placeholder image in Location section with live Google Maps iframe (Świętego Krzyża 17)
- **[2026-02]** Updated all real restaurant data across all 3 languages (PL/EN/DE):
  - Address: Świętego Krzyża 17, 31-023 Kraków
  - Phone: +48 511 191 368
  - Hours: Mon–Thu & Sun 14:00–22:00 | Fri–Sat 14:00–00:00
- **[2026-02]** Updated hardcoded values in Footer, Reservation, and Location components
- **[2026-02]** Updated reservation time slots to reflect real open hours (14:00 start)
- **[2026-02]** SEO title: "EmberCut Restaurant Kraków | Premium Steakhouse"

## Key Features of the Landing Page
- **Hero section**: Fullscreen background with "Ember Cut" branding
- **Navigation**: O NAS, KARTA DAN, GALERIA, OFERTA, LOKALIZACJA + language switcher (PL/EN/DE)
- **Reservation button**: REZERWACJA CTA
- **Dark/Light theme toggle**
- **Multi-language support**: Polish, English, German
- **Sections**: About, Menu, Gallery, Offers, Reservation, Location, Footer

## Setup Notes
- Vite uses `usePolling: true` due to limited inotify file watchers (ENOSPC workaround)
- `allowedHosts: true` required for Emergent preview URL
- React & React-DOM added as regular dependencies (were peerDependencies in original repo)

## Backlog / Next Steps
- Reservation form backend with Resend email confirmations (user chose Resend, deferred)
- Admin panel to view/manage reservations

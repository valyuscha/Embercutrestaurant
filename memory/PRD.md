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
- Add EmailJS integration for the reservation form
- Connect form submissions to backend
- Add Google Maps embed for Location section

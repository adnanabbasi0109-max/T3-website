# T3 Technologies Website

A premium, editorial-style website for T3 Technologies, a boutique creative agency with a sleek black minimal theme.

## Design System

### Colors (Dark Minimal Theme)
- **Background**: `#0A0A0A` (Deep black)
- **Text**: `#F5F5F5` (Off-white)
- **Muted Gray**: `#A0A0A0`
- **Soft Divider**: `#1F1F1F` (Subtle borders)
- **Accent Gold**: `#C6A15B` (used sparingly for emphasis)
- **Soft Wash**: `#111111` (Subtle backgrounds)

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- Editorial hierarchy with generous spacing
- Minimal, clean aesthetic with strong contrast

### Layout
- Max width: 1440px
- Content width: 1120px
- Desktop margins: 96px
- Spacing system: 8px base unit

## Pages

1. **Home** (`/`) - Hero, stats, domains, featured work, philosophy
2. **Work Index** (`/work`) - Filterable list of all workstories
3. **Work Detail** (`/work/:slug`) - Individual case study pages
4. **Domains** (`/domains`) - Six work domains with expandable details
5. **About** (`/about`) - Company philosophy and approach
6. **Contact** (`/contact`) - Contact form and information

## Key Features

- Fully responsive (desktop 1440px, mobile 390px)
- Smooth scroll navigation
- Sticky navigation with active states
- Mobile menu with escape key and overlay close
- Filter system for workstories (search, domain, industry, featured)
- Related workstories on detail pages
- Editorial typography with stacked label motifs
- Premium hover states and transitions

## Data Structure

All content is in `/src/app/data/`:
- `workstories.ts` - Case studies with filtering utilities
- `domains.ts` - Service domains

## Components

Reusable components in `/src/app/components/`:
- `Navigation` - Sticky nav with mobile menu
- `Footer` - Site footer
- `Button` - Multiple variants
- `Tag` - Domain/industry chips
- `WorkstoryCard` - Row and featured variants
- `FiltersBar` - Search and filter controls
- `SectionHeader` - Consistent section titles
- `StatsStrip` - Company metrics
- `ScrollToTop` - Auto-scroll on route change
- `FadeIn` - Scroll-triggered animations

## Tech Stack

- React 18.3
- React Router 7
- Tailwind CSS 4
- TypeScript
- Lucide React (icons)
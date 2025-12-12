# Metric - Culinary Sensory & Analytics Platform

A modern, professional Next.js website for Metric, an independent food and beverage product evaluation service.

## Features

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS with custom design system
- Glass morphism UI effects
- Iconify icons integration
- Fully responsive design
- SEO-optimized
- Modern, trustworthy aesthetic

## Design System

- **Brand Name**: Metric
- **Primary Color**: Orange (#ea580c / orange-600)
- **Color Palette**: Stone tones (stone-50 to stone-900)
- **Background**: #FAFAF9 (warm off-white)
- **Typography**: 
  - Headings: Plus Jakarta Sans
  - Body: Inter
- **Effects**: Glass morphism, subtle shadows, smooth transitions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

1. **Home** (`/`) - Hero, tasting service overview, awards showcase, process steps
2. **About Us** (`/about`) - Mission, evaluation process, product categories, trust principles
3. **Services** (`/services`) - Product testing, sensory evaluation, quality scoring, certification
4. **Awards** (`/awards`) - Gold/Silver/Bronze awards, criteria, benefits
5. **Product Submission** (`/submit`) - Comprehensive submission form with sidebar info
6. **Contact** (`/contact`) - Contact form and company information

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── awards/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── submit/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── public/
```

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18
- Iconify Icons

## Key Features

- **Glass Morphism Navigation**: Floating, blurred navigation bar
- **Scroll Anchors**: Smooth scrolling to page sections
- **Interactive Forms**: Product submission and contact forms
- **Award Badges**: Visual award tier system
- **Process Timelines**: Step-by-step visual guides
- **Responsive Design**: Mobile-first approach

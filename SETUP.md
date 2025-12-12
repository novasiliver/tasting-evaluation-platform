# Setup Guide - Metric Sensory Analytics Platform

A complete Next.js website for Metric, an independent food and beverage product evaluation service.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
metric-platform/
├── app/                      # Next.js 14 App Router
│   ├── about/               # About Us page
│   ├── awards/              # Awards page
│   ├── contact/             # Contact page
│   ├── services/            # Services page
│   ├── submit/              # Product Submission page
│   ├── layout.tsx           # Root layout with Navbar & Footer
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles including glass effects
├── components/              # Reusable UI components
│   ├── Navbar.tsx           # Floating glass navigation bar
│   └── Footer.tsx           # Footer component
├── public/                  # Static assets
├── sites templates/         # Original HTML templates (reference)
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🎨 Design System

### Brand Identity
- **Brand Name**: Metric
- **Tagline**: Culinary Sensory & Analytics

### Color Palette
- **Primary**: Orange-600 (#ea580c)
- **Neutrals**: Stone scale (stone-50 to stone-900)
- **Background**: #FAFAF9 (warm off-white)
- **Accents**: Amber, Blue, Green for different sections

### Typography
- **Headings**: Plus Jakarta Sans (font-heading class)
- **Body**: Inter
- Both loaded from Google Fonts

### Visual Effects
- **Glass Morphism**: Blurred backgrounds with transparency
- **Floating Elements**: Subtle animations
- **Rounded Corners**: rounded-xl, rounded-2xl, rounded-3xl, rounded-full
- **Shadows**: Subtle colored shadows (shadow-orange-500/30)

## 📄 Pages Overview

### Home Page (`/`)
- Hero with gradient text and floating cards
- Tasting service explanation
- "Why companies choose Metric" section
- Awards showcase (Perfect, Gold, Silver, Bronze)
- 4-step process timeline
- CTA section

### About Us (`/about`)
- Mission statement
- What we evaluate (8 product categories)
- 4-step evaluation process
- Trust principles (6 cards)
- Statistics showcase
- CTA section

### Services (`/services`)
- Service navigation pills
- Product Testing (with lab image)
- Sensory Evaluation (with scoring grid)
- Quality Scoring (with circular progress)
- Certification & Awards details
- Each service has benefits and "How It Works" sections

### Awards (`/awards`)
- Award tier badges (Gold/Silver/Bronze)
- Detailed criteria for each tier
- Award package benefits
- Usage guidelines
- CTA for submission

### Product Submission (`/submit`)
- Multi-section form:
  - Company Information
  - Product Information
  - Additional Options (checkboxes)
  - Terms agreement
- Sidebar with:
  - Required information checklist
  - Pricing overview
  - Process timeline

### Contact (`/contact`)
- Contact form with validation
- Contact details sidebar
- Quick links
- Common FAQs

## 🎨 Custom Styles

### Glass Effect Classes
```css
.glass - Blurred white background
.glass-card - Card variant with less blur
.badge-modern - Glassmorphism badge
```

### Custom Toggle Switch
```css
.custom-toggle - Styled checkbox toggle
.slider - Toggle switch slider
```

### Float Animation
```css
.float-element - Subtle floating animation
```

## 🔧 Customization

### Change Brand Name
Update in:
- `components/Navbar.tsx` (line with "Metric")
- `components/Footer.tsx` (line with "Metric")
- `app/layout.tsx` (metadata title)

### Change Primary Color
In `tailwind.config.ts`, update the color values or modify the color names throughout the codebase from `orange-600` to your preferred color.

### Update Contact Information
Edit `components/Footer.tsx` and `app/contact/page.tsx` to update:
- Email address
- Phone number
- Location
- Social media links

### Add Real Images
Replace placeholder Unsplash images with your own:
1. Add images to `public/images/`
2. Update `src` attributes in components
3. Add domains to `next.config.js` if using external images

### Connect Forms
The submission and contact forms currently use `alert()`. To connect to a backend:

1. **Option 1: Next.js API Routes**
   ```typescript
   // app/api/submit/route.ts
   export async function POST(request: Request) {
     const data = await request.json();
     // Process and send email
     return Response.json({ success: true });
   }
   ```

2. **Option 2: External Service**
   - Use services like Formspree, SendGrid, or Resend
   - Update the `handleSubmit` functions

## 🎯 Icons

Icons are loaded from Iconify CDN via script tag in layout.tsx.

Usage:
```tsx
<iconify-icon 
  icon="lucide:chef-hat" 
  width="16" 
  style={{ strokeWidth: 1.5 } as React.CSSProperties}
></iconify-icon>
```

Available icon sets: lucide (primary), material-symbols, etc.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All pages are fully responsive with mobile-first design.

## 🔍 SEO

Each page includes:
- Custom metadata (title, description)
- Proper heading hierarchy (h1, h2, h3)
- Semantic HTML structure
- Image alt text placeholders

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
# Deploy .next folder and run: npm start
```

## 📦 Dependencies

### Production
- next: 14.2.3
- react: 18.3.1
- react-dom: 18.3.1

### Development
- typescript: 5.4.5
- tailwindcss: 3.4.3
- @types/node: 20.12.7
- @types/react: 18.3.1

## 💡 Tips

- Navigation bar is fixed at `top-4` with glass effect
- Scroll anchors work via `id` attributes and `scroll-mt-24` utility
- Forms are client components (`'use client'`)
- Iconify requires the script to be loaded (in layout)
- Background is #FAFAF9 (slightly warm off-white)

## 🐛 Troubleshooting

**Icons not showing?**
- Ensure Script tag is in layout.tsx
- Check browser console for CDN errors

**Forms not submitting?**
- Check browser console
- Verify all required fields have values
- Connect to actual backend for production

**Styles look different?**
- Clear `.next` cache: `rm -rf .next`
- Restart dev server
- Check Tailwind CSS is properly configured

## 📞 Support

For Next.js: https://nextjs.org/docs
For Tailwind: https://tailwindcss.com/docs
For Iconify: https://icon-sets.iconify.design/

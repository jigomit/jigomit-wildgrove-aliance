# WildGrove Alliance

A wildlife conservation NGO website built with Vue 3 and Vite, featuring optimized performance and modern web practices.

**Live Demo:** https://wildgrove-a.netlify.app/

## Tech Stack

- **Framework:** Vue 3.5 with Composition API
- **Build Tool:** Vite 7.2
- **Router:** Vue Router 4
- **Animations:** GSAP 3.14
- **Utilities:** VueUse 14

## Features

- Responsive design for all devices
- Optimized hero images with WebP format
- Lazy-loaded components for faster initial load
- CSS containment and content-visibility for rendering performance
- Accessible navigation and semantic HTML
- SEO optimized with meta tags and structured data

## Performance Optimizations

- **WebP Images:** Hero images in multiple sizes (480w, 800w, 1280w)
- **Mobile-First Preloading:** Media query based image preloads
- **Async Font Loading:** Non-blocking Google Fonts with reduced weights
- **No backdrop-filter on Mobile:** Removed expensive GPU effects for mobile
- **Code Splitting:** Route-based and component-level lazy loading
- **Critical CSS:** Inlined above-the-fold styles
- **DNS Prefetch:** Early DNS resolution for external resources
- **GSAP Lazy Loading:** Animation library loaded on demand

## Lighthouse Scores (Mobile)

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 100 |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/      # Shared components (Header, Footer, Button)
│   └── home/        # Home page sections
├── views/           # Page components
├── router/          # Vue Router configuration
├── composables/     # Reusable composition functions
├── assets/styles/   # CSS variables and global styles
└── data/            # Static data files

public/
└── images/          # Optimized images (JPG + WebP)
```

## Pages

- **Home** - Hero section, mission, programs, impact stats, testimonials
- **About** - Story, values, timeline, team, partners
- **Programs** - Conservation initiatives and success stories
- **Get Involved** - Donation, volunteer opportunities
- **Contact** - Contact form, office locations, FAQ
- **Blog** - Conservation articles and news

## License

MIT

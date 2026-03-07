# طابا VIP — Next.js Website

A luxury VIP border crossing service website built with **Next.js 15**, **Tailwind CSS**, and full SEO optimization.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

```bash
npx vercel
# or push to GitHub and connect at vercel.com
```

---

## 🔍 SEO Features Included

| Feature | Implementation |
|---|---|
| **Title & Meta** | `metadata` export in `layout.js` |
| **Open Graph** | Full OG tags for social sharing |
| **Twitter Cards** | `summary_large_image` card |
| **JSON-LD** | `TravelAgency`, `WebSite`, `FAQPage` schemas |
| **Sitemap** | Auto-generated at `/sitemap.xml` |
| **robots.txt** | Auto-generated at `/robots.txt` |
| **Canonical URL** | Set in metadata alternates |
| **hreflang** | ar + en language alternates |
| **Geo Tags** | Taba coordinates in `<head>` |
| **Local SEO** | Address, phone, geo in JSON-LD |
| **Semantic HTML** | `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<address>` |
| **ARIA labels** | All interactive elements labeled |
| **Performance Headers** | X-Frame-Options, CSP, etc. |
| **Web App Manifest** | PWA-ready with icons |
| **Image Optimization** | Next.js Image with AVIF/WebP |

## 📁 Project Structure

```
taba-vip/
├── app/
│   ├── layout.js          # Root layout + SEO metadata + JSON-LD
│   ├── page.js            # Home page
│   ├── globals.css        # Tailwind + design tokens
│   ├── sitemap.js         # Auto sitemap
│   └── robots.js          # Auto robots.txt
├── components/
│   ├── Navbar.js          # Sticky nav with mobile menu
│   ├── Hero.js            # Hero with animated counters
│   ├── Services.js        # Services grid
│   ├── WhyUs.js           # Why choose us
│   ├── Gallery.js         # Expandable gallery strip
│   ├── Booking.js         # Booking form + contacts
│   ├── Footer.js          # Footer with links
│   └── WhatsAppFloat.js   # Floating WhatsApp button
├── public/
│   └── manifest.json      # Web app manifest
├── next.config.mjs        # Next.js config + security headers
├── tailwind.config.js     # Tailwind theme
└── package.json
```

## 🎨 Design System

- **Primary color:** `#C9A84C` (Gold)
- **Background:** `#0D0D0D` (Near black)
- **Font:** Tajawal (Arabic/Latin)
- **Direction:** RTL (Arabic)

## ✅ To Do After Deployment

1. Add `og-image.jpg` (1200×630px) to `/public/`
2. Add favicon files (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`)
3. Add Google Search Console verification token in `layout.js`
4. Update `canonical` URL in `layout.js` to your real domain
5. Submit sitemap to Google Search Console

---

## 🌍 Internationalization (i18n)

The site supports **Arabic (ar)** and **English (en)** using Next.js App Router dynamic segments:

- `/ar` → Arabic (RTL, default)  
- `/en` → English (LTR)

`middleware.js` auto-detects browser language and redirects `/` to the right locale.

All translations live in `lib/translations.js` — edit strings there to update both languages.

### To add a new language:
1. Add a new key to `lib/translations.js`
2. Add the locale to `locales` array in `middleware.js`


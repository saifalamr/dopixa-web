# Dopixa Web Architecture

## App shape

This is a small, server-rendered company site. It uses Next.js App Router with TypeScript strict mode. Routes share one page renderer; locale-specific strings are in `src/lib/content.ts`, and case studies follow the typed model in `src/lib/case-studies.ts`. Site sections remain Server Components. The contact form and mobile navigation use client-side state for their interactions.

The route segment is the locale: `/tr`, `/tr/solutions`, `/tr/work`, `/tr/process`, `/tr/about`, `/tr/contact` and their `/ar/...` equivalents. `/` redirects to `/tr`. A locale root layout sets `lang` and `dir` on the document. This keeps page structure shared while making metadata, language, and text direction explicit.

## Repository structure

```text
dopixa-web/
├── docs/
│   └── architecture.md
├── public/
├── src/
│   ├── app/
│   │   ├── [locale]/layout.tsx
│   │   ├── [locale]/[[...slug]]/page.tsx
│   │   ├── [locale]/opengraph-image.tsx
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── opengraph-image.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── contact-form.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── site-page.tsx
│   │   └── site-shell.tsx
│   └── lib/
│       ├── case-studies.ts
│       └── content.ts
├── .env.example
├── DESIGN.md
├── DEPLOYMENT.md
├── SECURITY.md
└── package.json
```

## Deliberate scope

The site has no database, CMS, authentication, analytics SDK, or third-party UI framework. Project copy is versioned with the code. The contact route has no persistence: it validates input and forwards it to an operator-configured HTTPS webhook. An actual contact destination, public domain, and any rate-limiting service must be selected before launch.

## Dependencies

Runtime dependencies are Next.js 16.3.6, React 19.2.8, and React DOM 19.2.8. Development dependencies are TypeScript 5, Tailwind CSS 4 with its PostCSS adapter, ESLint 9 with `eslint-config-next`, and the Node/React type definitions. No icon, form, animation, i18n, CMS, or state-management dependency is added.

## Hosting model

Deploy preview builds for changes, a protected staging environment for review, and production only after domain, contact delivery, accessibility, security, and content checks pass. Vercel is the recommended first host because it supports this Next.js app directly. Keep preview, staging, and production environment variables separate. Deployment details are in [DEPLOYMENT.md](../DEPLOYMENT.md).

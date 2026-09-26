# Dopixa Web

The bilingual company website for Dopixa, a technology company building custom software for modern business operations.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

The site defaults to Turkish at `/tr`; Arabic is available at `/ar`. The root URL `/` redirects to `/tr`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local configuration. Set `NEXT_PUBLIC_SITE_URL` to the verified canonical site origin in each deployed environment. Contact delivery remains disabled until the server-only `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_SECRET` values are configured. The webhook must accept the documented JSON payload and return a 2xx response; never expose these values to browser code.

## Architecture and operations

- `src/app/[locale]/[[...slug]]` serves shared routes for `tr` and `ar` using server-rendered localized content.
- `src/lib/content.ts` contains Turkish and Arabic copy; `src/lib/case-studies.ts` defines the publishable case-study model and prepared records.
- `src/components` contains the company site shell, pages, and the contact form.
- `src/app/globals.css` holds the semantic design tokens, component styles, responsive layouts, and RTL rules.
- `src/app/api/contact` validates and bounds submissions, then forwards them only to a configured HTTPS webhook.
- `src/app/sitemap.ts`, `robots.ts`, and the metadata API provide the launch SEO foundation.

See [docs/architecture.md](docs/architecture.md), [DESIGN.md](DESIGN.md), [SECURITY.md](SECURITY.md), and [DEPLOYMENT.md](DEPLOYMENT.md) before a public release.

Work entries are labelled as in preparation. They do not present unverified outcomes, metrics, client quotations, or production status.

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

Copy `.env.example` to `.env.local` for local configuration. Set `NEXT_PUBLIC_SITE_URL` to the verified canonical site origin and configure `RESEND_API_KEY` as a server-only environment variable in each deployed environment. The contact form sends plain-text submissions to the Dopixa contact address through Resend. The API key is used only by the server route and must never be prefixed with `NEXT_PUBLIC_`. Before production, replace the Resend test sender in `src/app/api/contact/route.ts` with an address on a verified sending domain.

## Architecture and operations

- `src/app/[locale]/[[...slug]]` serves shared routes for `tr` and `ar` using server-rendered localized content.
- `src/lib/content.ts` contains Turkish and Arabic copy; `src/lib/case-studies.ts` defines the publishable case-study model and prepared records.
- `src/components` contains the company site shell, pages, and the contact form.
- `src/app/globals.css` holds the semantic design tokens, component styles, responsive layouts, and RTL rules.
- `src/app/api/contact` validates and bounds submissions, then forwards them only to a configured HTTPS webhook.
- `src/app/sitemap.ts`, `robots.ts`, and the metadata API provide the launch SEO foundation.

See [docs/architecture.md](docs/architecture.md), [DESIGN.md](DESIGN.md), [SECURITY.md](SECURITY.md), and [DEPLOYMENT.md](DEPLOYMENT.md) before a public release.

Work entries are labelled as in preparation. They do not present unverified outcomes, metrics, client quotations, or production status.

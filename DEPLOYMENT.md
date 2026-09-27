# Deployment Plan

## Environments

1. **Local:** `.env.local` for local-only values; never commit it.
2. **Preview:** every reviewed pull request gets an isolated preview URL with no production client data or production secrets.
3. **Staging:** protected, production-like environment for content, RTL, form, and release checks.
4. **Production:** deploy from the approved default branch only after staging checks and content approval.

Vercel is the recommended first host for its native Next.js support. GitHub Actions or host checks should require lint, typecheck, and production build before merge. Enable protected branches and dependency/security alerts. Keep preview/staging/production environment variables distinct.

## Required before first public launch

- Confirm and verify the Dopixa production domain; set `NEXT_PUBLIC_SITE_URL` to its canonical HTTPS origin. Canonical links and sitemap URLs stay omitted until this is configured.
- Configure a server-side HTTPS contact webhook and high-entropy `CONTACT_WEBHOOK_SECRET`; route the server-defined `recipientEmail` (`saifalomari244@gmail.com`) to the email provider. Test success, failure, timeout, bad input, cross-origin requests, and edge rate limiting. The webhook URL and secret stay in server-side Vercel environment variables.
- Confirm that the webhook provider has appropriate data retention, access controls, and processing terms for Turkish and Arabic-speaking customer enquiries.
- Add domain DNS, TLS, monitoring, and an owner for incident response. Validate redirects, canonical/hreflang URLs, sitemap, robots, and structured data on the deployed domain.
- Review accessibility and the public status/permissions of each case study. Prepared cards are not claims that a project is live or endorsed by its client.

## Rollback

Retain the prior successful deployment and use the host's rollback mechanism if a release breaks navigation, locale rendering, form handling, or availability. Keep all data handling outside the static site unless a reviewed requirement justifies it.

# Security Baseline

- Keep webhook credentials, hosting tokens, and all future privileged keys in server-side environment variables. `.env*` files are ignored; `.env.example` contains names and safe placeholders only.
- The contact API accepts bounded JSON only, validates required fields and lengths, checks browser origin when supplied, rejects unsafe webhook URLs, uses a timeout, and does not persist submissions. It never logs contact contents.
- Configure rate limiting or bot protection at the hosting edge before enabling the public contact endpoint. This stateless starter does not pretend to provide durable rate limiting.
- Use separate preview, staging, and production secrets. Restrict webhook credentials to the minimum needed; rotate them if exposed.
- Keep dependencies locked, review automated dependency/security alerts, and run `npm audit` before releases. No production/client data, credentials, or private case-study assets belong in this repository.
- Production responses set MIME sniffing, framing, referrer, permission, and HTTPS transport headers. Before launch, review CSP against the final Next.js hosting behavior and configure it without breaking optimized font/image loading.
- Do not publish case-study claims, screens, names, or business data without client permission and verification. No performance metric or testimonial is implied by a prepared case card.

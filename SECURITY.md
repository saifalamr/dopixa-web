# Security Baseline

- Keep webhook credentials, hosting tokens, and all future privileged keys in server-side environment variables. `.env*` files are ignored except the committed `.env.example`, which contains variable names and blank safe values only.
- The contact API accepts bounded JSON only, validates required fields and lengths, checks browser origin when supplied, rejects unsafe webhook URLs, uses a timeout, and does not persist submissions. It never logs contact contents. Contact delivery forwards the validated submission and a server-defined recipient address to the configured webhook; delivery credentials remain server-side.
- The endpoint combines a hidden honeypot with a process-local limit of five requests per client address per ten minutes. This provides a modest baseline without a new service; it resets on process restart and is not shared across serverless instances. Add hosting-edge protection before relying on it for sustained public traffic.
- Use separate preview, staging, and production secrets. Restrict webhook credentials to the minimum needed; rotate them if exposed.
- Keep dependencies locked, review automated dependency/security alerts, and run `npm audit` before releases. No production/client data, credentials, or private case-study assets belong in this repository.
- Production responses set MIME sniffing, framing, referrer, permission, and HTTPS transport headers. Before launch, review CSP against the final Next.js hosting behavior and configure it without breaking optimized font/image loading.
- Do not publish case-study claims, screens, names, or business data without client permission and verification. No performance metric or testimonial is implied by a prepared case card.

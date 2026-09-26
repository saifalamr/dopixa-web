import { createHmac, randomBytes } from "node:crypto";

const windowMs = 10 * 60 * 1000;
const maxRequests = 5;
const maxBuckets = 5000;
const processKey = randomBytes(32);
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = (request.headers.get("x-real-ip")?.trim() || forwarded || "unknown").slice(0, 200);
  return createHmac("sha256", processKey).update(address).digest("hex");
}

export function checkContactRateLimit(request: Request, now = Date.now()) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  const key = clientKey(request);
  const existing = buckets.get(key);
  if (existing && existing.resetAt > now) {
    if (existing.count >= maxRequests) {
      return { allowed: false, retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
    }
    existing.count += 1;
    buckets.delete(key);
    buckets.set(key, existing);
    return { allowed: true, retryAfter: 0 };
  }

  if (buckets.size >= maxBuckets) {
    const oldest = buckets.keys().next();
    if (!oldest.done) buckets.delete(oldest.value);
  }
  buckets.set(key, { count: 1, resetAt: now + windowMs });
  return { allowed: true, retryAfter: 0 };
}

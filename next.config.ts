import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/dopixa-web";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: repoBasePath,
        images: { unoptimized: true },
      }
    : {
        async redirects() {
          return [{ source: "/", destination: "/tr", permanent: false }];
        },
        async headers() {
          return [{
            source: "/:path*",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "X-Frame-Options", value: "DENY" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
              ...(process.env.NODE_ENV === "production"
                ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
                : []),
            ],
          }];
        },
      }),
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { locales, pages } from "@/lib/content";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dopixa.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = locales.flatMap((locale) => [`/${locale}`, ...pages.map((page) => `/${locale}/${page}`)]);
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    alternates: { languages: { tr: new URL(path.replace(/^\/(?:tr|ar)/, "/tr"), siteUrl).toString(), ar: new URL(path.replace(/^\/(?:tr|ar)/, "/ar"), siteUrl).toString() } },
  }));
}

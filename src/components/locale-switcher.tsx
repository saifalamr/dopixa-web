"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

export function LocaleSwitcher({ locale, label, accessibleLabel }: { locale: Locale; label: string; accessibleLabel: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const targetLocale = locale === "tr" ? "ar" : "tr";
  const href = `/${[targetLocale, ...segments.slice(1)].join("/")}`;

  return <Link className="language-link" href={href} lang={targetLocale} aria-label={accessibleLabel}>{label}<span aria-hidden="true">↗</span></Link>;
}

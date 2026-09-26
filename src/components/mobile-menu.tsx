"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, PageKey } from "@/lib/content";

const paths: Record<PageKey, string> = { solutions: "solutions", work: "work", process: "process", about: "about", contact: "contact" };

export function MobileMenu({ locale, links, contactLabel }: { locale: Locale; links: Array<{ key: PageKey; label: string }>; contactLabel: string }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => { menu.current?.removeAttribute("open"); }, [pathname]);

  return <details className="mobile-menu" ref={menu}><summary aria-label={locale === "tr" ? "Mobil menüyü aç veya kapat" : "فتح أو إغلاق قائمة التنقل"}><span /><span /></summary><nav aria-label={locale === "tr" ? "Mobil gezinme" : "التنقل للجوال"}>{links.map(({ key, label }) => <Link key={key} href={`/${locale}/${paths[key]}`}>{label}</Link>)}<Link href={`/${locale}/contact`} className="mobile-cta">{contactLabel}<span aria-hidden="true">↗</span></Link></nav></details>;
}

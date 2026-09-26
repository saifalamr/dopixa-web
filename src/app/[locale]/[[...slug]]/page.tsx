import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-page";
import { getCopy, isLocale, locales, pageDescriptions, pages, type Locale, type PageKey } from "@/lib/content";

type RouteParams = { locale: string; slug?: string[] };

export function generateStaticParams() {
  return locales.flatMap((locale) => [{ locale, slug: [] }, ...pages.map((page) => ({ locale, slug: [page] }))]);
}

function pageFromSlug(slug?: string[]): PageKey | undefined {
  if (!slug?.length) return undefined;
  if (slug.length === 1 && pages.some((page) => page === slug[0])) return slug[0] as PageKey;
  return undefined;
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  if (!isLocale(routeLocale)) return {};
  const page = pageFromSlug(slug);
  if (slug?.length && !page) return {};
  const locale: Locale = routeLocale;
  const copy = getCopy(locale);
  const title = page ? copy.pageTitles[page] : locale === "tr" ? "Modern işletmeler için özel yazılım" : "برمجيات مخصصة للأعمال الحديثة";
  const description = page ? pageDescriptions[locale][page] : locale === "tr"
    ? "İşletmenizin günlük operasyonlarını kolaylaştıran özel yazılımlar, web deneyimleri ve dijital platformlar."
    : "برمجيات وتجارب ويب ومنصات رقمية مخصصة لتبسيط عمليات الأعمال اليومية.";
  const path = `/${locale}${slug?.length ? `/${slug.join("/")}` : ""}`;
  const other: Locale = locale === "tr" ? "ar" : "tr";
  const otherPath = `/${other}${slug?.length ? `/${slug.join("/")}` : ""}`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { tr: `/${locale === "tr" ? path : otherPath}`, ar: `/${locale === "ar" ? path : otherPath}`, "x-default": `/tr${slug?.length ? `/${slug.join("/")}` : ""}` } },
    openGraph: { title: `${title} | Dopixa`, description, locale: locale === "tr" ? "tr_TR" : "ar_AR", alternateLocale: locale === "tr" ? ["ar_AR"] : ["tr_TR"] },
    twitter: { title: `${title} | Dopixa`, description },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { locale: routeLocale, slug } = await params;
  if (!isLocale(routeLocale)) notFound();
  const page = pageFromSlug(slug);
  if (slug?.length && !page) notFound();
  return <SitePage locale={routeLocale} page={page} />;
}

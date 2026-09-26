import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { isLocale, locales } from "@/lib/content";
import "../globals.css";

const display = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic", "latin", "latin-ext"], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dopixa.example"),
  title: { default: "Dopixa — Custom software for modern business operations", template: "%s | Dopixa" },
  description: "Custom business systems, hospitality technology, websites and digital platforms for modern businesses.",
  applicationName: "Dopixa",
  openGraph: { type: "website", siteName: "Dopixa" },
  twitter: { card: "summary_large_image" },
};

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const direction = locale === "ar" ? "rtl" : "ltr";
  return <html lang={locale} dir={direction} className={`${display.variable} ${body.variable} ${arabic.variable}`}><body><a className="skip-link" href="#main-content">{locale === "tr" ? "İçeriğe geç" : "انتقل إلى المحتوى"}</a><SiteHeader locale={locale} /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter locale={locale} /></body></html>;
}

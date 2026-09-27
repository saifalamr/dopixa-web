import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { BrandMark } from "@/components/brand-mark";
import { getCopy, type Locale, type NavPageKey, type PageKey } from "@/lib/content";

const pathFor: Record<PageKey, string> = {
  solutions: "solutions", work: "work", process: "process", about: "about", contact: "contact", privacy: "privacy", terms: "terms",
};
const navigationPages: NavPageKey[] = ["solutions", "work", "process", "about", "contact"];

function Brand({ locale, inverse = false }: { locale: Locale; inverse?: boolean }) {
  return <Link className="brand" href={`/${locale}`} aria-label={locale === "tr" ? "Dopixa ana sayfa" : "Dopixa — الصفحة الرئيسية"}><BrandMark className="brand-mark" inverse={inverse} /><span>Dopixa</span></Link>;
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const links = navigationPages.map((key) => (
    <Link key={key} href={`/${locale}/${pathFor[key]}`}>{copy.nav[key]}</Link>
  ));
  const alternateLabel = locale === "tr" ? "العربية" : "Türkçe";

  return <header className="site-header"><div className="container header-inner">
    <Brand locale={locale} />
    <nav className="desktop-nav" aria-label={locale === "tr" ? "Ana gezinme" : "التنقل الرئيسي"}>{links}</nav>
    <div className="header-actions">
      <LocaleSwitcher locale={locale} label={alternateLabel} accessibleLabel={locale === "tr" ? "العربية — تغيير اللغة" : "Türkçe — تغيير اللغة"} />
      <Link className="button button-small button-primary header-cta" href={`/${locale}/contact`}>{copy.cta.project}<span aria-hidden="true">↗</span></Link>
    <MobileMenu locale={locale} links={navigationPages.map((key) => ({ key, label: copy.nav[key] }))} contactLabel={copy.cta.project} />
    </div>
  </div></header>;
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <footer className="site-footer"><div className="container footer-main">
    <div className="footer-brand"><Brand locale={locale} inverse /><p>{copy.footer.line}</p></div>
    <div className="footer-links"><span className="eyebrow">{locale === "tr" ? "Keşfedin" : "استكشف"}</span>{navigationPages.map((key) => <Link key={key} href={`/${locale}/${pathFor[key]}`}>{copy.nav[key]}</Link>)}</div>
    <div className="footer-note"><span className="eyebrow">{locale === "tr" ? "Pazarlarımız" : "أسواقنا"}</span><p>{copy.footer.location}</p></div>
    <div className="footer-contact"><span className="eyebrow">{locale === "tr" ? "Bir fikriniz mi var?" : "لديك فكرة؟"}</span><Link href={`/${locale}/contact`}>{copy.cta.project}<span aria-hidden="true">↗</span></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dopixa</span><span>{copy.footer.rights}</span><nav className="footer-legal" aria-label={locale === "tr" ? "Yasal bilgiler" : "المعلومات القانونية"}><Link href={`/${locale}/privacy`}>{copy.footer.privacy}</Link><Link href={`/${locale}/terms`}>{copy.footer.terms}</Link></nav></div></footer>;
}

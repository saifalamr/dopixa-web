import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { BrandMark } from "@/components/brand-mark";
import { getCopy, type Locale, type PageKey } from "@/lib/content";

const pathFor: Record<PageKey, string> = {
  solutions: "solutions", work: "work", process: "process", about: "about", contact: "contact",
};

function Brand({ locale, inverse = false }: { locale: Locale; inverse?: boolean }) {
  return <Link className="brand" href={`/${locale}`} aria-label={locale === "tr" ? "Dopixa ana sayfa" : "Dopixa — الصفحة الرئيسية"}><BrandMark className="brand-mark" inverse={inverse} /><span>Dopixa</span></Link>;
}

export function SiteHeader({ locale, currentPage }: { locale: Locale; currentPage?: PageKey }) {
  const copy = getCopy(locale);
  const links = (Object.keys(pathFor) as PageKey[]).map((key) => (
    <Link key={key} href={`/${locale}/${pathFor[key]}`} aria-current={currentPage === key ? "page" : undefined}>{copy.nav[key]}</Link>
  ));
  const alternate = locale === "tr" ? "ar" : "tr";
  const alternateLabel = locale === "tr" ? "العربية" : "Türkçe";

  return <header className="site-header"><div className="container header-inner">
    <Brand locale={locale} />
    <nav className="desktop-nav" aria-label={locale === "tr" ? "Ana gezinme" : "التنقل الرئيسي"}>{links}</nav>
    <div className="header-actions">
      <Link className="language-link" href={`/${alternate}${currentPage ? `/${pathFor[currentPage]}` : ""}`} lang={alternate} aria-label={locale === "tr" ? "العربية — تغيير اللغة" : "Türkçe — تغيير اللغة"}>{alternateLabel}<span aria-hidden="true">↗</span></Link>
      <Link className="button button-small button-primary header-cta" href={`/${locale}/contact`}>{copy.cta.project}<span aria-hidden="true">↗</span></Link>
      <MobileMenu locale={locale} links={(Object.keys(pathFor) as PageKey[]).map((key) => ({ key, label: copy.nav[key] }))} contactLabel={copy.cta.project} />
    </div>
  </div></header>;
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <footer className="site-footer"><div className="container footer-main">
    <div className="footer-brand"><Brand locale={locale} inverse /><p>{copy.footer.line}</p></div>
    <div className="footer-links"><span className="eyebrow">{locale === "tr" ? "Keşfedin" : "استكشف"}</span>{(Object.keys(pathFor) as PageKey[]).map((key) => <Link key={key} href={`/${locale}/${pathFor[key]}`}>{copy.nav[key]}</Link>)}</div>
    <div className="footer-note"><span className="eyebrow">{locale === "tr" ? "Pazarlarımız" : "أسواقنا"}</span><p>{copy.footer.location}</p></div>
    <div className="footer-contact"><span className="eyebrow">{locale === "tr" ? "Bir fikriniz mi var?" : "لديك فكرة؟"}</span><Link href={`/${locale}/contact`}>{copy.cta.project}<span aria-hidden="true">↗</span></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dopixa</span><span>{copy.footer.rights}</span></div></footer>;
}

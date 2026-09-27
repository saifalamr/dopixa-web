import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { getCaseStudies } from "@/lib/case-studies";
import { getCopy, type Locale, type PageKey } from "@/lib/content";
import { getLegalDocument } from "@/lib/legal-content";

function Arrow({ className = "" }: { className?: string }) { return <span className={`arrow ${className}`} aria-hidden="true">↗</span>; }
function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{text && <p className="section-intro">{text}</p>}</div>;
}

function SolutionCards({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const copy = getCopy(locale);
  return <div className="solution-grid">{copy.solutionItems.map((item, index) => <article className={`solution-card solution-card-${index + 1}`} key={item.number}>
    <div className="solution-card-top"><span className="solution-number">{item.number}</span><span className="solution-symbol" aria-hidden="true">{["⌘", "◷", "↗"][index]}</span></div>
    <h3>{item.title}</h3><p>{item.text}</p>
    {!compact && <ul className="tag-list">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
    <Link href={`/${locale}/solutions#${["business-systems", "hospitality", "digital-platforms"][index]}`} className="text-link">{locale === "tr" ? "Çözüm alanını inceleyin" : "اكتشف هذا الحل"}<Arrow /></Link>
  </article>)}</div>;
}

function WorkCards({ locale }: { locale: Locale }) {
  const items = getCaseStudies(locale);
  return <div className="work-grid">{items.map((item, index) => <article className={`work-card work-card-${index + 1}`} key={item.slug}>
    <div className="work-art" aria-hidden="true"><div className="art-window"><div className="art-window-top"><i /><i /><i /></div><div className="art-window-body"><span /><span /><span /><span /></div></div><div className="art-accent" /></div>
    <div className="work-card-copy"><div className="work-meta"><span>{item.sector}</span><span className="status-badge"><i aria-hidden="true" />{item.statusLabel}</span></div><h3 lang={locale === "ar" ? "tr" : undefined}>{item.client}</h3><p>{item.summary}</p><span className="work-next-note">{locale === "tr" ? "Vaka çalışması doğrulama sonrası yayımlanacak" : "ستُنشر دراسة الحالة بعد التحقق"}</span></div>
  </article>)}</div>;
}

function ProcessSteps({ locale }: { locale: Locale }) {
  const steps = getCopy(locale).process;
  return <ol className="process-grid">{steps.map((step, index) => <li className="process-step" key={step.title}><span className="step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>;
}

function CTA({ locale, title, text }: { locale: Locale; title: string; text: string }) {
  return <section className="cta-panel container"><div className="cta-shape" aria-hidden="true"><i /><i /><i /></div><div className="cta-content"><p className="eyebrow">{getCopy(locale).cta.next}</p><h2>{title}</h2><p>{text}</p><Link className="button button-light" href={`/${locale}/contact`}>{getCopy(locale).cta.project}<Arrow /></Link></div></section>;
}

export function SitePage({ locale, page }: { locale: Locale; page?: PageKey }) {
  if (!page) return <Home locale={locale} />;
  switch (page) {
    case "solutions": return <Solutions locale={locale} />;
    case "work": return <Work locale={locale} />;
    case "process": return <Process locale={locale} />;
    case "about": return <About locale={locale} />;
    case "contact": return <Contact locale={locale} />;
    case "privacy": return <LegalPage locale={locale} page="privacy" />;
    case "terms": return <LegalPage locale={locale} page="terms" />;
  }
}

function LegalPage({ locale, page }: { locale: Locale; page: "privacy" | "terms" }) {
  const copy = getCopy(locale);
  const document = getLegalDocument(locale, page);
  return <>
    <PageHero locale={locale} eyebrow={page === "privacy" ? copy.footer.privacy : copy.footer.terms} title={copy.pageTitles[page]} intro={copy.pageIntros[page]} />
    <section className="section legal-section"><div className="container legal-document">
      <p className="legal-updated">{locale === "tr" ? "Son güncelleme" : "آخر تحديث"}: <time dateTime="2026-09-27">{document.updated}</time></p>
      {document.sections.map((section) => <section className="legal-copy-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p dir="auto" key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
      {page === "privacy" && <p className="privacy-provider-links">{locale === "tr" ? "Hizmet sağlayıcıların gizlilik açıklamaları:" : "إشعارات الخصوصية لدى مزوّدي الخدمة:"} <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a> · <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel</a></p>}
      <p className="legal-contact">{locale === "tr" ? "Sorularınız için" : "للاستفسارات"} <a href="mailto:saifalomari244@gmail.com"><bdi dir="ltr">saifalomari244@gmail.com</bdi></a></p>
    </div></section>
  </>;
}

function Home({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Dopixa", description: copy.descriptor, ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    <section className="hero container"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />{copy.home.eyebrow}</p><h1>{copy.home.title}</h1><p className="hero-intro">{copy.home.intro}</p><div className="hero-actions"><Link className="button button-primary" href={`/${locale}/contact`}>{copy.cta.project}<Arrow /></Link><Link className="button button-quiet" href={`/${locale}/work`}>{copy.cta.work}<Arrow /></Link></div><p className="hero-note"><span aria-hidden="true">✳</span>{copy.home.note}</p></div>
      <div className="hero-visual" aria-label={locale === "tr" ? "Birbiriyle bağlantılı iş akışlarını gösteren soyut sistem çizimi" : "رسم توضيحي لنظام يربط إجراءات العمل"} role="img"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-core"><span className="core-mark">D</span><span className="core-caption">dopixa</span></div><div className="visual-node node-orders"><span className="node-icon">↗</span><span>{locale === "tr" ? "Sipariş" : "الطلبات"}</span><i /></div><div className="visual-node node-team"><span className="node-icon">◎</span><span>{locale === "tr" ? "Ekip" : "الفريق"}</span><i /></div><div className="visual-node node-insights"><span className="node-icon">⌁</span><span>{locale === "tr" ? "İçgörü" : "المؤشرات"}</span><i /></div><div className="visual-note"><span className="visual-note-mark">✳</span><span>{locale === "tr" ? "Daha net iş akışları" : "تدفقات عمل أوضح"}</span></div><span className="hero-visual-caption">{locale === "tr" ? "Birbirine bağlı. İşinize göre." : "مترابط. ومصمم لعملك."}</span></div>
    </section>

    <section className="section solutions-section"><div className="container"><SectionHeading eyebrow={copy.home.solutionsLabel} title={copy.home.solutionsTitle} /><SolutionCards locale={locale} compact /><div className="section-tail"><Link className="text-link" href={`/${locale}/solutions`}>{copy.cta.explore}<Arrow /></Link></div></div></section>

    <section className="section problem-section"><div className="container problem-layout"><div className="problem-copy"><p className="eyebrow"><span className="eyebrow-dot" />{copy.home.problemLabel}</p><h2>{copy.home.problemTitle}</h2><p>{copy.home.approach}</p><Link className="text-link" href={`/${locale}/solutions`}>{locale === "tr" ? "Nasıl yardımcı olabiliriz" : "كيف يمكننا المساعدة"}<Arrow /></Link></div><ul className="problem-list">{copy.home.problems.map((problem, index) => <li key={problem}><span className="problem-index">0{index + 1}</span><span>{problem}</span><span className="problem-mark" aria-hidden="true">↗</span></li>)}</ul></div></section>

    <section className="section work-section"><div className="container"><div className="split-heading"><SectionHeading eyebrow={copy.home.workLabel} title={copy.home.workTitle} /><Link className="text-link split-link" href={`/${locale}/work`}>{copy.cta.work}<Arrow /></Link></div><WorkCards locale={locale} /></div></section>

    <section className="section process-section"><div className="container"><SectionHeading eyebrow={copy.home.processLabel} title={copy.home.processTitle} text={locale === "tr" ? "Keşiften iyileştirmeye kadar, her adım işin gerçek ihtiyaçlarına dayanır." : "من الاكتشاف إلى التحسين، تستند كل خطوة إلى احتياجات العمل الفعلية."} /><ProcessSteps locale={locale} /><div className="section-tail"><Link className="text-link" href={`/${locale}/process`}>{locale === "tr" ? "Sürecimizi tanıyın" : "تعرّف على منهجيتنا"}<Arrow /></Link></div></div></section>

    <section className="support-section"><div className="container support-layout"><span className="support-icon" aria-hidden="true">✳</span><div><p className="eyebrow">{locale === "tr" ? "Uzun vadeli destek" : "دعم مستمر"}</p><h2>{copy.home.supportTitle}</h2><p>{copy.home.support}</p></div><Link className="text-link" href={`/${locale}/solutions#support`}>{locale === "tr" ? "Bakım ve destek" : "الصيانة والدعم"}<Arrow /></Link></div></section>
    <CTA locale={locale} title={copy.home.finalTitle} text={copy.home.finalText} />
  </>;
}

function PageHero({ locale, eyebrow, title, intro }: { locale: Locale; eyebrow: string; title: string; intro: string }) {
  return <section className="page-hero container"><p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p><h1>{title}</h1><p className="page-hero-intro">{intro}</p><div className="page-hero-rule"><span>DOPIXA / {locale.toUpperCase()}</span><span>{locale === "tr" ? "Özel yazılım · Dijital sistemler" : "برمجيات مخصصة · أنظمة رقمية"}</span></div></section>;
}

function Solutions({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const ids = ["business-systems", "hospitality", "digital-platforms"];
  return <><PageHero locale={locale} eyebrow={copy.pageTitles.solutions} title={locale === "tr" ? "İşletmenizin ihtiyacından başlayan teknoloji." : "تقنية تبدأ من احتياج عملك."} intro={copy.pageIntros.solutions} /><section className="section detail-solutions"><div className="container">{copy.solutionItems.map((item, index) => <article className="detail-solution" id={ids[index]} key={item.number}><span className="solution-number">{item.number}</span><div className="detail-solution-copy"><h2>{item.title}</h2><p>{item.text}</p><ul className="feature-list">{item.tags.map((tag) => <li key={tag}><span aria-hidden="true">↗</span>{tag}</li>)}</ul></div><p className="detail-solution-aside">{locale === "tr" ? "İhtiyaca göre tasarlanır. Gerçek kullanıcılarla doğrulanır." : "يُصمّم وفق الاحتياج ويُختبر مع المستخدمين."}</p></article>)}</div></section><section className="section supporting-section" id="support"><div className="container supporting-layout"><h2>{copy.supporting.title}</h2><ul className="supporting-list">{copy.supporting.items.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ul></div></section><CTA locale={locale} title={locale === "tr" ? "İşletmenize en uygun çözümü birlikte tanımlayalım." : "لنعمل معاً على تحديد الحل الأنسب لعملك."} text={copy.home.finalText} /></>;
}

function Work({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <><PageHero locale={locale} eyebrow={copy.pageTitles.work} title={locale === "tr" ? "Her sistem, bir iş ihtiyacından doğar." : "كل نظام يبدأ باحتياج عمل."} intro={copy.pageIntros.work} /><section className="section work-index"><div className="container"><div className="work-disclaimer"><span className="status-badge"><i aria-hidden="true" />{locale === "tr" ? "Çalışmalar hazırlanıyor" : "المشاريع قيد الإعداد"}</span><p>{locale === "tr" ? "Vaka çalışmaları doğrulanmış proje kapsamı ve izinli görsellerle tamamlandığında bu sayfada yayımlanacaktır." : "ستُنشر دراسات الحالات هنا بعد توثيق نطاق المشاريع واستخدام الصور المصرّح بها."}</p></div><WorkCards locale={locale} /><div className="case-study-note"><span className="eyebrow">{locale === "tr" ? "Her vaka çalışmasında" : "تتضمن دراسة الحالة"}</span><p>{locale === "tr" ? "İhtiyaç · bağlam · kullanıcılar · kısıtlar · yaklaşım · sistem · doğrulanmış sonuç · güvenilirlik · teknoloji · sonraki aşama" : "الاحتياج · السياق · المستخدمون · القيود · المنهجية · النظام · النتائج الموثقة · الاعتمادية · التقنية · الخطوة التالية"}</p></div></div></section><CTA locale={locale} title={locale === "tr" ? "Sıradaki çalışma sizin işletmeniz olabilir." : "قد يكون عملك هو المشروع القادم."} text={copy.home.finalText} /></>;
}

function Process({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <><PageHero locale={locale} eyebrow={copy.pageTitles.process} title={locale === "tr" ? "Doğru sistemi kurmak, doğru sorularla başlar." : "بناء النظام الصحيح يبدأ بالأسئلة الصحيحة."} intro={copy.pageIntros.process} /><section className="section process-page"><div className="container"><ProcessSteps locale={locale} /><div className="process-assurance"><span className="assurance-mark" aria-hidden="true">✳</span><div><h2>{locale === "tr" ? "Her aşamada hesaba katılır" : "نراعي ذلك في كل مرحلة"}</h2><p>{locale === "tr" ? "Kullanıcı iş akışları · iş kuralları · veri bütünlüğü · erişim güvenliği · test · dağıtım · izleme · destek" : "إجراءات المستخدمين · قواعد العمل · سلامة البيانات · أمن الوصول · الاختبارات · النشر · المراقبة · الدعم"}</p></div></div></div></section><CTA locale={locale} title={locale === "tr" ? "İlk adım, işleyişinizi anlamak." : "الخطوة الأولى هي فهم طريقة عملك."} text={copy.home.finalText} /></>;
}

function About({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <><PageHero locale={locale} eyebrow={copy.about.eyebrow} title={copy.about.title} intro={copy.about.intro} /><section className="section about-section"><div className="container about-layout"><div className="about-statement"><span className="about-spark" aria-hidden="true">✳</span><p>{locale === "tr" ? "Dijital sistemler" : "الأنظمة الرقمية"}<br /><strong>{locale === "tr" ? "işe yaramak için" : "لتؤدي دورها"}<br />{locale === "tr" ? "işe uyum sağlamalı." : "يجب أن تناسب العمل."}</strong></p></div><div className="about-story"><p>{copy.about.body}</p><p>{locale === "tr" ? "Türkiye ve Arapça konuşulan pazarlardaki işletmelerle; anlaşılır, erişilebilir ve uzun vadede geliştirilebilir sistemler üzerine çalışıyoruz." : "نعمل مع الشركات في تركيا والأسواق الناطقة بالعربية لبناء أنظمة واضحة ويمكن الوصول إليها وقابلة للتطوير على المدى الطويل."}</p></div></div><div className="container principles-grid">{copy.about.principles.map((principle, index) => <article key={principle.title}><span>0{index + 1}</span><h2>{principle.title}</h2><p>{principle.text}</p></article>)}</div></section><CTA locale={locale} title={locale === "tr" ? "İşiniz için nelerin mümkün olduğunu konuşalım." : "لنتحدث عمّا يمكن تحقيقه لعملك."} text={copy.home.finalText} /></>;
}

function ContactOptions({ locale }: { locale: Locale }) {
  const contact = getCopy(locale).contact;
  const message = encodeURIComponent(contact.whatsappMessage);
  const whatsappUrl = `https://wa.me/905315822748?text=${message}`;

  return <div className="contact-actions">
    <a className="button button-primary contact-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.3-3.9a8 8 0 1 1 14.7-4.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 8.5c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .7.5.8 1.2 1.4 2 1.9.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.2.3.4 0 .3-.1.8-.5 1.1-.4.4-1 .6-1.6.5-1-.1-2.2-.7-3.4-1.7-1.4-1.2-2.3-2.7-2.5-3.8-.2-.7.1-1.3.7-1.6Z" fill="currentColor"/></svg>
      <span>{contact.whatsappAction}</span><span aria-hidden="true">↗</span>
    </a>
    <div className="contact-methods">
      <a href={`mailto:${contact.emailAddress}`}><span>{contact.emailLabel}</span><bdi dir="ltr">{contact.emailAddress}</bdi></a>
      <a href="tel:+905315822748"><span>{contact.phoneLabel}</span><bdi dir="ltr">{contact.phoneNumber}</bdi></a>
    </div>
  </div>;
}

function Contact({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <><PageHero locale={locale} eyebrow={copy.contact.eyebrow} title={copy.contact.title} intro={copy.contact.intro} /><section className="section contact-section"><div className="container contact-layout"><div className="contact-aside"><span className="contact-aside-mark" aria-hidden="true">✳</span><h2>{locale === "tr" ? "İyi bir çözüm, doğru soruyla başlar." : "الحل الجيد يبدأ بالسؤال الصحيح."}</h2><p>{copy.pageIntros.contact}</p><ContactOptions locale={locale} /><div className="contact-languages"><span className="eyebrow">{locale === "tr" ? "İletişim dilleri" : "لغات التواصل"}</span><div><span>Türkçe</span><span>العربية</span></div></div><p className="contact-privacy-note">{copy.contact.privacy}</p></div><div className="contact-form-wrap"><h2 className="contact-form-heading">{copy.contact.formLabel}</h2><ContactForm locale={locale} /></div></div></section></>;
}

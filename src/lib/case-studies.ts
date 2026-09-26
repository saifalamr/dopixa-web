import type { Locale } from "@/lib/content";

export type CaseStudyStatus = "live" | "pilot" | "prototype" | "in-preparation";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  status: CaseStudyStatus;
  deliveryPeriod: string | null;
  problem: string | null;
  context: string | null;
  users: string[];
  constraints: string[];
  approach: string | null;
  system: string | null;
  outcome: string | null;
  reliability: string | null;
  technology: string[];
  nextStage: string | null;
  screenshots: Array<{ src: string; alt: string }>;
  supportedClaims: string[];
  summary: string;
  statusLabel: string;
}

// Public summaries are conservative. Other fields remain empty until scope,
// claims, client permission, and evidence have been reviewed for publication.
const records: Record<Locale, CaseStudy[]> = {
  tr: [
    { slug: "kahfe-lounge", title: "Kahfe Lounge", client: "Kahfe Lounge", sector: "Restoran ve kafe", status: "in-preparation", deliveryPeriod: null, problem: null, context: null, users: [], constraints: [], approach: null, system: null, outcome: null, reliability: null, technology: [], nextStage: null, screenshots: [], supportedClaims: [], summary: "Çok dilli menü deneyimi ve sipariş akışına odaklanan bir konaklama teknolojisi çalışması.", statusLabel: "Hazırlık aşamasında" },
    { slug: "doruk-alp-camasirhane", title: "Doruk Alp Çamaşırhane", client: "Doruk Alp Çamaşırhane", sector: "İşletme otomasyonu", status: "in-preparation", deliveryPeriod: null, problem: null, context: null, users: [], constraints: [], approach: null, system: null, outcome: null, reliability: null, technology: [], nextStage: null, screenshots: [], supportedClaims: [], summary: "Müşteri, sipariş ve günlük operasyon süreçlerini dijitalleştirmeye odaklanan bir iş sistemi çalışması.", statusLabel: "Hazırlık aşamasında" },
  ],
  ar: [
    { slug: "kahfe-lounge", title: "Kahfe Lounge", client: "Kahfe Lounge", sector: "مطعم ومقهى", status: "in-preparation", deliveryPeriod: null, problem: null, context: null, users: [], constraints: [], approach: null, system: null, outcome: null, reliability: null, technology: [], nextStage: null, screenshots: [], supportedClaims: [], summary: "عمل في تقنيات الضيافة يركّز على تجربة قائمة متعددة اللغات وتدفق الطلبات.", statusLabel: "قيد الإعداد" },
    { slug: "doruk-alp-camasirhane", title: "Doruk Alp Çamaşırhane", client: "Doruk Alp Çamaşırhane", sector: "أتمتة الأعمال", status: "in-preparation", deliveryPeriod: null, problem: null, context: null, users: [], constraints: [], approach: null, system: null, outcome: null, reliability: null, technology: [], nextStage: null, screenshots: [], supportedClaims: [], summary: "عمل على نظام أعمال يركّز على رقمنة عمليات العملاء والطلبات والتشغيل اليومي.", statusLabel: "قيد الإعداد" },
  ],
};

export function getCaseStudies(locale: Locale): readonly CaseStudy[] {
  return records[locale];
}

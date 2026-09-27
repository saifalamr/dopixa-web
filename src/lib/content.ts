export const locales = ["tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const pages = ["solutions", "work", "process", "about", "contact", "privacy", "terms"] as const;
export type PageKey = (typeof pages)[number];
export type NavPageKey = Exclude<PageKey, "privacy" | "terms">;

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

const copy = {
  tr: {
    brand: "Dopixa",
    descriptor: "Modern işletmeler için özel yazılım.",
    nav: { solutions: "Çözümler", work: "Çalışmalar", process: "Süreç", about: "Hakkımızda", contact: "İletişim" },
    cta: { project: "Projenizi konuşalım", work: "Çalışmalarımızı görün", explore: "Çözümleri keşfedin", next: "Bir sonraki adım" },
    home: {
      eyebrow: "İşletmeler için dijital sistemler",
      title: "İşinizin daha iyi işlemesini sağlayın.",
      intro: "Dopixa; işletmelerin işleyişini anlayıp günlük operasyonları kolaylaştıran yazılımlar, web deneyimleri ve dijital platformlar tasarlar.",
      note: "Önce işleyişi anlarız. Ardından doğru sistemi kurar, yayına alır ve gelişmesine eşlik ederiz.",
      solutionsLabel: "Nasıl yardımcı oluyoruz", solutionsTitle: "İşletmenizin ihtiyacına uyan dijital çözümler.",
      problemLabel: "Tanıdık geliyor mu?", problemTitle: "İş büyür. Araçlar geride kalır.",
      problems: ["Kopyalanan tablolar ve tekrar eden işler", "Birbiriyle konuşmayan araçlar", "WhatsApp, kâğıt ve hafızaya bağlı süreçler", "İhtiyacı karşılamayan eski web siteleri"],
      approach: "İş akışını sadeleştirir, gerekli adımları dijitalleştirir ve ekibinizin güvenle kullanabileceği bir sistem oluştururuz.",
      workLabel: "Seçili çalışmalar", workTitle: "Gerçek işleyişten doğan çözümler.",
      processLabel: "Birlikte çalışma biçimimiz", processTitle: "Önce anlayalım. Sonra doğru sistemi kuralım.",
      supportTitle: "Yayına almak son adım değil.", support: "Canlı sistemlerin izlenmesi, öncelikli destek ve iyileştirmeler; projenin kapsamına ve üzerinde anlaşılan desteğe göre sürer.",
      finalTitle: "İşletmenizde neyi daha iyi çalıştırmak istiyorsunuz?", finalText: "İhtiyacınızı ve bugünkü işleyişinizi birlikte değerlendirelim.",
    },
    solutionItems: [
      { number: "01", title: "Özel İş Sistemleri", text: "Günlük iş akışlarınıza göre şekillenen yönetim araçları, portallar ve raporlama sistemleri.", tags: ["İş akışları", "Müşteri ve sipariş yönetimi", "Stok ve faturalama", "Gösterge panoları"] },
      { number: "02", title: "Konaklama Teknolojileri", text: "Restoran, kafe ve konaklama işletmelerinin servis süreçlerine uyum sağlayan dijital araçlar.", tags: ["QR menüler", "Sipariş ve servis akışı", "Masa ve ekip araçları", "Otel iş akışları"] },
      { number: "03", title: "Web Siteleri ve Dijital Platformlar", text: "Markanızı doğru anlatan, hızlı çalışan ve müşterilerinizin işini kolaylaştıran dijital deneyimler.", tags: ["Kurumsal web siteleri", "Müşteri platformları", "Rezervasyon ve talep akışları", "Erişilebilirlik ve SEO temeli"] },
    ],
    supporting: { title: "İhtiyaç olduğunda genişleyen yetkinlikler", items: ["Mobil uygulamalar", "İş otomasyonu", "Amaca uygun yapay zekâ", "Bakım, izleme ve destek"] },
    process: [
      { title: "Keşif", text: "İnsanları, mevcut araçları ve işin günlük akışını dinler; asıl sorunu netleştiririz." },
      { title: "Tanımlama", text: "Kapsamı, iş kurallarını, veri ihtiyaçlarını ve başarı ölçütlerini birlikte belirleriz." },
      { title: "Geliştirme", text: "Küçük ve anlaşılır adımlarla inşa eder; erken sürümleri gerçek kullanıcılarla değerlendiririz." },
      { title: "Doğrulama", text: "İş akışlarını, veri bütünlüğünü, erişilebilirliği ve güvenlik kontrollerini sınarız." },
      { title: "Yayına alma", text: "Dağıtım, erişimler, geri dönüş planı ve ekip aktarımını tamamlarız." },
      { title: "İyileştirme", text: "Kullanımı izler, öncelikli sorunları ele alır ve sonraki geliştirmeleri planlarız." },
    ],
    about: { eyebrow: "Dopixa hakkında", title: "Teknoloji, işin gerçek akışına uyduğunda değer üretir.", intro: "Dopixa; işletmelerin çalışma biçimini anlayıp bu işleyişi sade, güvenilir dijital sistemlere dönüştürmek için kurulan bir teknoloji şirketidir.", body: "Yaklaşımımızı gerçek iş süreçleri üzerinde yapılan uygulamalı yazılım çalışmalarından geliştirdik. Her projede önce ihtiyacı, kullanıcıları ve kısıtları anlamaya; ardından sürdürülebilir bir çözüm sunmaya odaklanırız.", principles: [{ title: "İşi anlayarak başlarız", text: "Yazılımı değil, çözülmesi gereken iş ihtiyacını tanımlarız." }, { title: "Gerektiği kadarını kurarız", text: "İhtiyaç netleşmeden karmaşıklık eklemeyiz." }, { title: "Yayından sonrasını sahipleniriz", text: "Bakım ve iyileştirme planını teslimatın parçası sayarız." }] },
    contact: { eyebrow: "İletişim", title: "Bir sonraki iyileştirmeyi konuşalım.", intro: "Mevcut işleyişinizi ve ulaşmak istediğiniz noktayı anlatın. Projenizi birlikte değerlendirelim.", whatsappAction: "WhatsApp üzerinden yazın", whatsappMessage: "Merhaba Dopixa, bir proje hakkında görüşmek istiyorum.", emailLabel: "E-posta", phoneLabel: "WhatsApp / telefon", formLabel: "Proje formu", emailAddress: "saifalomari244@gmail.com", phoneNumber: "+90 531 582 27 48", fields: { name: "Adınız", company: "Şirket", businessType: "İşletme türü", country: "Ülke", email: "E-posta", phone: "Telefon / WhatsApp (isteğe bağlı)", workflow: "Bugünkü işleyiş veya sorun", improvement: "Neyi iyileştirmek istiyorsunuz?", timeline: "Tercih edilen zamanlama", budget: "Yaklaşık bütçe aralığı (isteğe bağlı)", language: "Tercih ettiğiniz dil" }, options: { business: ["İşletme türünü seçin", "Restoran / kafe", "Konaklama", "Perakende", "Hizmet işletmesi", "Diğer"], timeline: ["Zamanlama seçin", "En kısa sürede", "1–3 ay içinde", "3 aydan sonra", "Henüz araştırıyorum"] }, validation: { required: "Lütfen bu alanı doldurun.", email: "Geçerli bir e-posta adresi girin." }, submit: "Proje talebini gönder", sending: "Gönderiliyor…", success: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.", error: "Talebiniz şu anda gönderilemedi. Lütfen biraz sonra tekrar deneyin.", privacy: "Bilgileriniz yalnızca talebinizi değerlendirmek ve sizinle iletişim kurmak için kullanılır.", support: "Türkçe ve Arapça iletişim desteği sunuyoruz." },
    footer: { line: "İşletmeler için özel dijital sistemler.", location: "Türkiye ve Arapça konuşulan pazarlar için", rights: "Tüm hakları saklıdır.", privacy: "Gizlilik", terms: "Kullanım koşulları" },
    pageTitles: { solutions: "Çözümler", work: "Çalışmalar", process: "Süreç", about: "Hakkımızda", contact: "İletişim", privacy: "Gizlilik politikası", terms: "Kullanım koşulları" },
    pageIntros: { solutions: "Teknolojiden değil, işletmenizin çözmek istediği ihtiyaçtan başlarız.", work: "Her çalışma, gerçek bir iş ihtiyacına göre şekillenir. Vaka sayfaları doğrulanmış kapsam ve sonuçlarla hazırlandığında yayımlanır.", process: "Belirsizliği azaltan, iş kurallarını koruyan ve yayına almayı hesaba katan açık bir çalışma biçimi.", about: "İşletmelerin dijital sistemlerden güvenle yararlanabilmesi için kurulmuş bir teknoloji şirketi.", contact: "Türkiye ve Arapça konuşulan pazarlarda işletmelerle Türkçe ve Arapça çalışıyoruz.", privacy: "İletişim formunda paylaştığınız bilgileri nasıl kullandığımızı ve koruduğumuzu açıklıyoruz.", terms: "Dopixa web sitesini kullanırken geçerli olan temel koşullar." },
  },
  ar: {
    brand: "Dopixa",
    descriptor: "برمجيات مخصصة لعمليات الأعمال الحديثة.",
    nav: { solutions: "الحلول", work: "أعمالنا", process: "منهجيتنا", about: "من نحن", contact: "تواصل معنا" },
    cta: { project: "لنتحدث عن مشروعك", work: "استكشف أعمالنا", explore: "استكشف الحلول", next: "الخطوة التالية" },
    home: {
      eyebrow: "أنظمة رقمية للأعمال",
      title: "طوّر طريقة سير أعمالك.",
      intro: "تساعد Dopixa الشركات على تبسيط عملياتها اليومية من خلال برمجيات مخصصة وتجارب ويب ومنصات رقمية حديثة.",
      note: "نفهم طريقة عملك أولاً، ثم نبني النظام المناسب ونطلقه وندعم تطويره.",
      solutionsLabel: "كيف نساعدك", solutionsTitle: "حلول رقمية تناسب احتياجات عملك.",
      problemLabel: "هل يبدو هذا مألوفاً؟", problemTitle: "يكبر العمل. وتتأخر الأدوات عن مواكبته.",
      problems: ["جداول متكررة وأعمال يدوية", "أدوات لا تتواصل فيما بينها", "عمليات تعتمد على واتساب أو الورق أو الذاكرة", "مواقع قديمة لا تلبي احتياجات العملاء"],
      approach: "نبسّط سير العمل، ونحوّل الخطوات الضرورية إلى إجراءات رقمية، وننشئ نظاماً يستطيع فريقك استخدامه بثقة.",
      workLabel: "أعمال مختارة", workTitle: "حلول تنطلق من واقع العمل.",
      processLabel: "طريقة العمل معاً", processTitle: "نفهم عملك أولاً، ثم نبني النظام المناسب.",
      supportTitle: "الإطلاق ليس نهاية العمل.", support: "تستمر مراقبة الأنظمة والدعم ذي الأولوية والتحسينات وفق نطاق المشروع واتفاق الدعم.",
      finalTitle: "ما الذي تريد تحسينه في عملك؟", finalText: "لنتعرّف معاً على احتياجاتك وطريقة سير العمل الحالية.",
    },
    solutionItems: [
      { number: "01", title: "أنظمة أعمال مخصصة", text: "أدوات إدارة وبوابات وتقارير تتشكل وفق إجراءات العمل اليومية لديك.", tags: ["سير العمل", "إدارة العملاء والطلبات", "المخزون والفوترة", "لوحات المعلومات"] },
      { number: "02", title: "تقنيات الضيافة", text: "أدوات رقمية تنسجم مع عمليات المطاعم والمقاهي وقطاع الضيافة.", tags: ["قوائم QR", "الطلبات والخدمة", "الطاولات وأدوات الفريق", "إجراءات الفنادق"] },
      { number: "03", title: "المواقع والمنصات الرقمية", text: "تجارب رقمية توضّح قيمة علامتك وتعمل بسرعة وتسهّل على عملائك إنجاز ما يحتاجون إليه.", tags: ["مواقع الشركات", "منصات العملاء", "الحجوزات وطلبات التواصل", "إمكانية الوصول وأساسيات SEO"] },
    ],
    supporting: { title: "قدرات إضافية عند الحاجة", items: ["تطبيقات الجوال", "أتمتة الأعمال", "ذكاء اصطناعي عملي", "الصيانة والمراقبة والدعم"] },
    process: [
      { title: "الاكتشاف", text: "نستمع إلى فريقك ونراجع الأدوات الحالية وتفاصيل العمل اليومية لتحديد المشكلة الفعلية." },
      { title: "التحديد", text: "نتفق على النطاق وقواعد العمل واحتياجات البيانات ومعايير النجاح." },
      { title: "البناء", text: "نطوّر الحل بخطوات واضحة وصغيرة ونقيّم الإصدارات المبكرة مع المستخدمين." },
      { title: "التحقق", text: "نختبر الإجراءات وسلامة البيانات وإمكانية الوصول وضوابط الأمن." },
      { title: "الإطلاق", text: "نجهّز النشر والصلاحيات وخطة التراجع وننقل المعرفة إلى الفريق." },
      { title: "التحسين", text: "نتابع الاستخدام ونعالج الأولويات ونخطط للتطوير التالي." },
    ],
    about: { eyebrow: "عن Dopixa", title: "تُصبح التقنية ذات قيمة حين تناسب واقع العمل.", intro: "Dopixa شركة تقنية تفهم طريقة عمل الشركات وتحولها إلى أنظمة رقمية بسيطة وموثوقة.", body: "طوّرنا منهجيتنا من خلال العمل التطبيقي على برمجيات تخدم عمليات أعمال واقعية. نركّز في كل مشروع على فهم الاحتياج والمستخدمين والقيود قبل تقديم حل يمكن الاعتماد عليه وتطويره.", principles: [{ title: "نبدأ بفهم العمل", text: "نحدد احتياج العمل قبل اختيار التقنية." }, { title: "نبني ما تحتاج إليه فقط", text: "لا نضيف تعقيداً قبل وضوح الاحتياج." }, { title: "نبقى بعد الإطلاق", text: "نعدّ الصيانة والتحسين جزءاً من التسليم." }] },
    contact: { eyebrow: "تواصل معنا", title: "لنتحدث عن التحسين القادم.", intro: "أخبرنا عن طريقة العمل الحالية والنتيجة التي تسعى إليها، ولنقيّم مشروعك معاً.", whatsappAction: "تواصل عبر واتساب", whatsappMessage: "مرحباً Dopixa، أود التحدث معكم بخصوص مشروع.", emailLabel: "البريد الإلكتروني", phoneLabel: "واتساب / الهاتف", formLabel: "نموذج المشروع", emailAddress: "saifalomari244@gmail.com", phoneNumber: "+90 531 582 27 48", fields: { name: "الاسم", company: "الشركة", businessType: "نوع النشاط", country: "الدولة", email: "البريد الإلكتروني", phone: "الهاتف / واتساب (اختياري)", workflow: "طريقة العمل الحالية أو المشكلة", improvement: "ما الذي ترغب في تحسينه؟", timeline: "الإطار الزمني المفضل", budget: "نطاق الميزانية التقريبي (اختياري)", language: "اللغة المفضلة" }, options: { business: ["اختر نوع النشاط", "مطعم / مقهى", "ضيافة", "تجارة التجزئة", "خدمات", "أخرى"], timeline: ["اختر إطاراً زمنياً", "في أقرب وقت", "خلال شهر إلى ثلاثة أشهر", "بعد ثلاثة أشهر", "ما زلت أستكشف الخيارات"] }, validation: { required: "يرجى ملء هذا الحقل.", email: "يرجى إدخال بريد إلكتروني صحيح." }, submit: "إرسال طلب المشروع", sending: "جارٍ الإرسال…", success: "وصلنا طلبك. سنتواصل معك في أقرب وقت.", error: "تعذر إرسال طلبك الآن. يرجى المحاولة بعد قليل.", privacy: "تُستخدم معلوماتك فقط لتقييم طلبك والتواصل معك.", support: "نقدّم الدعم والتواصل باللغتين التركية والعربية." },
    footer: { line: "أنظمة رقمية مخصصة للأعمال.", location: "لتركيا والأسواق الناطقة بالعربية", rights: "جميع الحقوق محفوظة.", privacy: "الخصوصية", terms: "شروط الاستخدام" },
    pageTitles: { solutions: "الحلول", work: "أعمالنا", process: "منهجيتنا", about: "من نحن", contact: "تواصل معنا", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام" },
    pageIntros: { solutions: "نبدأ باحتياج عملك، لا بمصطلحات التقنية.", work: "ينطلق كل مشروع من احتياج عمل فعلي. سننشر دراسات الحالات بعد توثيق نطاق العمل والنتائج بدقة.", process: "منهجية واضحة تقلل الغموض وتحافظ على قواعد العمل وتخطط للإطلاق.", about: "شركة تقنية تساعد الأعمال على الاستفادة من الأنظمة الرقمية بثقة.", contact: "نعمل مع شركات في تركيا والأسواق الناطقة بالعربية باللغتين التركية والعربية.", privacy: "نوضح كيفية استخدام المعلومات التي تشاركها عبر نموذج التواصل وحمايتها.", terms: "الشروط الأساسية لاستخدام موقع Dopixa." },
  },
} as const;

export function getCopy(locale: Locale) {
  return copy[locale];
}

export const pageDescriptions: Record<Locale, Record<PageKey, string>> = {
  tr: { solutions: "İşletmenizin iş akışlarına göre tasarlanan özel yazılımlar, web platformları ve konaklama teknolojileri.", work: "Dopixa'nın hazırlık aşamasındaki dijital sistem ve işletme otomasyonu çalışmalarını keşfedin.", process: "Keşiften yayına almaya, Dopixa'nın açık ve güvenilir geliştirme süreci.", about: "İşletmeler için özel dijital sistemler geliştiren Dopixa'yı tanıyın.", contact: "Dopixa ekibiyle projenizi ve iş süreçlerinizi konuşun.", privacy: "Dopixa iletişim formunda paylaşılan kişisel bilgilerin nasıl kullanıldığını öğrenin.", terms: "Dopixa web sitesinin kullanımına ilişkin temel koşulları inceleyin." },
  ar: { solutions: "برمجيات مخصصة ومنصات ويب وتقنيات ضيافة مصممة وفق إجراءات عملك.", work: "اكتشف مشاريع Dopixa قيد الإعداد للأنظمة الرقمية وأتمتة الأعمال.", process: "من الاكتشاف إلى الإطلاق، تعرّف على منهجية التطوير الواضحة في Dopixa.", about: "تعرّف على Dopixa، شركة تقنية تطوّر أنظمة رقمية مخصصة للأعمال.", contact: "تواصل مع فريق Dopixa لمناقشة مشروعك وإجراءات عملك.", privacy: "تعرّف على كيفية استخدام المعلومات الشخصية التي ترسلها عبر نموذج التواصل في Dopixa.", terms: "اطّلع على الشروط الأساسية لاستخدام موقع Dopixa." },
};

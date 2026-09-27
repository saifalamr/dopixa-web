import type { Locale } from "@/lib/content";

export type LegalDocument = {
  updated: string;
  sections: Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;
};

const documents: Record<Locale, Record<"privacy" | "terms", LegalDocument>> = {
  tr: {
    privacy: {
      updated: "27 Eylül 2026",
      sections: [
        { title: "Hangi bilgileri alıyoruz?", paragraphs: ["Proje formunu gönderdiğinizde adınızı, işletme bilgilerinizi, ülkenizi, e-posta adresinizi, tercih ettiğiniz dili ve projenizle ilgili paylaştığınız açıklamaları alırız. Telefon, bütçe ve şirket adı gibi bazı alanları isteğe bağlı olarak paylaşabilirsiniz.", "Siteyi sunmak ve güvenliğini sağlamak için barındırma altyapısında standart teknik bağlantı kayıtları da oluşabilir."] },
        { title: "Bilgileri hangi amaçlarla kullanıyoruz?", paragraphs: ["Bilgilerinizi talebinizi değerlendirmek, sizinle iletişime geçmek, olası proje kapsamını anlamak ve bir proje için anlaşılması hâlinde üzerinde anlaşılan hizmetleri yürütmek için kullanırız. Formu yalnızca ihtiyaç duyduğunuz bilgileri paylaşarak doldurabilirsiniz; özel nitelikli veya gizli bilgileri göndermeyin."] },
        { title: "Bilgiler nasıl iletilir?", paragraphs: ["Form gönderiminiz, e-posta teslim hizmeti Resend üzerinden Dopixa'nın iletişim adresine iletilir. Web sitesi form yanıtlarını kendi uygulama veritabanında saklamaz. Site Vercel üzerinde barındırılır; bu sağlayıcılar e-posta içeriğini veya hizmetin çalışması için gerekli teknik kayıtları kendi sistemlerinde işleyebilir. Sağlayıcıların kendi gizlilik açıklamaları da geçerlidir."] },
        { title: "Saklama ve paylaşım", paragraphs: ["Talep bilgilerini görüşmeyi yürütmek ve gerektiğinde ilişkiyi takip etmek için gerekli süre boyunca saklarız; yasal bir yükümlülük veya meşru kayıt ihtiyacı varsa bu süre uzayabilir. Bilgileri satmayız. E-posta teslimi, barındırma ve güvenlik gibi sınırlı hizmetler için yalnızca gerekli veriler ilgili hizmet sağlayıcılarıyla paylaşılır."] },
        { title: "Haklarınız ve bize ulaşma", paragraphs: ["Bilgilerinizle ilgili erişim, düzeltme veya silme talebinizi saifalomari244@gmail.com adresine iletebilirsiniz. Talebinizi değerlendirebilmemiz için başvurunuzla ilişkilendirebileceğimiz bilgileri ekleyin. Talepler, uygulanabilir mevzuat ve varsa saklama yükümlülükleri çerçevesinde ele alınır."] },
        { title: "Güvenlik ve güncellemeler", paragraphs: ["Bilgilere erişimi sınırlandırmak ve aktarım sırasında korumak için makul teknik ve operasyonel önlemler uygularız. İnternet üzerinden hiçbir aktarım yöntemi mutlak güvenlik garantisi vermez. Bu metni veri uygulamalarımız veya yasal gereklilikler değiştiğinde güncelleyebiliriz; güncel sürüm bu sayfada yayımlanır."] },
      ],
    },
    terms: {
      updated: "27 Eylül 2026",
      sections: [
        { title: "Sitenin amacı", paragraphs: ["Dopixa web sitesi şirketi, çalışma alanlarını ve iletişim yollarını tanıtır. Buradaki bilgiler genel bilgilendirme içindir; belirli bir proje için kapsam, takvim, ücret veya teslimat taahhüdü oluşturmaz."] },
        { title: "Proje teklifleri ve anlaşmalar", paragraphs: ["Her proje ihtiyaca göre değerlendirilir. Kapsam, takvim, ücret ve ödeme koşulları tarafların proje özelinde yazılı olarak üzerinde anlaşmasıyla kesinleşir. Web sitesindeki açıklamalar bu ayrı anlaşmanın yerine geçmez.", "Proje sırasında ortaya çıkan yazılım, tasarım ve diğer teslimatların fikri mülkiyet, kullanım, lisans veya devir koşulları ilgili proje anlaşmasında ayrıca belirlenir."] },
        { title: "İçerik ve kullanım", paragraphs: ["Sitedeki metinler, tasarımlar ve Dopixa marka unsurları Dopixa'ya veya ilgili hak sahiplerine aittir. Yazılı izin ya da mevzuatın tanıdığı bir hak olmadan bunları kopyalamayın, yeniden yayımlamayın veya ticari amaçla kullanmayın.", "Siteyi hukuka uygun biçimde kullanmalı; erişimi bozacak, güvenliği zayıflatacak veya başkalarının kullanımını engelleyecek girişimlerden kaçınmalısınız."] },
        { title: "Üçüncü taraf hizmetleri", paragraphs: ["Sitedeki bazı bağlantılar veya işlevler üçüncü taraf hizmetlerine yönlendirebilir. Bu hizmetlerin kendi koşulları ve gizlilik uygulamaları geçerlidir; Dopixa bu hizmetlerin içeriğini veya çalışma biçimini kontrol etmez."] },
        { title: "Erişilebilirlik ve sorumluluk", paragraphs: ["Sitedeki bilgilerin doğru ve güncel olması için özen gösteririz; ancak bilgilerin her zaman eksiksiz veya hatasız olacağını ve sitenin kesintisiz çalışacağını garanti etmeyiz. Mevzuatın izin verdiği ölçüde, yalnızca bu bilgilere dayanılarak alınan kararlar veya geçici erişim kesintileri nedeniyle doğan dolaylı kayıplardan sorumlu tutulamayız. Kanunen sınırlandırılamayan hak ve sorumluluklar saklıdır."] },
        { title: "Güncellemeler ve iletişim", paragraphs: ["Bu koşullar gerektiğinde güncellenebilir; yeni sürüm bu sayfada yayımlandığı tarihten itibaren geçerli olur. Sorularınız için saifalomari244@gmail.com adresinden bize ulaşabilirsiniz. Bir proje için imzalanan ayrı bir sözleşme varsa o sözleşmenin hükümleri ilgili proje bakımından önceliklidir."] },
      ],
    },
  },
  ar: {
    privacy: {
      updated: "٢٧ سبتمبر ٢٠٢٦",
      sections: [
        { title: "ما المعلومات التي نتلقاها؟", paragraphs: ["عند إرسال نموذج المشروع، نتلقى اسمك ومعلومات النشاط والدولة والبريد الإلكتروني واللغة المفضلة والتفاصيل التي تشاركها عن المشروع. ويمكنك اختيار مشاركة رقم الهاتف والميزانية واسم الشركة؛ فهذه الحقول اختيارية.", "قد تُسجّل البنية المستضيفة معلومات اتصال تقنية معتادة لتشغيل الموقع وحمايته."] },
        { title: "كيف نستخدم المعلومات؟", paragraphs: ["نستخدم المعلومات لدراسة طلبك والتواصل معك وفهم نطاق المشروع المحتمل، وتنفيذ الخدمات المتفق عليها إذا بدأ تعاون بيننا، والحد من إساءة استخدام قنوات التواصل. شارك فقط ما يلزمك؛ ويرجى عدم إرسال معلومات حساسة أو سرية عبر النموذج."] },
        { title: "كيف تُرسل المعلومات؟", paragraphs: ["يُرسل طلبك عبر Resend، وهي خدمة لتسليم البريد الإلكتروني، إلى عنوان التواصل الخاص بـ Dopixa. لا يحفظ الموقع ردود النموذج في قاعدة بيانات للتطبيق. يستضيف Vercel الموقع، وقد يعالج هذان المزوّدان محتوى البريد أو السجلات التقنية اللازمة لتشغيل الخدمة على أنظمتهما. وتسري أيضاً إشعارات الخصوصية الخاصة بكل مزوّد."] },
        { title: "الاحتفاظ بالمعلومات ومشاركتها", paragraphs: ["نحتفظ بمعلومات الطلب للمدة اللازمة لمتابعة التواصل، وقد تطول المدة عند وجود التزام قانوني أو حاجة مشروعة لحفظ السجلات. لا نبيع معلوماتك. ولا نشارك إلا البيانات اللازمة مع مزوّدي الخدمات المحدودة، مثل البريد الإلكتروني والاستضافة والأمن."] },
        { title: "حقوقك والتواصل معنا", paragraphs: ["لطلب الوصول إلى معلوماتك أو تصحيحها أو حذفها، راسلنا على saifalomari244@gmail.com وأدرج ما يساعدنا على تحديد طلبك. نتعامل مع الطلبات وفق القواعد القانونية المعمول بها وأي التزامات للاحتفاظ بالمعلومات."] },
        { title: "الأمن والتحديثات", paragraphs: ["نتخذ تدابير تقنية وتشغيلية معقولة لتقييد الوصول إلى المعلومات وحمايتها أثناء النقل. ولا توجد وسيلة نقل عبر الإنترنت تضمن الأمان المطلق. قد نحدّث هذه السياسة عند تغير ممارساتنا أو المتطلبات القانونية، وتُنشر النسخة الحالية في هذه الصفحة."] },
      ],
    },
    terms: {
      updated: "٢٧ سبتمبر ٢٠٢٦",
      sections: [
        { title: "الغرض من الموقع", paragraphs: ["يعرّف موقع Dopixa بالشركة ومجالات عملها وطرق التواصل معها. محتواه معلومات عامة، ولا يشكّل التزاماً بنطاق مشروع أو موعد أو سعر أو تسليم محدد."] },
        { title: "العروض والاتفاقات الخاصة بالمشاريع", paragraphs: ["نقيّم كل مشروع وفق احتياجه. ويُحدّد نطاق العمل والجدول الزمني والأسعار وشروط الدفع باتفاق كتابي خاص بالمشروع بين الأطراف. ولا تحل أوصاف الموقع محل ذلك الاتفاق.", "تُحدّد اتفاقية المشروع بشكل مستقل حقوق الملكية الفكرية والاستخدام والترخيص ونقل الحقوق المتعلقة بالبرمجيات والتصميمات والتسليمات الأخرى الناتجة عن المشروع."] },
        { title: "المحتوى والاستخدام", paragraphs: ["تعود نصوص الموقع وتصميماته وعناصر علامة Dopixa إلى Dopixa أو أصحاب الحقوق المعنيين. لا يجوز نسخها أو إعادة نشرها أو استخدامها تجارياً دون إذن كتابي أو حق يقرّه القانون.", "يجب استخدام الموقع بشكل مشروع، والامتناع عن محاولة تعطيل الوصول إليه أو إضعاف أمنه أو منع الآخرين من استخدامه."] },
        { title: "خدمات الأطراف الأخرى", paragraphs: ["قد توجّه بعض الروابط أو الوظائف في الموقع إلى خدمات خارجية. وتسري شروط تلك الخدمات وسياسات الخصوصية الخاصة بها؛ ولا تتحكم Dopixa في محتواها أو طريقة عملها."] },
        { title: "الإتاحة والمسؤولية", paragraphs: ["نبذل عناية لتكون معلومات الموقع صحيحة ومحدّثة، لكننا لا نضمن اكتمالها أو خلوها من الأخطاء دائماً ولا استمرار عمل الموقع دون انقطاع. وفي الحدود التي يسمح بها القانون، لا نتحمل الخسائر غير المباشرة الناتجة عن الاعتماد على معلومات الموقع وحدها أو عن الانقطاعات المؤقتة. وتبقى الحقوق والمسؤوليات التي لا يجوز تقييدها قانوناً محفوظة."] },
        { title: "التحديثات والتواصل", paragraphs: ["قد نحدّث هذه الشروط عند الحاجة، وتُطبّق النسخة الجديدة من تاريخ نشرها في هذه الصفحة. للاستفسارات راسلونا على saifalomari244@gmail.com. وإذا وُجد عقد مستقل لمشروع، فتسري أحكامه على ذلك المشروع."] },
      ],
    },
  },
};

export function getLegalDocument(locale: Locale, page: "privacy" | "terms") {
  return documents[locale][page];
}

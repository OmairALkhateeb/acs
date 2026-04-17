import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const dict: Dict = {
  brand: { ar: "A-C-S", en: "A-C-S" },
  brand_tag: { ar: "أداء. استراتيجية. تحويل.", en: "Performance. Strategy. Conversion." },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_services: { ar: "الخدمات", en: "Services" },
  nav_about: { ar: "الرؤية", en: "Vision" },
  nav_contact: { ar: "تواصل", en: "Contact" },
  cta_whatsapp: { ar: "محادثة واتساب", en: "Chat on WhatsApp" },
  cta_explore: { ar: "اكتشف الخدمات", en: "Explore Services" },
  cta_strategy: { ar: "اكتشف الاستراتيجية", en: "Discover the Strategy" },
  cta_start: { ar: "ابدأ المحادثة", en: "Start the Conversation" },

  hero_kicker: { ar: "وكالة أداء وإبداع رقمي", en: "Creative Performance Studio" },
  hero_title_1: { ar: "لا تملك مشكلة إعلانات.", en: "You don't have an ad problem." },
  hero_title_2: { ar: "تملك مشكلة تحويل.", en: "You have a conversion problem." },
  hero_sub: {
    ar: "نحوّل الانتباه إلى نتائج. استراتيجية، تنفيذ، إدارة إبداعية، وأداء رقمي يُقاس.",
    en: "We turn attention into measurable outcomes. Strategy, execution, creative direction, and digital performance.",
  },

  positioning_title: { ar: "موقعنا", en: "Our Positioning" },
  positioning_text: {
    ar: "لسنا وكالة إعلانات. نحن شركاء نمو نُهندس قرارات السوق، نصنع هوية تبيع، ونقود حملات تُنتج إيرادات حقيقية.",
    en: "We are not an ad agency. We are growth partners who engineer market decisions, build identities that sell, and run campaigns that generate real revenue.",
  },

  why_title: { ar: "لماذا يفشل أغلب التسويق", en: "Why Most Marketing Fails" },
  why_1_t: { ar: "الانتباه ليس كافياً", en: "Attention isn't enough" },
  why_1_d: { ar: "الفيديو الذي يُشاهد ولا يبيع، خسارة مُمَوَّلة.", en: "A video that's watched but doesn't sell is funded loss." },
  why_2_t: { ar: "الرسالة بلا بيع", en: "Messaging without sales" },
  why_2_d: { ar: "الإبداع بدون استراتيجية تحويل ديكور باهظ.", en: "Creative without conversion strategy is expensive decoration." },
  why_3_t: { ar: "الميزانية بلا بنية", en: "Budget without structure" },
  why_3_d: { ar: "الإنفاق بدون قمع مبيعات يحرق المال.", en: "Spend without a funnel burns cash." },

  services_title: { ar: "خدماتنا", en: "Our Services" },
  services_sub: { ar: "منظومة كاملة من الأداء والإبداع والتقنية.", en: "A complete system of performance, creative, and technology." },

  group_growth: { ar: "النمو والأداء", en: "Growth & Performance" },
  group_brand: { ar: "الهوية والإبداع", en: "Branding & Creative" },
  group_media: { ar: "الإنتاج الإعلامي", en: "Media Production" },
  group_digital: { ar: "المنتجات الرقمية", en: "Digital Products" },

  s_ads: { ar: "إدارة الإعلانات المدفوعة", en: "Paid Advertising Management" },
  s_strategy: { ar: "استراتيجيات تسويق شاملة", en: "Comprehensive Marketing Strategies" },
  s_seo: { ar: "تحسين محركات البحث SEO", en: "SEO & Search Optimization" },
  s_smm: { ar: "إدارة كاملة لوسائل التواصل", en: "Full Social Media Management" },
  s_brand: { ar: "الهوية البصرية والعلامة", en: "Visual Identity & Branding" },
  s_design: { ar: "تصميم ثنائي وثلاثي الأبعاد", en: "2D & 3D Design" },
  s_video: { ar: "تصوير، فيديو، مونتاج، إخراج", en: "Photography, Video, Editing, Directing" },
  s_face: { ar: "وجه إعلامي / موديلز", en: "Media Faces & Models" },
  s_web: { ar: "تطوير المواقع الإلكترونية", en: "Web Development" },
  s_app: { ar: "تطوير التطبيقات", en: "App Development" },

  about_title: { ar: "العقل خلف العلامة", en: "The Mind Behind the Brand" },
  about_sub: {
    ar: "نفكر كاستراتيجيين، ننفّذ كفنانين، نقيس كمحلّلين.",
    en: "We think like strategists, execute like artists, measure like analysts.",
  },
  vision_t: { ar: "الرؤية", en: "Vision" },
  vision_d: { ar: "نبني علامات تُحدث فرقاً اقتصادياً، لا ضجيجاً عابراً.", en: "We build brands that create economic impact, not passing noise." },
  market_t: { ar: "ذكاء السوق", en: "Market Intelligence" },
  market_d: { ar: "نقرأ السلوك، ندرس المنافسة، ونحوّل البيانات إلى قرارات.", en: "We read behavior, study competition, and turn data into decisions." },
  audience_t: { ar: "الجمهور", en: "Audience" },
  audience_d: { ar: "نفهم لماذا يشتري الناس قبل أن نخبرهم بماذا يشترون.", en: "We understand why people buy before telling them what to buy." },
  conv_t: { ar: "التحويل أولاً", en: "Conversion First" },
  conv_d: { ar: "المقاييس الفارغة لا تدفع الرواتب. الإيرادات تفعل.", en: "Vanity metrics don't pay salaries. Revenue does." },

  contact_title: { ar: "لنبدأ محادثة", en: "Let's Start a Conversation" },
  contact_sub: {
    ar: "إن كنت جاداً بشأن النمو، نحن جاهزون.",
    en: "If you're serious about growth, we're ready.",
  },
  email_label: { ar: "البريد", en: "Email" },
  whatsapp_label: { ar: "واتساب", en: "WhatsApp" },

  form_title: { ar: "أرسل رسالة", en: "Send a Message" },
  form_sub: { ar: "اكتب لنا مباشرة، وسنعود إليك خلال ساعات العمل.", en: "Write to us directly, we'll respond within business hours." },
  form_name: { ar: "الاسم", en: "Name" },
  form_name_ph: { ar: "اسمك الكامل", en: "Your full name" },
  form_email: { ar: "البريد الإلكتروني", en: "Email" },
  form_email_ph: { ar: "you@email.com", en: "you@email.com" },
  form_message: { ar: "الرسالة", en: "Message" },
  form_message_ph: { ar: "حدّثنا عن مشروعك وأهدافك...", en: "Tell us about your project and goals..." },
  form_submit: { ar: "إرسال الرسالة", en: "Send Message" },
  form_sending: { ar: "جارٍ الإرسال...", en: "Sending..." },
  form_success: { ar: "تم فتح واتساب لإكمال الإرسال.", en: "WhatsApp opened — complete sending from there." },
  form_or: { ar: "أو تواصل مباشرة", en: "Or reach out directly" },

  footer_rights: { ar: "© 2025 A-C-S. جميع الحقوق محفوظة.", en: "© 2025 A-C-S. All rights reserved." },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("acs-lang") as Lang | null) : null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("acs-lang", l);
  };

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

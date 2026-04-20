import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export type Testimonial = {
  name: { ar: string; en: string };
  role?: { ar: string; en: string };
  text: { ar: string; en: string };
};

// Add new testimonials by appending to this array.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: { ar: "خالد المنصوري", en: "Khaled Al-Mansoori" },
    role: { ar: "الرئيس التنفيذي، Lumen Retail", en: "CEO, Lumen Retail" },
    text: {
      ar: "خلال ربع واحد، تضاعفت إيراداتنا الرقمية. لم يعد التسويق نفقة، أصبح ماكينة نمو.",
      en: "In a single quarter our digital revenue doubled. Marketing stopped being a cost — it became a growth engine.",
    },
  },
  {
    name: { ar: "ليان حداد", en: "Layan Haddad" },
    role: { ar: "مديرة العلامة، Noor Beauty", en: "Brand Director, Noor Beauty" },
    text: {
      ar: "هوية بصرية لا تشبه أحداً، وحملات تتحدث لغة جمهورنا. عمل مدروس، ليس استعراضاً.",
      en: "A visual identity that doesn't look like anyone else, and campaigns that speak our audience's language. Considered work, not showmanship.",
    },
  },
  {
    name: { ar: "عمر الشامي", en: "Omar Al-Shami" },
    role: { ar: "مؤسس، Atlas Realty", en: "Founder, Atlas Realty" },
    text: {
      ar: "فريق يفهم السوق قبل أن يفتح Photoshop. هذا هو الفرق بين وكالة وشريك حقيقي.",
      en: "A team that understands the market before opening Photoshop. That's the difference between an agency and a real partner.",
    },
  },
  {
    name: { ar: "ريم العنزي", en: "Reem Al-Anazi" },
    role: { ar: "رئيسة التسويق، Sirah Group", en: "Head of Marketing, Sirah Group" },
    text: {
      ar: "كل قرار مدعوم ببيانات، وكل تنفيذ مدعوم بإحساس. توازن نادر.",
      en: "Every decision backed by data, every execution backed by taste. A rare balance.",
    },
  },
  {
    name: { ar: "يوسف العلي", en: "Yousef Al-Ali" },
    role: { ar: "المدير العام، Vela Hospitality", en: "GM, Vela Hospitality" },
    text: {
      ar: "إنتاج سينمائي يُحرّك المشاعر، واستراتيجية تُحرّك المبيعات. نتائج ملموسة.",
      en: "Cinematic production that moves emotion and a strategy that moves sales. Tangible results.",
    },
  },
  {
    name: { ar: "نورة القحطاني", en: "Noura Al-Qahtani" },
    role: { ar: "مؤسسة، Maison Noor", en: "Founder, Maison Noor" },
    text: {
      ar: "أعادوا تعريف علامتنا من الصفر. اليوم، نُباع قبل أن نُعلن.",
      en: "They redefined our brand from zero. Today, we sell before we even advertise.",
    },
  },
  {
    name: { ar: "فادي الخوري", en: "Fadi Al-Khoury" },
    role: { ar: "الشريك الإداري، Orient Capital", en: "Managing Partner, Orient Capital" },
    text: {
      ar: "احترافية نادرة في سوق مزدحم بالادعاءات. التزام بالنتائج، لا بالوعود.",
      en: "Rare professionalism in a market crowded with claims. Commitment to results, not promises.",
    },
  },
  {
    name: { ar: "سارة الفهد", en: "Sara Al-Fahad" },
    role: { ar: "مديرة التسويق، Aurora Living", en: "Marketing Director, Aurora Living" },
    text: {
      ar: "كل حملة كانت درساً في الدقة. الفريق يفهم الفارق بين الجميل والفعّال.",
      en: "Every campaign was a lesson in precision. The team knows the difference between beautiful and effective.",
    },
  },
  {
    name: { ar: "أحمد الراشد", en: "Ahmed Al-Rashed" },
    role: { ar: "الرئيس التنفيذي، Zenith Motors", en: "CEO, Zenith Motors" },
    text: {
      ar: "ROI واضح من الشهر الأول. لم نعد نخمّن، أصبحنا نقرر بثقة.",
      en: "Clear ROI from month one. We stopped guessing and started deciding with confidence.",
    },
  },
  {
    name: { ar: "هدى المالكي", en: "Huda Al-Maliki" },
    role: { ar: "مؤسسة، Bayt Al-Saada", en: "Founder, Bayt Al-Saada" },
    text: {
      ar: "شعور حقيقي بالشراكة، لا بالخدمة. هنا يكمن الفرق.",
      en: "A real sense of partnership, not service. That's where the difference lies.",
    },
  },
];

export function Testimonials() {
  const { t, lang } = useI18n();
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="px-6 lg:px-10">
        <SectionHeading kicker={t("testimonials_kicker")} title={t("testimonials_title")} />
      </div>

      <div className="relative mt-16">
        {/* Edge fades — fade to transparent so the global background shows through */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[oklch(0.05_0.01_60)] via-[oklch(0.05_0.01_60/0.6)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[oklch(0.05_0.01_60)] via-[oklch(0.05_0.01_60/0.6)] to-transparent" />

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
          >
            {loop.map((tst, i) => (
              <article
                key={i}
                className="relative w-[320px] sm:w-[400px] shrink-0 bg-surface border border-gold rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-radial-gold blur-2xl opacity-50" />
                <Quote className="w-8 h-8 text-[var(--gold)]/70 mb-4" />
                <p className={`relative text-ivory/85 leading-relaxed text-base sm:text-[17px] ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {tst.text[lang]}
                </p>
                <div className={`relative mt-6 pt-6 border-t border-gold/30 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  <div className="font-display text-xl text-ivory">{tst.name[lang]}</div>
                  {tst.role && (
                    <div className="text-xs tracking-[0.25em] uppercase text-[var(--gold-soft)]/80 mt-1">
                      {tst.role[lang]}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

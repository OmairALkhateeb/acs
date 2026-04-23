import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";

export type Testimonial = {
  name: { ar: string; en: string };
  role?: { ar: string; en: string };
  text: { ar: string; en: string };
};

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
];

function TestimonialCard({
  item,
  lang,
}: {
  item: Testimonial;
  lang: "ar" | "en";
}) {
  const isArabic = lang === "ar";

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <p
        className={`text-sm sm:text-base leading-7 text-ivory/85 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        “{item.text[lang]}”
      </p>

      <div
        className={`mt-5 border-t border-white/10 pt-4 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <h3 className="font-display text-lg text-ivory">
          {item.name[lang]}
        </h3>

        {item.role && (
          <p className="mt-1 text-xs text-ivory/60">
            {item.role[lang]}
          </p>
        )}
      </div>
    </article>
  );
}

export function Testimonials() {
  const { t, lang } = useI18n();
  const items = TESTIMONIALS.slice(0, 3);

  return (
    <section className="py-20 sm:py-24">
      <div className="px-6 lg:px-10">
        <SectionHeading
          kicker={t("testimonials_kicker")}
          title={t("testimonials_title")}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <TestimonialCard
              key={`${item.name.en}-${index}`}
              item={item}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
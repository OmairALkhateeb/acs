import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Globe, Search, Users, Target, Compass,
  PenLine, Megaphone, Share2, Monitor, Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
}

const steps: Step[] = [
  { icon: Globe, ar: "نظرة على السوق", en: "Market Overview", descAr: "قراءة شاملة للمشهد.", descEn: "A full read of the landscape." },
  { icon: Search, ar: "بحث السوق", en: "Market Research", descAr: "بيانات، اتجاهات، فرص.", descEn: "Data, trends, opportunities." },
  { icon: Users, ar: "الجمهور المستهدف", en: "Target Audience", descAr: "نفهم لمن نتحدث.", descEn: "We know who we speak to." },
  { icon: Target, ar: "أهداف التسويق", en: "Marketing Goals", descAr: "أهداف قابلة للقياس.", descEn: "Measurable objectives." },
  { icon: Compass, ar: "استراتيجية التسويق", en: "Marketing Strategy", descAr: "خارطة الطريق الكاملة.", descEn: "The full roadmap." },
  { icon: PenLine, ar: "تسويق المحتوى", en: "Content Marketing", descAr: "محتوى يبيع، لا يملأ الفراغ.", descEn: "Content that sells, not fills." },
  { icon: Megaphone, ar: "تسويق المؤثرين", en: "Influencer Marketing", descAr: "أصوات تصل وتقنع.", descEn: "Voices that reach and persuade." },
  { icon: Share2, ar: "وسائل التواصل", en: "Social Media", descAr: "حضور يصنع الطلب.", descEn: "Presence that creates demand." },
  { icon: Monitor, ar: "التسويق الرقمي", en: "Digital Marketing", descAr: "حملات أداء قابلة للتوسع.", descEn: "Scalable performance campaigns." },
  { icon: Wallet, ar: "تخطيط الميزانية", en: "Budget Planning", descAr: "كل دولار له هدف.", descEn: "Every dollar has a purpose." },
];

export function Workflow() {
  const { lang } = useI18n();
  const isRTL = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="workflow" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-10 scroll-mt-24" dir={isRTL ? "rtl" : "ltr"}>
      <SectionHeading
        kicker="// HOW WE WORK"
        title={lang === "ar" ? "منهجيتنا في العمل" : "Our Workflow"}
        sub={lang === "ar"
          ? "عشر خطوات مدروسة، من قراءة السوق إلى تخطيط الميزانية."
          : "Ten deliberate steps, from market reading to budget planning."}
      />

      <div ref={ref} className="max-w-7xl mx-auto mt-16 sm:mt-20">
        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{ transformOrigin: isRTL ? "right" : "left" }}
              className="h-full bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent"
            />
          </div>

          <div className="grid grid-cols-10 gap-2 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.en}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group flex flex-col items-center text-center cursor-default"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-radial-gold blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-full border border-[var(--gold)]/40 bg-[var(--warm-black)]/80 backdrop-blur-sm flex items-center justify-center shadow-gold/30 group-hover:border-[var(--gold)] group-hover:scale-110 group-hover:shadow-gold-lg transition-all duration-500">
                    <div className="absolute inset-1 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <s.icon className="relative w-6 h-6 text-[var(--gold)] group-hover:text-black transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="mt-5 text-[10px] tracking-[0.3em] text-[var(--gold)]/60 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-display text-sm text-ivory group-hover:text-[var(--gold)] transition-colors duration-500 leading-tight px-1">
                  {lang === "ar" ? s.ar : s.en}
                </div>
                <div className="mt-2 text-[11px] text-ivory/40 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-1">
                  {lang === "ar" ? s.descAr : s.descEn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet vertical timeline */}
        <div className="lg:hidden relative">
          <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/40 to-transparent ${isRTL ? "right-8" : "left-8"}`} />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.en}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                className="group relative flex items-start gap-5"
              >
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-radial-gold blur-lg opacity-50" />
                  <div className="relative w-16 h-16 rounded-full border border-[var(--gold)]/50 bg-[var(--warm-black)]/90 flex items-center justify-center group-hover:border-[var(--gold)] transition-all duration-500">
                    <s.icon className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="pt-2 flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.3em] text-[var(--gold)]/60 font-mono mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-lg text-ivory">
                    {lang === "ar" ? s.ar : s.en}
                  </div>
                  <div className="text-sm text-ivory/50 mt-1 leading-relaxed">
                    {lang === "ar" ? s.descAr : s.descEn}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

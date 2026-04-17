import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import { GoldLink } from "@/components/GoldButton";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT } from "@/lib/contact";
import { ArrowRight, MessageCircle, Target, Zap, TrendingUp, Sparkles } from "lucide-react";

const HourglassScene = lazy(() => import("@/components/three/HourglassScene").then(m => ({ default: m.HourglassScene })));
const OrbScene = lazy(() => import("@/components/three/OrbScene").then(m => ({ default: m.OrbScene })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A-C-S — Performance. Strategy. Conversion." },
      { name: "description", content: "We turn attention into measurable outcomes. Strategy, execution, creative direction, and digital performance." },
      { property: "og:title", content: "A-C-S — Creative Performance Studio" },
      { property: "og:description", content: "You don't have an ad problem. You have a conversion problem." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useI18n();

  const whys = [
    { icon: Target, t: t("why_1_t"), d: t("why_1_d") },
    { icon: Zap, t: t("why_2_t"), d: t("why_2_d") },
    { icon: TrendingUp, t: t("why_3_t"), d: t("why_3_d") },
  ];

  const services = [
    t("s_strategy"), t("s_ads"), t("s_brand"), t("s_smm"),
    t("s_video"), t("s_design"), t("s_seo"), t("s_web"),
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`min-w-0 ${lang === "ar" ? "text-right" : "text-left"}`}
          >
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--gold)] mb-6">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="break-words">{t("hero_kicker")}</span>
            </div>
            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ivory break-words">
              <span className="block">{t("hero_title_1")}</span>
              <span className="block text-gradient-gold mt-2">{t("hero_title_2")}</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ivory/65 leading-relaxed max-w-xl">
              {t("hero_sub")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <GoldLink href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="w-4 h-4" />
                {t("cta_whatsapp")}
              </GoldLink>
              <GoldLink href="/services" variant="outline">
                {t("cta_explore")}
                <ArrowRight className="w-4 h-4" />
              </GoldLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full h-[320px] sm:h-[420px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-radial-gold blur-2xl" />
            <Suspense fallback={<div className="w-full h-full" />}>
              <HourglassScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--gold)]/60 text-xs tracking-[0.3em] flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--gold)]" />
          SCROLL
        </div>
      </section>

      {/* POSITIONING */}
      <section className="relative py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeading kicker={t("positioning_title")} title={t("positioning_text")} />
        </div>
      </section>

      {/* WHY MARKETING FAILS */}
      <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-b from-transparent via-[var(--warm-black)]/40 to-transparent">
        <SectionHeading kicker="// CONVERSION FIRST" title={t("why_title")} />
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6">
          {whys.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative bg-surface border border-gold rounded-2xl p-8 overflow-hidden hover:border-[var(--gold)] transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-lg"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-radial-gold blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                  <w.icon className="w-6 h-6 text-black" />
                </div>
                <div className="font-display text-2xl text-ivory mb-3">{w.t}</div>
                <p className="text-ivory/60 leading-relaxed">{w.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="relative py-32 px-6 lg:px-10">
        <SectionHeading kicker={t("services_title")} title={t("services_sub")} />
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20 border border-gold rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[var(--warm-black)] hover:bg-gradient-to-br hover:from-[var(--charcoal)] hover:to-black p-8 min-h-[160px] flex flex-col justify-between transition-all duration-500 group cursor-default"
            >
              <div className="text-xs text-[var(--gold)]/60 tracking-widest">0{i + 1}</div>
              <div className="font-display text-xl text-ivory group-hover:text-[var(--gold)] transition-colors">{s}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <GoldLink href="/services" variant="outline">
            {t("cta_explore")} <ArrowRight className="w-4 h-4" />
          </GoldLink>
        </div>
      </section>

      {/* 3D STORYTELLING */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px]">
            <div className="absolute inset-0 bg-radial-gold blur-2xl opacity-50" />
            <Suspense fallback={null}>
              <OrbScene />
            </Suspense>
          </div>
          <div>
            <SectionHeading
              align="start"
              kicker="// MARKET INTELLIGENCE"
              title={lang === "ar" ? "نقرأ السوق قبل أن نطلق إعلاناً." : "We read the market before we launch a single ad."}
              sub={lang === "ar"
                ? "البيانات، السلوك، المنافسة، والثقافة. كل قرار يبدأ بالفهم، لا بالتخمين."
                : "Data, behavior, competition, and culture. Every decision starts with understanding, not guessing."}
            />
          </div>
        </div>
      </section>

    </>
  );
}

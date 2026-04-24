import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { GoldLink } from "@/components/GoldButton";
import { CONTACT } from "@/lib/contact";
import { MessageCircle, Eye, Brain, Users, Target } from "lucide-react";

const OrbScene = lazy(() => import("@/components/three/OrbScene").then(m => ({ default: m.OrbScene })));

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Vision & Strategy — A-C-S" },
      { name: "description", content: "We think like strategists, execute like artists, measure like analysts." },
      { property: "og:title", content: "Vision & Strategy — A-C-S" },
      { property: "og:description", content: "Inside the mind of a creative performance studio." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();

  const pillars = [
    { icon: Eye, t: t("vision_t"), d: t("vision_d") },
    { icon: Brain, t: t("market_t"), d: t("market_d") },
    { icon: Users, t: t("audience_t"), d: t("audience_d") },
    { icon: Target, t: t("conv_t"), d: t("conv_d") },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`min-w-0 ${lang === "ar" ? "text-right" : "text-left"}`}
          >
            <div className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--gold)] mb-6">// VISION</div>
            <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-ivory break-words">
              {t("about_title")}
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ivory/70 leading-relaxed max-w-xl">{t("about_sub")}</p>
          </motion.div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <Suspense fallback={null}>
              <OrbScene />
            </Suspense>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-6 lg:px-10 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group relative bg-surface border border-gold rounded-2xl p-10 overflow-hidden hover:border-[var(--gold)] hover:shadow-gold-lg transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-radial-gold blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start gap-6">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <p.icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-ivory mb-3">{p.t}</h3>
                  <p className="text-ivory/60 leading-relaxed">{p.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-6 lg:px-10 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-6">// MANIFESTO</div>
          <blockquote className="font-display text-3xl md:text-5xl leading-snug text-ivory">
            {lang === "ar" ? (
              <>
                <span className="text-gradient-gold">"</span>
                نحن لا نبيعك إعلانات. نبيعك قراراً تجارياً مدروساً، يبدأ من الاستراتيجية وينتهي بالإيراد.
                <span className="text-gradient-gold">"</span>
              </>
            ) : (
              <>
                <span className="text-gradient-gold">"</span>
                We don't sell you ads. We sell you a calculated business decision, beginning with strategy and ending in revenue.
                <span className="text-gradient-gold">"</span>
              </>
            )}
          </blockquote>
        </div>
      </section>

      {/* MARKET */}
      <section className="px-6 lg:px-10 py-24">
        <SectionHeading
          kicker="// MARKET FLUENCY"
          title={lang === "ar" ? "نتحدث لغة السوق المحلي." : "We speak the local market's language."}
          sub={lang === "ar"
            ? "نفهم السوق السوري والإقليمي: السلوك الرقمي، قنوات التواصل، عادات الشراء، والثقافة. هذا ما يصنع حملات تنجح حيث يفشل الآخرون."
            : "We understand the Syrian and regional market: digital behavior, channels, buying habits, and culture. That's what makes campaigns succeed where others fail."}
        />
      </section>

      {/* CTA */}
      <section className="mt-12 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <GoldLink href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="w-4 h-4" />
            {t("cta_start")}
          </GoldLink>
        </div>
      </section>
    </div>
  );
}

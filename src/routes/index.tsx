import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { GoldButton } from "@/components/GoldButton";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { HeroCounter } from "@/components/HeroCounter";
import { Workflow } from "@/components/Workflow";
import { toast } from "sonner";
import {
  ArrowRight, Target, Zap, TrendingUp, Sparkles,
  Eye, Brain, Users,
  Send, User, AtSign, MessageSquare,
  Palette, Camera, Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

interface ServiceGroup {
  icon: LucideIcon;
  titleKey: "group_growth" | "group_brand" | "group_media" | "group_digital";
  items: ("s_ads" | "s_strategy" | "s_seo" | "s_smm" | "s_brand" | "s_design" | "s_video" | "s_face" | "s_web" | "s_app")[];
  desc: { ar: string; en: string };
}

const serviceGroups: ServiceGroup[] = [
  {
    icon: TrendingUp,
    titleKey: "group_growth",
    items: ["s_ads", "s_strategy", "s_seo", "s_smm"],
    desc: { ar: "حملات تُقاس بالإيرادات، لا بالإعجابات.", en: "Campaigns measured in revenue, not likes." },
  },
  {
    icon: Palette,
    titleKey: "group_brand",
    items: ["s_brand", "s_design"],
    desc: { ar: "هوية تُميّزك في ثانية، وتُقنع في دقيقة.", en: "Identity that distinguishes in a second, persuades in a minute." },
  },
  {
    icon: Camera,
    titleKey: "group_media",
    items: ["s_video", "s_face"],
    desc: { ar: "إنتاج سينمائي يخدم الرسالة، لا يستعرض نفسه.", en: "Cinematic production that serves the message, not itself." },
  },
  {
    icon: Code2,
    titleKey: "group_digital",
    items: ["s_web", "s_app"],
    desc: { ar: "منتجات رقمية تتحول، تُقاس، وتُحب.", en: "Digital products that convert, measure, and delight." },
  },
];

function HomePage() {
  const { t, lang } = useI18n();
  const isRTL = lang === "ar";

  const scrollTo = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hpWebsite, setHpWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          website: hpWebsite.trim(),
        }),
      });

      const data: unknown = await res.json().catch(() => null);
      const errMsg =
        data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok) {
        toast.error(errMsg ?? t("form_error"));
        return;
      }

      toast.success(t("form_success"));
      setName("");
      setEmail("");
      setMessage("");
      setHpWebsite("");
    } catch {
      toast.error(t("form_error"));
    } finally {
      setSubmitting(false);
    }
  };

  const whys = [
    { icon: Target, t: t("why_1_t"), d: t("why_1_d") },
    { icon: Zap, t: t("why_2_t"), d: t("why_2_d") },
    { icon: TrendingUp, t: t("why_3_t"), d: t("why_3_d") },
  ];

  const servicesGrid = [
    t("s_strategy"), t("s_ads"), t("s_brand"), t("s_smm"),
    t("s_video"), t("s_design"), t("s_seo"), t("s_web"),
  ];

  const pillars = [
    { icon: Eye, t: t("vision_t"), d: t("vision_d") },
    { icon: Brain, t: t("market_t"), d: t("market_d") },
    { icon: Users, t: t("audience_t"), d: t("audience_d") },
    { icon: Target, t: t("conv_t"), d: t("conv_d") },
  ];

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden w-full max-w-full scroll-mt-24">
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

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
            <h1 className="font-display text-[3rem] sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-tight text-ivory break-words">
              <span className="block text-gradient-gold">{t("hero_brand_1")}</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ivory/65 leading-relaxed max-w-xl">
              {t("hero_sub")}
            </p>
            <p className="mt-3 text-sm sm:text-[15px] text-ivory/55 font-light tracking-wide max-w-xl">
              {t("hero_value")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <GoldButton onClick={scrollTo("services")}>
                {t("cta_explore")}
                <ArrowRight className="w-4 h-4" />
              </GoldButton>
              <GoldButton onClick={scrollTo("about")} variant="outline">
                {t("cta_strategy")}
              </GoldButton>
            </div>
            <HeroCounter to={50} />
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
      <section className="relative py-32 px-6 lg:px-10">
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
      <section id="services" className="relative py-32 px-6 lg:px-10 scroll-mt-24">
        <SectionHeading kicker={t("services_title")} title={t("services_sub")} />
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20 border border-gold rounded-2xl overflow-hidden">
          {servicesGrid.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[var(--warm-black)] hover:bg-gradient-to-br hover:from-[var(--charcoal)] hover:to-black p-5 min-h-[110px] flex flex-col justify-between transition-all duration-500 group cursor-default"
            >
              <div className="text-[10px] text-[var(--gold)]/60 tracking-widest">0{i + 1}</div>
              <div className="font-display text-base md:text-lg text-ivory group-hover:text-[var(--gold)] transition-colors leading-tight">{s}</div>
            </motion.div>
          ))}
        </div>

        {/* Detailed services groups */}
        <div className="max-w-7xl mx-auto mt-24 space-y-24">
          {serviceGroups.map((g, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={g.titleKey}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
                className={`grid lg:grid-cols-12 gap-8 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="lg:col-span-5 [direction:inherit]">
                  <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-gold bg-surface group">
                    <div className="absolute inset-0 bg-radial-gold opacity-40" />
                    <div className="absolute inset-0 grid-overlay opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-gold blur-3xl opacity-50 animate-pulse-gold" />
                        <div className="relative w-40 h-40 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-lg group-hover:scale-110 transition-transform duration-700">
                          <g.icon className="w-16 h-16 text-black" strokeWidth={1.2} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-xs tracking-[0.4em] text-[var(--gold)]/70">0{i + 1}</div>
                  </div>
                </div>
                <div className={`lg:col-span-7 [direction:inherit] ${isRTL ? "text-right" : "text-left"}`}>
                  <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
                    {String(i + 1).padStart(2, "0")} / {serviceGroups.length.toString().padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl text-ivory mb-4">{t(g.titleKey)}</h3>
                  <p className="text-ivory/60 text-lg mb-8 max-w-xl">{g.desc[lang]}</p>
                  <div className="space-y-3">
                    {g.items.map((it, k) => (
                      <div
                        key={it}
                        className="group/item flex items-center gap-4 py-4 border-b border-gold/30 hover:border-[var(--gold)] transition-colors"
                      >
                        <span className="text-[var(--gold)]/50 text-xs font-mono">0{k + 1}</span>
                        <span className="font-display text-xl text-ivory group-hover/item:text-[var(--gold)] transition-colors">
                          {t(it)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* WORKFLOW */}
      <Workflow />

      {/* 3D STORYTELLING */}
      <section id="about" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden scroll-mt-24">
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

        {/* PILLARS */}
        <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

        {/* MANIFESTO */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
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

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT */}
      <section id="contact" className="relative py-32 px-6 lg:px-10 scroll-mt-24" dir={isRTL ? "rtl" : "ltr"}>
        <SectionHeading kicker="// CONTACT" title={t("contact_title")} sub={t("contact_sub")} />

        <div className="max-w-3xl mx-auto mt-16">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-surface border border-gold rounded-2xl p-8 md:p-12 shadow-deep overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-radial-gold blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-radial-gold blur-3xl opacity-30 pointer-events-none" />

            <div className="relative space-y-7">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="home-contact-check-field">Leave this field empty</label>
                <input
                  id="home-contact-check-field"
                  name="contact_check_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="new-password"
                  inputMode="text"
                  spellCheck={false}
                  data-lpignore="true"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                />
              </div>
              <div className={`grid md:grid-cols-2 gap-7 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    {t("form_name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("form_name_ph")}
                    required
                    dir={isRTL ? "rtl" : "ltr"}
                    className="w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                    <AtSign className="w-3.5 h-3.5" />
                    {t("form_email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("form_email_ph")}
                    required
                    dir="ltr"
                    className={`w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500 ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <label htmlFor="message" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t("form_message")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("form_message_ph")}
                  required
                  rows={6}
                  dir={isRTL ? "rtl" : "ltr"}
                  className="w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500 resize-none"
                />
              </div>

              <div className={`pt-4 flex ${isRTL ? "justify-start" : "justify-end"}`}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-sm tracking-widest uppercase font-medium bg-gradient-gold text-black shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span>{submitting ? t("form_sending") : t("form_submit")}</span>
                  <Send className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

    </>
  );
}

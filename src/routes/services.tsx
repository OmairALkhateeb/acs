import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { GoldLink } from "@/components/GoldButton";
import { CONTACT } from "@/lib/contact";
import { MessageCircle, TrendingUp, Palette, Camera, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — A-C-S Creative Performance" },
      { name: "description", content: "Paid advertising, branding, media production, and digital products engineered for conversion." },
      { property: "og:title", content: "Services — A-C-S" },
      { property: "og:description", content: "Growth, branding, media, and digital products under one roof." },
    ],
  }),
  component: ServicesPage,
});

interface Group {
  icon: LucideIcon;
  titleKey: "group_growth" | "group_brand" | "group_media" | "group_digital";
  items: ("s_ads" | "s_strategy" | "s_seo" | "s_smm" | "s_brand" | "s_design" | "s_video" | "s_face" | "s_web" | "s_app")[];
  desc: { ar: string; en: string };
}

const groups: Group[] = [
  {
    icon: TrendingUp,
    titleKey: "group_growth",
    items: ["s_ads", "s_strategy", "s_seo", "s_smm"],
    desc: {
      ar: "حملات تُقاس بالإيرادات، لا بالإعجابات.",
      en: "Campaigns measured in revenue, not likes.",
    },
  },
  {
    icon: Palette,
    titleKey: "group_brand",
    items: ["s_brand", "s_design"],
    desc: {
      ar: "هوية تُميّزك في ثانية، وتُقنع في دقيقة.",
      en: "Identity that distinguishes in a second, persuades in a minute.",
    },
  },
  {
    icon: Camera,
    titleKey: "group_media",
    items: ["s_video", "s_face"],
    desc: {
      ar: "إنتاج سينمائي يخدم الرسالة، لا يستعرض نفسه.",
      en: "Cinematic production that serves the message, not itself.",
    },
  },
  {
    icon: Code2,
    titleKey: "group_digital",
    items: ["s_web", "s_app"],
    desc: {
      ar: "منتجات رقمية تتحول، تُقاس، وتُحب.",
      en: "Digital products that convert, measure, and delight.",
    },
  },
];

function ServicesPage() {
  const { t, lang } = useI18n();
  return (
    <div className="pt-32 pb-20">
      <section className="px-6 lg:px-10">
        <SectionHeading kicker="// SERVICES" title={t("services_title")} sub={t("services_sub")} />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-24 space-y-24">
        {groups.map((g, i) => {
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

              <div className={`lg:col-span-7 [direction:inherit] ${lang === "ar" ? "text-right" : "text-left"}`}>
                <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
                  {String(i + 1).padStart(2, "0")} / {groups.length.toString().padStart(2, "0")}
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
      </section>

      <section className="mt-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <GoldLink href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="w-4 h-4" />
            {t("cta_whatsapp")}
          </GoldLink>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function HeroCounter({ to = 50 }: { to?: number }) {
  const { t } = useI18n();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1500; // ms
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 sm:mt-12 inline-flex items-center gap-5"
    >
      <span className="font-display text-6xl sm:text-7xl md:text-[5.5rem] leading-none font-bold text-gradient-gold tabular-nums">
        +{display}
      </span>
      <span className="block w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-[var(--gold)]/50 to-transparent" aria-hidden />
      <span className="text-ivory/85 text-xs sm:text-sm tracking-[0.32em] uppercase font-light">
        {t("team_label")}
      </span>
    </motion.div>
  );
}
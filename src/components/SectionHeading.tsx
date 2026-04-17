import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({ kicker, title, sub, align = "center" }: { kicker?: string; title: ReactNode; sub?: string; align?: "center" | "start" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-start";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-6"
        >
          <span className="w-8 h-px bg-[var(--gold)]" />
          {kicker}
          <span className="w-8 h-px bg-[var(--gold)]" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-4xl md:text-6xl leading-tight text-ivory"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-5 text-base md:text-lg text-ivory/60 leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

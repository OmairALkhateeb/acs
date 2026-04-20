import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";

export function FloatingWhatsApp() {
  const { t } = useI18n();
  return (
    <motion.a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp_chat_cta")}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[60] group"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-gold blur-xl opacity-60 group-hover:opacity-100 animate-pulse-gold" />
      <span className="relative flex items-center gap-2.5 px-5 py-3.5 md:px-6 md:py-4 rounded-full bg-gradient-gold shadow-gold-lg ring-1 ring-[var(--gold)]/60">
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={2.4} />
        <span className="font-medium text-sm md:text-base text-black whitespace-nowrap">
          {t("whatsapp_chat_cta")}
        </span>
      </span>
    </motion.a>
  );
}

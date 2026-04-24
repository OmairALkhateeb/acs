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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] group"
    >
      <span className="gold-button">
        <span className="button-text whitespace-nowrap text-xs md:text-sm tracking-[0.12em]">
          <MessageCircle className="h-4.5 w-4.5 md:h-5 md:w-5" strokeWidth={2.4} />
          {t("whatsapp_chat_cta")}
        </span>
      </span>
    </motion.a>
  );
}
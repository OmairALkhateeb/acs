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
      <span
        className="
          relative overflow-hidden flex items-center gap-2.5
          rounded-full px-4 py-3 md:px-5 md:py-3.5
          bg-[linear-gradient(135deg,#E9C86F_0%,#D6A33A_42%,#C48716_72%,#EFD48A_100%)]
          border border-[#E8C86C]/30
          shadow-[0_10px_24px_rgba(0,0,0,0.32),0_0_18px_rgba(225,180,70,0.20)]
          transition-all duration-500 ease-out
          group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.38),0_0_24px_rgba(240,197,92,0.28)]
          group-hover:brightness-105
        "
      >
        <span
          className="
            absolute inset-0 translate-x-[-120%]
            bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_40%,rgba(255,250,220,0.22)_50%,rgba(255,255,255,0.08)_60%,transparent_100%)]
            transition-transform duration-700 ease-out
            group-hover:translate-x-[120%]
          "
        />

        <MessageCircle
          className="relative z-10 h-4.5 w-4.5 md:h-5 md:w-5 text-black"
          strokeWidth={2.4}
        />

        <span className="relative z-10 whitespace-nowrap text-xs md:text-sm font-semibold tracking-[0.12em] uppercase text-black">
          {t("whatsapp_chat_cta")}
        </span>
      </span>
    </motion.a>
  );
}
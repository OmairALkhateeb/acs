import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";
import { Mail, MessageCircle } from "lucide-react";
import acsLogo from "@/assets/acs-logo.png";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-gold mt-32 bg-gradient-to-b from-transparent to-[var(--warm-black)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img src={acsLogo} alt="A-C-S" className="h-14 w-auto object-contain" />
          <p className="mt-4 text-sm text-ivory/60 leading-relaxed max-w-xs">{t("brand_tag")}</p>
        </div>

        <div className="space-y-3 text-sm">
          <Link to="/" className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_home")}</Link>
          <Link to="/services" className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_services")}</Link>
          <Link to="/about" className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_about")}</Link>
          <Link to="/contact" className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_contact")}</Link>
        </div>

        <div className="space-y-4">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-ivory/80 hover:text-[var(--gold)]">
            <MessageCircle className="w-4 h-4 text-[var(--gold)]" />
            {CONTACT.whatsapp}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-ivory/80 hover:text-[var(--gold)]">
            <Mail className="w-4 h-4 text-[var(--gold)]" />
            {CONTACT.email}
          </a>
        </div>
      </div>
      <div className="luxe-divider" />
      <div className="text-center text-xs text-ivory/40 py-6 tracking-widest">{t("footer_rights")}</div>
    </footer>
  );
}

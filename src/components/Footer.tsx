import { useI18n } from "@/lib/i18n";
import { MapPin } from "lucide-react";
import acsLogo from "@/assets/acs-logo.png";

export function Footer() {
  const { t } = useI18n();
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };
  return (
    <footer className="relative border-t border-gold mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img src={acsLogo} alt="A-C-S" className="h-14 w-auto object-contain" />
          <p className="mt-4 text-sm text-ivory/60 leading-relaxed max-w-xs">{t("brand_tag")}</p>
        </div>

        <div className="space-y-3 text-sm">
          <a href="#home" onClick={scrollTo("home")} className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_home")}</a>
          <a href="#services" onClick={scrollTo("services")} className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_services")}</a>
          <a href="#about" onClick={scrollTo("about")} className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_about")}</a>
          <a href="#contact" onClick={scrollTo("contact")} className="block text-ivory/70 hover:text-[var(--gold)]">{t("nav_contact")}</a>
        </div>

        <div className="space-y-3 text-sm text-ivory/70">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span><span className="text-[var(--gold-soft)]">HQ</span> · Dubai, UAE</span>
          </div>
          <div className="ps-7 text-ivory/55">Jordan · Saudi Arabia · Syria</div>
        </div>
      </div>
      <div className="luxe-divider" />
      <div className="text-center text-xs text-ivory/40 py-6 tracking-widest">{t("footer_rights")}</div>
    </footer>
  );
}

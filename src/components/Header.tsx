import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";
import acsLogo from "@/assets/acs-logo.png";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/services", label: t("nav_services") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-gold"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <Link to="/" className="flex items-center group" aria-label="A-C-S Home">
          <img
            src={acsLogo}
            alt="A-C-S"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-[var(--gold)]" : "text-ivory/70 hover:text-[var(--gold-soft)]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="flex items-center gap-2 text-xs tracking-widest text-ivory/80 hover:text-[var(--gold)] transition-colors border border-gold/30 rounded-full px-4 py-2 hover:border-[var(--gold)] hover:shadow-gold"
          aria-label="Toggle language"
        >
          <Globe className="w-3.5 h-3.5" />
          {lang === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

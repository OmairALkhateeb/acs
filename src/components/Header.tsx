import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";
import acsLogo from "@/assets/acs-logo.png";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: t("nav_home") },
    { id: "services", label: t("nav_services") },
    { id: "workflow", label: t("nav_workflow") },
    { id: "about", label: t("nav_about") },
    { id: "contact", label: t("nav_contact") },
  ] as const;

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-gold"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <Link
          to="/"
          onClick={(e) => handleNav(e as unknown as React.MouseEvent<HTMLAnchorElement>, "home")}
          className="flex items-center group"
          aria-label="A-C-S Home"
        >
          <img
            src={acsLogo}
            alt="A-C-S"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = activeId === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleNav(e, l.id)}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-[var(--gold)]" : "text-ivory/70 hover:text-[var(--gold-soft)]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-gold" />
                )}
              </a>
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

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/servicos" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.about"), href: "/sobre" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.plans"), href: "/planos" },
    { label: t("nav.contact"), href: "/contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 lg:h-20">
        <Link to="/" className="text-xl lg:text-2xl font-display font-bold tracking-tight text-foreground leading-none flex items-center">
          Unive<span className="text-primary">SIA</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <LanguageSelector />
          <Link
            to="/contato"
            className="gradient-btn px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            {t("nav.contactUs")}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSelector />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 text-left rounded-md transition-colors text-base ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contato"
              className="gradient-btn px-5 py-3 rounded-full text-sm font-semibold mt-2 text-center"
            >
              {t("nav.contactUs")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

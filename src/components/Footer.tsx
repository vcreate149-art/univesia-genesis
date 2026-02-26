import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONFIG } from "@/config";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const socials = [
  { icon: Instagram, href: CONFIG.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: CONFIG.social.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${CONFIG.social.email}`, label: "Email" },
];

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    navegacao: {
      title: t("footer.navigation"),
      links: [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.services"), href: "/servicos" },
        { label: t("nav.portfolio"), href: "/portfolio" },
        { label: t("nav.blog"), href: "/blog" },
      ],
    },
    servicos: {
      title: t("footer.services"),
      links: [
        { label: "Websites", href: "/servicos" },
        { label: "Sistemas Web", href: "/servicos" },
        { label: "Mobile", href: "/servicos" },
        { label: "IA & Automação", href: "/servicos" },
      ],
    },
    contato: {
      title: t("footer.contact"),
      links: [
        { label: CONFIG.social.email, href: `mailto:${CONFIG.social.email}`, external: true },
        { label: "WhatsApp", href: `https://wa.me/${CONFIG.whatsapp.number}`, external: true },
        { label: "FAQ", href: "/faq" },
      ],
    },
  };

  return (
    <footer className="border-t border-border bg-muted/30 pt-10 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-display font-bold text-foreground">
              Unive<span className="text-primary">SIA</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">{t("footer.tagline")}</p>
            <div className="flex gap-3 mt-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-3 text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 {CONFIG.company.name}. {t("footer.allRights")}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacidade" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
            <Link to="/termos" className="hover:text-primary transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";
import { CONFIG } from "@/config";
import { Instagram, Linkedin, Github, Mail, Heart } from "lucide-react";

const footerLinks = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Como Funciona", href: "/" },
    { label: "Portfólio", href: "/portfolio" },
    { label: "Sobre", href: "/sobre" },
  ],
  servicos: [
    { label: "Websites", href: "/servicos" },
    { label: "Sistemas Web", href: "/servicos" },
    { label: "Mobile", href: "/servicos" },
    { label: "IA & Automação", href: "/servicos" },
  ],
  contato: [
    { label: CONFIG.social.email, href: `mailto:${CONFIG.social.email}`, external: true },
    { label: "WhatsApp", href: `https://wa.me/${CONFIG.whatsapp.number}`, external: true },
  ],
};

const socials = [
  { icon: Instagram, href: CONFIG.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: CONFIG.social.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${CONFIG.social.email}`, label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-display font-bold">
              Unive<span className="text-primary glow-text">SIA</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">
              Transformando negócios através de tecnologia inteligente
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold capitalize mb-3">
                {title === "navegacao" ? "Navegação" : title === "servicos" ? "Serviços" : "Contato"}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 UniveSIA. Todos os direitos reservados.</p>
          <p className="inline-flex items-center gap-1">
            Desenvolvido com <Heart size={12} className="text-primary fill-primary" /> pela própria UniveSIA
          </p>
        </div>
      </div>
    </footer>
  );
};

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { getTechIcon } from "@/components/TechIcons";
import { Globe, Server, Smartphone, Zap, Users, Brain, X } from "lucide-react";

const icons = [Globe, Server, Smartphone, Zap, Users, Brain];
const tags = [
  ["React", "Next.js", "Tailwind", "WordPress"],
  ["Node.js", "Python", "PostgreSQL", "APIs"],
  ["React Native", "Flutter", "iOS", "Android"],
  ["n8n", "Zapier", "RPA", "Webhooks"],
  ["Arquitetura", "Code Review", "Performance"],
  ["ChatGPT", "LLMs", "Visão Computacional"],
];

const serviceToProject: Record<number, string> = {
  0: "Website / Landing Page",
  1: "Sistema Web",
  2: "Aplicativo Mobile",
  3: "Automação / Integração",
  4: "Consultoria",
  5: "Inteligência Artificial",
};

export const Services = ({ limit }: { limit?: number }) => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as {
    title: string; desc: string; detail: string; useCases: string[]; timeline: string;
  }[];
  const visibleItems = limit ? items.slice(0, limit) : items;
  const selected = openModal !== null ? items[openModal] : null;
  const SelectedIcon = openModal !== null ? icons[openModal] : null;

  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("services.title")} <span className="text-gradient">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            {t("services.subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleItems.map((s, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 80} direction="scale">
                <TiltCard
                  className="glass-card p-6 h-full flex flex-col group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setOpenModal(i)}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags[i]?.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80 inline-flex items-center gap-1">
                        <span className="text-primary">{getTechIcon(tag)}</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-primary hover:underline self-start">
                    {t("services.learnMore")}
                  </button>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {limit && limit < items.length && (
          <ScrollReveal className="text-center mt-8">
            <Link to="/servicos" className="gradient-btn px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              {t("services.viewAll")}
            </Link>
          </ScrollReveal>
        )}
      </div>

      {selected && SelectedIcon && openModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpenModal(null)}
        >
          <div className="glass-card border-primary/20 max-w-lg w-full p-6 sm:p-8 relative rounded-t-2xl sm:rounded-2xl max-h-[85dvh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label={t("services.close")}>
              <X size={20} />
            </button>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <SelectedIcon size={22} className="text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">{selected.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{selected.detail}</p>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">{t("services.useCases")}</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {selected.useCases.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-muted-foreground">{t("services.avgTimeline")}</span>
                <p className="text-sm font-medium text-primary">{selected.timeline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags[openModal]?.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80 inline-flex items-center gap-1">
                    <span className="text-primary">{getTechIcon(tag)}</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                const type = serviceToProject[openModal] || "Outro";
                navigate(`/contato?servico=${encodeURIComponent(type)}`);
              }}
              className="gradient-btn w-full py-3 rounded-full text-sm font-semibold text-center block"
            >
              {t("services.requestProposal")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

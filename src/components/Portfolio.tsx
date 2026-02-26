import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getTechIcon } from "@/components/TechIcons";
import { X, ExternalLink, TrendingUp } from "lucide-react";

const projects = [
  { name: "MedFlow", category: "Sistemas", desc: "Sistema de gestão para clínicas médicas", tech: ["React", "Node.js", "PostgreSQL"], challenge: "A clínica enfrentava atrasos, faltas frequentes e prontuários em papel, gerando ineficiência e perda de receita.", solution: "Desenvolvemos uma plataforma completa com agendamento inteligente, prontuários eletrônicos e faturamento integrado.", results: [{ label: "Redução de faltas", value: "-60%" }, { label: "Tempo de atendimento", value: "-40%" }, { label: "Satisfação dos pacientes", value: "+85%" }], color: "from-primary/20 to-secondary/20" },
  { name: "ShopBoost", category: "Websites", desc: "Landing page de alta conversão para e-commerce", tech: ["Next.js", "Tailwind CSS", "Vercel"], challenge: "O e-commerce tinha taxa de conversão abaixo de 1% e alto custo de aquisição de clientes via tráfego pago.", solution: "Criamos uma landing page mobile-first com design persuasivo, A/B testing integrado e otimização de velocidade.", results: [{ label: "Taxa de conversão", value: "+150%" }, { label: "Custo por aquisição", value: "-35%" }, { label: "Tempo de carregamento", value: "1.2s" }], color: "from-secondary/20 to-primary/20" },
  { name: "JusDigital", category: "Sistemas", desc: "Sistema jurídico de processos digitais", tech: ["Vue.js", "Python", "Django"], challenge: "Escritório com 80% dos processos em papel, prazos perdidos e dificuldade em escalar o atendimento.", solution: "Digitalização completa com gestão de prazos automatizada, documentos na nuvem e painel de controle em tempo real.", results: [{ label: "Redução de papel", value: "-80%" }, { label: "Prazos cumpridos", value: "99.5%" }, { label: "Produtividade", value: "+45%" }], color: "from-primary/30 to-transparent" },
  { name: "ConnectApp", category: "Mobile", desc: "App de networking profissional", tech: ["React Native", "Firebase", "Node.js"], challenge: "Dificuldade em conectar profissionais com interesses semelhantes em eventos e conferências.", solution: "App com matching inteligente baseado em interesses, localização e disponibilidade, com chat integrado.", results: [{ label: "Downloads (1º mês)", value: "5.000+" }, { label: "Matches realizados", value: "12.000+" }, { label: "NPS", value: "72" }], color: "from-secondary/30 to-transparent" },
  { name: "AutomateX", category: "Automações", desc: "Plataforma de automação para PMEs", tech: ["n8n", "API REST", "Webhooks"], challenge: "Equipe gastava 120+ horas mensais em tarefas repetitivas de entrada de dados entre CRM, e-mail e ERP.", solution: "Fluxos de automação conectando todos os sistemas, com notificações inteligentes e relatórios automatizados.", results: [{ label: "Horas economizadas/mês", value: "120h" }, { label: "ROI alcançado em", value: "2 meses" }, { label: "Erros manuais", value: "-95%" }], color: "from-primary/20 to-secondary/10" },
  { name: "AiAssist", category: "IA", desc: "Chatbot com IA para atendimento ao cliente", tech: ["Python", "LLM", "FastAPI"], challenge: "Suporte sobrecarregado com tempo de resposta de horas e alta insatisfação dos clientes.", solution: "Chatbot inteligente com NLP avançado que entende contexto, resolve dúvidas e escala para humanos quando necessário.", results: [{ label: "Atendimentos automatizados", value: "70%" }, { label: "Tempo de resposta", value: "<5s" }, { label: "Satisfação do cliente", value: "+60%" }], color: "from-secondary/20 to-primary/10" },
];

export const Portfolio = () => {
  const [filter, setFilter] = useState("Todos");
  const [openProject, setOpenProject] = useState<number | null>(null);
  const { t } = useTranslation();

  const categories = t("portfolio.categories", { returnObjects: true }) as string[];
  const categoryMap: Record<string, string> = { Todos: "Todos", Websites: "Websites", Sistemas: "Sistemas", Mobile: "Mobile", Automações: "Automações", IA: "IA" };
  // Map translated category back to project category
  const translatedToOriginal: Record<string, string> = {};
  const originalCats = ["Todos", "Websites", "Sistemas", "Mobile", "Automações", "IA"];
  categories.forEach((cat, i) => { translatedToOriginal[cat] = originalCats[i]; });

  const originalFilter = translatedToOriginal[filter] || "Todos";
  const filtered = originalFilter === "Todos" ? projects : projects.filter((p) => p.category === originalFilter);
  const selected = openProject !== null ? projects[openProject] : null;

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("portfolio.title")} <span className="text-gradient">{t("portfolio.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">{t("portfolio.subtitle")}</p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "gradient-btn" : "glass-btn"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((p, i) => {
            const globalIndex = projects.indexOf(p);
            return (
              <ScrollReveal key={p.name} delay={i * 80} direction="scale">
                <div className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300" onClick={() => setOpenProject(globalIndex)}>
                  <div className={`h-40 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}>
                    <span className="text-2xl font-display font-bold text-primary/60 group-hover:text-primary transition-colors">{p.name}</span>
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{t("portfolio.viewCase")}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary/80 mb-1 block">{p.category}</span>
                    <h3 className="font-display font-semibold mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 inline-flex items-center gap-1">
                          <span className="text-primary">{getTechIcon(tech)}</span>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => setOpenProject(null)}>
          <div className="glass-card border-primary/20 max-w-lg w-full p-6 sm:p-8 relative rounded-t-2xl sm:rounded-2xl max-h-[85dvh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenProject(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label={t("portfolio.close")}>
              <X size={20} />
            </button>
            <span className="text-xs text-primary/80 mb-2 block">{selected.category}</span>
            <h3 className="text-xl font-display font-bold mb-4">{selected.name}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t("portfolio.challenge")}</h4>
                <p className="text-sm text-muted-foreground">{selected.challenge}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t("portfolio.solution")}</h4>
                <p className="text-sm text-muted-foreground">{selected.solution}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                  <TrendingUp size={14} /> {t("portfolio.results")}
                </h4>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {selected.results.map((r) => (
                    <div key={r.label} className="text-center bg-primary/5 rounded-lg p-3">
                      <div className="text-lg font-display font-bold text-primary">{r.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.tech.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80 inline-flex items-center gap-1">
                  <span className="text-primary">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
            <Link to="/contato" className="gradient-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2">
              {t("portfolio.similarProject")} <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

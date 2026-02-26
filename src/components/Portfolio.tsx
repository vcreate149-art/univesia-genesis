import { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getTechIcon } from "@/components/TechIcons";
import { X, ExternalLink } from "lucide-react";

const categories = ["Todos", "Websites", "Sistemas", "Mobile", "Automações", "IA"];

const projects = [
  {
    name: "MedFlow",
    category: "Sistemas",
    desc: "Sistema de gestão para clínicas médicas",
    tech: ["React", "Node.js", "PostgreSQL"],
    detail: "Plataforma completa para gestão de clínicas com agendamento, prontuários eletrônicos e faturamento. Reduziu o tempo de atendimento em 40%.",
    color: "from-primary/20 to-secondary/20",
  },
  {
    name: "ShopBoost",
    category: "Websites",
    desc: "Landing page de alta conversão para e-commerce",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    detail: "Landing page otimizada que aumentou a taxa de conversão em 150% em 30 dias. Design focado em mobile-first com A/B testing integrado.",
    color: "from-secondary/20 to-primary/20",
  },
  {
    name: "JusDigital",
    category: "Sistemas",
    desc: "Sistema jurídico de processos digitais",
    tech: ["Vue.js", "Python", "Django"],
    detail: "Digitalização completa de processos jurídicos, com gestão de prazos, documentos e atendimentos. Eliminou 80% do uso de papel.",
    color: "from-primary/30 to-transparent",
  },
  {
    name: "ConnectApp",
    category: "Mobile",
    desc: "App de networking profissional",
    tech: ["React Native", "Firebase", "Node.js"],
    detail: "Aplicativo de networking com matching inteligente baseado em interesses e localização. Mais de 5.000 downloads no primeiro mês.",
    color: "from-secondary/30 to-transparent",
  },
  {
    name: "AutomateX",
    category: "Automações",
    desc: "Plataforma de automação para PMEs",
    tech: ["n8n", "API REST", "Webhooks"],
    detail: "Solução de automação que conecta CRM, e-mail marketing e ERP. Economia de 120 horas mensais em processos manuais.",
    color: "from-primary/20 to-secondary/10",
  },
  {
    name: "AiAssist",
    category: "IA",
    desc: "Chatbot com IA para atendimento ao cliente",
    tech: ["Python", "LLM", "FastAPI"],
    detail: "Chatbot inteligente com compreensão de linguagem natural que resolve 70% das solicitações sem intervenção humana.",
    color: "from-secondary/20 to-primary/10",
  },
];

export const Portfolio = () => {
  const [filter, setFilter] = useState("Todos");
  const [openProject, setOpenProject] = useState<number | null>(null);

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);
  const selected = openProject !== null ? projects[openProject] : null;

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            Nosso <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">Projetos que geraram resultados reais</p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "gradient-btn"
                  : "glass-btn"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((p, i) => {
            const globalIndex = projects.indexOf(p);
            return (
              <ScrollReveal key={p.name} delay={i * 80} direction="scale">
                <div
                  className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300"
                  onClick={() => setOpenProject(globalIndex)}
                >
                  {/* Preview area */}
                  <div className={`h-40 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}>
                    <span className="text-2xl font-display font-bold text-primary/60 group-hover:text-primary transition-colors">
                      {p.name}
                    </span>
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">Ver Projeto →</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary/80 mb-1 block">{p.category}</span>
                    <h3 className="font-display font-semibold mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 inline-flex items-center gap-1">
                          <span className="text-primary">{getTechIcon(t)}</span>
                          {t}
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

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpenProject(null)}
        >
          <div className="glass-card border-primary/20 max-w-lg w-full p-6 sm:p-8 relative rounded-t-2xl sm:rounded-2xl max-h-[85dvh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenProject(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Fechar">
              <X size={20} />
            </button>
            <span className="text-xs text-primary/80 mb-2 block">{selected.category}</span>
            <h3 className="text-xl font-display font-bold mb-3">{selected.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{selected.detail}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80 inline-flex items-center gap-1">
                  <span className="text-primary">{getTechIcon(t)}</span>
                  {t}
                </span>
              ))}
            </div>
            <Link
              to="/contato"
              className="gradient-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              Projeto Similar <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { Globe, Server, Smartphone, Zap, Users, Brain, X } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Websites e Landing Pages",
    desc: "Sites modernos, rápidos e otimizados para conversão.",
    tags: ["React", "Next.js", "Tailwind", "WordPress"],
    detail: "Criamos websites e landing pages de alta performance com foco em conversão, SEO e experiência do usuário. Design responsivo e carregamento ultrarrápido.",
    useCases: ["Landing pages de campanhas", "Sites institucionais", "Portais corporativos"],
    timeline: "2 a 4 semanas",
  },
  {
    icon: Server,
    title: "Sistemas Web Personalizados",
    desc: "Aplicações sob medida para automatizar processos.",
    tags: ["Node.js", "Python", "PostgreSQL", "APIs"],
    detail: "Desenvolvemos sistemas web completos para gestão, CRM, ERP e processos internos. Arquitetura escalável e integrações robustas.",
    useCases: ["Sistemas de gestão interna", "Dashboards analíticos", "Portais de clientes"],
    timeline: "4 a 12 semanas",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    desc: "Apps nativos e cross-platform para iOS e Android.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    detail: "Aplicativos mobile com experiência nativa, performance otimizada e design intuitivo para engajar seus usuários.",
    useCases: ["Apps de delivery", "Apps corporativos", "MVPs para startups"],
    timeline: "6 a 16 semanas",
  },
  {
    icon: Zap,
    title: "Automações e Integrações",
    desc: "Conecte ferramentas e automatize tarefas repetitivas.",
    tags: ["n8n", "Zapier", "RPA", "Webhooks"],
    detail: "Automatizamos fluxos de trabalho, integramos sistemas e eliminamos tarefas manuais para aumentar a produtividade da sua equipe.",
    useCases: ["Automação de vendas", "Integração de ERPs", "Fluxos de atendimento"],
    timeline: "1 a 3 semanas",
  },
  {
    icon: Users,
    title: "Consultoria Técnica",
    desc: "Orientação especializada para decisões tecnológicas.",
    tags: ["Arquitetura", "Code Review", "Performance"],
    detail: "Oferecemos consultoria em arquitetura de software, code review, migração de sistemas e otimização de performance.",
    useCases: ["Auditoria de código", "Planejamento de migração", "Mentoria técnica"],
    timeline: "Sob demanda",
  },
  {
    icon: Brain,
    title: "Inteligência Artificial",
    desc: "Chatbots, LLMs e automação inteligente com IA.",
    tags: ["ChatGPT", "LLMs", "Visão Computacional"],
    detail: "Implementamos soluções de IA para atendimento, análise de dados e automação de processos com modelos de linguagem e visão computacional.",
    useCases: ["Chatbots de atendimento", "Análise preditiva", "Processamento de documentos"],
    timeline: "3 a 8 semanas",
  },
];

export const Services = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const selected = openModal !== null ? services[openModal] : null;

  return (
    <section id="servicos" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Soluções completas para transformar e escalar seu negócio
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="scale">
              <TiltCard
                className="glass-card p-6 h-full flex flex-col group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => setOpenModal(i)}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <s.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 text-sm text-primary hover:underline self-start">
                  Saiba Mais →
                </button>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="glass-card border-primary/20 max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <selected.icon size={22} className="text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">{selected.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{selected.detail}</p>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Casos de Uso</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {selected.useCases.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-muted-foreground">Prazo médio</span>
                <p className="text-sm font-medium text-primary">{selected.timeline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80">{tag}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setOpenModal(null);
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="gradient-btn w-full py-3 rounded-full text-sm font-semibold"
            >
              Solicitar Proposta
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

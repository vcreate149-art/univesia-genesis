import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "Ideal para presença digital inicial",
    features: [
      "Landing Page profissional",
      "Design responsivo",
      "Domínio + Hospedagem",
      "SEO básico",
      "Suporte 30 dias",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    desc: "Para empresas que precisam escalar",
    features: [
      "Sistema Web completo",
      "Dashboard personalizado",
      "Integrações com APIs",
      "Design sob medida",
      "Suporte 90 dias",
      "Treinamento da equipe",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "Solução completa e personalizada",
    features: [
      "Solução 100% sob medida",
      "IA e Automações",
      "Arquitetura escalável",
      "Consultoria estratégica",
      "Suporte contínuo",
      "SLA dedicado",
    ],
    highlighted: false,
  },
];

export const Pricing = () => {
  return (
    <section id="planos" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Planos e <span className="text-gradient">Propostas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o plano ideal para o momento do seu negócio
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="scale">
              <TiltCard
                className={`glass-card p-6 flex flex-col relative ${
                  plan.highlighted
                    ? "border-primary/40 glow-border"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-btn px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles size={12} /> Mais Popular
                  </div>
                )}
                <h3 className="text-xl font-display font-bold mb-1 mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3 rounded-full text-sm font-semibold ${
                    plan.highlighted ? "gradient-btn" : "glass-btn"
                  }`}
                >
                  Solicitar Proposta
                </button>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

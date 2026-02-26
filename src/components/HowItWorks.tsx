import { ScrollReveal } from "@/components/ScrollReveal";
import { Search, PenTool, Code, TestTube, Rocket, Headphones } from "lucide-react";

const steps = [
  { icon: Search, title: "Discovery e Briefing", desc: "Entendemos seu negócio e objetivos" },
  { icon: PenTool, title: "Planejamento e Arquitetura", desc: "Definimos a solução ideal" },
  { icon: PenTool, title: "Design e Prototipagem", desc: "Criamos a experiência visual" },
  { icon: Code, title: "Desenvolvimento", desc: "Construímos com tecnologia de ponta" },
  { icon: TestTube, title: "Testes e QA", desc: "Garantimos qualidade e performance" },
  { icon: Rocket, title: "Deploy e Suporte", desc: "Entregamos e acompanhamos" },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nosso processo de trabalho garante resultados excepcionais em cada etapa
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="scale">
              <div className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Step number */}
                <span className="absolute top-4 right-4 text-5xl font-display font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

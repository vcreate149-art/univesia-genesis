import { ScrollReveal } from "@/components/ScrollReveal";
import { Lightbulb, Eye, Shield, Heart } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Inovação", desc: "Buscamos sempre as melhores tecnologias e práticas do mercado" },
  { icon: Eye, title: "Transparência", desc: "Comunicação clara e honesta em todas as etapas do projeto" },
  { icon: Shield, title: "Qualidade", desc: "Código limpo, testes rigorosos e padrões de excelência" },
  { icon: Heart, title: "Comprometimento", desc: "Seu sucesso é o nosso sucesso, nos dedicamos ao máximo" },
];

const skills = [
  { name: "Web Development", pct: 95 },
  { name: "Mobile", pct: 85 },
  { name: "IA & Automação", pct: 90 },
  { name: "Cloud & DevOps", pct: 80 },
];

const SkillBar = ({ name, pct }: { name: string; pct: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{name}</span>
      <span className="text-primary">{pct}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
        style={{ width: `${pct}%` }}
      />
    </div>
  </div>
);

export const About = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Sobre a <span className="text-gradient">UniveSIA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Somos uma agência de tecnologia apaixonada por transformar negócios através de soluções digitais inteligentes. 
            Combinamos criatividade, expertise técnica e metodologias ágeis para entregar resultados excepcionais.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="scale">
              <div className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="max-w-xl mx-auto">
          <h3 className="text-lg font-display font-semibold mb-6 text-center">Nossas Especialidades</h3>
          <div className="space-y-4">
            {skills.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

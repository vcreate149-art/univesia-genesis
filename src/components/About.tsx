import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Lightbulb, Eye, Shield, Heart } from "lucide-react";

const icons = [Lightbulb, Eye, Shield, Heart];

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
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${pct}%` }} />
    </div>
  </div>
);

export const About = () => {
  const { t } = useTranslation();
  const values = t("about.values", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="sobre" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("about.title")} <span className="text-gradient">{t("about.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">{t("about.description")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {values.map((v, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 100} direction="scale">
                <div className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="max-w-xl mx-auto">
          <h3 className="text-lg font-display font-semibold mb-6 text-center">{t("about.specialties")}</h3>
          <div className="space-y-4">
            {skills.map((s) => <SkillBar key={s.name} {...s} />)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

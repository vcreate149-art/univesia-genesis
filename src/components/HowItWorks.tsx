import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { Search, PenTool, Code, TestTube, Rocket, Headphones } from "lucide-react";

const icons = [Search, PenTool, PenTool, Code, TestTube, Rocket];

export const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="como-funciona" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("howItWorks.title")} <span className="text-gradient">{t("howItWorks.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            {t("howItWorks.subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i] || Rocket;
            return (
              <ScrollReveal key={i} delay={i * 100} direction="scale">
                <TiltCard className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-5xl font-display font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

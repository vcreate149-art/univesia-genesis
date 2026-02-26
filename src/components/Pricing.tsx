import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { Check, Sparkles } from "lucide-react";

export const Pricing = () => {
  const { t } = useTranslation();
  const plans = t("pricing.plans", { returnObjects: true }) as {
    name: string; desc: string; features: string[];
  }[];

  return (
    <section id="planos" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("pricing.title")} <span className="text-gradient">{t("pricing.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">{t("pricing.subtitle")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const highlighted = i === 1;
            return (
              <ScrollReveal key={i} delay={i * 100} direction="scale">
                <TiltCard className={`glass-card p-6 flex flex-col relative ${highlighted ? "border-primary/40 glow-border" : ""}`}>
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-btn px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles size={12} /> {t("pricing.mostPopular")}
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
                  <Link to="/contato" className={`w-full py-3 rounded-full text-sm font-semibold text-center block ${highlighted ? "gradient-btn" : "glass-btn"}`}>
                    {t("pricing.requestProposal")}
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

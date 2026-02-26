import { ScrollReveal } from "@/components/ScrollReveal";

const certifications = [
  { name: "AWS", label: "Amazon Web Services" },
  { name: "GCP", label: "Google Cloud Platform" },
  { name: "Meta", label: "Meta Business Partner" },
  { name: "React", label: "React Certified" },
  { name: "ISO", label: "ISO 27001 Compliance" },
];

export const Certifications = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            Certificações & <span className="text-gradient">Parcerias</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Tecnologias e parcerias que garantem a qualidade dos nossos projetos
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 80} direction="scale">
              <div className="glass-card px-6 py-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-all duration-300 min-w-[120px]">
                <span className="text-xl font-display font-bold text-primary">{cert.name}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground text-center">{cert.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

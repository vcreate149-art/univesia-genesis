import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getTechIcon } from "@/components/TechIcons";

const techLogos = [
  "React", "Node.js", "Python", "Flutter", "AWS", "Google Cloud",
  "OpenAI", "n8n", "Stripe", "PostgreSQL", "TypeScript", "Docker",
  "Next.js", "Tailwind CSS", "Firebase", "MongoDB",
];

export const Partners = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <p className="text-muted-foreground">
            Construímos com as melhores tecnologias do mercado
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee gap-8 items-center">
            {[...techLogos, ...techLogos].map((tech, i) => (
              <div
                key={i}
                className="glass-card px-6 py-3 whitespace-nowrap text-sm text-muted-foreground font-medium hover:text-primary hover:border-primary/30 transition-all shrink-0 inline-flex items-center gap-2"
              >
                <span className="text-primary">{getTechIcon(tech)}</span>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mt-20">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Pronto para <span className="text-gradient">transformar</span> seu negócio?
          </h3>
          <Link
            to="/contato"
            className="gradient-btn px-10 py-4 rounded-full text-base font-semibold inline-block"
          >
            Começar Agora
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

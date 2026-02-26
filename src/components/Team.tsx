import { ScrollReveal } from "@/components/ScrollReveal";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "João Silva",
    role: "CEO & Full-Stack Developer",
    avatar: "JS",
    bio: "Mais de 8 anos de experiência em desenvolvimento web e mobile. Especialista em React, Node.js e arquiteturas escaláveis.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Maria Oliveira",
    role: "CTO & AI Specialist",
    avatar: "MO",
    bio: "Engenheira de software com foco em inteligência artificial e automação. Experiência em Python, LLMs e soluções cloud.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Pedro Santos",
    role: "UX/UI Designer",
    avatar: "PS",
    bio: "Designer com foco em experiências digitais intuitivas. Especialista em Figma, design systems e pesquisa de usuários.",
    linkedin: "https://linkedin.com/in/",
  },
];

export const Team = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            Nossa <span className="text-gradient">Equipe</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Conheça os especialistas por trás das soluções da UniveSIA
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 100} direction="scale">
              <div className="glass-card p-6 text-center hover:border-primary/30 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-display font-semibold">{member.name}</h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${member.name}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
                <p className="text-xs text-primary/80 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

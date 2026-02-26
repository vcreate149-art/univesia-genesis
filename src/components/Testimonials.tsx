import { useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "CEO",
    company: "Clínica Vida Plena",
    text: "A UniveSIA transformou completamente nossa gestão. O sistema de agendamento reduziu nossas faltas em 60% e nossos pacientes adoraram a experiência digital.",
    avatar: "MC",
    linkedin: "https://linkedin.com/in/marianacosta",
  },
  {
    name: "Ricardo Almeida",
    role: "Diretor de Marketing",
    company: "ShopMax E-commerce",
    text: "A landing page que criaram para nossa campanha superou todas as expectativas. Aumento de 150% na conversão em apenas um mês. Profissionalismo impecável.",
    avatar: "RA",
    linkedin: "https://linkedin.com/in/ricardoalmeida",
  },
  {
    name: "Fernanda Lima",
    role: "Fundadora",
    company: "EduTech Brasil",
    text: "O chatbot com IA que a UniveSIA desenvolveu reduziu nosso tempo de resposta de horas para segundos. Os alunos ficaram muito mais satisfeitos com o suporte.",
    avatar: "FL",
    linkedin: "https://linkedin.com/in/fernandalima",
  },
  {
    name: "Carlos Mendes",
    role: "CTO",
    company: "LogiFlow Transportes",
    text: "As automações implementadas economizam mais de 120 horas mensais da nossa equipe. O ROI foi alcançado em menos de 2 meses. Recomendo fortemente.",
    avatar: "CM",
    linkedin: "https://linkedin.com/in/carlosmendes",
  },
  {
    name: "Ana Paula Santos",
    role: "Sócia",
    company: "Advocacia Digital SP",
    text: "O sistema jurídico que desenvolveram é incrível. Eliminamos 80% do papel do escritório e temos controle total dos prazos processuais.",
    avatar: "AS",
    linkedin: "https://linkedin.com/in/anapaulasantos",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            O que dizem nossos <span className="text-gradient">clientes</span>
          </h2>
        </ScrollReveal>

        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card p-5 sm:p-8 md:p-10 text-center transition-all duration-500">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 italic leading-relaxed">
              "{t.text}"
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                {t.avatar}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{t.name}</p>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${t.name}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 glass-btn rounded-full" aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`dot-indicator w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 glass-btn rounded-full" aria-label="Próximo">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

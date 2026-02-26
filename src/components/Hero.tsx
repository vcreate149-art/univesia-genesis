import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFIG } from "@/config";
import { Scene3D } from "@/components/Scene3D";
import { ScrollReveal } from "@/components/ScrollReveal";

const useTypewriter = (text: string, speed = 100, startDelay = 500) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const Counter = ({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary glow-text">
        {count}{suffix}
      </div>
      <div className="text-[11px] sm:text-sm text-muted-foreground mt-1 leading-tight">{label}</div>
    </div>
  );
};

export const Hero = () => {
  const { displayed, done } = useTypewriter("UniveSIA", 120, 300);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-16">
      {/* 3D Background */}
      <Scene3D />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(180_100%_50%_/_0.05)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-sm">
            <span className="w-2 h-2 bg-primary rounded-full pulse-glow" />
            <span className="text-muted-foreground">Inovação Digital</span>
          </div>

          {/* Title — fluid clamp */}
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-black mb-3 sm:mb-4 leading-[1.1] min-h-[1.2em]">
            {displayed}
            <span className={`inline-block w-[3px] h-[0.8em] bg-primary ml-1 ${done ? "animate-pulse" : ""}`} />
          </h1>

          {/* Subtitle */}
          <div
            className={`transition-all duration-700 ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-primary/80 tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase mb-4 sm:mb-6">
              Universal Intelligent System Architected
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Transformamos complexidade em soluções digitais inteligentes. Sites, sistemas, automações e IA para empresas que querem crescer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/contato"
                className="gradient-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2"
              >
                Começar Projeto <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
                className="glass-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2"
              >
                <Play size={18} /> Ver Como Funciona
              </button>
            </div>
          </div>

          {/* Counters */}
          <ScrollReveal className="mt-14 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto" delay={200}>
            <Counter target={CONFIG.counters.projects} label="Projetos Entregues" suffix="+" />
            <Counter target={CONFIG.counters.clients} label="Clientes Satisfeitos" suffix="+" />
            <Counter target={CONFIG.counters.years} label="Anos de Experiência" />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("como-funciona")}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-primary/60 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFIG } from "@/config";
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
      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-[11px] sm:text-sm text-muted-foreground mt-1 leading-tight">{label}</div>
    </div>
  );
};

export const Hero = () => {
  const { displayed, done } = useTypewriter("UniveSIA", 120, 300);

  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-16 bg-[hsl(220_60%_98%)]">
      {/* Large gradient orbs */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-bl from-[hsl(213_100%_50%_/_0.12)] via-[hsl(230_90%_60%_/_0.08)] to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[hsl(260_80%_60%_/_0.10)] via-[hsl(200_90%_60%_/_0.06)] to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-b from-[hsl(213_100%_50%_/_0.06)] to-transparent rounded-full blur-[60px]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(213 100% 50%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-[10%] w-16 h-16 border-2 border-primary/10 rounded-2xl rotate-12 float-animation" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-[15%] w-12 h-12 bg-primary/5 rounded-full float-animation" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-32 left-[20%] w-10 h-10 border-2 border-primary/8 rounded-lg rotate-45 float-animation" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-48 right-[10%] w-14 h-14 border-2 border-[hsl(260_80%_60%_/_0.1)] rounded-full float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[60%] left-[5%] w-8 h-8 bg-[hsl(260_80%_60%_/_0.05)] rounded-lg rotate-12 float-animation" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-sm rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full pulse-glow" />
            <span className="text-muted-foreground">Inovação Digital</span>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-black mb-3 sm:mb-4 leading-[1.1] min-h-[1.2em] flex items-center justify-center text-foreground">
            <span className="sr-only">UniveSIA</span>
            <span aria-hidden="true" className="relative inline-block">
              {displayed}
              <span className={`absolute right-[-8px] top-[0.1em] w-[3px] h-[0.8em] bg-primary ${done ? "animate-pulse" : ""}`} />
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`transition-all duration-700 ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-primary/70 tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase mb-4 sm:mb-6">
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
              <Link
                to="/planos"
                className="glass-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2"
              >
                Ver Planos
              </Link>
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
        onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-primary/40 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

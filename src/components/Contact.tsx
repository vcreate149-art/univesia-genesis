import { useState, FormEvent } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";
import { supabase } from "@/integrations/supabase/client";
import { Send, MessageCircle, Mail, Linkedin, Calendar, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const projectTypes = [
  "Website / Landing Page",
  "Sistema Web",
  "Aplicativo Mobile",
  "Automação / Integração",
  "Consultoria",
  "Inteligência Artificial",
  "Outro",
];

const budgets = [
  "Up to $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "Above $30,000",
];

const timelines = ["1 mês", "2-3 meses", "3-6 meses", "Sem prazo definido"];

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      company: form.company || null,
      project_type: form.projectType,
      budget: form.budget || null,
      timeline: form.timeline || null,
      message: form.message || null,
    });

    if (error) {
      setStatus("error");
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } else {
      setStatus("success");
      toast.success("Mensagem enviada com sucesso!");
    }
  };

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            Fale <span className="text-gradient">Conosco</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            Conte-nos sobre seu projeto e receba uma proposta personalizada
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4 bg-background">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Nome completo *"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail *"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="whatsapp"
                  placeholder="WhatsApp (com DDI) *"
                  required
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <input
                  name="company"
                  placeholder="Empresa (opcional)"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <select
                name="projectType"
                required
                value={form.projectType}
                onChange={handleChange}
                className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
              >
                <option value="">Tipo de Projeto *</option>
                {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                >
                  <option value="">Faixa de Orçamento</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                >
                  <option value="">Prazo Desejado</option>
                  {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <textarea
                name="message"
                placeholder="Descreva seu projeto..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="gradient-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "success" && <CheckCircle size={16} />}
                {status === "idle" && <Send size={16} />}
                {status === "idle" && "Enviar Mensagem"}
                {status === "sending" && "Enviando..."}
                {status === "success" && "Enviado com Sucesso!"}
                {status === "error" && "Tentar Novamente"}
              </button>
            </form>
          </ScrollReveal>

          {/* Sidebar */}
          <ScrollReveal direction="right" className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Contato Direto</h3>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={18} className="text-primary" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${CONFIG.social.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={18} className="text-primary" />
                  {CONFIG.social.email}
                </a>
                <a
                  href={CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={18} className="text-primary" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-2">Agendar Reunião Gratuita</h3>
              <p className="text-sm text-muted-foreground mb-4">
                30 minutos para conversar sobre seu projeto sem compromisso
              </p>
              <a
                href={CONFIG.calendly.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <Calendar size={16} /> Agendar Horário
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

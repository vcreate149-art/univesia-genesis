import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";
import { supabase } from "@/integrations/supabase/client";
import { Send, MessageCircle, Mail, Linkedin, Calendar, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ddiOptions = [
  { code: "+1", flag: "🇺🇸", label: "US/CA" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+55", flag: "🇧🇷", label: "BR" },
  { code: "+351", flag: "🇵🇹", label: "PT" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+39", flag: "🇮🇹", label: "IT" },
  { code: "+31", flag: "🇳🇱", label: "NL" },
  { code: "+41", flag: "🇨🇭", label: "CH" },
  { code: "+46", flag: "🇸🇪", label: "SE" },
  { code: "+47", flag: "🇳🇴", label: "NO" },
  { code: "+45", flag: "🇩🇰", label: "DK" },
  { code: "+358", flag: "🇫🇮", label: "FI" },
  { code: "+48", flag: "🇵🇱", label: "PL" },
  { code: "+353", flag: "🇮🇪", label: "IE" },
  { code: "+43", flag: "🇦🇹", label: "AT" },
  { code: "+32", flag: "🇧🇪", label: "BE" },
  { code: "+420", flag: "🇨🇿", label: "CZ" },
  { code: "+40", flag: "🇷🇴", label: "RO" },
  { code: "+36", flag: "🇭🇺", label: "HU" },
  { code: "+30", flag: "🇬🇷", label: "GR" },
  { code: "+90", flag: "🇹🇷", label: "TR" },
  { code: "+54", flag: "🇦🇷", label: "AR" },
  { code: "+52", flag: "🇲🇽", label: "MX" },
  { code: "+57", flag: "🇨🇴", label: "CO" },
  { code: "+56", flag: "🇨🇱", label: "CL" },
  { code: "+51", flag: "🇵🇪", label: "PE" },
  { code: "+598", flag: "🇺🇾", label: "UY" },
  { code: "+595", flag: "🇵🇾", label: "PY" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+64", flag: "🇳🇿", label: "NZ" },
  { code: "+81", flag: "🇯🇵", label: "JP" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+82", flag: "🇰🇷", label: "KR" },
  { code: "+65", flag: "🇸🇬", label: "SG" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
  { code: "+972", flag: "🇮🇱", label: "IL" },
  { code: "+27", flag: "🇿🇦", label: "ZA" },
  { code: "+234", flag: "🇳🇬", label: "NG" },
  { code: "+258", flag: "🇲🇿", label: "MZ" },
  { code: "+244", flag: "🇦🇴", label: "AO" },
];

const countryCodeToDialCode: Record<string, string> = {};
ddiOptions.forEach((o) => { countryCodeToDialCode[o.label] = o.code; });
// Add aliases
countryCodeToDialCode["US"] = "+1";
countryCodeToDialCode["CA"] = "+1";
countryCodeToDialCode["GB"] = "+44";

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
  const [searchParams] = useSearchParams();
  const [ddi, setDdi] = useState("+55");
  const [phone, setPhone] = useState("");
  const preselectedService = searchParams.get("servico") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: preselectedService,
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const detected = countryCodeToDialCode[data?.country_code];
        if (detected) {
          setDdi(detected);
        } else if (data?.country_calling_code) {
          // Fallback: use API's calling code directly and add to selector if missing
          const callingCode = data.country_calling_code;
          setDdi(callingCode);
          if (!ddiOptions.some((o) => o.code === callingCode)) {
            ddiOptions.push({ code: callingCode, flag: "🌍", label: data.country_code });
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      whatsapp: `${ddi} ${phone}`,
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
                <div className="flex gap-2">
                  <select
                    value={ddi}
                    onChange={(e) => setDdi(e.target.value)}
                    className="w-[110px] shrink-0 bg-muted/50 border border-primary/10 rounded-lg px-2 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  >
                    {ddiOptions.map((o) => (
                      <option key={o.code + o.label} value={o.code}>
                        {o.flag} {o.code}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    placeholder="Número WhatsApp *"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <input
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

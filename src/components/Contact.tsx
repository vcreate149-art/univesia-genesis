import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";
import { supabase } from "@/integrations/supabase/client";
import { Send, MessageCircle, Mail, Linkedin, Calendar, Loader2, CheckCircle, Sparkles } from "lucide-react";
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

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
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
  const [enhancing, setEnhancing] = useState(false);

  const budgets = t("contact.budgets", { returnObjects: true }) as string[];
  const timelines = t("contact.timelines", { returnObjects: true }) as string[];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const detected = countryCodeToDialCode[data?.country_code];
        if (detected) {
          setDdi(detected);
        } else if (data?.country_calling_code) {
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
      toast.error(t("contact.errorMsg"));
    } else {
      setStatus("success");
      toast.success(t("contact.successMsg"));
    }
  };

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-24 relative">
      <div className="section-divider mb-12 sm:mb-16 md:mb-24" />
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            {t("contact.subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 max-w-5xl mx-auto">
          <ScrollReveal direction="left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4 bg-background">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" placeholder={t("contact.name")} required value={form.name} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors" />
                <input name="email" type="email" placeholder={t("contact.email")} required value={form.email} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <select value={ddi} onChange={(e) => setDdi(e.target.value)} className="w-[110px] shrink-0 bg-muted/50 border border-primary/10 rounded-lg px-2 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors">
                    {ddiOptions.map((o) => (
                      <option key={o.code + o.label} value={o.code}>{o.flag} {o.code}</option>
                    ))}
                  </select>
                  <input name="phone" placeholder={t("contact.phone")} required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors" />
                </div>
                <input name="company" placeholder={t("contact.company")} value={form.company} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors" />
              </div>
              <select name="projectType" required value={form.projectType} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors">
                <option value="">{t("contact.projectType")}</option>
                {projectTypes.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="budget" value={form.budget} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors">
                  <option value="">{t("contact.budget")}</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select name="timeline" value={form.timeline} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors">
                  <option value="">{t("contact.timeline")}</option>
                  {timelines.map((tl) => <option key={tl} value={tl}>{tl}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/60">{t("contact.aiHelper")}</span>
                  <button
                    type="button"
                    disabled={enhancing || !form.message.trim()}
                    onClick={async () => {
                      setEnhancing(true);
                      try {
                        const langMap: Record<string, string> = { pt: "Portuguese", en: "English", es: "Spanish", fr: "French", de: "German", it: "Italian", zh: "Mandarin Chinese", ja: "Japanese", ko: "Korean", ar: "Arabic", hi: "Hindi", ru: "Russian", bn: "Bengali", id: "Indonesian", sw: "Swahili", tr: "Turkish", th: "Thai", vi: "Vietnamese", nl: "Dutch", pl: "Polish" };
                        const currentLang = i18n.language?.substring(0, 2) || "pt";
                        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/enhance-description`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
                          body: JSON.stringify({ projectType: form.projectType, message: form.message, language: langMap[currentLang] || "Portuguese" }),
                        });
                        if (!res.ok) throw new Error("AI error");
                        const data = await res.json();
                        if (data.enhanced) setForm((f) => ({ ...f, message: data.enhanced }));
                      } catch { toast.error("Erro ao aprimorar descrição"); }
                      setEnhancing(false);
                    }}
                    className="text-xs text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 disabled:opacity-40 transition-colors"
                  >
                    {enhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {enhancing ? t("contact.enhancing") : t("contact.enhanceWithAI")}
                  </button>
                </div>
                <textarea name="message" placeholder={t("contact.message")} rows={4} value={form.message} onChange={handleChange} className="w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={status === "sending" || status === "success"} className="gradient-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "success" && <CheckCircle size={16} />}
                {status === "idle" && <Send size={16} />}
                {status === "idle" && t("contact.send")}
                {status === "sending" && t("contact.sending")}
                {status === "success" && t("contact.sent")}
                {status === "error" && t("contact.retry")}
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">{t("contact.directContact")}</h3>
              <div className="space-y-4">
                <a href={`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle size={18} className="text-primary" /> WhatsApp
                </a>
                <a href={`mailto:${CONFIG.social.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={18} className="text-primary" /> {CONFIG.social.email}
                </a>
                <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={18} className="text-primary" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-2">{t("contact.scheduleMeeting")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("contact.meetingDesc")}</p>
              <a href={CONFIG.calendly.url} target="_blank" rel="noopener noreferrer" className="glass-btn w-full py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2">
                <Calendar size={16} /> {t("contact.scheduleTime")}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

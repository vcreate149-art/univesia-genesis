import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface SettingsData {
  whatsapp: { number: string; message: string };
  social: { instagram: string; linkedin: string; github: string; email: string };
  counters: { projects: number; clients: number; years: number };
  calendly: { url: string };
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<SettingsData | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const result: Record<string, any> = {};
      data.forEach((row: any) => {
        result[row.key] = row.value;
      });
      return result as SettingsData;
    },
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (data: SettingsData) => {
      const entries = Object.entries(data);
      for (const [key, value] of entries) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: value as any, updated_at: new Date().toISOString() })
          .eq("key", key);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Configurações salvas!");
    },
    onError: () => toast.error("Erro ao salvar"),
  });

  if (isLoading || !form) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  const inputClass = "w-full bg-muted/50 border border-primary/10 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors";
  const labelClass = "text-xs font-medium text-muted-foreground uppercase tracking-wider";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-display font-bold">Configurações do Site</h1>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-display font-semibold">WhatsApp</h2>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Número (com DDI)</label>
            <input
              value={form.whatsapp.number}
              onChange={(e) => setForm({ ...form, whatsapp: { ...form.whatsapp, number: e.target.value } })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Mensagem Padrão</label>
            <input
              value={form.whatsapp.message}
              onChange={(e) => setForm({ ...form, whatsapp: { ...form.whatsapp, message: e.target.value } })}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-display font-semibold">Redes Sociais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(form.social) as (keyof typeof form.social)[]).map((key) => (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <input
                value={form.social[key]}
                onChange={(e) => setForm({ ...form, social: { ...form.social, [key]: e.target.value } })}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-display font-semibold">Contadores</h2>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(form.counters) as (keyof typeof form.counters)[]).map((key) => (
            <div key={key}>
              <label className={labelClass}>{key === "projects" ? "Projetos" : key === "clients" ? "Clientes" : "Anos"}</label>
              <input
                type="number"
                value={form.counters[key]}
                onChange={(e) => setForm({ ...form, counters: { ...form.counters, [key]: parseInt(e.target.value) || 0 } })}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-display font-semibold">Calendly</h2>
        <div>
          <label className={labelClass}>URL do Calendly</label>
          <input
            value={form.calendly.url}
            onChange={(e) => setForm({ ...form, calendly: { ...form.calendly, url: e.target.value } })}
            className={inputClass}
          />
        </div>
      </section>

      <button
        onClick={() => saveMutation.mutate(form)}
        disabled={saveMutation.isPending}
        className="gradient-btn py-3 px-8 rounded-full text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
      >
        {saveMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        Salvar Configurações
      </button>
    </div>
  );
}

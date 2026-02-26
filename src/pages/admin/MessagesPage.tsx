import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Mail, Phone, Building, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Message {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  created_at: string;
}

export default function MessagesPage() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Message[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      toast.success("Mensagem excluída");
    },
    onError: () => toast.error("Erro ao excluir"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <Mail size={48} className="mx-auto mb-4 opacity-40" />
        <p>Nenhuma mensagem recebida ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-display font-bold">
        Mensagens <span className="text-muted-foreground font-normal text-sm">({messages.length})</span>
      </h1>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="glass-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(msg.created_at), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm("Excluir esta mensagem?")) deleteMutation.mutate(msg.id);
                }}
                className="text-muted-foreground hover:text-destructive transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
              <span className="flex items-center gap-1"><Phone size={12} /> {msg.whatsapp}</span>
              {msg.company && <span className="flex items-center gap-1"><Building size={12} /> {msg.company}</span>}
              {msg.timeline && <span className="flex items-center gap-1"><Calendar size={12} /> {msg.timeline}</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{msg.project_type}</span>
              {msg.budget && <span className="text-xs bg-muted px-2 py-1 rounded-full">{msg.budget}</span>}
            </div>

            {msg.message && (
              <p className="text-sm text-muted-foreground border-t border-border/30 pt-3">{msg.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

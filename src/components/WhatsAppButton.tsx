import { CONFIG } from "@/config";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const url = `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform pulse-glow group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={26} className="text-foreground" />
      <span className="absolute right-full mr-3 bg-card text-foreground text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Fale conosco agora!
      </span>
    </a>
  );
};

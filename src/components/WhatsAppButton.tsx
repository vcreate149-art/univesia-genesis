import { CONFIG } from "@/config";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const url = `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={22} className="text-white sm:[&]:w-[26px] sm:[&]:h-[26px]" />
      <span className="absolute right-full mr-3 bg-foreground text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden sm:block">
        Fale conosco agora!
      </span>
    </a>
  );
};

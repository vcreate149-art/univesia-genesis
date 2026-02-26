import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CONFIG } from "@/config";

export function useSiteSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const result: Record<string, any> = {};
      data.forEach((row: any) => {
        result[row.key] = row.value;
      });
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // Merge DB settings over static CONFIG defaults
  return {
    isLoading,
    config: {
      whatsapp: data?.whatsapp ?? CONFIG.whatsapp,
      social: data?.social ?? CONFIG.social,
      counters: data?.counters ?? CONFIG.counters,
      calendly: data?.calendly ?? CONFIG.calendly,
      // Keep static-only keys
      emailjs: CONFIG.emailjs,
      analytics: CONFIG.analytics,
      tawkto: CONFIG.tawkto,
    },
  };
}

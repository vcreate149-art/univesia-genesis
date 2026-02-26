import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import ServicosPage from "./pages/ServicosPage";
import PortfolioPage from "./pages/PortfolioPage";
import SobrePage from "./pages/SobrePage";
import PlanosPage from "./pages/PlanosPage";
import ContatoPage from "./pages/ContatoPage";
import FAQPage from "./pages/FAQPage";
import PrivacidadePage from "./pages/PrivacidadePage";
import TermosPage from "./pages/TermosPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import MessagesPage from "./pages/admin/MessagesPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/planos" element={<PlanosPage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacidade" element={<PrivacidadePage />} />
              <Route path="/termos" element={<TermosPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<MessagesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

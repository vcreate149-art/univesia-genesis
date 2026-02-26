import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const PlanosPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-20">
      <Pricing />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default PlanosPage;

import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const ServicosPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-20">
      <Services />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default ServicosPage;

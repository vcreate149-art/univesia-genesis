import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const SobrePage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-20">
      <About />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default SobrePage;

import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const ContatoPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-20">
      <Contact />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default ContatoPage;

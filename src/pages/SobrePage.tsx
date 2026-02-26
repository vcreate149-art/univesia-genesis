import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";

const SobrePage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-20">
      <About />
      <Team />
      <Certifications />
    </main>
    <Footer />
  </div>
);

export default SobrePage;

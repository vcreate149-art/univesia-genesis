import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Testimonials />
        <Partners />
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Nosso <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Artigos, tutoriais e análises sobre tecnologia, IA e transformação digital.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card p-8 sm:p-12 text-center">
            <p className="text-4xl mb-4">📝</p>
            <h2 className="text-xl font-display font-bold mb-2">Em breve!</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Estamos preparando conteúdos incríveis sobre desenvolvimento, IA, automação e tendências do mercado tech.
            </p>
            <Link
              to="/contato"
              className="gradient-btn px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Receba novidades <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
    <Footer />
  </div>
);

export default BlogPage;

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";

const TermosPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <ScrollReveal className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Termos de <span className="text-gradient">Uso</span>
          </h1>
          <p className="text-sm text-muted-foreground">Última atualização: Fevereiro de 2026</p>
        </ScrollReveal>

        <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site da {CONFIG.company.name}, você concorda com estes Termos de Uso. Se não concordar com algum termo, recomendamos que não utilize o site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Serviços</h2>
            <p>A {CONFIG.company.name} oferece serviços de desenvolvimento de software, criação de websites, aplicativos mobile, automações e soluções com inteligência artificial. Os detalhes específicos de cada projeto são definidos em contrato individual.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, é de propriedade da {CONFIG.company.name} e está protegido por leis de propriedade intelectual. A reprodução sem autorização é proibida.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Responsabilidades do Usuário</h2>
            <p>O usuário se compromete a fornecer informações verdadeiras no formulário de contato e a não utilizar o site para fins ilegais ou não autorizados.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Limitação de Responsabilidade</h2>
            <p>A {CONFIG.company.name} não se responsabiliza por danos indiretos decorrentes do uso do site. As informações apresentadas são de caráter informativo e não constituem oferta vinculante.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Foro</h2>
            <p>Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer questões relacionadas a estes Termos de Uso.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Contato</h2>
            <p>Dúvidas: <a href={`mailto:${CONFIG.social.email}`} className="text-primary hover:underline">{CONFIG.social.email}</a></p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermosPage;

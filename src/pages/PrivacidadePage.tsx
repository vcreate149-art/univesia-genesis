import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";

const PrivacidadePage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <ScrollReveal className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Política de <span className="text-gradient">Privacidade</span>
          </h1>
          <p className="text-sm text-muted-foreground">Última atualização: Fevereiro de 2026</p>
        </ScrollReveal>

        <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Informações que coletamos</h2>
            <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e mensagens enviadas através do formulário de contato. Também coletamos dados de navegação automaticamente, como endereço IP, tipo de navegador e páginas visitadas.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Como usamos suas informações</h2>
            <p>Utilizamos seus dados para: responder suas solicitações de contato, enviar propostas comerciais, melhorar nossos serviços e cumprir obrigações legais. Não vendemos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Cookies</h2>
            <p>Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os visitantes interagem com nosso site. Você pode gerenciar suas preferências de cookies a qualquer momento.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Seus direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a: acessar, corrigir, excluir seus dados pessoais, revogar consentimento e solicitar a portabilidade de seus dados. Para exercer esses direitos, entre em contato através do e-mail {CONFIG.social.email}.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Segurança</h2>
            <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda ou destruição. Utilizamos criptografia SSL e armazenamento seguro de dados.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Contato</h2>
            <p>Para dúvidas sobre esta política, entre em contato: <a href={`mailto:${CONFIG.social.email}`} className="text-primary hover:underline">{CONFIG.social.email}</a></p>
            <p>{CONFIG.company.name}</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacidadePage;

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como funciona o processo de desenvolvimento?",
    a: "Nosso processo segue 4 etapas: 1) Briefing e análise de requisitos, 2) Prototipação e design, 3) Desenvolvimento com sprints semanais, 4) Testes, ajustes e entrega. Você acompanha tudo em tempo real.",
  },
  {
    q: "Quanto tempo leva para desenvolver um projeto?",
    a: "Depende da complexidade. Uma landing page leva de 5 a 10 dias. Um sistema web completo pode levar de 4 a 12 semanas. Após o briefing, fornecemos um cronograma detalhado.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos PIX, boleto e cartão de crédito (em até 12x). Para projetos maiores, dividimos em parcelas atreladas às entregas de cada etapa.",
  },
  {
    q: "Vocês oferecem suporte após a entrega?",
    a: "Sim! Todos os projetos incluem 30 dias de suporte gratuito após a entrega. Também oferecemos planos de manutenção mensal para atualizações contínuas.",
  },
  {
    q: "É possível alterar o escopo durante o projeto?",
    a: "Sim, trabalhamos com metodologia ágil. Mudanças de escopo são avaliadas e, se necessário, ajustamos o cronograma e orçamento em conjunto com o cliente.",
  },
  {
    q: "Vocês desenvolvem apps mobile?",
    a: "Sim! Desenvolvemos aplicativos mobile usando React Native, o que permite criar apps para iOS e Android com uma única base de código, reduzindo custos e tempo.",
  },
  {
    q: "Como funciona o modelo de contrato?",
    a: "Trabalhamos com contrato de prestação de serviços que detalha escopo, cronograma, valores e condições. Tudo transparente e alinhado antes do início.",
  },
  {
    q: "Posso acompanhar o progresso do projeto?",
    a: "Sim! Disponibilizamos acesso a um painel de acompanhamento e realizamos reuniões semanais de alinhamento para garantir que tudo esteja no caminho certo.",
  },
];

const FAQPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossos serviços, processos e formas de trabalho.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card border-border px-5 rounded-xl">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQPage;

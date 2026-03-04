import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getTechIcon } from "@/components/TechIcons";
import {
  Globe, Server, Smartphone, Zap, Users, Brain,
  CheckCircle, ArrowRight, ChevronRight, BookOpen,
  Star, Shield, Clock, TrendingUp, Lightbulb, Target
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SERVICE_SLUGS = [
  "websites",
  "sistemas-web",
  "aplicativos-mobile",
  "automacoes",
  "consultoria",
  "inteligencia-artificial",
];

const SERVICE_ICONS = [Globe, Server, Smartphone, Zap, Users, Brain];

const SERVICE_TAGS = [
  ["React", "Next.js", "Tailwind", "WordPress", "SEO", "UI/UX"],
  ["Node.js", "Python", "PostgreSQL", "APIs", "GraphQL", "Docker"],
  ["React Native", "Flutter", "iOS", "Android", "Firebase"],
  ["n8n", "Zapier", "RPA", "Webhooks", "Make", "APIs"],
  ["Arquitetura", "Code Review", "Performance", "DevOps"],
  ["ChatGPT", "LLMs", "Visão Computacional", "NLP", "Machine Learning"],
];

const ADVANTAGE_ICONS = [Star, Shield, Clock, TrendingUp, Lightbulb, Target];

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const serviceIndex = SERVICE_SLUGS.indexOf(slug || "");
  if (serviceIndex === -1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("notFound.title")}</h1>
          <Link to="/servicos" className="text-primary hover:underline">{t("serviceDetail.backToServices")}</Link>
        </div>
      </div>
    );
  }

  const Icon = SERVICE_ICONS[serviceIndex];
  const tags = SERVICE_TAGS[serviceIndex];

  const detail = t(`serviceDetail.services.${serviceIndex}`, { returnObjects: true }) as {
    title: string;
    subtitle: string;
    heroDescription: string;
    overview: {
      title: string;
      paragraphs: string[];
      highlights: { label: string; value: string }[];
    };
    advantages: {
      title: string;
      intro: string;
      items: { title: string; description: string }[];
    };
    process: {
      title: string;
      intro: string;
      steps: { title: string; description: string }[];
    };
    tutorials: {
      title: string;
      intro: string;
      items: { title: string; description: string; steps: string[] }[];
    };
    faq: {
      title: string;
      items: { question: string; answer: string }[];
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };

  const serviceToProject: Record<number, string> = {
    0: "Website / Landing Page",
    1: "Sistema Web",
    2: "Aplicativo Mobile",
    3: "Automação / Integração",
    4: "Consultoria",
    5: "Inteligência Artificial",
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">{t("nav.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/servicos">{t("nav.services")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{detail.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Icon size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                {detail.title}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-medium mb-4">{detail.subtitle}</p>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
                {detail.heroDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tags.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary/80 inline-flex items-center gap-1.5">
                    <span className="text-primary">{getTechIcon(tag)}</span>
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/contato?servico=${encodeURIComponent(serviceToProject[serviceIndex] || "Outro")}`)}
                className="gradient-btn px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
              >
                {detail.cta.button} <ArrowRight size={16} />
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6">
            <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
              <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1.5 rounded-xl mb-8">
                <TabsTrigger value="overview" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md">
                  <BookOpen size={14} className="mr-1.5 hidden sm:inline" />
                  {detail.overview.title}
                </TabsTrigger>
                <TabsTrigger value="advantages" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md">
                  <Star size={14} className="mr-1.5 hidden sm:inline" />
                  {detail.advantages.title}
                </TabsTrigger>
                <TabsTrigger value="process" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md">
                  <Target size={14} className="mr-1.5 hidden sm:inline" />
                  {detail.process.title}
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md">
                  <Lightbulb size={14} className="mr-1.5 hidden sm:inline" />
                  {detail.tutorials.title}
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md">
                  FAQ
                </TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview">
                <ScrollReveal>
                  <div className="glass-card p-6 sm:p-10 rounded-2xl">
                    <div className="prose prose-invert max-w-none">
                      {detail.overview.paragraphs.map((p, i) => (
                        <p key={i} className="text-muted-foreground text-base leading-relaxed mb-4">{p}</p>
                      ))}
                    </div>
                    {detail.overview.highlights && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
                        {detail.overview.highlights.map((h, i) => (
                          <div key={i} className="text-center">
                            <p className="text-2xl font-bold text-primary">{h.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{h.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </TabsContent>

              {/* Advantages */}
              <TabsContent value="advantages">
                <ScrollReveal>
                  <div className="glass-card p-6 sm:p-10 rounded-2xl">
                    <p className="text-muted-foreground mb-8">{detail.advantages.intro}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {detail.advantages.items.map((item, i) => {
                        const AdvIcon = ADVANTAGE_ICONS[i % ADVANTAGE_ICONS.length];
                        return (
                          <div key={i} className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <AdvIcon size={18} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              </TabsContent>

              {/* Process */}
              <TabsContent value="process">
                <ScrollReveal>
                  <div className="glass-card p-6 sm:p-10 rounded-2xl">
                    <p className="text-muted-foreground mb-8">{detail.process.intro}</p>
                    <div className="space-y-6">
                      {detail.process.steps.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                            {i + 1}
                          </div>
                          <div className="pt-1.5">
                            <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </TabsContent>

              {/* Tutorials */}
              <TabsContent value="tutorials">
                <ScrollReveal>
                  <div className="space-y-6">
                    <p className="text-muted-foreground px-2">{detail.tutorials.intro}</p>
                    {detail.tutorials.items.map((tutorial, i) => (
                      <div key={i} className="glass-card p-6 sm:p-8 rounded-2xl">
                        <h4 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                          <BookOpen size={18} className="text-primary" />
                          {tutorial.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                        <ol className="space-y-3">
                          {tutorial.steps.map((step, j) => (
                            <li key={j} className="flex gap-3 items-start text-sm">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                                {j + 1}
                              </span>
                              <span className="text-muted-foreground pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq">
                <ScrollReveal>
                  <div className="glass-card p-6 sm:p-10 rounded-2xl">
                    <Accordion type="single" collapsible className="w-full">
                      {detail.faq.items.map((item, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-sm text-left">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </ScrollReveal>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal className="max-w-2xl mx-auto text-center">
              <div className="glass-card p-8 sm:p-12 rounded-2xl border-primary/20">
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">{detail.cta.title}</h2>
                <p className="text-muted-foreground mb-8">{detail.cta.description}</p>
                <button
                  onClick={() => navigate(`/contato?servico=${encodeURIComponent(serviceToProject[serviceIndex] || "Outro")}`)}
                  className="gradient-btn px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
                >
                  {detail.cta.button} <ArrowRight size={16} />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Other Services */}
        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-display font-bold text-center mb-8">{t("serviceDetail.otherServices")}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SERVICE_SLUGS.map((s, i) => {
                if (i === serviceIndex) return null;
                const OIcon = SERVICE_ICONS[i];
                const itemTitle = t(`serviceDetail.services.${i}.title`);
                return (
                  <Link
                    key={s}
                    to={`/servicos/${s}`}
                    className="glass-card p-4 rounded-xl text-center hover:border-primary/30 transition-all group"
                  >
                    <OIcon size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-medium">{itemTitle}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;

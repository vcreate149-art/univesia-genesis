import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONFIG } from "@/config";
import { useTranslation } from "react-i18next";

const PrivacidadePage = () => {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as { title: string; content: string }[];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t("privacy.title")} <span className="text-gradient">{t("privacy.titleHighlight")}</span>
            </h1>
            <p className="text-sm text-muted-foreground">{t("privacy.lastUpdated")}</p>
          </ScrollReveal>

          <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacidadePage;

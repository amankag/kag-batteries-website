import { cookies } from "next/headers";
import Header from "./components/header";
import Hero from "./components/hero";
import InsideKagStory from "./components/InsideKagStory";
import WhyUsSection from "./components/WhyUsSection";
import ProductRangeShowcase from "./components/ProductRangeShowcase";
import FactoryVisitSection from "./components/FactoryVisitSection";
import DealerHubSection from "./components/DealerHubSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTopButton from "./components/BackToTopButton";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SiteMotion from "./components/site-motion";
import { LanguageProvider, type Language } from "./components/LanguageContext";
import LanguagePopup from "./components/LanguagePopup";

const LANGUAGE_COOKIE = "kag-language";

// Only this route reads cookies() — it's the one place that needs
// server-resolved language (the hero's CLS fix). This makes just the
// homepage dynamic; /products, /products/[slug] and /inquiry are
// unaffected and stay statically generated. See LanguageContext.tsx for
// the full reasoning.
export default async function Home() {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const hasChosen = rawCookie === "hi" || rawCookie === "en";
  const initialLanguage: Language = rawCookie === "hi" ? "hi" : "en";

  return (
    <LanguageProvider initialLanguage={initialLanguage} initialHasChosen={hasChosen} trustInitialLanguage>
      <LanguagePopup />
      <main className="min-h-screen w-full max-w-full bg-[#f2f0ea] text-slate-950">
        <ScrollProgressBar />
        <Header />
        <Hero />
        <InsideKagStory />
        <ProductRangeShowcase />
        <WhyUsSection />
        <FactoryVisitSection />
        <DealerHubSection />
        <TestimonialsSection />
        <Contact />
        <Footer />
        <WhatsAppButton />
        <BackToTopButton />
        <SiteMotion />
      </main>
    </LanguageProvider>
  );
}

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
import SiteMotion from "./components/site-motion";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full bg-[#f2f0ea] text-slate-950">
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
      <SiteMotion />
    </main>
  );
}

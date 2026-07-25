import Header from "./components/header";
import Hero from "./components/hero";
import InsideKagStory from "./components/InsideKagStory";
import Products from "./components/product";
import DealerCTA from "./components/DealerCTA";
import ProductBrochures from "./components/ProductBrochures";
import Gallery from "./components/gallery";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
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
      <Products />
      <Features />
      <Gallery />
      <DealerCTA />
      <ProductBrochures />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <SiteMotion />
    </main>
  );
}

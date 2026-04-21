'use client';

import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Products from "./components/product";
import DealerCTA from "./components/DealerCTA";
import ProductBrochures from "./components/ProductBrochures";
import Gallery from "./components/gallery";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Products />
      <DealerCTA />
      <ProductBrochures />
      <Gallery />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

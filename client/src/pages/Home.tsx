/*
 * Home — Orbitly SaaS Landing Page
 * Design: Orbital Dark — full single-page layout assembling all sections
 * Template: Part of Open Antimatter by Antimatter AI
 */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#030305", color: "#FAFAFA" }}
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

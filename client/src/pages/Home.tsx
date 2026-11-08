import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import RiskBanner from "@/components/RiskBanner";
import Hero from "@/components/summit/Hero";
import Stats from "@/components/summit/Stats";
import PhilosophySection from "@/components/summit/PhilosophySection";
import ProcessSection from "@/components/summit/ProcessSection";
import TechOverview from "@/components/summit/TechOverview";
import EcosystemSection from "@/components/summit/EcosystemSection";
import FAQSection from "@/components/summit/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <PhilosophySection />
        <ProcessSection />
        <TechOverview />
        <EcosystemSection />
        <FAQSection />
      </main>
      <Footer />
      <Aneto />
      <RiskBanner />
    </div>
  );
}

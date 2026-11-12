import { motion } from "framer-motion";
import { Activity, BarChart2, Database, Cpu, Server, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import AlgoFlowViz from "@/components/summit/AlgoFlowViz";
import CandlestickViz from "@/components/summit/CandlestickViz";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

const SECTION_ICONS = [Activity, BarChart2, Database, Cpu, Server, Eye];

function TechSection({ title, body, index, inView }: {
  title: string; body: string; index: number; inView: boolean;
}) {
  const Icon = SECTION_ICONS[index % SECTION_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="p-7 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color: "#C9A96E" }} />
      </div>
      <div className="font-data text-xs text-white/20 mb-2">0{index + 1}</div>
      <h3 className="text-white font-semibold text-lg mb-3 leading-tight">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{body}</p>
    </motion.div>
  );
}

export default function Technology() {
  const { t } = useI18n();
  const { ref: heroRef, inView: heroInView } = useScrollReveal(0.1);
  const { ref: contentRef, inView: contentInView } = useScrollReveal(0.06);
  const { ref: flowRef } = useScrollReveal(0.06);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "60% 30%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.80) 0%, rgba(6,8,17,0.72) 55%, rgba(6,8,17,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(29,95,168,0.08) 0%, transparent 55%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-20 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={heroRef}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.technology.hero_title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed"
              >
                {t.technology.hero_subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Sections grid */}
        <section className="py-10 md:py-16" ref={contentRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {t.technology.sections.map((section, i) => (
                <TechSection
                  key={i}
                  title={section.title}
                  body={section.body}
                  index={i}
                  inView={contentInView}
                />
              ))}
            </div>

            {/* Infrastructure summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-xl p-8 md:p-12 mb-10"
              style={{
                background: "linear-gradient(145deg, rgba(29,95,168,0.08), rgba(201,169,110,0.04))",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Marché",         value: "EUR/USD" },
                  { label: "Exécution",      value: "Automatisée" },
                  { label: "Infrastructure", value: "Vantage Markets" },
                  { label: "Origine",        value: "Suisse" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="font-data text-lg md:text-xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-white/35 text-xs tracking-[0.1em] uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Candlestick chart section */}
        <section className="relative py-10 md:py-16 overflow-hidden">
          <div className="section-divider mb-12" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 left-1/2 w-[700px] h-[400px] -translate-x-1/2 ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(29,95,168,0.08) 0%, transparent 60%)", filter: "blur(60px)" }}
            />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Chandeliers japonais et signaux algorithmiques
              </h2>
              <p className="text-white/40 text-sm max-w-xl">
                La stratégie analyse les configurations de prix en temps réel et génère des signaux d'entrée selon des critères statistiquement validés.
              </p>
            </motion.div>
            <CandlestickViz />
          </div>
        </section>

        {/* Algo flow visualization */}
        <section className="py-8 pb-10" ref={flowRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <AlgoFlowViz />
          </div>
        </section>

        {/* Risk note */}
        <section className="py-8 pb-20">
          <div className="container max-w-3xl">
            <div
              className="p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-white/30 text-xs leading-relaxed">
                <span className="text-white/45 font-medium">Note — </span>
                {t.technology.illustration_note}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Aneto />
    </div>
  );
}

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import PerformanceCharts from "@/components/summit/PerformanceCharts";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

const KPI_STYLES = [
  { accent: "#C9A96E", border: "rgba(201,169,110,0.25)", glow: "rgba(201,169,110,0.06)" },
  { accent: "#3A80CC", border: "rgba(58,128,204,0.22)", glow: "rgba(29,95,168,0.06)" },
  { accent: "#5BAF8A", border: "rgba(91,175,138,0.22)", glow: "rgba(91,175,138,0.06)" },
  { accent: "#C0665A", border: "rgba(192,102,90,0.22)", glow: "rgba(192,102,90,0.06)" },
];

export default function Performance() {
  const { t } = useI18n();
  const { ref: heroRef, inView: heroInView } = useScrollReveal(0.1);
  const { ref: statsRef, inView: statsInView } = useScrollReveal(0.08);
  const { ref: defsRef, inView: defsInView } = useScrollReveal(0.08);
  const { ref: metaRef, inView: metaInView } = useScrollReveal(0.08);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: "linear-gradient(rgba(201,169,110,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.045) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute left-0 top-0 w-[600px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 10% 20%, rgba(201,169,110,0.08), transparent)" }}
            aria-hidden="true"
          />
          <div className="container relative z-10" ref={heroRef}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <motion.span variants={staggerItem} className="badge-pill mb-8 inline-flex">
                Summit One · Track Record
              </motion.span>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.performance.hero_title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed"
              >
                {t.performance.hero_subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* KPI Table */}
        <section className="py-10 md:py-16 overflow-hidden" ref={statsRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="mb-8"
            >
              <motion.h2 variants={staggerItem} className="text-xl md:text-2xl font-semibold text-white mb-2">
                {t.performance.table_title}
              </motion.h2>
              <motion.p variants={staggerItem} className="text-white/40 text-sm max-w-lg">
                {t.performance.table_note}
              </motion.p>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            >
              {t.stats.items.map((item, i) => {
                const style = KPI_STYLES[i % KPI_STYLES.length];
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="relative p-6 rounded-xl overflow-hidden card-hover"
                    style={{ background: style.glow, border: `1px solid ${style.border}` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: style.accent }} />
                    <div className="font-data text-2xl md:text-3xl font-bold mb-2" style={{ color: style.accent }}>
                      {item.value}
                    </div>
                    <div className="text-white/75 text-sm font-medium mb-1">{item.label}</div>
                    <div className="text-white/35 text-xs">{item.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Chart */}
            <div className="mb-6">
              <PerformanceCharts />
            </div>

            {/* Risk warning */}
            <div
              className="flex items-start gap-3 p-5 rounded-xl"
              style={{
                background: "rgba(201,169,110,0.04)",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <AlertTriangle className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-white/45 text-xs leading-relaxed">
                {t.performance.risk_note}
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-10 md:py-16 overflow-hidden" ref={metaRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={metaInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl md:text-2xl font-semibold text-white mb-8"
            >
              {t.performance.methodology_title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {t.performance.methodology.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={metaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col gap-1 p-4 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-white/35 text-xs tracking-[0.08em] uppercase">{row.label}</span>
                  <span className="text-white/70 text-sm">{row.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Definitions */}
        <section className="py-10 md:py-16 pb-20" ref={defsRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={defsInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl md:text-2xl font-semibold text-white mb-8"
            >
              {t.performance.definitions_title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {t.performance.definitions.map((def, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={defsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <h3 className="text-[#C9A96E] font-semibold text-sm mb-3">{def.term}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{def.def}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Aneto />
    </div>
  );
}

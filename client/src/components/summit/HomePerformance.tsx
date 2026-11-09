import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";

const RETURNS_2025 = [5.24, 4.04, 2.81, 0.16, 2.51, 0.69, 3.16, 1.34, 3.69, 10.21, -0.65, 0.08];

const KPI = [
  { value: "+8,76 %", label: "Rendement mensuel moyen" },
  { value: "3,40",    label: "Profit Factor" },
  { value: "71 %",    label: "Taux de réussite" },
  { value: "11,28 %", label: "Drawdown maximal" },
  { value: "45 mois", label: "Track record" },
];

function formatRet(raw: number, lang: string): string {
  const sign = raw >= 0 ? "+" : "";
  const dec = lang === "en" ? "." : ",";
  return `${sign}${raw.toFixed(2).replace(".", dec)}%`;
}

export default function HomePerformance() {
  const { t, lang, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.06);
  const [, setLocation] = useLocation();
  const pt = t.performance;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="home-perf-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 ambient-breathe"
          style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)", filter: "blur(50px)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[480px] h-[400px] ambient-drift"
          style={{ background: "radial-gradient(ellipse at 100% 30%, rgba(91,175,138,0.06) 0%, transparent 60%)", filter: "blur(60px)", animationDelay: "4s" }}
        />
        <div className="absolute inset-0 dot-grid opacity-25" />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — editorial intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="badge-pill mb-6 inline-flex">Nos performances</span>
            <h2
              id="home-perf-heading"
              className="font-display text-4xl md:text-5xl font-medium text-white leading-tight mb-5"
            >
              Des résultats<br />validés et<br />transparents
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Un track record réel depuis 2022, issu d&apos;un compte en direct suivi par Myfxbook.
            </p>

            {/* KPI column */}
            <div className="flex flex-col gap-0 mb-8">
              {KPI.map((k, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-center justify-between gap-4 py-2.5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-white/40 text-xs">{k.label}</span>
                  <span className="font-data text-sm font-bold" style={{ color: "#C9A96E" }}>{k.value}</span>
                </motion.div>
              ))}
            </div>

            <a
              href={langPath("/performances")}
              onClick={(e) => { e.preventDefault(); setLocation(langPath("/performances")); }}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
              style={{ color: "#C9A96E" }}
            >
              Voir le détail complet
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Right — monthly grid + myfxbook */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Year selector (compact, non-interactive — visual only) */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-white/25 text-xs tracking-widest uppercase mr-1">{pt.year_label}</span>
              {["2022","2023","2024","2025","2026"].map((y) => (
                <span
                  key={y}
                  className="px-3 py-1 rounded text-xs font-medium"
                  style={
                    y === "2025"
                      ? { background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(237,233,227,0.3)" }
                  }
                >
                  {y}
                </span>
              ))}
            </div>

            {/* Monthly grid */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {RETURNS_2025.map((raw, i) => {
                const isPositive = raw >= 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: 0.2 + i * 0.03 }}
                    className="flex flex-col items-center justify-center rounded-lg py-2.5 px-1 text-center"
                    style={{
                      background: isPositive ? "rgba(91,175,138,0.07)" : "rgba(192,102,90,0.07)",
                      border: `1px solid ${isPositive ? "rgba(91,175,138,0.18)" : "rgba(192,102,90,0.18)"}`,
                    }}
                  >
                    <span className="text-white/30 text-[9px] mb-1 leading-none font-medium uppercase tracking-wide">
                      {pt.month_labels[i]}
                    </span>
                    <span
                      className="font-data text-[11px] font-bold leading-none"
                      style={{ color: isPositive ? "#5BAF8A" : "#C0665A" }}
                    >
                      {formatRet(raw, lang)}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Myfxbook row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="px-2.5 py-1 rounded text-xs font-bold tracking-widest"
                  style={{ background: "rgba(58,128,204,0.1)", border: "1px solid rgba(58,128,204,0.2)", color: "#3A80CC" }}
                >
                  myfxbook
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium">{pt.myfxbook_verified}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">Mise à jour : novembre 2026</p>
                </div>
              </div>
              <div className="text-white/20 text-[10px] text-right hidden sm:block leading-relaxed">
                Données validées<br />manuellement
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";
import {
  YEARLY_RETURNS,
  PERFORMANCE_YEARS,
  formatReturn,
  type PerformanceYear,
} from "@/lib/performanceData";

const KPI = [
  { value: "+8,76 %", label: "Rendement mensuel moyen" },
  { value: "3,40",    label: "Profit Factor" },
  { value: "71 %",    label: "Taux de réussite" },
  { value: "11,28 %", label: "Drawdown maximal" },
  { value: "45 mois", label: "Track record" },
];

export default function HomePerformance() {
  const { t, lang, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.06);
  const [, setLocation] = useLocation();
  const [activeYear, setActiveYear] = useState<PerformanceYear>("2026");
  const pt = t.performance;
  const months = YEARLY_RETURNS[activeYear];

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
            {/* Year selector — clickable */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-white/25 text-xs tracking-widest uppercase mr-1">{pt.year_label}</span>
              {PERFORMANCE_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setActiveYear(y)}
                  className="px-3 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer"
                  style={
                    y === activeYear
                      ? { background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(237,233,227,0.3)" }
                  }
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Monthly grid */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {months.map((raw, i) => {
                const isAccountChange = activeYear === "2025" && i === 9;
                const isEmpty = raw == null && !isAccountChange;
                const isPositive = raw != null && raw >= 0;
                return (
                  <motion.div
                    key={`${activeYear}-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: 0.15 + i * 0.02 }}
                    className="flex flex-col items-center justify-center rounded-lg py-2.5 px-1 text-center"
                    style={{
                      background: isAccountChange
                        ? "rgba(201,169,110,0.18)"
                        : isEmpty
                          ? "rgba(255,255,255,0.02)"
                          : isPositive
                            ? "rgba(91,175,138,0.07)"
                            : "rgba(192,102,90,0.07)",
                      border: `1px solid ${
                        isAccountChange
                          ? "rgba(201,169,110,0.65)"
                          : isEmpty
                            ? "rgba(255,255,255,0.06)"
                            : isPositive
                              ? "rgba(91,175,138,0.18)"
                              : "rgba(192,102,90,0.18)"
                      }`,
                      minHeight: isAccountChange ? "64px" : undefined,
                      boxShadow: isAccountChange
                        ? "0 0 0 1px rgba(201,169,110,0.25), 0 0 14px rgba(201,169,110,0.12)"
                        : "none",
                    }}
                  >
                    <span
                      className="text-[9px] mb-1 leading-none font-medium uppercase tracking-wide"
                      style={{ color: isAccountChange ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.3)" }}
                    >
                      {pt.month_labels[i]}
                    </span>
                    {isAccountChange ? (
                      <span className="flex flex-col items-center gap-0.5 leading-tight px-0.5">
                        <span className="font-data text-[9px] font-bold" style={{ color: "#C9A96E" }}>Compte maître</span>
                        <span className="text-[8px] font-semibold tracking-wide uppercase" style={{ color: "rgba(201,169,110,0.7)" }}>
                          Changement
                        </span>
                      </span>
                    ) : (
                      <span
                        className="font-data text-[11px] font-bold leading-none"
                        style={{
                          color: isEmpty
                            ? "rgba(237,233,227,0.25)"
                            : isPositive
                              ? "#5BAF8A"
                              : "#C0665A",
                        }}
                      >
                        {raw == null
                          ? "—"
                          : formatReturn(raw, lang).replace(" %", "%")}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Myfxbook row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between gap-4">
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
                <a
                  href="https://www.myfxbook.com/members/cstmhelvetius/helvora-trader/12121444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
                  style={{ background: "rgba(58,128,204,0.1)", border: "1px solid rgba(58,128,204,0.25)", color: "#3A80CC" }}
                >
                  <span className="hidden sm:inline">Voir</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 8L8 2M8 2H3.5M8 2v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              {activeYear === "2025" && (
                <p
                  className="text-[10px] leading-relaxed"
                  style={{
                    color: "rgba(201,169,110,0.75)",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "0.65rem",
                  }}
                >
                  Octobre 2025 — changement de compte maître Myfxbook. Le lien public suit le nouveau compte : l&apos;historique antérieur n&apos;y figure pas.
                </p>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

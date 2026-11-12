import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import PerformanceCharts from "@/components/summit/PerformanceCharts";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import {
  YEARLY_RETURNS,
  PERFORMANCE_YEARS,
  formatReturn,
  compoundGain,
  type PerformanceYear,
} from "@/lib/performanceData";

const MYFXBOOK_URL = "https://www.myfxbook.com/members/cstmhelvetius/helvora-trader/12121444";

function MonthCell({
  label,
  raw,
  formattedValue,
  selected,
  onSelect,
  inView,
  index,
  accountChange,
}: {
  label: string;
  raw: number | null;
  formattedValue: string;
  selected: boolean;
  onSelect: () => void;
  inView: boolean;
  index: number;
  accountChange?: boolean;
}) {
  const isEmpty = raw == null;
  const isPositive = !isEmpty && raw >= 0;
  const isNegative = !isEmpty && raw < 0;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onClick={onSelect}
      aria-pressed={selected}
      className="flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/40"
      style={{
        background: selected
          ? "rgba(201,169,110,0.14)"
          : accountChange
            ? "rgba(201,169,110,0.18)"
            : isEmpty
              ? "rgba(255,255,255,0.02)"
              : isPositive
                ? "rgba(91,175,138,0.08)"
                : "rgba(192,102,90,0.08)",
        border: selected
          ? "1px solid rgba(201,169,110,0.45)"
          : accountChange
            ? "1px solid rgba(201,169,110,0.65)"
            : `1px solid ${
                isEmpty
                  ? "rgba(255,255,255,0.06)"
                  : isPositive
                    ? "rgba(91,175,138,0.2)"
                    : "rgba(192,102,90,0.2)"
              }`,
        minHeight: accountChange ? "84px" : "72px",
        boxShadow: accountChange
          ? "0 0 0 1px rgba(201,169,110,0.25), 0 0 18px rgba(201,169,110,0.12)"
          : selected
            ? "0 0 0 1px rgba(201,169,110,0.15)"
            : "none",
      }}
    >
      <span
        className="text-[10px] tracking-wider uppercase mb-1 font-medium"
        style={{ color: accountChange ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
      {accountChange ? (
        <span className="flex flex-col items-center gap-0.5 leading-tight px-0.5">
          <span className="font-data text-[11px] font-bold tracking-tight" style={{ color: "#C9A96E" }}>
            Compte maître
          </span>
          <span className="text-[9px] font-semibold tracking-wide uppercase" style={{ color: "rgba(201,169,110,0.7)" }}>
            Changement
          </span>
        </span>
      ) : (
        <span
          className="font-data text-sm font-bold tracking-tight"
          style={{
            color: isEmpty
              ? "rgba(237,233,227,0.25)"
              : isNegative
                ? "#C0665A"
                : isPositive
                  ? "#5BAF8A"
                  : "#C9A96E",
          }}
        >
          {formattedValue}
        </span>
      )}
    </motion.button>
  );
}

export default function Performance() {
  const { t, lang } = useI18n();
  const [activeYear, setActiveYear] = useState<PerformanceYear>("2026");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const { ref: heroRef, inView: heroInView } = useScrollReveal(0.1);
  const { ref: gridRef, inView: gridInView } = useScrollReveal(0.06);
  const { ref: defsRef, inView: defsInView } = useScrollReveal(0.08);

  const pt = t.performance;
  const months = YEARLY_RETURNS[activeYear];
  const selectedRaw = selectedMonth != null ? months[selectedMonth] : null;
  const yearCompound = compoundGain(months);

  function handleYearChange(year: PerformanceYear) {
    setActiveYear(year);
    setSelectedMonth(null);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "40% 15%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.82) 0%, rgba(6,8,17,0.74) 50%, rgba(6,8,17,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 60%, rgba(201,169,110,0.06) 0%, transparent 50%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-20 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={heroRef}>
            <motion.div variants={staggerContainer} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.performance.hero_title}
              </motion.h1>
              <motion.p variants={staggerItem} className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
                {t.performance.hero_subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Year selector + monthly grid ── */}
        <section className="relative py-10 md:py-14 overflow-hidden" ref={gridRef}>
          <div className="section-divider mb-12" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(91,175,138,0.06) 0%, transparent 60%)", filter: "blur(60px)", animationDelay: "2s" }}
            />
            <div className="absolute inset-0 dot-grid opacity-15" />
          </div>
          <div className="container">

            {/* Year tabs — each clickable */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              className="flex flex-wrap items-center gap-2 mb-10"
              role="tablist"
              aria-label={pt.year_label}
            >
              <span className="text-white/30 text-xs tracking-[0.1em] uppercase mr-2">{pt.year_label}</span>
              {PERFORMANCE_YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={activeYear === year}
                  onClick={() => handleYearChange(year)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={
                    activeYear === year
                      ? { background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(237,233,227,0.45)" }
                  }
                >
                  {year}
                </button>
              ))}
            </motion.div>

            {/* Monthly grid — each cell clickable */}
            <motion.div
              key={activeYear}
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6"
              role="tabpanel"
            >
              {months.map((raw, i) => {
                const isAccountChange = activeYear === "2025" && i === 9;
                return (
                  <MonthCell
                    key={`${activeYear}-${i}`}
                    index={i}
                    label={pt.month_labels[i]}
                    raw={raw}
                    formattedValue={raw == null ? "—" : formatReturn(raw, lang)}
                    accountChange={isAccountChange}
                    selected={selectedMonth === i}
                    onSelect={() => setSelectedMonth(selectedMonth === i ? null : i)}
                    inView={gridInView}
                  />
                );
              })}
            </motion.div>

            {/* Selection detail + year compound */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 px-1"
            >
              <div className="text-sm">
                {selectedMonth != null ? (
                  <span className="text-white/55">
                    <span className="text-white/35 uppercase tracking-wider text-xs mr-2">
                      {pt.month_labels[selectedMonth]} {activeYear}
                    </span>
                    {selectedRaw == null ? (
                      <span
                        className="text-sm leading-relaxed max-w-xl inline-block"
                        style={{
                          color:
                            activeYear === "2025" && selectedMonth === 9
                              ? "rgba(201,169,110,0.85)"
                              : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {activeYear === "2025" && selectedMonth === 9
                          ? "Changement de compte maître Myfxbook. Le lien public suit le nouveau compte : l'historique antérieur n'y figure pas."
                          : "Donnée non disponible"}
                      </span>
                    ) : (
                      <span
                        className="font-data font-bold"
                        style={{ color: selectedRaw >= 0 ? "#5BAF8A" : "#C0665A" }}
                      >
                        {formatReturn(selectedRaw, lang)}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-white/30 text-xs">Cliquez une case pour la sélectionner</span>
                )}
              </div>
              {yearCompound != null && (
                <div className="flex items-center gap-3">
                  <span className="text-white/35 text-xs tracking-[0.1em] uppercase">Gain composé {activeYear}</span>
                  <span className="font-data text-sm font-bold" style={{ color: yearCompound >= 0 ? "#5BAF8A" : "#C0665A" }}>
                    {formatReturn(yearCompound, lang)}
                  </span>
                </div>
              )}
            </motion.div>

                {/* Myfxbook mention */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-3 p-5 rounded-xl mb-6"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider"
                      style={{ background: "rgba(58,128,204,0.1)", border: "1px solid rgba(58,128,204,0.25)", color: "#3A80CC" }}
                    >
                      Myfxbook
                    </div>
                    <div className="flex-1">
                      <p className="text-white/70 text-sm font-medium mb-1">{pt.myfxbook_verified}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{pt.myfxbook_updated}</p>
                    </div>
                    <a
                      href={MYFXBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
                      style={{ background: "rgba(58,128,204,0.1)", border: "1px solid rgba(58,128,204,0.25)", color: "#3A80CC" }}
                    >
                      <span>Voir sur Myfxbook</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 8L8 2M8 2H3.5M8 2v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  {activeYear === "2025" && (
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "rgba(201,169,110,0.75)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        paddingTop: "0.75rem",
                      }}
                    >
                      Octobre 2025 — changement de compte maître Myfxbook. Le lien public suit le nouveau compte : l&apos;historique antérieur n&apos;y figure pas.
                    </p>
                  )}
                </motion.div>

            {/* Risk warning */}
            <div
              className="flex items-start gap-3 p-5 rounded-xl"
              style={{ background: "rgba(201,169,110,0.03)", border: "1px solid rgba(201,169,110,0.12)" }}
            >
              <AlertTriangle className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-white/40 text-xs leading-relaxed">{t.performance.risk_note}</p>
            </div>
          </div>
        </section>

        {/* ── Equity curve ── */}
        <section className="py-10 md:py-14 overflow-hidden">
          <div className="section-divider mb-12" />
          <div className="container">
            <div className="mb-4">
              <span className="text-white/30 text-xs tracking-[0.12em] uppercase">
                Évolution du capital — base 10&nbsp;000 CHF
              </span>
            </div>
            <PerformanceCharts year={activeYear} />
          </div>
        </section>

        {/* ── Methodology + definitions ── */}
        <section className="py-10 md:py-16 pb-24" ref={defsRef}>
          <div className="section-divider mb-12" />
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={defsInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl font-semibold text-white mb-8"
            >
              {t.performance.methodology_title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-12">
              {t.performance.methodology.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={defsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col gap-1 p-4 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-white/30 text-[10px] tracking-[0.1em] uppercase">{row.label}</span>
                  <span className="text-white/65 text-sm">{row.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={defsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-white mb-8"
            >
              {t.performance.definitions_title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {t.performance.definitions.map((def, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={defsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "#C9A96E" }}>{def.term}</h3>
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

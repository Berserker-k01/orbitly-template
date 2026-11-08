import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('—');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    // Extract numeric value
    const num = parseFloat(target.replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (isNaN(num)) { setDisplay(target); return; }

    const prefix = target.match(/^[^0-9]*/)?.[0] || '';
    const suffix = target.match(/[^0-9.,\s]*$/)?.[0] || '';
    const isPercent = target.includes('%');
    const steps = 50;
    const duration = 1200;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      const formatted = current % 1 === 0
        ? current.toFixed(0)
        : current.toFixed(2).replace('.', ',');
      setDisplay(`${prefix}${formatted}${isPercent ? ' %' : suffix}`);
      if (step >= steps) { clearInterval(timer); setDisplay(target); }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

function StatCard({ item, index, inView }: { item: { value: string; label: string; description: string }; index: number; inView: boolean }) {
  const display = useCountUp(item.value, inView);

  return (
    <motion.div
      variants={staggerItem}
      className="relative p-7 rounded-xl card-hover"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)" }}
        aria-hidden="true"
      />
      <div className="font-data text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
        {display}
      </div>
      <div className="text-sm font-medium text-white/80 mb-1">
        {item.label}
      </div>
      <div className="text-xs text-white/40">
        {item.description}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="stats-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,169,110,0.05), transparent)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
            {t.stats.title}
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="stats-heading"
            className="text-2xl md:text-4xl font-semibold text-white mb-3"
          >
            {t.stats.subtitle}
          </motion.h2>
        </motion.div>

        {/* KPI grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {t.stats.items.map((item, i) => (
            <StatCard key={i} item={item} index={i} inView={inView} />
          ))}
        </motion.div>

        {/* Disclaimer toggle */}
        <div className="flex items-start gap-2 max-w-2xl mx-auto">
          <button
            onClick={() => setShowDisclaimer((v) => !v)}
            className="flex items-center gap-1.5 text-white/35 hover:text-white/55 text-xs transition-colors duration-200 mt-0.5 flex-shrink-0"
            aria-expanded={showDisclaimer}
            aria-label="Afficher la note de performance"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="underline underline-offset-2">
              {showDisclaimer ? '−' : '+'} Note sur les performances
            </span>
          </button>
        </div>
        {showDisclaimer && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto mt-3 p-4 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {t.stats.disclaimer}
          </motion.p>
        )}
      </div>
    </section>
  );
}

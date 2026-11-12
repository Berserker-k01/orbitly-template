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
    const num = parseFloat(target.replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (isNaN(num)) { setDisplay(target); return; }
    const prefix = target.match(/^[+\-]?/)?.[0] || '';
    const isPercent = target.includes('%');
    const hasComma = target.includes(',');
    const steps = 50;
    const duration = 1400;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      const formatted = hasComma
        ? current.toFixed(2).replace('.', ',')
        : current % 1 === 0 ? current.toFixed(0) : current.toFixed(2);
      setDisplay(`${prefix}${formatted}${isPercent ? ' %' : ''}`);
      if (step >= steps) { clearInterval(timer); setDisplay(target); }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

// Hero stat — larger, featured
function HeroStat({ item, inView }: { item: { value: string; label: string; description: string }; inView: boolean }) {
  const display = useCountUp(item.value, inView);
  return (
    <motion.div
      variants={staggerItem}
      className="col-span-2 relative p-8 md:p-10 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(201,169,110,0.04)",
        border: "1px solid rgba(201,169,110,0.18)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)" }} aria-hidden="true" />
      <div className="font-data text-5xl md:text-6xl font-bold tracking-tight mb-3" style={{ color: "#C9A96E" }}>
        {display}
      </div>
      <div className="text-white/85 text-base font-medium mb-1.5">{item.label}</div>
      <div className="text-white/35 text-sm">{item.description}</div>
    </motion.div>
  );
}

// Supporting stats — compact
function MiniStat({ item, inView, accent }: { item: { value: string; label: string; description: string }; inView: boolean; accent: string }) {
  const display = useCountUp(item.value, inView);
  return (
    <motion.div
      variants={staggerItem}
      className="relative flex flex-col justify-between p-6 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="font-data text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: accent }}>
        {display}
      </div>
      <div>
        <div className="text-white/75 text-sm font-medium mb-1">{item.label}</div>
        <div className="text-white/35 text-xs">{item.description}</div>
      </div>
    </motion.div>
  );
}

const ACCENTS = ["#3A80CC", "#5BAF8A", "#C0665A"];

export default function Stats() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const [hero, ...rest] = t.stats.items;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="stats-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-0 w-[600px] h-[400px] ambient-breathe"
          style={{ background: "radial-gradient(ellipse at 10% 20%, rgba(201,169,110,0.08) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[350px] ambient-drift"
          style={{ background: "radial-gradient(ellipse at 90% 80%, rgba(29,95,168,0.06) 0%, transparent 60%)", filter: "blur(60px)", animationDelay: "3s" }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.h2
            variants={staggerItem}
            id="stats-heading"
            className="font-display text-2xl md:text-4xl font-medium text-white max-w-xl"
          >
            {t.stats.subtitle}
          </motion.h2>
        </motion.div>

        {/* Asymmetric grid: hero stat spans 2 cols on left, 3 mini stats on right */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <HeroStat item={hero} inView={inView} />
          {rest.map((item, i) => (
            <MiniStat key={i} item={item} inView={inView} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2">
          <button
            onClick={() => setShowDisclaimer((v) => !v)}
            className="flex items-center gap-1.5 text-white/30 hover:text-white/50 text-xs transition-colors duration-200 mt-0.5 flex-shrink-0"
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
            className="text-white/30 text-xs leading-relaxed max-w-2xl mt-3 p-4 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {t.stats.disclaimer}
          </motion.p>
        )}
      </div>
    </section>
  );
}

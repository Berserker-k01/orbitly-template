import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function TechOverview() {
  const { t, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const [, setLocation] = useLocation();

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="tech-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      {/* Blue ambient */}
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(29,95,168,0.07), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
              {t.tech.badge}
            </motion.span>
            <motion.h2
              variants={staggerItem}
              id="tech-heading"
              className="text-3xl md:text-4xl font-semibold text-white mb-5 leading-tight"
            >
              {t.tech.title}
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/50 text-sm leading-relaxed mb-8">
              {t.tech.subtitle}
            </motion.p>
            <motion.a
              variants={staggerItem}
              href={langPath('/technologie')}
              onClick={(e) => { e.preventDefault(); setLocation(langPath('/technologie')); }}
              className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
            >
              Explorer la technologie
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* Right: stat grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {t.tech.items.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="text-white/35 text-xs tracking-[0.1em] uppercase mb-2 font-medium">
                  {item.label}
                </div>
                <div className="text-white font-semibold text-base">
                  {item.value}
                </div>
              </motion.div>
            ))}

            {/* Visual accent tile */}
            <motion.div
              variants={staggerItem}
              className="col-span-2 p-5 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(29,95,168,0.08), rgba(201,169,110,0.05))",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#C9A96E", boxShadow: "0 0 8px rgba(201,169,110,0.5)" }}
                />
                <span className="text-white/60 text-xs tracking-wide">
                  Exécution algorithmique automatisée · EUR/USD · Suisse
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";

export default function ProcessSection() {
  const { t, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);
  const [, setLocation] = useLocation();

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="process-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[400px] ambient-breathe"
          style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(29,95,168,0.07) 0%, transparent 60%)", filter: "blur(55px)", animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] ambient-drift"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(201,169,110,0.05) 0%, transparent 60%)", filter: "blur(50px)", animationDelay: "4s" }}
        />
        <div className="absolute inset-0 line-grid opacity-10" />
      </div>

      <div className="container relative z-10">
        {/* Header — left-aligned, editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={staggerItem}
              id="process-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-5"
            >
              {t.process.title}
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              {t.process.subtitle}
            </motion.p>
            <motion.div variants={staggerItem}>
              <a
                href={langPath("/approche")}
                onClick={(e) => { e.preventDefault(); setLocation(langPath("/approche")); }}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "#C9A96E" }}
              >
                {"Découvrir notre approche"}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Decorative right */}
          <div className="hidden lg:flex items-center justify-end">
            <div
              className="w-32 h-32 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #C9A96E, transparent)" }}
            />
          </div>
        </div>

        {/* 4-step horizontal flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to right, rgba(201,169,110,0.1), rgba(201,169,110,0.3), rgba(201,169,110,0.1))" }}
          />

          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="relative flex flex-col px-6 py-8 lg:px-8"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* Step number circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 font-data text-base font-bold flex-shrink-0 relative z-10"
                style={{
                  background: "rgba(201,169,110,0.08)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  color: "#C9A96E",
                  boxShadow: "0 0 24px rgba(201,169,110,0.06)",
                }}
              >
                {step.number}
              </div>

              <h3 className="text-white font-semibold text-lg mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {step.body}
              </p>

              {/* Mobile connector */}
              {i < t.process.steps.length - 1 && (
                <div className="lg:hidden mt-6 self-start" aria-hidden="true">
                  <div className="w-px h-6" style={{ background: "rgba(201,169,110,0.2)" }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

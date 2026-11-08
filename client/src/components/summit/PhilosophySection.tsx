import { motion } from "framer-motion";
import { TrendingUp, Cpu, Layers, Shield, Eye } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

const ICONS = [TrendingUp, Cpu, Layers, Shield, Eye];

export default function PhilosophySection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="philosophy-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-xl mb-14"
        >
          <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
            {t.philosophy.badge}
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="philosophy-heading"
            className="text-3xl md:text-5xl font-semibold text-white mb-5 leading-tight"
          >
            {t.philosophy.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/55 text-base leading-relaxed">
            {t.philosophy.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {t.philosophy.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`relative p-6 rounded-xl card-hover ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.2)",
                  }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: "#C9A96E" }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

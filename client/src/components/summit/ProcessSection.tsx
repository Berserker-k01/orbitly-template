import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

export default function ProcessSection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="process-heading"
      style={{ background: "rgba(10,14,26,0.6)" }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
            {t.process.badge}
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="process-heading"
            className="text-3xl md:text-5xl font-semibold text-white mb-4"
          >
            {t.process.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            {t.process.subtitle}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="flex gap-6 md:gap-10 mb-10 last:mb-0"
            >
              {/* Step number + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-data text-sm font-bold flex-shrink-0"
                  style={{
                    background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    color: "#C9A96E",
                  }}
                >
                  {step.number}
                </div>
                {i < t.process.steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-3"
                    style={{
                      background: "linear-gradient(to bottom, rgba(201,169,110,0.3), rgba(201,169,110,0.05))",
                      minHeight: "2.5rem",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-10 last:pb-0">
                <h3 className="text-white font-semibold text-lg mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

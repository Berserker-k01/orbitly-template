import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

export default function PhilosophySection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);

  const [primary, ...secondary] = t.philosophy.items;

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      ref={ref}
      aria-labelledby="philosophy-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container relative z-10">
        {/* Two-column layout: editorial left, content right */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left — editorial statement */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-5 md:sticky md:top-32"
          >
            <motion.span variants={staggerItem} className="badge-pill mb-8 inline-flex">
              {t.philosophy.badge}
            </motion.span>

            <motion.h2
              variants={staggerItem}
              id="philosophy-heading"
              className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8 leading-[1.1] tracking-tight"
            >
              {t.philosophy.title}
            </motion.h2>

            {/* Pull quote */}
            <motion.div
              variants={staggerItem}
              className="relative pl-5 border-l mb-8"
              style={{ borderColor: "rgba(201,169,110,0.4)" }}
            >
              <p className="font-display text-lg md:text-xl text-white/70 italic leading-relaxed">
                {t.philosophy.subtitle}
              </p>
            </motion.div>

            {/* Primary philosophy item — featured */}
            {primary && (
              <motion.div variants={staggerItem}>
                <div className="text-white/90 font-semibold text-sm mb-2">{primary.title}</div>
                <p className="text-white/45 text-sm leading-relaxed">{primary.body}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right — numbered principles */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-7 flex flex-col gap-0"
          >
            {secondary.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex gap-6 py-8 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="font-data text-xs font-bold flex-shrink-0 mt-1 w-7 text-right"
                  style={{ color: "rgba(201,169,110,0.5)" }}
                >
                  0{i + 2}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

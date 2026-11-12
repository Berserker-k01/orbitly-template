import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

export default function EcosystemSection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);
  const d = t.ecosystem;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="ecosystem-heading"
      id="differenciation"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container relative z-10 max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.h2
            variants={staggerItem}
            id="ecosystem-heading"
            className="font-display text-3xl md:text-5xl font-medium text-white mb-5 leading-tight"
          >
            {d.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/55 text-sm md:text-base leading-relaxed">
            {d.intro}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-white/40 text-xs tracking-[0.12em] uppercase mb-6"
        >
          {d.not_label}
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {d.not_items.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="py-5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="text-white/90 text-sm font-medium mb-1.5">{item.title}</div>
              <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="text-white/50 text-sm leading-relaxed mt-10 font-display italic text-lg"
        >
          {d.distinction}
        </motion.p>
      </div>
    </section>
  );
}

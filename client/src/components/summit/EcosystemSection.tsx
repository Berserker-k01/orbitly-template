import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { X } from "lucide-react";

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
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&auto=format&fit=crop&q=70"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 60%" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.92)" }} />
      </div>

      <div className="container relative z-10 max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
            {d.badge}
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="ecosystem-heading"
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
          >
            {d.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl">
            {d.intro}
          </motion.p>
          <motion.p variants={staggerItem} className="text-white/40 text-sm mt-4 font-medium">
            {d.not_label}
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-10"
        >
          {d.not_items.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(192,102,90,0.12)", border: "1px solid rgba(192,102,90,0.25)" }}
              >
                <X className="w-3.5 h-3.5" style={{ color: "#C0665A" }} />
              </div>
              <div>
                <div className="text-white/85 text-sm font-semibold mb-1">{item.title}</div>
                <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="text-white/55 text-sm leading-relaxed p-5 rounded-xl"
          style={{
            background: "rgba(201,169,110,0.05)",
            border: "1px solid rgba(201,169,110,0.18)",
          }}
        >
          {d.distinction}
        </motion.p>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

export default function PhilosophySection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section
      className="relative pt-10 md:pt-16 pb-20 md:pb-28 overflow-hidden"
      ref={ref}
      aria-labelledby="philosophy-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left — editorial statement (remonté) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-5 md:sticky md:top-20 -mt-4 md:-mt-8"
          >
            <motion.h2
              variants={staggerItem}
              id="philosophy-heading"
              className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-5 leading-[1.1] tracking-tight"
            >
              {t.philosophy.title}
            </motion.h2>

            <motion.div
              variants={staggerItem}
              className="relative pl-5 border-l mb-6"
              style={{ borderColor: "rgba(201,169,110,0.4)" }}
            >
              <p className="font-display text-lg md:text-xl text-white/70 italic leading-relaxed">
                {t.philosophy.subtitle}
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="relative mt-6 rounded-md overflow-hidden"
              style={{ height: "200px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(6,8,17,0.5) 0%, rgba(6,8,17,0.15) 50%, rgba(6,8,17,0.6) 100%)" }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="text-white/35 text-[10px] tracking-[0.2em] uppercase">Suisse</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — all numbered principles together (01 → 05) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-7 flex flex-col gap-0"
          >
            {t.philosophy.items.map((item, i) => (
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
                  {String(i + 1).padStart(2, "0")}
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

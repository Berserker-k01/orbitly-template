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
      {/* Ambient background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-0 w-[600px] h-[500px] ambient-breathe"
          style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(29,95,168,0.09) 0%, transparent 65%)", filter: "blur(50px)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] ambient-drift"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(201,169,110,0.05) 0%, transparent 60%)", filter: "blur(60px)", animationDelay: "2s" }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
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

          {/* Right: photo + stat grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            {/* Data center photo */}
            <motion.div
              variants={staggerItem}
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 50%" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.25) 0%, rgba(6,8,17,0.6) 100%)" }}
              />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#C9A96E", boxShadow: "0 0 6px rgba(201,169,110,0.6)" }}
                />
                <span className="text-white/45 text-[10px] tracking-[0.15em] uppercase">
                  Infrastructure · Vantage Markets
                </span>
              </div>
            </motion.div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

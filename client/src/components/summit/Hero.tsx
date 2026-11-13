import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";

export default function Hero() {
  const { t, langPath } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Section d'ouverture"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,8,17,0.55) 0%, rgba(6,8,17,0.35) 35%, rgba(6,8,17,0.7) 75%, #060811 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(6,8,17,0.75) 0%, rgba(6,8,17,0.25) 55%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="relative container flex flex-col items-start text-left pt-36 pb-24"
        style={{ zIndex: 10 }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6 max-w-3xl"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl md:text-7xl lg:text-[5.25rem] font-medium text-white leading-[1.05] tracking-tight"
          >
            {t.hero.title1}
          </motion.h1>
          {t.hero.title2 ? (
            <motion.h1
              variants={staggerItem}
              className="font-display text-5xl md:text-7xl lg:text-[5.25rem] font-medium text-white/70 leading-[1.05] tracking-tight mt-1"
            >
              {t.hero.title2}
            </motion.h1>
          ) : null}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm md:text-[0.95rem] max-w-xl mb-10 leading-relaxed"
          style={{ color: "rgba(237,233,227,0.52)" }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start gap-3"
        >
          <a
            href={langPath("/approche")}
            onClick={(e) => { e.preventDefault(); setLocation(langPath("/approche")); }}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm font-semibold"
          >
            <span>{t.hero.cta_primary}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <a
            href={langPath("/performances")}
            onClick={(e) => { e.preventDefault(); setLocation(langPath("/performances")); }}
            className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm font-medium"
          >
            {t.hero.cta_secondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-16 flex items-center gap-3"
        >
          <div className="w-8 h-px" style={{ background: "rgba(237,233,227,0.2)" }} />
          <span
            className="text-xs tracking-[0.18em] uppercase"
            style={{ color: "rgba(237,233,227,0.28)" }}
          >
            Suisse
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.12em] uppercase" style={{ color: "rgba(237,233,227,0.25)" }}>
            {t.hero.scroll_indicator}
          </span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" style={{ color: "rgba(237,233,227,0.25)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

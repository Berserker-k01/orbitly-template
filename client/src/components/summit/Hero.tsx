import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";
import TradingCandlesBg from "./TradingCandlesBg";
import HeroVisuals from "./HeroVisuals";

export default function Hero() {
  const { t, langPath } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Section d'ouverture"
    >
      {/* ── Photo de montagne alpine ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        {/* Overlay multicouche pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(6,8,17,0.72) 0%, rgba(6,8,17,0.45) 40%, rgba(6,8,17,0.65) 70%, rgba(6,8,17,1) 100%)",
          }}
        />
        {/* Vignette latérale gauche pour le texte */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.4) 50%, transparent 100%)",
          }}
        />
        {/* Teinte or subtile */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 15% 50%, rgba(201,169,110,0.07) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ── Fine gold grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* ── Animated market curve + particles ── */}
      <HeroVisuals />

      {/* ── Animated trading candles (right side) ── */}
      <TradingCandlesBg />

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #060811 100%)",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        className="relative container flex flex-col items-start text-left pt-36 pb-24"
        style={{ zIndex: 10 }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-7 max-w-2xl"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-white leading-[1.05] tracking-tight mb-2"
          >
            {t.hero.title1}
          </motion.h1>
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight gradient-text"
          >
            {t.hero.title2}
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm md:text-base max-w-md mb-10 leading-relaxed"
          style={{ color: "rgba(237,233,227,0.60)" }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start gap-3"
        >
          <a
            href={langPath("/approche")}
            onClick={(e) => { e.preventDefault(); setLocation(langPath("/approche")); }}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
          >
            <span>{t.hero.cta_primary}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <a
            href={langPath("/performances")}
            onClick={(e) => { e.preventDefault(); setLocation(langPath("/performances")); }}
            className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
          >
            {t.hero.cta_secondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-14 flex items-center gap-3"
        >
          <div className="section-divider w-12" />
          <span
            className="text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(237,233,227,0.28)" }}
          >
            Suisse
          </span>
          <div className="section-divider w-12" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(237,233,227,0.28)" }}
          >
            {t.hero.scroll_indicator}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" style={{ color: "rgba(237,233,227,0.28)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

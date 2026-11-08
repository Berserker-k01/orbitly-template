import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";
import TradingCandlesBg from "./TradingCandlesBg";
import AlpineSilhouette from "./AlpineSilhouette";
import HeroVisuals from "./HeroVisuals";

export default function Hero() {
  const { t, langPath } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Section d'ouverture"
    >
      {/* ── Background layers (bottom-up z order) ── */}

      {/* Fine gold grid */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.055) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.65,
        }}
      />

      {/* Gold ambient — top left */}
      <div
        className="absolute top-0 left-0 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 8% 15%, rgba(201,169,110,0.11) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Institutional blue — top right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 92% 8%, rgba(29,95,168,0.10) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Deep center depth glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(14,26,53,0.55) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Topo lines + market curve + particles */}
      <HeroVisuals />

      {/* Logo watermark — centred, very subtle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl pointer-events-none select-none"
        aria-hidden="true"
        style={{ zIndex: 1, opacity: 0.04 }}
      >
        <img src="/logo-full.png" alt="" className="w-full object-contain" />
      </div>

      {/* Animated trading candles — right side */}
      <TradingCandlesBg />

      {/* Alpine mountain silhouette — bottom */}
      <AlpineSilhouette />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #060811 100%)",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative container flex flex-col items-center text-center pt-32 pb-20" style={{ zIndex: 10 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="badge-pill mb-10"
        >
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-7"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl md:text-7xl lg:text-[5.2rem] font-medium text-white leading-[1.07] tracking-tight mb-1"
          >
            {t.hero.title1}
          </motion.h1>
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl md:text-7xl lg:text-[5.2rem] font-medium leading-[1.07] tracking-tight gradient-text"
          >
            {t.hero.title2}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed px-4 sm:px-0"
          style={{ color: "rgba(237,233,227,0.60)" }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href={langPath("/approche")}
            onClick={(e) => {
              e.preventDefault();
              setLocation(langPath("/approche"));
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold w-full sm:w-auto"
          >
            <span>{t.hero.cta_primary}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <a
            href={langPath("/performances")}
            onClick={(e) => {
              e.preventDefault();
              setLocation(langPath("/performances"));
            }}
            className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium w-full sm:w-auto"
          >
            {t.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Swiss identifier */}
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
            Chardonne · Suisse
          </span>
          <div className="section-divider w-12" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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

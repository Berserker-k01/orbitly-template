/*
 * Hero — Orbitly SaaS Template (Polish v4)
 * Design: Orbital Dark — proper top padding, inline SVG company logos,
 * fixed G2/PH logo rendering, live activity ticker.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import Marquee from "react-fast-marquee";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-hero-bg-5aSwiDzmJdebv5f88UeaWz.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-dashboard-mockup-drZEpmgN2gQ3RyeRpBTR5n.webp";

const activities = [
  { icon: <TrendingUp className="w-3 h-3 text-emerald-400" />, text: "Sprint velocity up 34% this week" },
  { icon: <Zap className="w-3 h-3 text-indigo-400" />, text: "AI planned 2.1M tasks this week" },
  { icon: <Star className="w-3 h-3 text-violet-400" />, text: "12,847 teams shipped on time last month" },
];

// Inline SVG logos — white fill, renders perfectly on dark backgrounds
// Removed: Figma (ambiguous icon), Atlassian (diamond icon unclear), Resend (lightning looks off)
const CompanyLogos = [
  {
    name: "Stripe",
    svg: (
      // Official Stripe wordmark — all elements from Wikimedia Commons SVG
      <svg viewBox="54 36 360.02 149.84" className="h-7 w-auto fill-white opacity-50 hover:opacity-80 transition-opacity duration-300" aria-label="Stripe">
        <path d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z"/>
        <path d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z"/>
        <polygon points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3"/>
        <rect x="223.8" y="69.3" width="25.1" height="87.5"/>
        <path d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z"/>
        <path d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z"/>
        <path d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"/>
      </svg>
    ),
  },
  {
    name: "Notion",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto fill-white opacity-45 hover:opacity-75 transition-opacity duration-300" aria-label="Notion">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto fill-white opacity-45 hover:opacity-75 transition-opacity duration-300" aria-label="Vercel">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    ),
  },
  // Linear removed — icon-only mark not recognizable enough at small sizes
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto fill-white opacity-45 hover:opacity-75 transition-opacity duration-300" aria-label="GitHub">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    name: "Slack",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto fill-white opacity-45 hover:opacity-75 transition-opacity duration-300" aria-label="Slack">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto fill-white opacity-45 hover:opacity-75 transition-opacity duration-300" aria-label="Supabase">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.563.63 13.34 1.26 13.34l7.61.003-1.02 9.591c.015.986 1.26 1.41 1.874.637l9.262-11.652c.434-.513.134-1.29-.496-1.29l-7.61-.003 1.02-9.59z"/>
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const allLogos = [...CompanyLogos, ...CompanyLogos];

function ActivityTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % activities.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center justify-center gap-2 h-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-white/60 text-xs"
        >
          {activities[index].icon}
          <span>{activities[index].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, transparent 30%, #030305 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030305)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container flex flex-col items-center text-center pt-32 pb-0">

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.06] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Ship projects at the
          </motion.h1>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight gradient-text pb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            speed of thought
          </motion.h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-5 leading-relaxed px-4 sm:px-0"
        >
          Orbitly brings AI-powered planning, real-time collaboration, and
          intelligent automation into one workspace. Stop managing work.
          Start delivering it.
        </motion.p>

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mb-9"
        >
          <ActivityTicker />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#"
            className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <a
            href="#"
            className="btn-ghost inline-flex items-center justify-center gap-2 text-white/75 hover:text-white font-medium px-8 py-4 rounded-xl text-sm whitespace-nowrap w-full sm:w-auto"
          >
            Watch demo
            <span className="text-xs text-white/45 font-normal">2 min</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="text-xs text-white/50 tracking-wide mb-16"
        >
          Free 14-day trial · No credit card required · Cancel anytime
        </motion.p>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="relative w-full max-w-5xl mx-auto animate-float"
        >
          <div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.22), transparent)",
              filter: "blur(24px)",
            }}
            aria-hidden="true"
          />
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Browser chrome */}
            <div className="bg-[#0C0C14] border-b border-white/[0.05] px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/[0.05] rounded-md px-4 py-1.5 text-xs text-white/45 flex items-center gap-2 max-w-xs w-full justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  app.orbitly.io/dashboard
                </div>
              </div>
              <div className="w-16" />
            </div>
            <img
              src={DASHBOARD_IMG}
              alt="Orbitly dashboard — AI-powered kanban project management"
              className="w-full block"
              loading="eager"
            />
          </div>


        </motion.div>

        {/* Logo marquee — react-fast-marquee for guaranteed seamless infinite scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="w-full mt-20"
        >
          <p className="text-xs text-white/45 uppercase tracking-[0.18em] text-center mb-8 font-medium">
            Trusted by teams at
          </p>
          <Marquee
            speed={50}
            gradient={true}
            gradientColor="#030305"
            gradientWidth={80}
            pauseOnHover={true}
          >
            {allLogos.map((logo, i) => (
              <div key={i} className="flex items-center mx-10">
                {logo.svg}
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}

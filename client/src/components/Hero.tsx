/*
 * Hero — Orbitly SaaS Template (Polish v3)
 * Design: Orbital Dark — tighter vertical rhythm, better spacing between
 * headline/subhead/CTAs, floating stat cards, live activity ticker.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-hero-bg-5aSwiDzmJdebv5f88UeaWz.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-dashboard-mockup-drZEpmgN2gQ3RyeRpBTR5n.webp";

const logos = [
  "Stripe", "Notion", "Figma", "Vercel", "Linear", "Supabase", "Resend", "Clerk",
  "GitHub", "Slack", "Jira", "Confluence",
  "Stripe", "Notion", "Figma", "Vercel", "Linear", "Supabase", "Resend", "Clerk",
  "GitHub", "Slack", "Jira", "Confluence",
];

const activities = [
  { icon: <TrendingUp className="w-3 h-3 text-emerald-400" />, text: "Sprint velocity up 34% this week" },
  { icon: <Zap className="w-3 h-3 text-indigo-400" />, text: "AI planned 2.1M tasks this week" },
  { icon: <Star className="w-3 h-3 text-violet-400" />, text: "12,847 teams shipped on time last month" },
];

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
          className="flex items-center gap-1.5 text-white/40 text-xs"
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.5 }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
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

      <div className="relative z-10 container flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="badge-pill mb-6"
        >
          <Star className="w-3 h-3 fill-indigo-400 text-indigo-400" />
          Trusted by 12,000+ teams worldwide
          <span className="w-px h-3 bg-indigo-500/40 mx-0.5" />
          <span className="text-white/30">New: AI Sprint Planning</span>
          <ArrowRight className="w-3 h-3 text-white/30" />
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-5"
        >
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-[5.25rem] font-bold text-white leading-[1.06] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Ship projects at the
          </motion.h1>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-[5.25rem] font-bold leading-[1.06] tracking-tight gradient-text"
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
          className="text-base md:text-lg text-white/45 max-w-xl mx-auto mb-4 leading-relaxed"
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
          className="mb-8"
        >
          <ActivityTicker />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3"
        >
          <a
            href="#"
            className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="btn-ghost inline-flex items-center gap-2 text-white/65 hover:text-white font-medium px-7 py-3.5 rounded-xl text-sm"
          >
            Watch demo
            <span className="text-xs text-white/25 font-normal">2 min</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="text-xs text-white/22 tracking-wide mb-14"
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
                <div className="bg-white/[0.05] rounded-md px-4 py-1.5 text-xs text-white/22 flex items-center gap-2 max-w-xs w-full justify-center">
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

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.4 }}
            className="absolute -left-5 top-1/3 hidden lg:block"
          >
            <div className="glass-card gradient-border rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-white/35 mb-1">Sprint velocity</div>
              <div className="text-xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>+34%</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400">vs last sprint</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.6 }}
            className="absolute -right-5 top-1/4 hidden lg:block"
          >
            <div className="glass-card gradient-border rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-white/35 mb-1">AI tasks planned</div>
              <div className="text-xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>2.1M</div>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="w-3 h-3 text-indigo-400" />
                <span className="text-xs text-indigo-300">this week</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="w-full mt-16 overflow-hidden"
        >
          <p className="text-xs text-white/18 uppercase tracking-[0.18em] text-center mb-6 font-medium">
            Trusted by teams at
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #030305, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #030305, transparent)" }} />
            <div className="flex overflow-hidden">
              <div className="marquee-track flex items-center gap-14 whitespace-nowrap">
                {logos.map((logo, i) => (
                  <span
                    key={i}
                    className="text-white/16 font-semibold text-sm tracking-tight hover:text-white/35 transition-colors duration-300 select-none"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

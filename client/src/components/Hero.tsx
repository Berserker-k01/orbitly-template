/*
 * Hero — Orbitly SaaS Template
 * Design: Orbital Dark — centered hero with radial glow, staggered text reveal,
 * dashboard mockup in device frame, and logo marquee below.
 */
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-hero-bg-5aSwiDzmJdebv5f88UeaWz.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-dashboard-mockup-drZEpmgN2gQ3RyeRpBTR5n.webp";

const logos = [
  "Stripe", "Notion", "Figma", "Vercel", "Linear", "Supabase", "Resend", "Clerk",
  "Stripe", "Notion", "Figma", "Vercel", "Linear", "Supabase", "Resend", "Clerk",
];

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background glow image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030305)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-indigo-500/30 text-xs text-indigo-300 font-medium mb-8"
        >
          <Star className="w-3 h-3 fill-indigo-400 text-indigo-400" />
          Trusted by 12,000+ teams worldwide
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-white/40">New: AI Sprint Planning →</span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={stagger.container} initial="hidden" animate="show">
          <motion.h1
            variants={stagger.item}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Ship projects at the{" "}
            <span className="gradient-text">speed of thought</span>
          </motion.h1>

          <motion.p
            variants={stagger.item}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Orbitly brings AI-powered planning, real-time collaboration, and
            intelligent automation into one workspace. Stop managing work. Start
            delivering it.
          </motion.p>

          <motion.div
            variants={stagger.item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium px-8 py-4 rounded-xl text-base glass-card border border-white/8 hover:border-white/15 transition-all duration-200"
            >
              View demo
            </a>
          </motion.div>

          <motion.p
            variants={stagger.item}
            className="mt-5 text-sm text-white/30"
          >
            Free 14-day trial · No credit card required · Cancel anytime
          </motion.p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mt-16 w-full max-w-5xl mx-auto"
        >
          {/* Glow behind mockup */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          {/* Device frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
            {/* Browser chrome */}
            <div className="bg-[#0D0D14] border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/30 text-center max-w-xs mx-auto">
                  app.orbitly.io/dashboard
                </div>
              </div>
            </div>
            <img
              src={DASHBOARD_IMG}
              alt="Orbitly dashboard — kanban board with AI task management"
              className="w-full block"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-full mt-16 overflow-hidden"
        >
          <p className="text-xs text-white/25 uppercase tracking-widest text-center mb-6 font-medium">
            Trusted by teams at
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #030305, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #030305, transparent)" }} />
            <div className="flex overflow-hidden">
              <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
                {logos.map((logo, i) => (
                  <span
                    key={i}
                    className="text-white/20 font-semibold text-lg tracking-tight hover:text-white/40 transition-colors"
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

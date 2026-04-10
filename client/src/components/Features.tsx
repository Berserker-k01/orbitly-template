/*
 * Features — Orbitly SaaS Template
 * Design: Orbital Dark — asymmetric bento grid with glassmorphic cards,
 * scroll-triggered fade-up animations, and product screenshot inserts.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, BarChart3, Shield, GitBranch, Sparkles } from "lucide-react";

const ANALYTICS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-feature-analytics-SuS6KiDruHVMKGSaee9zZ8.webp";
const COLLAB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-feature-collab-PEatSkP8M6puJTHWxG2HFt.webp";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const smallFeatures = [
  {
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    title: "AI Sprint Planning",
    desc: "Let Orbitly's AI analyze your backlog and auto-generate sprint plans based on team velocity and deadlines.",
  },
  {
    icon: <Shield className="w-5 h-5 text-violet-400" />,
    title: "SOC 2 Type II",
    desc: "Enterprise-grade security with end-to-end encryption, SSO, and full audit logs out of the box.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-indigo-400" />,
    title: "GitHub & Jira Sync",
    desc: "Two-way sync with your existing tools. PRs, issues, and deployments reflected in real time.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-violet-400" />,
    title: "Smart Automations",
    desc: "Build no-code workflows that trigger on any event — status changes, due dates, or custom conditions.",
  },
];

export default function Features() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="features" className="relative py-32 overflow-hidden" ref={sectionRef}>
      {/* Subtle glow */}
      <div
        className="glow-orb w-[600px] h-[400px] -left-32 top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-4">
            Platform Features
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Everything your team needs,{" "}
            <span className="gradient-text">nothing it doesn't</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Orbitly combines the best of project management, AI automation, and
            real-time collaboration into a single, opinionated workspace.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large card — Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass-card rounded-2xl overflow-hidden card-hover border border-white/8"
          >
            <div className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Real-time Analytics
                  </h3>
                  <p className="text-white/40 text-sm">Track velocity, burndown, and delivery health</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <img
                src={ANALYTICS_IMG}
                alt="Orbitly analytics dashboard showing performance metrics"
                className="w-full rounded-xl border border-white/5 mt-4"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Tall card — Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden card-hover border border-white/8 flex flex-col"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Live Collaboration
                  </h3>
                  <p className="text-white/40 text-sm">Work together in real time</p>
                </div>
              </div>
              <img
                src={COLLAB_IMG}
                alt="Orbitly real-time collaboration with live cursors"
                className="w-full rounded-xl border border-white/5 mt-2"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Small feature cards */}
          {smallFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              className="glass-card rounded-2xl p-6 card-hover border border-white/8"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center mb-4">
                {feat.icon}
              </div>
              <h3
                className="text-white font-semibold text-base mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {feat.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * HowItWorks — Orbitly SaaS Template (Polish v2)
 * Design: Orbital Dark — numbered steps with animated connector,
 * count-up stats on scroll, sticky left column.
 */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, Rocket } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const stats = [
  { value: 2.4, suffix: "×", label: "Faster delivery", decimals: 1 },
  { value: 40, suffix: "%", label: "Fewer missed deadlines", decimals: 0 },
  { value: 12, suffix: "k+", label: "Teams using Orbitly", decimals: 0 },
  { value: 98.7, suffix: "%", label: "Platform uptime", decimals: 1 },
];

function StatCard({ stat, inView, delay }: { stat: typeof stats[0]; inView: boolean; delay: number }) {
  const raw = useCountUp(stat.value * (stat.decimals ? 10 : 1), inView);
  const display = stat.decimals ? (raw / 10).toFixed(stat.decimals) : raw;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="gradient-border rounded-2xl p-5 text-center"
    >
      <div
        className="text-3xl font-bold gradient-text mb-1"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {display}{stat.suffix}
      </div>
      <div className="text-white/35 text-xs leading-snug">{stat.label}</div>
    </motion.div>
  );
}

const steps = [
  {
    number: "01",
    icon: <Upload className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    title: "Connect your workspace",
    desc: "Import your existing projects from Jira, GitHub, Notion, or Linear in under 60 seconds. Orbitly maps your data automatically — no manual migration.",
    detail: "Supports 40+ integrations including Slack, Figma, Confluence, and Salesforce.",
  },
  {
    number: "02",
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    iconBg: "bg-violet-500/10 border-violet-500/20",
    title: "Let AI build your roadmap",
    desc: "Orbitly's AI analyzes your backlog, team capacity, and historical velocity to generate a realistic sprint plan. Review, adjust, and approve in minutes.",
    detail: "AI learns your team's patterns over time, improving accuracy with every sprint.",
  },
  {
    number: "03",
    icon: <Rocket className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    title: "Execute and ship faster",
    desc: "Real-time dashboards, automated standups, and smart blockers detection keep your team aligned and moving. Ship 2.4× faster than with traditional tools.",
    detail: "Average team sees 40% reduction in missed deadlines within the first month.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section id="how-it-works" className="relative py-36 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Right glow */}
      <div
        className="glow-orb w-[500px] h-[500px] -right-48 top-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: sticky header + stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:sticky lg:top-32"
          >
            <motion.div variants={staggerItem}>
              <span className="badge-pill mb-5">How It Works</span>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              From chaos to clarity{" "}
              <span className="gradient-text">in three steps</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/45 text-lg leading-relaxed mb-10">
              Most teams waste 30% of their time on coordination overhead.
              Orbitly eliminates that — so your team can focus on building.
            </motion.p>

            {/* Count-up stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} inView={inView} delay={0.3 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* Right: steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.18 }}
                className="relative flex gap-6 pb-14 last:pb-0 group"
              >
                {/* Animated connector line */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="absolute left-5 top-14 bottom-0 w-px step-line"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.18 }}
                    aria-hidden="true"
                  />
                )}

                {/* Step icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110 ${step.iconBg}`}>
                  {step.icon}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-mono text-white/20 tracking-[0.15em]"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.05]" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-3 leading-snug"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/45 leading-relaxed mb-3 text-[0.95rem]">{step.desc}</p>
                  <p className="text-sm text-indigo-300/60 italic leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

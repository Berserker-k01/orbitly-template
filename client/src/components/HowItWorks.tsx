/*
 * HowItWorks — Orbitly SaaS Template
 * Design: Orbital Dark — numbered steps with left-anchored layout,
 * animated step connectors, and scroll-triggered reveals.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, Rocket } from "lucide-react";

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

const steps = [
  {
    number: "01",
    icon: <Upload className="w-6 h-6 text-indigo-400" />,
    title: "Connect your workspace",
    desc: "Import your existing projects from Jira, GitHub, Notion, or Linear in under 60 seconds. Orbitly maps your data automatically — no manual migration.",
    detail: "Supports 40+ integrations including Slack, Figma, Confluence, and Salesforce.",
  },
  {
    number: "02",
    icon: <Cpu className="w-6 h-6 text-violet-400" />,
    title: "Let AI build your roadmap",
    desc: "Orbitly's AI analyzes your backlog, team capacity, and historical velocity to generate a realistic sprint plan. Review, adjust, and approve in minutes.",
    detail: "AI learns your team's patterns over time, improving accuracy with every sprint.",
  },
  {
    number: "03",
    icon: <Rocket className="w-6 h-6 text-indigo-400" />,
    title: "Execute and ship faster",
    desc: "Real-time dashboards, automated standups, and smart blockers detection keep your team aligned and moving. Ship 2.4x faster than with traditional tools.",
    detail: "Average team sees 40% reduction in missed deadlines within the first month.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Right glow */}
      <div
        className="glow-orb w-[500px] h-[500px] -right-32 top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-violet-300 border border-violet-500/30 bg-violet-500/10 mb-4">
              How It Works
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              From chaos to clarity{" "}
              <span className="gradient-text">in three steps</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Most teams waste 30% of their time on coordination overhead.
              Orbitly eliminates that — so your team can focus on building.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2.4×", label: "Faster delivery" },
                { value: "40%", label: "Fewer missed deadlines" },
                { value: "12k+", label: "Teams using Orbitly" },
                { value: "98.7%", label: "Platform uptime" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 border border-white/8">
                  <div
                    className="text-2xl font-bold gradient-text mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px step-line" aria-hidden="true" />
                )}

                {/* Step icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center mt-1">
                  {step.icon}
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono text-white/25 tracking-widest"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-3"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-sm text-indigo-300/70 italic">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

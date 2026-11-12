/*
 * Features — Orbitly SaaS Template (Polish v2)
 * Design: Orbital Dark — asymmetric bento grid, gradient-border cards,
 * scroll-triggered stagger, product screenshot inserts with inner glow.
 */
import { motion } from "framer-motion";
import { Zap, Users, BarChart3, Shield, GitBranch } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const ANALYTICS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-feature-analytics-SuS6KiDruHVMKGSaee9zZ8.webp";
const COLLAB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105007581/WVMihHZALT4vcd5EzoqTpv/orbitly-feature-collab-PEatSkP8M6puJTHWxG2HFt.webp";

const smallFeatures = [
  {
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    title: "AI Sprint Planning",
    desc: "Let Orbitly's AI analyze your backlog and auto-generate sprint plans based on team velocity and deadlines.",
  },
  {
    icon: <Shield className="w-5 h-5 text-violet-400" />,
    iconBg: "bg-violet-500/10 border-violet-500/20",
    title: "SOC 2 Type II",
    desc: "Enterprise-grade security with end-to-end encryption, SSO, and full audit logs out of the box.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    title: "GitHub & Jira Sync",
    desc: "Two-way sync with your existing tools. PRs, issues, and deployments reflected in real time.",
  },

];

export default function Features() {
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section id="features" className="relative py-36 overflow-hidden" ref={ref}>
      {/* No top divider — hero flows directly into features */}

      {/* Left glow */}
      <div
        className="glow-orb w-[500px] h-[500px] -left-48 top-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Everything your team needs,{" "}
            <br className="hidden md:block" />
            <span className="gradient-text">nothing it doesn't</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Orbitly combines the best of project management, AI automation, and
            real-time collaboration into a single, opinionated workspace.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Large card — Analytics (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2 gradient-border rounded-2xl overflow-hidden card-hover"
          >
            <div className="p-7 pb-0">
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 bg-indigo-500/10 border-indigo-500/20`}>
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Real-time Analytics
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Track velocity, burndown, and delivery health across every project and team.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-7 pb-7">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.06]">
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ boxShadow: "inset 0 0 40px rgba(99,102,241,0.08)" }}
                />
                <img
                  src={ANALYTICS_IMG}
                  alt="Orbitly analytics dashboard showing performance metrics"
                  className="w-full block"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Tall card — Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="gradient-border rounded-2xl overflow-hidden card-hover flex flex-col"
          >
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 bg-violet-500/10 border-violet-500/20">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Live Collaboration
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    See your team's cursors in real time. Comment, assign, and resolve without leaving the board.
                  </p>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/[0.06]">
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.08)" }}
                />
                <img
                  src={COLLAB_IMG}
                  alt="Orbitly real-time collaboration with live cursors"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Small feature cards */}
          {smallFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.26 + i * 0.08 }}
              className="gradient-border rounded-2xl p-7 card-hover group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 transition-colors duration-300 ${feat.iconBg}`}>
                {feat.icon}
              </div>
              <h3
                className="text-white font-semibold text-base mb-2.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {feat.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

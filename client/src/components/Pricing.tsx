/*
 * Pricing — Orbitly SaaS Template
 * Design: Orbital Dark — 3-tier pricing cards, center card highlighted with
 * indigo glow, toggle for monthly/annual billing.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

function useInView(threshold = 0.1) {
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

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for small teams getting started with modern project management.",
    cta: "Start for free",
    ctaStyle: "border border-white/15 text-white hover:border-white/30 hover:bg-white/5",
    popular: false,
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic kanban & list views",
      "GitHub integration",
      "7-day activity history",
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 18,
    annualPrice: 14,
    description: "For growing teams that need AI automation and advanced analytics.",
    cta: "Start 14-day trial",
    ctaStyle: "btn-primary text-white",
    popular: true,
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "AI sprint planning",
      "Advanced analytics",
      "All integrations (40+)",
      "Custom automations",
      "Priority support",
      "90-day history",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 48,
    annualPrice: 38,
    description: "For large orgs needing SSO, compliance, and dedicated support.",
    cta: "Contact sales",
    ctaStyle: "border border-white/15 text-white hover:border-white/30 hover:bg-white/5",
    popular: false,
    features: [
      "Everything in Pro",
      "SSO & SAML 2.0",
      "SOC 2 Type II compliance",
      "Custom data retention",
      "Dedicated CSM",
      "SLA guarantee",
      "Custom contracts",
      "On-prem option",
    ],
  },
];

export default function Pricing() {
  const { ref, inView } = useInView(0.1);
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Glow */}
      <div
        className="glow-orb w-[600px] h-[400px] left-1/2 -translate-x-1/2 bottom-0 opacity-10"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-4">
            Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            No hidden fees. No per-seat surprises. Just one price that scales
            with your team.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass-card border border-white/8 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              Annual
              <span className="text-xs text-indigo-300 font-semibold">Save 22%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "pricing-popular"
                  : "glass-card border border-white/8"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="text-white font-semibold text-lg mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className="text-white/40 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {(annual ? plan.annualPrice : plan.monthlyPrice) > 0 && (
                    <span className="text-white/40 text-sm mb-1.5">/user/mo</span>
                  )}
                </div>
                {annual && plan.annualPrice > 0 && (
                  <p className="text-white/30 text-xs mt-1">Billed annually</p>
                )}
              </div>

              <a
                href="#"
                className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 mb-6 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              <div className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}

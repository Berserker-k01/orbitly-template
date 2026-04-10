/*
 * Pricing — Orbitly SaaS Template (Polish v2)
 * Design: Orbital Dark — 3-tier pricing, animated price toggle,
 * popular card with glow ring, feature checkmarks with grouping.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for small teams getting started with modern project management.",
    cta: "Start for free",
    ctaClass: "btn-ghost text-white font-semibold",
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
    ctaClass: "btn-primary text-white font-semibold",
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
    ctaClass: "btn-ghost text-white font-semibold",
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
  const { ref, inView } = useScrollReveal(0.08);
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-36 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        className="glow-orb w-[700px] h-[500px] left-1/2 -translate-x-1/2 bottom-0 opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={staggerItem}>
            <span className="badge-pill mb-5">Pricing</span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/65 text-lg max-w-xl mx-auto mb-10">
            No hidden fees. No per-seat surprises. One price that scales with your team.
          </motion.p>

          {/* Billing toggle */}
          <motion.div variants={staggerItem} className="inline-flex items-center gap-1 gradient-border rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual ? "text-white" : "text-white/65 hover:text-white/65"
              }`}
            >
              {!annual && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual ? "text-white" : "text-white/65 hover:text-white/65"
              }`}
            >
              {annual && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Annual</span>
              <span className="relative z-10 text-xs text-indigo-300 font-semibold bg-indigo-500/15 px-1.5 py-0.5 rounded-full">
                Save 22%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.popular ? "pricing-popular" : "gradient-border"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name + desc */}
              <div className="mb-7 mt-2">
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-end gap-1.5"
                  >
                    <span
                      className="text-5xl font-bold text-white leading-none"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {(annual ? plan.annualPrice : plan.monthlyPrice) > 0 && (
                      <span className="text-white/55 text-sm mb-1.5">/user/mo</span>
                    )}
                  </motion.div>
                </AnimatePresence>
                {annual && plan.annualPrice > 0 && (
                  <p className="text-white/50 text-xs mt-1.5">Billed annually</p>
                )}
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`w-full py-3.5 rounded-xl text-sm text-center transition-all duration-200 mb-7 flex items-center justify-center gap-2 ${plan.ctaClass}`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Divider */}
              <div className="section-divider mb-6" />

              {/* Features */}
              <div className="flex flex-col gap-3 flex-1">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-indigo-400" />
                    </div>
                    <span className="text-white/55 text-sm leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center text-white/50 text-sm mt-10"
        >
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}

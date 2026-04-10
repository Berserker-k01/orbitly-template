/*
 * Testimonials — Orbitly SaaS Template (Polish v2)
 * Design: Orbital Dark — 3-column masonry stagger, gradient-border cards,
 * avatar initials with gradient fills, scroll-triggered reveal.
 */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote: "Orbitly replaced three tools we were using. Our sprint planning went from a 2-hour meeting to a 15-minute review. The AI suggestions are genuinely useful — not just noise.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Meridian Health",
    avatar: "SC",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    quote: "We shipped our last three product cycles on time for the first time in company history. Orbitly's blocker detection alone saved us two weeks on our last launch.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Foundry Labs",
    avatar: "MR",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    quote: "The GitHub sync is seamless. Our engineers love that task status updates automatically when a PR is merged. Zero manual overhead.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Stackline",
    avatar: "PN",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    quote: "I was skeptical about another PM tool. But the AI sprint planning feature is legitimately different — it actually understands our team's capacity constraints and history.",
    name: "James Okafor",
    role: "Engineering Manager",
    company: "Nexus AI",
    avatar: "JO",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    quote: "Migrating from Jira took 45 minutes. Everything came over cleanly. The interface is so much faster — our team adopted it without any training sessions.",
    name: "Lena Hoffmann",
    role: "Director of Engineering",
    company: "Studio Veil",
    avatar: "LH",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    quote: "The analytics dashboard gives me visibility I never had before. I can spot velocity drops before they become missed deadlines. Game changer for quarterly planning.",
    name: "David Park",
    role: "Product Lead",
    company: "Prism AI",
    avatar: "DP",
    gradient: "from-purple-500 to-violet-600",
  },
];

function TestimonialCard({
  t,
  delay,
  inView,
}: {
  t: (typeof testimonials)[0];
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      className="gradient-border rounded-2xl p-6 card-hover flex flex-col gap-5 group"
    >
      {/* Quote icon + stars */}
      <div className="flex items-center justify-between">
        <Quote className="w-5 h-5 text-indigo-400/40 group-hover:text-indigo-400/70 transition-colors duration-300" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-indigo-400 text-indigo-400" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-white/60 text-sm leading-relaxed flex-1 group-hover:text-white/75 transition-colors duration-300">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}
        >
          {t.avatar}
        </div>
        <div>
          <div
            className="text-white text-sm font-semibold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.name}
          </div>
          <div className="text-white/30 text-xs mt-0.5">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useScrollReveal(0.08);

  const col1 = testimonials.slice(0, 2);
  const col2 = testimonials.slice(2, 4);
  const col3 = testimonials.slice(4, 6);

  return (
    <section id="testimonials" className="relative py-36 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Center glow */}
      <div
        className="glow-orb w-[900px] h-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.8), transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={staggerItem}>
            <span className="badge-pill mb-5">Customer Stories</span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Loved by engineering teams{" "}
            <span className="gradient-text">at every scale</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/45 text-lg max-w-xl mx-auto">
            From 5-person startups to 500-person engineering orgs — Orbitly
            adapts to how your team works.
          </motion.p>
        </motion.div>

        {/* 3-column staggered masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex flex-col gap-3">
            {col1.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={0.1 + i * 0.1} inView={inView} />
            ))}
          </div>
          <div className="flex flex-col gap-3 lg:mt-10">
            {col2.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={0.2 + i * 0.1} inView={inView} />
            ))}
          </div>
          <div className="hidden lg:flex flex-col gap-3 lg:mt-5">
            {col3.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={0.3 + i * 0.1} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
        >
          {[
            { value: "4.9/5", label: "on G2", sub: "from 1,200+ reviews" },
            { value: "4.8/5", label: "on Product Hunt", sub: "#1 Product of the Day" },
            { value: "98%", label: "customer retention", sub: "year over year" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {item.value}
                </span>
                <span className="text-white/40 text-sm">{item.label}</span>
              </div>
              <span className="text-white/25 text-xs">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

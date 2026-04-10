/*
 * Testimonials — Orbitly SaaS Template
 * Design: Orbital Dark — auto-rotating testimonial cards in a 3-column staggered layout.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

const testimonials = [
  {
    quote: "Orbitly replaced three tools we were using. Our sprint planning went from a 2-hour meeting to a 15-minute review. The AI suggestions are genuinely useful.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Meridian Health",
    avatar: "SC",
    color: "from-indigo-500 to-violet-600",
  },
  {
    quote: "We shipped our last three product cycles on time for the first time in company history. Orbitly's blocker detection alone saved us two weeks on our last launch.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Foundry Labs",
    avatar: "MR",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote: "The GitHub sync is seamless. Our engineers love that task status updates automatically when a PR is merged. Zero manual overhead.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Stackline",
    avatar: "PN",
    color: "from-blue-500 to-indigo-600",
  },
  {
    quote: "I was skeptical about another PM tool. But the AI sprint planning feature is legitimately different — it actually understands our team's capacity constraints.",
    name: "James Okafor",
    role: "Engineering Manager",
    company: "Nexus AI",
    avatar: "JO",
    color: "from-indigo-500 to-blue-600",
  },
  {
    quote: "Migrating from Jira took 45 minutes. Everything came over cleanly. The interface is so much faster — our team adopted it without any training.",
    name: "Lena Hoffmann",
    role: "Director of Engineering",
    company: "Studio Veil",
    avatar: "LH",
    color: "from-violet-500 to-indigo-600",
  },
  {
    quote: "The analytics dashboard gives me visibility I never had before. I can spot velocity drops before they become missed deadlines. Game changer for planning.",
    name: "David Park",
    role: "Product Lead",
    company: "Prism AI",
    avatar: "DP",
    color: "from-purple-500 to-violet-600",
  },
];

function TestimonialCard({ t, delay, inView }: { t: typeof testimonials[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-2xl p-6 border border-white/8 card-hover flex flex-col gap-4"
    >
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <div className="text-white text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.name}
          </div>
          <div className="text-white/35 text-xs">{t.role} · {t.company}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);

  const col1 = testimonials.slice(0, 2);
  const col2 = testimonials.slice(2, 4);
  const col3 = testimonials.slice(4, 6);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Center glow */}
      <div
        className="glow-orb w-[800px] h-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-8"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-4">
            Customer Stories
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Loved by engineering teams{" "}
            <span className="gradient-text">at every scale</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From 5-person startups to 500-person engineering orgs — Orbitly
            adapts to how your team works.
          </p>
        </motion.div>

        {/* 3-column staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            {col1.map((t, i) => <TestimonialCard key={t.name} t={t} delay={0.1 + i * 0.1} inView={inView} />)}
          </div>
          <div className="flex flex-col gap-4 lg:mt-8">
            {col2.map((t, i) => <TestimonialCard key={t.name} t={t} delay={0.2 + i * 0.1} inView={inView} />)}
          </div>
          <div className="flex flex-col gap-4 lg:mt-4 hidden lg:flex">
            {col3.map((t, i) => <TestimonialCard key={t.name} t={t} delay={0.3 + i * 0.1} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

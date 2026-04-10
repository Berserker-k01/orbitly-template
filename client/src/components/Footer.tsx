/*
 * Footer — Orbitly SaaS Template
 * Design: Orbital Dark — full-width CTA with glow, then minimal dark footer.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Github, Twitter, Linkedin } from "lucide-react";

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

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Integrations", "Templates", "Community"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  const { ref, inView } = useInView(0.1);

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden" ref={ref}>
        <div
          className="glow-orb w-[700px] h-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-15"
          style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass-card border border-indigo-500/20 rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-medium mb-6">
              <Zap className="w-3 h-3 fill-indigo-400 text-indigo-400" />
              Start shipping faster today
            </div>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Your team deserves better{" "}
              <span className="gradient-text">than spreadsheets</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              Join 12,000+ teams who replaced their patchwork of tools with
              Orbitly. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium px-8 py-4 rounded-xl text-base glass-card border border-white/8 hover:border-white/15 transition-all duration-200"
              >
                Book a demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Orbitly
                </span>
              </a>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
                AI-powered project management for modern engineering teams. Ship
                faster, stress less.
              </p>
              {/* Email capture */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button className="btn-primary px-4 py-2 rounded-lg text-white text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4
                  className="text-white text-sm font-semibold mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/35 text-sm hover:text-white/70 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-sm">
              © 2025 Orbitly, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/25 hover:text-white/60 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/25 hover:text-white/60 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/25 hover:text-white/60 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-white/15 text-xs">
              Built with{" "}
              <a href="https://antimatterai.com" className="text-indigo-400/60 hover:text-indigo-400 transition-colors">
                Antimatter AI
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

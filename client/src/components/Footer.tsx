/*
 * Footer — Orbitly SaaS Template (Polish v2)
 * Design: Orbital Dark — full-width CTA with gradient card, polished footer grid.
 */
import { motion } from "framer-motion";
import { ArrowRight, Zap, Github, Twitter, Linkedin } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Integrations", "Templates", "Community"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-36 overflow-hidden" ref={ref}>
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="glow-orb w-[800px] h-[500px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-[0.12]"
          style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75 }}
            className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto"
            style={{
              background: "linear-gradient(145deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 0 80px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12), transparent)" }}
              aria-hidden="true"
            />
            <div className="relative z-10 p-12 md:p-20 text-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <motion.div variants={staggerItem}>
                  <span className="badge-pill mb-7">
                    <Zap className="w-3 h-3 fill-indigo-400 text-indigo-400" />
                    Start shipping faster today
                  </span>
                </motion.div>
                <motion.h2
                  variants={staggerItem}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Your team deserves better{" "}
                  <span className="gradient-text">than spreadsheets</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Join 12,000+ teams who replaced their patchwork of tools with
                  Orbitly. Free to start, no credit card required.
                </motion.p>
                <motion.div
                  variants={staggerItem}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <a
                    href="#"
                    className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold px-9 py-4 rounded-xl text-base"
                  >
                    Get started free
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="btn-ghost inline-flex items-center gap-2.5 text-white/65 hover:text-white font-medium px-9 py-4 rounded-xl text-base"
                  >
                    Book a demo
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Orbitly
                </span>
              </a>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-7">
                AI-powered project management for modern engineering teams. Ship
                faster, stress less.
              </p>
              {/* Email capture */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all duration-200"
                />
                <button className="btn-primary px-4 py-2.5 rounded-xl text-white text-sm font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4
                  className="text-white text-sm font-semibold mb-5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {category}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/30 text-sm hover:text-white/65 transition-colors duration-200"
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
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">
              © 2025 Orbitly, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: <Github className="w-4 h-4" />, label: "GitHub" },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-white/20 hover:text-white/55 transition-colors duration-200"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-white/15 text-xs">
              Built with{" "}
              <a
                href="https://antimatterai.com"
                className="text-indigo-400/50 hover:text-indigo-400 transition-colors duration-200"
              >
                Antimatter AI
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

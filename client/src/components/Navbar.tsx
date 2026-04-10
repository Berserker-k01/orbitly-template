/*
 * Navbar — Orbitly SaaS Template
 * Design: Orbital Dark — glassmorphic sticky nav with scroll-aware opacity
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030305]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span
              className="text-white font-semibold text-lg tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Orbitly
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 px-4 py-2"
            >
              Sign in
            </a>
            <a
              href="#"
              className="btn-primary text-sm text-white font-medium px-5 py-2.5 rounded-lg"
            >
              Start free
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#030305]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                <a href="#" className="px-4 py-3 text-sm text-white/60 hover:text-white rounded-lg">
                  Sign in
                </a>
                <a href="#" className="btn-primary text-sm text-white font-medium px-4 py-3 rounded-lg text-center">
                  Start free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

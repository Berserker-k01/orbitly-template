import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import type { Lang } from "@/i18n/translations";

const LANG_LABELS: Record<Lang, string> = { fr: 'FR', en: 'EN', de: 'DE' };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const { t, lang, langPath, switchLang } = useI18n();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { label: t.nav.approach, href: langPath('/approche') },
    { label: t.nav.performance, href: langPath('/performances') },
  ];

  const resourceLinks = [
    { label: t.nav.faq, href: langPath('/') + '#faq' },
    { label: t.nav.referral, href: langPath('/parrainage') },
    { label: t.nav.calculator, href: langPath('/calculatrice') },
    { label: t.nav.risks, href: langPath('/risques') },
  ];

  function handleNav(href: string) {
    setMobileOpen(false);
    setResourcesOpen(false);
    const [path, hash] = href.split("#");
    setLocation(path || langPath("/"));
    if (hash) {
      // Defer until after route paint
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  function handleLangSwitch(newLang: Lang) {
    try { localStorage.setItem('summit-lang', newLang); } catch {}
    setLangOpen(false);
    setMobileOpen(false);
    setLocation(switchLang(newLang));
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled ? "rgba(6,8,17,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            href={langPath('/')}
            onClick={(e) => { e.preventDefault(); handleNav(langPath('/')); }}
            className="flex items-center group"
            aria-label="Summit One — Accueil"
          >
            <img
              src="/logo-full-white.png"
              alt="Summit One"
              style={{
                height: '72px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white/55 hover:text-white/90"
              >
                {link.label}
              </a>
            ))}

            {/* Ressources dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onMouseEnter={() => setResourcesOpen(true)}
                onClick={() => setResourcesOpen((v) => !v)}
                className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white/55 hover:text-white/90"
              >
                {t.nav.resources}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setResourcesOpen(false)}
                    className="absolute left-0 top-full mt-1 rounded-xl overflow-hidden min-w-[220px] z-50"
                    style={{
                      background: "rgba(10,14,26,0.97)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {resourceLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); setResourcesOpen(false); handleNav(link.href); }}
                        className="flex items-center w-full px-4 py-3 text-sm text-white/60 hover:text-white/90 hover:bg-white/[0.04] transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200"
                aria-label="Changer de langue"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{LANG_LABELS[lang]}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden min-w-[80px]"
                    style={{
                      background: "rgba(10,14,26,0.97)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {(['fr', 'en', 'de'] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangSwitch(l)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          l === lang
                            ? 'text-[#C9A96E] bg-[rgba(201,169,110,0.08)]'
                            : 'text-white/60 hover:text-white/90 hover:bg-white/[0.04]'
                        }`}
                      >
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact CTA */}
            <a
              href={langPath('/contact')}
              onClick={(e) => { e.preventDefault(); handleNav(langPath('/contact')); }}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              {t.nav.contact_cta}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-3 right-3 z-40 rounded-xl overflow-hidden"
            style={{
              background: "rgba(10,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              <a
                href={langPath('/')}
                onClick={(e) => { e.preventDefault(); handleNav(langPath('/')); }}
                className="px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] text-sm font-medium transition-all duration-200"
              >
                {t.nav.home}
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className="px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] text-sm font-medium transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Ressources */}
              <button
                onClick={() => setMobileResourcesOpen((v) => !v)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] text-sm font-medium transition-all duration-200 w-full text-left"
              >
                <span>{t.nav.resources}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileResourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-4"
                  >
                    {resourceLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                        className="block px-4 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.04] text-sm transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="section-divider my-2" />
              {/* Language row */}
              <div className="flex items-center gap-2 px-4 py-2">
                <Globe className="w-3.5 h-3.5 text-white/40" />
                {(['fr', 'en', 'de'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangSwitch(l)}
                    className={`text-xs font-semibold tracking-wider px-2.5 py-1.5 rounded transition-colors ${
                      l === lang
                        ? 'text-[#C9A96E] bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.25)]'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <a
                href={langPath('/contact')}
                onClick={(e) => { e.preventDefault(); handleNav(langPath('/contact')); }}
                className="btn-primary flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold mt-1"
              >
                {t.nav.contact_cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close lang dropdown on outside click */}
      {langOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setLangOpen(false)}
        />
      )}
    </>
  );
}

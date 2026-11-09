import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

export default function Footer() {
  const { t, lang, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.06);
  const [, setLocation] = useLocation();

  function nav(path: string) {
    setLocation(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.home, href: langPath('/') },
    { label: t.nav.approach, href: langPath('/approche') },
    { label: t.nav.technology, href: langPath('/technologie') },
    { label: t.nav.performance, href: langPath('/performances') },
    { label: t.nav.contact, href: langPath('/contact') },
  ];

  const legalLinks = [
    { label: t.legal.title, href: langPath('/mentions-legales') },
    { label: t.legal.privacy_title, href: langPath('/confidentialite') },
    { label: t.legal.risk_title, href: langPath('/risques') },
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        ref={ref}
        aria-labelledby="cta-heading"
      >
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="glow-orb w-[600px] h-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-[0.08]"
          style={{ background: "radial-gradient(ellipse, #C9A96E, transparent)" }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto"
            style={{
              background: "linear-gradient(145deg, rgba(201,169,110,0.06), rgba(255,255,255,0.025))",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 0 80px rgba(201,169,110,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.08), transparent)" }}
              aria-hidden="true"
            />
            <div className="relative z-10 p-10 md:p-20 text-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <motion.span variants={staggerItem} className="badge-pill mb-8 inline-flex">
                  {t.cta.badge}
                </motion.span>
                <motion.h2
                  variants={staggerItem}
                  id="cta-heading"
                  className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight"
                >
                  {t.cta.title}
                </motion.h2>
                <motion.p
                  variants={staggerItem}
                  className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
                >
                  {t.cta.subtitle}
                </motion.p>
                <motion.div
                  variants={staggerItem}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <a
                    href={langPath('/contact')}
                    onClick={(e) => { e.preventDefault(); nav(langPath('/contact')); }}
                    className="btn-primary inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-sm font-semibold w-full sm:w-auto"
                  >
                    {t.cta.btn}
                  </a>
                  <a
                    href={langPath('/performances')}
                    onClick={(e) => { e.preventDefault(); nav(langPath('/performances')); }}
                    className="btn-ghost inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-sm font-medium w-full sm:w-auto"
                  >
                    {t.cta.secondary}
                  </a>
                </motion.div>
                <motion.p variants={staggerItem} className="text-white/30 text-xs mt-6">
                  {t.cta.disclaimer}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-16"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
        role="contentinfo"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-2">
              <a
                href={langPath('/')}
                onClick={(e) => { e.preventDefault(); nav(langPath('/')); }}
                className="flex items-center gap-3 mb-5 group"
              >
                <img
                  src="/logo-full.png"
                  alt="Summit One"
                  style={{ height: '58px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </a>
              <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
                {t.footer.tagline}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:summit.one.contact@gmail.com"
                  className="flex items-center gap-2.5 text-white/40 hover:text-[#C9A96E] text-xs transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>summit.one.contact@gmail.com</span>
                </a>
                <a
                  href="tel:+41784415420"
                  className="flex items-center gap-2.5 text-white/40 hover:text-[#C9A96E] text-xs transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>+41 78 441 54 20</span>
                </a>
                <div className="flex items-center gap-2.5 text-white/40 text-xs">
                  <span>Vaud, Suisse</span>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.1em] uppercase">
                {t.footer.links_title}
              </h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); nav(link.href); }}
                      className="text-white/45 text-sm hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.1em] uppercase">
                {t.footer.legal_title}
              </h4>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); nav(link.href); }}
                      className="text-white/45 text-sm hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn placeholder */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.1em] uppercase">
                Summit One
              </h4>
              <p className="text-white/40 text-xs leading-relaxed mb-4">
                summit-one.ch
              </p>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors duration-200 inline-flex items-center gap-2 text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Risk warning */}
          <div
            className="rounded-lg p-4 mb-10"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p className="text-white/30 text-xs leading-relaxed">
              {t.footer.risk_warning}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="section-divider mb-7" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-xs">
              {t.footer.copyright.replace('{year}', String(year))}
            </p>
            <p className="text-white/25 text-xs">
              {t.footer.built_in}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

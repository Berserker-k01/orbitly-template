import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";

export default function ReferralTeaser() {
  const { t, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);
  const [, setLocation] = useLocation();
  const r = t.referral;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="referral-teaser-heading"
      id="parrainage"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] ambient-breathe"
          style={{ background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%)", filter: "blur(50px)" }}
        />
      </div>

      <div className="container relative z-10 max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={staggerItem}
            id="referral-teaser-heading"
            className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight"
          >
            {r.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            {r.subtitle}
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={langPath("/parrainage")}
              onClick={(e) => { e.preventDefault(); setLocation(langPath("/parrainage")); }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
            >
              <span>{r.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={langPath("/contact")}
              onClick={(e) => { e.preventDefault(); setLocation(langPath("/contact")); }}
              className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
            >
              {t.nav.contact_cta}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { useLocation } from "wouter";

export default function Parrainage() {
  const { t, langPath } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const { ref: stepsRef, inView: stepsInView } = useScrollReveal(0.06);
  const { ref: descRef, inView: descInView } = useScrollReveal(0.08);
  const [, setLocation] = useLocation();
  const [openStep, setOpenStep] = useState<number | null>(0);
  const r = t.referral;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>

        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.75) 50%, rgba(6,8,17,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.07) 0%, transparent 55%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-20 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={ref}>
            <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {r.title}
              </motion.h1>
              <motion.p variants={staggerItem} className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
                {r.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Collapsible steps */}
        <section className="relative py-16 md:py-20 overflow-hidden" ref={stepsRef}>
          <div className="container relative z-10 max-w-3xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              className="flex flex-col"
            >
              {r.steps.map((step, i) => {
                const isOpen = openStep === i;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border-b"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <button
                      onClick={() => setOpenStep(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="font-data text-sm font-bold mt-0.5"
                          style={{ color: "rgba(201,169,110,0.45)" }}
                        >
                          {step.number}
                        </span>
                        <span className="text-white/85 group-hover:text-white text-base font-semibold transition-colors">
                          {step.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C9A96E]" : "text-white/35"}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/50 text-sm leading-relaxed pb-6 pl-10 pr-8">
                            {step.body.split(/(jusqu'à 50\s*%|up to 50\s*%|bis zu 50\s*%)/i).map((part, pi) =>
                              /50\s*%/i.test(part) ? (
                                <span key={pi} className="font-semibold" style={{ color: "#C9A96E" }}>{part}</span>
                              ) : (
                                <span key={pi}>{part}</span>
                              ),
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 pb-24" ref={descRef}>
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={descInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-5 mb-12"
            >
              <p className="text-white/60 text-base leading-relaxed">{r.description1}</p>
              <p className="text-white/60 text-base leading-relaxed">{r.description2}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={descInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href={langPath("/contact")}
                onClick={(e) => { e.preventDefault(); setLocation(langPath("/contact")); }}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
              >
                <span>{r.cta}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

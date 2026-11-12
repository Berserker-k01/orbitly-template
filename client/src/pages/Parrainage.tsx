import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
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
  const r = t.referral;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>

        {/* ── Hero ── */}
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
              <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)" }}
                >
                  <Gift className="w-4 h-4" style={{ color: "#C9A96E" }} />
                </div>
                <span className="badge-pill inline-flex">{r.badge}</span>
              </motion.div>
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

        {/* ── 3 Steps ── */}
        <section className="relative py-16 md:py-20 overflow-hidden" ref={stepsRef}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 right-0 w-[600px] h-[400px] ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(201,169,110,0.06) 0%, transparent 55%)", filter: "blur(60px)" }}
            />
            <div className="absolute inset-0 dot-grid opacity-15" />
          </div>
          <div className="container relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {r.steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="relative p-8 rounded-2xl"
                  style={{
                    background: i === 0
                      ? "linear-gradient(145deg, rgba(201,169,110,0.07), rgba(255,255,255,0.025))"
                      : "rgba(255,255,255,0.025)",
                    border: i === 0
                      ? "1px solid rgba(201,169,110,0.2)"
                      : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {i < r.steps.length - 1 && (
                    <ArrowRight
                      className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                      style={{ color: "rgba(201,169,110,0.3)" }}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="font-data text-3xl font-bold mb-5 tracking-tight"
                    style={{ color: "rgba(201,169,110,0.25)" }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Description + CTA ── */}
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
                href={langPath('/contact')}
                onClick={(e) => { e.preventDefault(); setLocation(langPath('/contact')); }}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
              >
                <span>{r.cta}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={descInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-14 p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-white/25 text-xs leading-relaxed">
                Le programme de parrainage est soumis à des conditions générales. Les modalités précises (taux de commission, conditions de versement, éligibilité) sont communiquées lors de l'adhésion au programme. Les performances passées ne préjugent pas des performances futures.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

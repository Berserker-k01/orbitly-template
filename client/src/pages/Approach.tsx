import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import {
  SystematicViz,
  ResearchViz,
  AlgoViz,
  RiskViz,
  ValidationViz,
} from "@/components/summit/ApproachVisuals";

type VizComponent = React.ComponentType<{ inView: boolean }>;
const SECTION_VISUALS: VizComponent[] = [
  SystematicViz,
  ResearchViz,
  AlgoViz,
  RiskViz,
  ValidationViz,
];

function ApproachSection({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const { ref, inView } = useScrollReveal(0.08);
  const Visual = SECTION_VISUALS[index];
  const textFirst = index % 2 === 0;

  return (
    <div ref={ref} className="py-16 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: textFirst ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={textFirst ? "md:order-1" : "md:order-2"}
        >
          <div className="font-data text-xs text-white/20 mb-3 tracking-widest">
            0{index + 1}
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-5">
            {title}
          </h2>
          {body.split("\n\n").map((para, i) => (
            <p key={i} className="text-white/55 text-sm md:text-base leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </motion.div>

        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: textFirst ? 20 : -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={textFirst ? "md:order-2" : "md:order-1"}
        >
          {Visual && <Visual inView={inView} />}
        </motion.div>
      </div>
    </div>
  );
}

export default function Approach() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 25%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.82) 0%, rgba(6,8,17,0.72) 50%, rgba(6,8,17,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 60%, rgba(201,169,110,0.06) 0%, transparent 55%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-25 z-1" aria-hidden="true" />

          <div className="container relative z-10" ref={ref}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.span variants={staggerItem} className="badge-pill mb-8 inline-flex">
                Summit One · Méthodologie
              </motion.span>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.approach.hero_title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed"
              >
                {t.approach.hero_subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="relative py-6 md:py-10 overflow-hidden">
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 right-0 w-[600px] h-[500px] ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(29,95,168,0.07) 0%, transparent 60%)", filter: "blur(60px)" }}
            />
            <div
              className="absolute bottom-1/3 left-0 w-[500px] h-[400px] ambient-drift"
              style={{ background: "radial-gradient(ellipse at 0% 60%, rgba(201,169,110,0.05) 0%, transparent 55%)", filter: "blur(50px)", animationDelay: "4s" }}
            />
            <div className="absolute inset-0 dot-grid opacity-15" />
          </div>

          <div className="container relative z-10">
            {t.approach.sections.map((section, i) => (
              <ApproachSection
                key={i}
                title={section.title}
                body={section.body}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── Risk note ── */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <div
              className="p-6 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-white/35 text-xs leading-relaxed">
                <span className="text-white/50 font-medium">Avertissement — </span>
                Les performances passées ne préjugent pas des performances futures. Cette page est fournie à titre informatif uniquement et ne constitue pas un conseil financier.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <Aneto />
    </div>
  );
}

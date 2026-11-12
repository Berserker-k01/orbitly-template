import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

function FAQItem({ q, a, isOpen, onClick }: {
  q: string; a: string; isOpen: boolean; onClick: () => void;
}) {
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors duration-200 group"
        aria-expanded={isOpen}
      >
        <span className="text-white/80 group-hover:text-white text-sm font-medium leading-relaxed transition-colors duration-200">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C9A96E]' : 'text-white/35'}`}
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
            <p className="text-white/50 text-sm leading-relaxed pb-5 pr-8 whitespace-pre-line">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.06);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="faq-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <span className="badge-pill mb-6 inline-flex">
              {t.faq.badge}
            </span>
            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight"
            >
              {t.faq.title}
            </h2>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3"
          >
            {t.faq.items.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";
import { Building2, Users, Briefcase } from "lucide-react";

const ENTITY_ICONS = [Building2, Users, Briefcase];

export default function EcosystemSection() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      ref={ref}
      aria-labelledby="ecosystem-heading"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      {/* Background architectural photo */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&auto=format&fit=crop&q=70"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 60%" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.90)" }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span variants={staggerItem} className="badge-pill mb-6 inline-flex">
            {t.ecosystem.badge}
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="ecosystem-heading"
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
          >
            {t.ecosystem.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {t.ecosystem.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.ecosystem.entities.map((entity, i) => {
            const Icon = ENTITY_ICONS[i % ENTITY_ICONS.length];
            const isFirst = i === 0;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative p-7 rounded-xl"
                style={{
                  background: isFirst
                    ? "linear-gradient(145deg, rgba(201,169,110,0.07), rgba(255,255,255,0.025))"
                    : "rgba(255,255,255,0.025)",
                  border: isFirst
                    ? "1px solid rgba(201,169,110,0.2)"
                    : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {isFirst && (
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)" }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: isFirst ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)",
                    border: isFirst ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon
                    className="w-4.5 h-4.5"
                    style={{ color: isFirst ? "#C9A96E" : "rgba(237,233,227,0.5)" }}
                  />
                </div>
                <div className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5" style={{ color: "#C9A96E" }}>
                  {entity.role}
                </div>
                <h3 className="text-white font-semibold text-base mb-3">
                  {entity.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {entity.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-white/25 text-xs text-center mt-8 max-w-lg mx-auto leading-relaxed"
        >
          Les entités présentées sont des organisations distinctes. Summit One Capital est un éditeur de logiciels, non un gestionnaire de fonds ou conseiller financier.
        </motion.p>
      </div>
    </section>
  );
}

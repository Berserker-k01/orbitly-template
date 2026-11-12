import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, inView } = useScrollReveal(0.08);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2
        className="text-base font-semibold text-white mb-4 pb-3 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="w-1 h-4 rounded-full inline-block"
          style={{ background: "rgba(201,169,110,0.5)" }}
        />
        {title}
      </h2>
      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-white/55 text-sm leading-relaxed space-y-3">{children}</div>
      </div>
    </motion.div>
  );
}

export default function LegalMentions() {
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
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 70%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.90) 0%, rgba(6,8,17,0.82) 50%, rgba(6,8,17,1) 100%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-15 z-1" aria-hidden="true" />
          <div className="container max-w-3xl relative z-10" ref={ref}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)" }}
                >
                  <FileText className="w-4 h-4" style={{ color: "#C9A96E" }} />
                </div>
                <span className="badge-pill inline-flex">Informations légales</span>
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight"
              >
                {t.legal.title}
              </motion.h1>
              <motion.p variants={staggerItem} className="text-white/45 text-sm max-w-lg leading-relaxed">
                Informations relatives à l'éditeur du site, aux conditions d'utilisation et au droit applicable.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Content ── */}
        <section className="relative py-12 pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 right-0 w-[400px] h-[300px] ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)", filter: "blur(50px)" }}
            />
          </div>
          <div className="container max-w-3xl relative z-10">

            <LegalSection title="Éditeur">
              <p><strong className="text-white/70">Dénomination sociale :</strong> Summit One</p>
              <p><strong className="text-white/70">Forme juridique :</strong> Entreprise individuelle (EI)</p>
              <p><strong className="text-white/70">Fondateur :</strong> Mathéo Poque</p>
              <p><strong className="text-white/70">Localisation :</strong> Suisse</p>
              <p><strong className="text-white/70">Téléphone :</strong> +41 78 441 54 20</p>
              <p><strong className="text-white/70">E-mail :</strong> summit.one.contact@gmail.com</p>
              <p><strong className="text-white/70">Site web :</strong> summit-one.ch</p>
              <p className="text-white/35 text-xs mt-4">
                Note : Les informations d'immatriculation, de numéro de TVA et les autorisations réglementaires ne sont pas encore publiées. Cette section sera complétée lors de leur communication officielle.
              </p>
            </LegalSection>

            <LegalSection title="Activité">
              <p>Summit One est un éditeur de solutions logicielles financières. Son activité consiste dans le développement, la maintenance et l'exploitation de stratégies de trading algorithmique.</p>
              <p>Summit One n'exerce pas d'activité de gestion de fonds, de conseil financier agréé, ni de prestation de services d'investissement au sens réglementaire du terme, à moins d'en avoir reçu l'autorisation des autorités compétentes.</p>
              <p className="text-white/35 text-xs">La nature précise de l'activité réglementée exercée et les autorisations détenues seront précisées dès leur confirmation officielle.</p>
            </LegalSection>

            <LegalSection title="Responsabilité">
              <p>Les informations publiées sur ce site sont fournies à titre indicatif et ne constituent pas un conseil financier, une recommandation d'investissement ou une offre de services financiers.</p>
              <p>Summit One ne peut être tenu responsable des décisions prises sur la base des informations contenues sur ce site. Les performances passées ne préjugent pas des performances futures.</p>
            </LegalSection>

            <LegalSection title="Propriété intellectuelle">
              <p>L'ensemble du contenu de ce site (textes, graphiques, logo, structure) est la propriété de Summit One ou de ses concédants de licences.</p>
              <p>Toute reproduction, représentation, modification ou diffusion, totale ou partielle, est interdite sans l'autorisation écrite préalable de Summit One.</p>
            </LegalSection>

            <LegalSection title="Droit applicable">
              <p>Le présent site et les présentes mentions légales sont soumis au droit suisse.</p>
              <p>Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux de Vaud, Suisse.</p>
            </LegalSection>

            <div className="text-white/20 text-xs mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p>Dernière mise à jour : novembre 2026. Ces mentions légales sont susceptibles d'être modifiées à tout moment.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

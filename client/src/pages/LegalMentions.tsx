import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function LegalMentions() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.05);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16">
          <div className="container max-w-3xl" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-pill mb-8 inline-flex">Informations légales</span>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
                {t.legal.title}
              </h1>
              <div className="section-divider mb-12" />

              <Section title="Éditeur">
                <p><strong className="text-white/70">Dénomination sociale :</strong> Summit One Capital</p>
                <p><strong className="text-white/70">Forme juridique :</strong> Entreprise individuelle (EI)</p>
                <p><strong className="text-white/70">Fondateur :</strong> Mathéo Poque</p>
                <p><strong className="text-white/70">Adresse :</strong> Route de Châtel 23, 1803 Chardonne, Suisse</p>
                <p><strong className="text-white/70">Téléphone :</strong> +41 78 441 54 20</p>
                <p><strong className="text-white/70">E-mail :</strong> summit.one.contact@gmail.com</p>
                <p><strong className="text-white/70">Site web :</strong> summit-one.ch</p>
                <p className="text-white/40 text-xs mt-4">
                  Note : Les informations d'immatriculation, de numéro de TVA et les autorisations réglementaires ne sont pas encore publiées. Cette section sera complétée lors de leur communication officielle.
                </p>
              </Section>

              <Section title="Activité">
                <p>Summit One Capital est un éditeur de solutions logicielles financières. Son activité consiste dans le développement, la maintenance et l'exploitation de stratégies de trading algorithmique.</p>
                <p>Summit One Capital n'exerce pas d'activité de gestion de fonds, de conseil financier agréé, ni de prestation de services d'investissement au sens réglementaire du terme, à moins d'en avoir reçu l'autorisation des autorités compétentes.</p>
                <p className="text-white/40 text-xs">La nature précise de l'activité réglementée exercée et les autorisations détenues seront précisées dès leur confirmation officielle.</p>
              </Section>

              <Section title="Responsabilité">
                <p>Les informations publiées sur ce site sont fournies à titre indicatif et ne constituent pas un conseil financier, une recommandation d'investissement ou une offre de services financiers.</p>
                <p>Summit One Capital ne peut être tenu responsable des décisions prises sur la base des informations contenues sur ce site. Les performances passées ne préjugent pas des performances futures.</p>
              </Section>

              <Section title="Propriété intellectuelle">
                <p>L'ensemble du contenu de ce site (textes, graphiques, logo, structure) est la propriété de Summit One Capital ou de ses concédants de licences.</p>
                <p>Toute reproduction, représentation, modification ou diffusion, totale ou partielle, est interdite sans l'autorisation écrite préalable de Summit One Capital.</p>
              </Section>

              <Section title="Droit applicable">
                <p>Le présent site et les présentes mentions légales sont soumis au droit suisse.</p>
                <p>Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux de Vaud, Suisse.</p>
              </Section>

              <div className="text-white/25 text-xs mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p>Dernière mise à jour : novembre 2026. Ces mentions légales sont susceptibles d'être modifiées à tout moment.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

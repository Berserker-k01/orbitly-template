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

export default function Privacy() {
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
              <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
                {t.legal.privacy_title}
              </h1>
              <div className="section-divider mb-12" />

              <Section title="Responsable du traitement">
                <p>Summit One — Route de Châtel 23, 1803 Chardonne, Suisse</p>
                <p>Contact : summit.one.contact@gmail.com</p>
              </Section>

              <Section title="Données collectées">
                <p>Nous collectons uniquement les données que vous nous transmettez directement via le formulaire de contact :</p>
                <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone (optionnel)</li>
                  <li>Pays (optionnel)</li>
                  <li>Nature de la demande et message</li>
                </ul>
              </Section>

              <Section title="Finalités du traitement">
                <p>Les données collectées sont utilisées exclusivement pour :</p>
                <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
                  <li>Répondre à votre demande de contact</li>
                  <li>Organiser un rendez-vous si vous en faites la demande</li>
                  <li>Vous transmettre des informations sur notre activité si vous y avez consenti</li>
                </ul>
              </Section>

              <Section title="Base légale">
                <p>Le traitement est fondé sur votre consentement explicite, recueilli lors de la soumission du formulaire de contact. Vous pouvez retirer ce consentement à tout moment en nous contactant.</p>
              </Section>

              <Section title="Conservation des données">
                <p>Vos données sont conservées pendant la durée nécessaire au traitement de votre demande et au maximum trois (3) ans à compter de notre dernier échange, sauf obligation légale contraire.</p>
              </Section>

              <Section title="Destinataires">
                <p>Vos données ne sont pas cédées, vendues ou louées à des tiers. Elles peuvent être transmises à des prestataires techniques (hébergement, messagerie) dans le strict cadre de leur mission et sous garanties contractuelles adéquates.</p>
              </Section>

              <Section title="Vos droits">
                <p>Conformément à la loi fédérale suisse sur la protection des données (LPD) et, le cas échéant, au RGPD européen, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit d'opposition</li>
                  <li>Droit à la portabilité</li>
                </ul>
                <p className="mt-2">Pour exercer ces droits, contactez-nous à : summit.one.contact@gmail.com</p>
              </Section>

              <Section title="Cookies">
                <p>Ce site peut utiliser des cookies techniques indispensables à son fonctionnement. Aucun cookie de tracking publicitaire n'est utilisé sans votre consentement explicite.</p>
              </Section>

              <Section title="Sécurité">
                <p>Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.</p>
              </Section>

              <div className="text-white/25 text-xs mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p>Dernière mise à jour : novembre 2026. Cette politique est susceptible d'évoluer. Toute modification substantielle vous sera communiquée.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

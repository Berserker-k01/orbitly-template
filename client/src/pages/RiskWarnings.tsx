import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
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

export default function RiskWarnings() {
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
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="w-5 h-5" style={{ color: "#C9A96E" }} />
                <span className="badge-pill inline-flex">Avertissements réglementaires</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
                {t.legal.risk_title}
              </h1>

              {/* Main warning box */}
              <div
                className="p-6 rounded-xl mb-12"
                style={{
                  background: "rgba(201,169,110,0.05)",
                  border: "1px solid rgba(201,169,110,0.25)",
                }}
              >
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  AVERTISSEMENT IMPORTANT — Les performances passées ne préjugent pas des performances futures et ne constituent pas un indicateur fiable des résultats futurs. Le trading sur le marché des changes (Forex) avec effet de levier implique un risque élevé de perte. Vous pourriez perdre tout ou partie du capital que vous investissez.
                </p>
              </div>

              <div className="section-divider mb-12" />

              <Section title="Risques du marché des changes (Forex)">
                <p>Le marché des changes est l'un des marchés les plus liquides au monde, mais il est également soumis à des fluctuations significatives pouvant survenir rapidement et de manière imprévisible.</p>
                <p>Les facteurs pouvant influencer les cours incluent notamment : les événements macroéconomiques, les décisions de politique monétaire, les événements géopolitiques, les publications économiques et les comportements des participants de marché.</p>
              </Section>

              <Section title="Risques liés à l'effet de levier">
                <p>Le trading Forex utilise généralement un effet de levier, qui permet d'amplifier les positions par rapport au capital initial. Si l'effet de levier peut amplifier les gains potentiels, il amplifie également les pertes.</p>
                <p>Une variation défavorable du marché peut entraîner des pertes supérieures au dépôt initial. Dans certaines conditions de marché, les pertes peuvent dépasser les fonds engagés.</p>
              </Section>

              <Section title="Risques des systèmes automatisés">
                <p>Les systèmes de trading algorithmique présentent des risques spécifiques, notamment :</p>
                <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
                  <li>Les défaillances techniques (pannes, problèmes de connectivité, erreurs logicielles)</li>
                  <li>Les conditions de marché inhabituelles ou extrêmes auxquelles le système n'a pas été exposé</li>
                  <li>La dégradation des performances liée à des changements de régime de marché</li>
                  <li>Les décalages entre les résultats de backtesting et les performances en conditions réelles</li>
                </ul>
              </Section>

              <Section title="Risques liés au backtesting">
                <p>Les résultats de backtesting présentés sont calculés sur des données historiques. Ces résultats ne garantissent en aucun cas des performances futures comparables.</p>
                <p>Le backtesting présente des limites inhérentes, notamment le risque de sur-optimisation (overfitting) et l'impossibilité de reproduire exactement les conditions d'exécution réelles.</p>
              </Section>

              <Section title="Absence de garantie">
                <p>Aucune performance future n'est garantie. Les indicateurs communiqués par Summit One Capital sont déclarés sur la base d'un track record passé et sont soumis à validation documentaire indépendante.</p>
                <p>Ces informations ne constituent pas une garantie, une promesse ou une projection de résultats futurs.</p>
              </Section>

              <Section title="Information réglementaire">
                <p>Summit One Capital se présente comme un éditeur de solutions logicielles financières. Les informations présentées sur ce site ne constituent pas un conseil financier, une recommandation d'investissement ou une offre de services d'investissement réglementés.</p>
                <p className="text-white/40 text-xs mt-2">La nature précise de l'activité réglementée éventuellement exercée par Summit One Capital et les autorisations détenues seront précisées dès leur confirmation officielle. Toute décision d'investissement doit être prise après consultation d'un conseiller financier indépendant dûment agréé.</p>
              </Section>

              <Section title="Pays d'accès">
                <p>Les informations contenues sur ce site s'adressent à des professionnels ou à des personnes suffisamment informées pour en comprendre les enjeux et les risques.</p>
                <p>L'accès à ce site et à ses informations peut être restreint dans certains pays. Il est de la responsabilité des visiteurs de s'assurer que leur accès est légalement autorisé dans leur pays de résidence.</p>
              </Section>

              <div className="text-white/25 text-xs mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p>Ces avertissements sont fournis à titre informatif et ne sauraient être exhaustifs. La formulation définitive devra être validée par un professionnel juridique compétent avant toute publication officielle. Dernière mise à jour : novembre 2026.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

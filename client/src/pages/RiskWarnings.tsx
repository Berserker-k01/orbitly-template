import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, TrendingDown, Cpu, FlaskConical,
  Shield, Globe, BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

const SECTIONS = [
  { id: "positionnement", label: "Notre rôle",           Icon: Shield },
  { id: "marche",         label: "Risques Forex",        Icon: TrendingDown },
  { id: "levier",         label: "Effet de levier",      Icon: AlertTriangle },
  { id: "auto",           label: "Systèmes automatisés", Icon: Cpu },
  { id: "backtest",       label: "Backtesting",          Icon: FlaskConical },
  { id: "garantie",       label: "Absence de garantie",  Icon: Shield },
  { id: "reglementaire",  label: "Réglementation",       Icon: Globe },
  { id: "acces",          label: "Accès",                Icon: BookOpen },
];

function RiskSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  Icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="mb-12 scroll-mt-32"
    >
      <h2
        className="font-display text-2xl md:text-3xl font-medium text-white mb-5 pb-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3 pl-0 md:pl-1">{children}</div>
    </motion.div>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "linear-gradient(to right, #C9A96E, #E8D5A8)" }}
      />
    </div>
  );
}

function TOC({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-28 hidden lg:block" aria-label="Table des matières">
      <div className="text-[9px] text-white/25 tracking-[0.15em] uppercase mb-4 font-medium">
        Sommaire
      </div>
      <div className="flex flex-col gap-1">
        {SECTIONS.map(({ id, label, Icon }) => {
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-all duration-200 group"
              style={{
                background: isActive ? "rgba(201,169,110,0.08)" : "transparent",
                borderLeft: isActive ? "2px solid rgba(201,169,110,0.5)" : "2px solid transparent",
              }}
            >
              <Icon
                className="w-3 h-3 flex-shrink-0 transition-colors duration-200"
                style={{ color: isActive ? "#C9A96E" : "rgba(237,233,227,0.25)" }}
              />
              <span
                className="text-xs transition-colors duration-200"
                style={{ color: isActive ? "#C9A96E" : "rgba(237,233,227,0.35)" }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function RiskWarnings() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const [activeId, setActiveId] = useState("positionnement");

  // Intersection observer for TOC
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <ReadingProgress />
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 60%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.88) 0%, rgba(6,8,17,0.80) 50%, rgba(6,8,17,1) 100%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-15 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={ref}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.legal.risk_title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed"
              >
                Informations importantes sur les risques associés au trading algorithmique sur le marché des changes.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Main warning box ── */}
        <section className="py-8">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-5 px-1"
              style={{ borderTop: "1px solid rgba(201,169,110,0.35)", borderBottom: "1px solid rgba(201,169,110,0.35)" }}
            >
              <p className="text-white/65 text-sm leading-relaxed">
                <span className="text-[#C9A96E] font-medium">Avertissement — </span>
                Les performances passées ne préjugent pas des performances futures. Le trading Forex avec effet de levier implique un risque élevé de perte. Vous pourriez perdre tout ou partie du capital investi.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 2-col layout: TOC + content ── */}
        <section className="py-10 pb-24">
          <div className="container max-w-4xl">
            <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start">
              <TOC activeId={activeId} />

              <div>
                <RiskSection id="positionnement" title="Ce que Summit One fait — et ce qu'il ne fait pas">
                  <p>
                    Avant d'aborder les risques de marché, il est utile de rappeler le périmètre exact de Summit One.
                    Il s'agit d'un logiciel informatique algorithmique de trading : des règles mathématiques programmées,
                    exécutées automatiquement. Vos fonds restent sur un compte ouvert à votre nom auprès d'un courtier partenaire.
                  </p>
                  <p>En pratique, cela signifie aussi ce que Summit One n'est pas :</p>
                  <ul className="list-none space-y-2.5 mt-2">
                    {[
                      "Ni une banque, ni un courtier — vous ouvrez et gérez votre propre compte chez un partenaire.",
                      "Ni un gestionnaire d'actifs — nous n'avons pas d'accès direct à votre argent.",
                      "Ni un trading manuel — l'exécution suit des règles définies à l'avance, pas le jugement d'un opérateur.",
                      "Ni un conseil financier personnalisé — aucune recommandation d'investissement individuelle.",
                      "Ni une promesse de gain — les performances passées n'annoncent pas l'avenir.",
                      "Ni un simple service de signaux — les ordres sont répliqués automatiquement, pas seulement envoyés.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-white/25 mt-0.5 select-none">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/40 text-xs mt-4 leading-relaxed">
                    Notre approche repose sur la programmation, la rigueur mathématique et la discipline quantitative —
                    pas sur une promesse technologique miraculeuse. Cette distinction n'élimine pas le risque de perte ;
                    elle précise qui détient les fonds, qui exécute les ordres, et ce que Summit One ne peut vous garantir.
                  </p>
                </RiskSection>

                <RiskSection id="marche" title="Risques du marché des changes (Forex)">
                  <p>Le marché des changes est l'un des marchés les plus liquides au monde, mais il est également soumis à des fluctuations significatives pouvant survenir rapidement et de manière imprévisible.</p>
                  <p>Les facteurs pouvant influencer les cours incluent notamment : les événements macroéconomiques, les décisions de politique monétaire, les événements géopolitiques, les publications économiques et les comportements des participants de marché.</p>
                </RiskSection>

                <RiskSection id="levier" title="Risques liés à l'effet de levier">
                  <p>Le trading Forex utilise généralement un effet de levier, qui permet d'amplifier les positions par rapport au capital initial. Si l'effet de levier peut amplifier les gains potentiels, il amplifie également les pertes.</p>
                  <p>Une variation défavorable du marché peut entraîner des pertes supérieures au dépôt initial. Dans certaines conditions de marché, les pertes peuvent dépasser les fonds engagés.</p>
                </RiskSection>

                <RiskSection id="auto" title="Risques des systèmes automatisés">
                  <p>Les systèmes de trading algorithmique présentent des risques spécifiques, notamment :</p>
                  <ul className="list-none space-y-2 mt-2">
                    {[
                      "Défaillances techniques (pannes, problèmes de connectivité, erreurs logicielles)",
                      "Conditions de marché inhabituelles ou extrêmes auxquelles le système n'a pas été exposé",
                      "Dégradation des performances liée à des changements de régime de marché",
                      "Décalages entre résultats de backtesting et performances en conditions réelles",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-white/25 mt-0.5 select-none">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </RiskSection>

                <RiskSection id="backtest" title="Risques liés au backtesting">
                  <p>Les résultats de backtesting présentés sont calculés sur des données historiques. Ces résultats ne garantissent en aucun cas des performances futures comparables.</p>
                  <p>Le backtesting présente des limites inhérentes, notamment le risque de sur-optimisation (overfitting) et l'impossibilité de reproduire exactement les conditions d'exécution réelles.</p>
                </RiskSection>

                <RiskSection id="garantie" title="Absence de garantie">
                  <p>Aucune performance future n'est garantie. Les indicateurs communiqués par Summit One reposent sur un track record passé et restent soumis à validation.</p>
                  <p>Ces informations ne constituent pas une garantie, une promesse ou une projection de résultats futurs.</p>
                </RiskSection>

                <RiskSection id="reglementaire" title="Information réglementaire">
                  <p>Summit One se présente comme un éditeur de solutions logicielles financières. Les informations présentées sur ce site ne constituent pas un conseil financier, une recommandation d'investissement ou une offre de services d'investissement réglementés.</p>
                  <p className="text-white/35 text-xs mt-2">La nature précise de l'activité réglementée éventuellement exercée par Summit One et les autorisations détenues seront précisées dès leur confirmation officielle. Toute décision d'investissement doit être prise après avoir pris connaissance des risques.</p>
                </RiskSection>

                <RiskSection id="acces" title="Pays d'accès">
                  <p>Les informations contenues sur ce site s'adressent à des professionnels ou à des personnes suffisamment informées pour en comprendre les enjeux et les risques.</p>
                  <p>L'accès à ce site et à ses informations peut être restreint dans certains pays. Il est de la responsabilité des visiteurs de s'assurer que leur accès est légalement autorisé dans leur pays de résidence.</p>
                </RiskSection>

                <div className="text-white/25 text-xs mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p>Ces avertissements sont fournis à titre informatif et ne sauraient être exhaustifs. La formulation définitive devra être validée par un professionnel juridique compétent avant toute publication officielle. Dernière mise à jour : novembre 2026.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

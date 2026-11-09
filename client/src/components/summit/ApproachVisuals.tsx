import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";

// ── 1. Systématique vs Discrétionnaire ────────────────────────────────────
export function SystematicViz({ inView }: { inView: boolean }) {
  const cols = [
    {
      label: "Discrétionnaire",
      color: "#C0665A",
      border: "rgba(192,102,90,0.22)",
      bg: "rgba(192,102,90,0.05)",
      items: ["Biais émotionnel", "Incohérence", "Non reproductible", "Subjectif"],
    },
    {
      label: "Systématique",
      color: "#5BAF8A",
      border: "rgba(91,175,138,0.25)",
      bg: "rgba(91,175,138,0.05)",
      items: ["Règles strictes", "Cohérence totale", "Reproductible", "Objectif"],
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {cols.map((col, ci) => (
        <div key={ci} className="rounded-xl p-5" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
          <div className="text-xs font-semibold tracking-wide mb-4" style={{ color: col.color }}>
            {col.label}
          </div>
          <div className="flex flex-col gap-2.5">
            {col.items.map((item, ii) => (
              <motion.div
                key={ii}
                initial={{ opacity: 0, x: ci === 0 ? -8 : 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 + ii * 0.07 + ci * 0.04 }}
                className="flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.color }} />
                <span className="text-white/55 text-xs leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="col-span-2 text-center pt-1"
      >
        <span className="text-[9px] text-white/20 tracking-widest uppercase">
          Avantage structurel du trading systématique
        </span>
      </motion.div>
    </div>
  );
}

// ── 2. Recherche quantitative — scatter plot animé ─────────────────────────
const DOTS = Array.from({ length: 26 }, (_, i) => ({
  x: 10 + ((i * 17 + 11) % 175),
  y: 95 - (Math.sin(i * 0.78 + 1) * 0.5 + 0.5) * 68 - ((i * 7 + 3) % 22),
  pos: (i * 3 + 1) % 4 !== 0,
}));

export function ResearchViz({ inView }: { inView: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-white/25 tracking-[0.15em] uppercase font-medium">
          EUR/USD · Patterns statistiques · Illustration
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5BAF8A" }} />
          <span className="text-[9px] text-white/25">Haussier</span>
          <div className="w-1.5 h-1.5 rounded-full ml-1" style={{ background: "#C0665A" }} />
          <span className="text-[9px] text-white/25">Baissier</span>
        </div>
      </div>
      <svg viewBox="0 0 200 110" width="100%" style={{ height: "170px", display: "block" }}>
        {[25, 50, 75, 100].map(y => (
          <line key={y} x1="5" y1={y} x2="195" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        {[50, 100, 150].map(x => (
          <line key={x} x1={x} y1="5" x2={x} y2="105" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        <motion.path
          d="M 10 90 C 60 68 130 42 192 18"
          fill="none"
          stroke="rgba(201,169,110,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
        />
        {DOTS.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="2.5"
            fill={d.pos ? "rgba(91,175,138,0.65)" : "rgba(192,102,90,0.6)"}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.04 * i + 0.15, duration: 0.25 }}
          />
        ))}
        <motion.ellipse
          cx="158" cy="28" rx="22" ry="17"
          fill="rgba(201,169,110,0.07)"
          stroke="rgba(201,169,110,0.4)"
          strokeWidth="1"
          strokeDasharray="4 2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        />
        <motion.text
          x="158" y="49"
          textAnchor="middle"
          fill="rgba(201,169,110,0.55)"
          fontSize="5"
          fontFamily="Space Mono, monospace"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.7 }}
        >
          pattern
        </motion.text>
      </svg>
    </div>
  );
}

// ── 3. Discipline algorithmique — flux animé ───────────────────────────────
const FLOW_STEPS = [
  { label: "Signal détecté", sub: "Conditions d'entrée validées", color: "#3A80CC", border: "rgba(58,128,204,0.25)", bg: "rgba(58,128,204,0.07)" },
  { label: "Paramètres vérifiés", sub: "Stop-loss, taille, exposition", color: "#C9A96E", border: "rgba(201,169,110,0.25)", bg: "rgba(201,169,110,0.07)" },
  { label: "Exécution automatique", sub: "Ordre envoyé sans intervention", color: "#5BAF8A", border: "rgba(91,175,138,0.25)", bg: "rgba(91,175,138,0.07)" },
];

export function AlgoViz({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      {FLOW_STEPS.map((step, i) => (
        <div key={i}>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.5 }}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: step.bg, border: `1px solid ${step.border}`, borderLeft: `2px solid ${step.color}` }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-data text-xs font-bold"
              style={{ background: `${step.color}20`, color: step.color }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white/85 text-sm font-semibold mb-0.5">{step.label}</div>
              <div className="text-white/35 text-xs">{step.sub}</div>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: step.color }}
              animate={inView ? { boxShadow: [`0 0 0px ${step.color}`, `0 0 8px ${step.color}80`, `0 0 0px ${step.color}`] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
          {i < FLOW_STEPS.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.25 }}
              className="mx-auto w-px h-2.5 origin-top"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }}
            />
          )}
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="text-center mt-1"
      >
        <span className="text-[9px] text-white/20 tracking-widest uppercase">
          Zéro intervention humaine pendant l'exécution
        </span>
      </motion.div>
    </div>
  );
}

// ── 4. Gestion du risque — courbe de capital 2025 ─────────────────────────
const RISK_DATA = [
  { m: "J",  v: 5.24,  peak: 5.24  },
  { m: "F",  v: 9.28,  peak: 9.28  },
  { m: "M",  v: 12.09, peak: 12.09 },
  { m: "A",  v: 12.25, peak: 12.25 },
  { m: "M2", v: 14.76, peak: 14.76 },
  { m: "J2", v: 15.45, peak: 15.45 },
  { m: "J3", v: 18.61, peak: 18.61 },
  { m: "A2", v: 19.95, peak: 19.95 },
  { m: "S",  v: 23.64, peak: 23.64 },
  { m: "O",  v: 33.85, peak: 33.85 },
  { m: "N",  v: 33.20, peak: 33.85 },
  { m: "D",  v: 33.28, peak: 33.85 },
];

const MONTHS_SHORT = ["J","F","M","A","M","J","J","A","S","O","N","D"];

const RISK_DATA_DISPLAY = RISK_DATA.map((d, i) => ({ ...d, m: MONTHS_SHORT[i] }));

export function RiskViz({ inView }: { inView: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-white/25 tracking-[0.15em] uppercase font-medium">
          Évolution du capital — 2025 · Données déclarées
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5BAF8A" }} />
          <span className="font-data text-[9px]" style={{ color: "#5BAF8A" }}>+33,28 %</span>
        </div>
      </div>
      <div style={{ height: "150px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={RISK_DATA_DISPLAY} margin={{ top: 5, right: 5, bottom: 0, left: -22 }}>
            <defs>
              <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5BAF8A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5BAF8A" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="m" tick={{ fill: "rgba(237,233,227,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(237,233,227,0.2)", fontSize: 8 }} axisLine={false} tickLine={false} domain={[0, 36]} />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#5BAF8A"
              strokeWidth={1.5}
              fill="url(#capitalGrad)"
              isAnimationActive={inView}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C0665A" }} />
          <span className="text-[9px] text-white/35">Drawdown max</span>
          <span className="font-data text-[9px]" style={{ color: "#C0665A" }}>−0,65 %</span>
        </div>
        <div className="ml-auto text-[9px] text-white/20">Données déclarées 2025</div>
      </div>
    </div>
  );
}

// ── 5. Processus de validation — in/out-of-sample ─────────────────────────
export function ValidationViz({ inView }: { inView: boolean }) {
  const criteria = [
    "Significativité statistique",
    "Robustesse hors-échantillon",
    "Résistance aux stress tests",
  ];
  return (
    <div className="rounded-xl overflow-hidden p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="text-[9px] text-white/25 tracking-[0.15em] uppercase mb-5">
        Schéma de validation · Illustration
      </div>
      <div className="flex gap-1 mb-6 h-7">
        {[
          { label: "Développement", flex: 3, color: "#3A80CC", border: "rgba(58,128,204,0.3)", bg: "rgba(29,95,168,0.12)" },
          { label: "Validation", flex: 2, color: "#C9A96E", border: "rgba(201,169,110,0.3)", bg: "rgba(201,169,110,0.1)" },
          { label: "Live", flex: 1, color: "#5BAF8A", border: "rgba(91,175,138,0.3)", bg: "rgba(91,175,138,0.12)" },
        ].map((seg, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.3, ease: "easeOut" }}
            className="flex items-center justify-center rounded-lg origin-left"
            style={{ flex: seg.flex, background: seg.bg, border: `1px solid ${seg.border}` }}
          >
            <span className="text-[8px] font-semibold tracking-wider" style={{ color: seg.color }}>
              {seg.label.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-0">
        {criteria.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-bold"
              style={{ background: "rgba(91,175,138,0.12)", color: "#5BAF8A", border: "1px solid rgba(91,175,138,0.3)" }}
            >
              ✓
            </div>
            <span className="text-white/50 text-xs">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

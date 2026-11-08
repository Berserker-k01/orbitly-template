import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { id: 1, label: "Données\nmarché",      color: "#3A80CC" },
  { id: 2, label: "Analyse\nstatistique", color: "#5BAF8A" },
  { id: 3, label: "Patterns\nidentifiés", color: "#C9A96E" },
  { id: 4, label: "Signaux\ngénérés",     color: "#C9A96E" },
  { id: 5, label: "Exécution\nauto",      color: "#5BAF8A" },
  { id: 6, label: "Monitoring\nrisque",   color: "#3A80CC" },
];

const NODES = [
  { x: 75,  y: 100 },
  { x: 225, y: 100 },
  { x: 375, y: 100 },
  { x: 525, y: 100 },
  { x: 675, y: 100 },
  { x: 825, y: 100 },
];

function FlowDot({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.circle
      r={3}
      fill="#C9A96E"
      opacity={0.8}
      initial={{ offsetDistance: "0%" } as any}
      animate={{ offsetDistance: "100%" } as any}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      style={{
        offsetPath: `path("M ${x1} ${y1} L ${x2} ${y2}")`,
        offsetRotate: "0deg",
      } as React.CSSProperties}
    />
  );
}

export default function AlgoFlowViz() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="rounded-2xl overflow-hidden px-6 py-8"
      style={{
        background: "linear-gradient(145deg, rgba(29,95,168,0.06), rgba(201,169,110,0.04))",
        border: "1px solid rgba(201,169,110,0.15)",
      }}
    >
      <div className="mb-6">
        <span className="badge-pill inline-flex mb-3">Processus algorithmique</span>
        <h3 className="text-white font-semibold text-lg">De la donnée au signal</h3>
        <p className="text-white/40 text-sm mt-1">Flux de traitement automatisé — 6 étapes clés</p>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 900 200"
          className="w-full"
          style={{ minWidth: "480px" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {NODES.slice(0, -1).map((n, i) => (
            <g key={`conn-${i}`}>
              <line
                x1={n.x + 32} y1={n.y}
                x2={NODES[i + 1].x - 32} y2={NODES[i + 1].y}
                stroke="rgba(201,169,110,0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {inView && (
                <FlowDot
                  x1={n.x + 32} y1={n.y}
                  x2={NODES[i + 1].x - 32} y2={NODES[i + 1].y}
                  delay={i * 0.4 + 0.8}
                />
              )}
            </g>
          ))}

          {NODES.map((n, i) => (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <motion.circle
                cx={n.x} cy={n.y} r={34}
                fill="none"
                stroke={STEPS[i].color}
                strokeWidth="0.6"
                opacity={0.2}
                animate={{ r: [32, 40, 32], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, delay: i * 0.4 + 1.2, repeat: Infinity, ease: "easeOut" }}
              />
              <circle
                cx={n.x} cy={n.y} r={28}
                fill="rgba(10,14,26,0.9)"
                stroke={STEPS[i].color}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={n.x} y={n.y - 8}
                textAnchor="middle"
                fill={STEPS[i].color}
                fontSize="11"
                fontFamily="'Space Mono', monospace"
                fontWeight="700"
                opacity="0.9"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              {STEPS[i].label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={n.x}
                  y={n.y + 6 + li * 12}
                  textAnchor="middle"
                  fill="rgba(237,233,227,0.65)"
                  fontSize="8.5"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {line}
                </text>
              ))}
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="font-data text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: step.color }}>
              {String(step.id).padStart(2, "0")}
            </span>
            <span className="text-white/55 text-xs leading-relaxed">
              {step.label.replace("\n", " ")}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

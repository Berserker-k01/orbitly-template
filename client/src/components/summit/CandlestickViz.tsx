import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Illustrative EUR/USD candlestick data — clearly labeled as illustration
const CANDLES = [
  { o: 1.0821, h: 1.0845, l: 1.0812, c: 1.0838 },
  { o: 1.0838, h: 1.0851, l: 1.0820, c: 1.0825 },
  { o: 1.0825, h: 1.0832, l: 1.0810, c: 1.0829 },
  { o: 1.0829, h: 1.0848, l: 1.0820, c: 1.0845 },
  { o: 1.0845, h: 1.0862, l: 1.0838, c: 1.0855 }, // signal
  { o: 1.0855, h: 1.0870, l: 1.0840, c: 1.0848 },
  { o: 1.0848, h: 1.0858, l: 1.0828, c: 1.0835 },
  { o: 1.0835, h: 1.0848, l: 1.0822, c: 1.0843 },
  { o: 1.0843, h: 1.0862, l: 1.0836, c: 1.0858 },
  { o: 1.0858, h: 1.0875, l: 1.0850, c: 1.0868 }, // signal
  { o: 1.0868, h: 1.0880, l: 1.0858, c: 1.0863 },
  { o: 1.0863, h: 1.0872, l: 1.0842, c: 1.0848 },
  { o: 1.0848, h: 1.0858, l: 1.0828, c: 1.0836 },
  { o: 1.0836, h: 1.0848, l: 1.0825, c: 1.0842 },
  { o: 1.0842, h: 1.0860, l: 1.0834, c: 1.0856 },
  { o: 1.0856, h: 1.0872, l: 1.0848, c: 1.0865 }, // signal
  { o: 1.0865, h: 1.0878, l: 1.0856, c: 1.0860 },
  { o: 1.0860, h: 1.0868, l: 1.0840, c: 1.0846 },
  { o: 1.0846, h: 1.0864, l: 1.0838, c: 1.0860 },
  { o: 1.0860, h: 1.0882, l: 1.0855, c: 1.0876 },
];

const SIGNAL_INDICES = new Set([4, 9, 15]);

const W = 360;
const H = 160;
const PAD_LEFT = 8;
const PAD_RIGHT = 44;
const PAD_TOP = 10;
const PAD_BOTTOM = 20;
const CHART_W = W - PAD_LEFT - PAD_RIGHT;
const CHART_H = H - PAD_TOP - PAD_BOTTOM;

const allPrices = CANDLES.flatMap(c => [c.h, c.l]);
const MIN_P = Math.min(...allPrices) - 0.0003;
const MAX_P = Math.max(...allPrices) + 0.0003;
const RANGE_P = MAX_P - MIN_P;

function py(price: number) {
  return PAD_TOP + CHART_H - ((price - MIN_P) / RANGE_P) * CHART_H;
}

const CANDLE_SLOT = CHART_W / CANDLES.length;
const BODY_W = Math.max(4, CANDLE_SLOT * 0.55);

function CandleShape({ c, i, inView }: { c: typeof CANDLES[0]; i: number; inView: boolean }) {
  const bull = c.c >= c.o;
  const color = bull ? "#5BAF8A" : "#C0665A";
  const bodyTop = py(Math.max(c.o, c.c));
  const bodyBot = py(Math.min(c.o, c.c));
  const bodyH = Math.max(1.5, bodyBot - bodyTop);
  const cx = PAD_LEFT + i * CANDLE_SLOT + CANDLE_SLOT / 2;
  const isSignal = SIGNAL_INDICES.has(i);

  return (
    <motion.g
      initial={{ opacity: 0, scaleY: 0 }}
      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
      transition={{ delay: 0.03 * i, duration: 0.3, ease: "easeOut" }}
      style={{ transformOrigin: `${cx}px ${py((c.o + c.c) / 2)}px` }}
    >
      {/* Wick */}
      <line
        x1={cx} y1={py(c.h)}
        x2={cx} y2={py(c.l)}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      {/* Body */}
      <rect
        x={cx - BODY_W / 2}
        y={bodyTop}
        width={BODY_W}
        height={bodyH}
        fill={bull ? `${color}80` : color}
        stroke={color}
        strokeWidth="0.8"
        rx="0.5"
      />
      {/* Signal marker */}
      {isSignal && (
        <>
          <motion.polygon
            points={`${cx},${py(c.l) + 12} ${cx - 4},${py(c.l) + 20} ${cx + 4},${py(c.l) + 20}`}
            fill="#C9A96E"
            fillOpacity="0.9"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.03 }}
          />
          <motion.text
            x={cx}
            y={py(c.l) + 28}
            textAnchor="middle"
            fill="rgba(201,169,110,0.7)"
            fontSize="4"
            fontFamily="Space Mono, monospace"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 + i * 0.03 }}
          >
            BUY
          </motion.text>
        </>
      )}
    </motion.g>
  );
}

export default function CandlestickViz() {
  const { ref, inView } = useScrollReveal(0.08);

  // Price levels for y-axis
  const priceLevels = Array.from({ length: 4 }, (_, i) =>
    MIN_P + (RANGE_P / 3) * i
  );

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#5BAF8A", boxShadow: "0 0 6px rgba(91,175,138,0.5)" }} />
            <span className="font-data text-xs text-white/70 font-bold">EUR/USD</span>
          </div>
          <span className="text-white/20 text-xs">M15</span>
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-medium tracking-wider"
            style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E" }}
          >
            ILLUSTRATION
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-white/25">
          <span className="flex items-center gap-1">
            <span className="w-2 h-1.5 rounded-sm inline-block" style={{ background: "#5BAF8A" }} /> Haussier
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-1.5 rounded-sm inline-block" style={{ background: "#C0665A" }} /> Baissier
          </span>
          <span className="flex items-center gap-1">
            <span style={{ color: "#C9A96E" }}>▲</span> Signal
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 py-3">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
          {/* Background grid */}
          {priceLevels.map((p, i) => (
            <g key={i}>
              <line
                x1={PAD_LEFT} y1={py(p)}
                x2={W - PAD_RIGHT} y2={py(p)}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <text
                x={W - PAD_RIGHT + 4}
                y={py(p) + 3}
                fill="rgba(237,233,227,0.2)"
                fontSize="5"
                fontFamily="Space Mono, monospace"
              >
                {p.toFixed(4)}
              </text>
            </g>
          ))}

          {/* Volume bars (subtle, bottom) */}
          {CANDLES.map((c, i) => {
            const bull = c.c >= c.o;
            const cx = PAD_LEFT + i * CANDLE_SLOT + CANDLE_SLOT / 2;
            const volH = 6 + Math.random() * 8;
            return (
              <motion.rect
                key={i}
                x={cx - BODY_W / 2}
                y={H - PAD_BOTTOM - volH + 4}
                width={BODY_W}
                height={volH}
                fill={bull ? "rgba(91,175,138,0.15)" : "rgba(192,102,90,0.12)"}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ delay: 0.05 * i + 0.5, duration: 0.2 }}
                style={{ transformOrigin: `${cx}px ${H - PAD_BOTTOM}px` }}
              />
            );
          })}

          {/* Candles */}
          {CANDLES.map((c, i) => (
            <CandleShape key={i} c={c} i={i} inView={inView} />
          ))}

          {/* Signal horizontal lines */}
          {[4, 9, 15].map(si => {
            const c = CANDLES[si];
            const cx = PAD_LEFT + si * CANDLE_SLOT + CANDLE_SLOT / 2;
            return (
              <motion.line
                key={si}
                x1={cx}
                y1={py(c.c)}
                x2={W - PAD_RIGHT}
                y2={py(c.c)}
                stroke="rgba(201,169,110,0.2)"
                strokeWidth="0.5"
                strokeDasharray="3 3"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + si * 0.02 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-2 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span className="text-[9px] text-white/20 tracking-widest uppercase">
          Représentation illustrative — non contractuelle
        </span>
        <span className="text-[9px] text-white/20 font-data">Summit One · EUR/USD</span>
      </div>
    </div>
  );
}

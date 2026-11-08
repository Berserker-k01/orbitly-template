import { motion } from "framer-motion";

// Realistic uptrending OHLC data — EUR/USD-like, normalized 0..1
const CANDLES = [
  { o: 0.28, c: 0.36, h: 0.40, l: 0.24 },
  { o: 0.36, c: 0.31, h: 0.38, l: 0.29 },
  { o: 0.31, c: 0.42, h: 0.46, l: 0.29 },
  { o: 0.42, c: 0.50, h: 0.54, l: 0.40 },
  { o: 0.50, c: 0.46, h: 0.53, l: 0.44 },
  { o: 0.46, c: 0.55, h: 0.59, l: 0.44 },
  { o: 0.55, c: 0.61, h: 0.65, l: 0.53 },
  { o: 0.61, c: 0.57, h: 0.64, l: 0.55 },
  { o: 0.57, c: 0.66, h: 0.70, l: 0.55 },
  { o: 0.66, c: 0.72, h: 0.76, l: 0.64 },
  { o: 0.72, c: 0.68, h: 0.76, l: 0.66 },
  { o: 0.68, c: 0.76, h: 0.80, l: 0.66 },
  { o: 0.76, c: 0.81, h: 0.85, l: 0.74 },
  { o: 0.81, c: 0.75, h: 0.85, l: 0.73 },
  { o: 0.75, c: 0.79, h: 0.82, l: 0.73 },
  { o: 0.79, c: 0.87, h: 0.91, l: 0.77 },
  { o: 0.87, c: 0.84, h: 0.91, l: 0.82 },
  { o: 0.84, c: 0.91, h: 0.95, l: 0.82 },
  { o: 0.91, c: 0.96, h: 0.98, l: 0.89 },
  { o: 0.96, c: 0.92, h: 0.99, l: 0.90 },
  { o: 0.92, c: 0.97, h: 1.00, l: 0.90 },
  { o: 0.97, c: 1.00, h: 1.00, l: 0.95 },
];

const W = 500;
const H = 230;
const CW = 13;
const GAP = 7;
const STEP = CW + GAP;
const PX = 8;
const PY = 16;
const CH = H - PY * 2;

const toY = (p: number) => PY + (1 - p) * CH;

const CLOSE_PATH = CANDLES.map((c, i) => {
  const x = PX + i * STEP + CW / 2;
  return `${i === 0 ? "M" : "L"} ${x} ${toY(c.c)}`;
}).join(" ");

export default function TradingCandlesBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Warm gold ambient glow anchored bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[560px] h-[340px]"
        style={{
          background:
            "radial-gradient(ellipse at 90% 100%, rgba(201,169,110,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Candle chart — bottom-right, fades left */}
      <motion.div
        className="absolute bottom-6 right-0 md:right-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.0 }}
        style={{
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.22) 45%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.22) 45%, transparent 100%)",
        }}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
        >
          {/* Dashed horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((v, i) => (
            <line
              key={i}
              x1={0}
              y1={toY(v)}
              x2={W}
              y2={toY(v)}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="0.5"
              strokeDasharray="3 9"
            />
          ))}

          {/* Candle bodies + wicks */}
          {CANDLES.map((c, i) => {
            const bull = c.c >= c.o;
            const color = bull ? "#C9A96E" : "#CC4444";
            const x = PX + i * STEP;
            const bodyTop = toY(Math.max(c.o, c.c));
            const bodyBot = toY(Math.min(c.o, c.c));
            const bodyH = Math.max(2.5, bodyBot - bodyTop);
            const cx = x + CW / 2;
            const isLast = i === CANDLES.length - 1;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 1.1 + i * 0.048,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Upper wick */}
                <line
                  x1={cx}
                  y1={toY(c.h)}
                  x2={cx}
                  y2={bodyTop}
                  stroke={color}
                  strokeWidth="1"
                  opacity={0.45}
                />
                {/* Lower wick */}
                <line
                  x1={cx}
                  y1={bodyBot}
                  x2={cx}
                  y2={toY(c.l)}
                  stroke={color}
                  strokeWidth="1"
                  opacity={0.45}
                />
                {/* Body */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={CW}
                  height={bodyH}
                  fill={bull ? color : "transparent"}
                  stroke={color}
                  strokeWidth="1"
                  rx="1.5"
                  opacity={bull ? 0.80 : 0.55}
                />
                {/* Live-price pulse on last candle */}
                {isLast && (
                  <motion.rect
                    x={x - 3}
                    y={bodyTop - 3}
                    width={CW + 6}
                    height={bodyH + 6}
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="0.8"
                    rx="3"
                    animate={{ opacity: [0, 0.55, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.4,
                    }}
                  />
                )}
              </motion.g>
            );
          })}

          {/* Closing-price line draws itself in after candles settle */}
          <motion.path
            d={CLOSE_PATH}
            stroke="#C9A96E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.28}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.28 }}
            transition={{ duration: 1.6, delay: 2.4, ease: "easeInOut" }}
          />

          {/* Area fill under closing-price line */}
          <motion.path
            d={`${CLOSE_PATH} L ${PX + (CANDLES.length - 1) * STEP + CW / 2} ${H} L ${PX + CW / 2} ${H} Z`}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 3.0 }}
          />

          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Small decorative mini-chart — top-left corner, very faint */}
      <motion.div
        className="absolute top-28 left-0 w-[220px] h-[110px] hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.07) 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.07) 40%, transparent 100%)",
        }}
      >
        <svg viewBox="0 0 220 110" width="220" height="110" fill="none">
          {CANDLES.slice(0, 11).map((c, i) => {
            const bull = c.c >= c.o;
            const color = bull ? "#C9A96E" : "#CC4444";
            const x = 8 + i * 18;
            const yt = (p: number) => 10 + (1 - p) * 90;
            const bodyTop = yt(Math.max(c.o, c.c));
            const bodyBot = yt(Math.min(c.o, c.c));
            const bh = Math.max(2, bodyBot - bodyTop);
            const cx = x + 5.5;
            return (
              <g key={i} opacity={0.65}>
                <line x1={cx} y1={yt(c.h)} x2={cx} y2={bodyTop} stroke={color} strokeWidth="0.8" opacity={0.4} />
                <line x1={cx} y1={bodyBot} x2={cx} y2={yt(c.l)} stroke={color} strokeWidth="0.8" opacity={0.4} />
                <rect x={x} y={bodyTop} width={11} height={bh} fill={bull ? color : "transparent"} stroke={color} strokeWidth="0.8" rx="1" opacity={bull ? 0.7 : 0.5} />
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

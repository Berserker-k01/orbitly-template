import { motion } from "framer-motion";

const CURVE = `M 0 672
  C 72 664 112 642 192 622
  C 265 604 290 618 362 634
  C 432 650 456 626 528 600
  C 598 574 622 556 696 528
  C 770 500 793 520 866 540
  C 938 560 960 530 1032 498
  C 1104 466 1130 452 1202 422
  C 1274 392 1300 408 1370 388
  L 1440 372`;

const CURVE_AREA = `M 0 672
  C 72 664 112 642 192 622
  C 265 604 290 618 362 634
  C 432 650 456 626 528 600
  C 598 574 622 556 696 528
  C 770 500 793 520 866 540
  C 938 560 960 530 1032 498
  C 1104 466 1130 452 1202 422
  C 1274 392 1300 408 1370 388
  L 1440 372 L 1440 900 L 0 900 Z`;

const PARTICLES = [
  { x:  8, y: 68, s: 2.0, d:  9.2, dl: 0.0, gold: true  },
  { x: 18, y: 42, s: 1.5, d: 11.5, dl: 1.4, gold: false },
  { x: 28, y: 78, s: 2.0, d:  8.8, dl: 0.6, gold: true  },
  { x: 42, y: 55, s: 1.5, d: 13.2, dl: 2.1, gold: false },
  { x: 55, y: 30, s: 2.5, d: 10.5, dl: 0.3, gold: true  },
  { x: 62, y: 72, s: 1.5, d: 12.0, dl: 3.2, gold: false },
  { x: 72, y: 48, s: 2.0, d:  9.5, dl: 1.8, gold: true  },
  { x: 82, y: 85, s: 1.5, d: 14.5, dl: 0.9, gold: false },
  { x: 15, y: 22, s: 1.5, d: 11.0, dl: 4.5, gold: false },
  { x: 35, y: 90, s: 2.0, d:  8.5, dl: 2.8, gold: true  },
  { x: 48, y: 15, s: 1.5, d: 13.8, dl: 1.2, gold: false },
  { x: 68, y: 60, s: 2.5, d: 10.0, dl: 0.5, gold: true  },
  { x: 78, y: 35, s: 1.5, d: 12.5, dl: 3.6, gold: false },
  { x: 92, y: 75, s: 2.0, d:  9.0, dl: 2.0, gold: true  },
  { x:  5, y: 50, s: 1.5, d: 11.5, dl: 4.0, gold: false },
  { x: 25, y: 62, s: 2.0, d: 10.5, dl: 1.0, gold: true  },
  { x: 45, y: 38, s: 1.5, d: 13.0, dl: 2.5, gold: false },
  { x: 58, y: 88, s: 2.0, d:  9.8, dl: 0.7, gold: true  },
  { x: 75, y: 20, s: 1.5, d: 12.2, dl: 3.8, gold: false },
  { x: 88, y: 55, s: 2.5, d: 10.8, dl: 1.6, gold: true  },
];

export default function HeroVisuals() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{ zIndex: 2 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hv-curveArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft glow behind curve */}
        <path d={CURVE} fill="none" stroke="#C9A96E" strokeWidth="8" strokeLinecap="round" opacity="0.04" />

        {/* Area fill */}
        <motion.path
          d={CURVE_AREA}
          fill="url(#hv-curveArea)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 3.1 }}
        />

        {/* Animated curve line */}
        <motion.path
          d={CURVE}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.38}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 1.0, ease: "easeInOut" }}
        />

        {/* Live dot */}
        <motion.circle
          cx={1440} cy={372} r={3}
          fill="#C9A96E"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 0.4, delay: 3.4 }}
        />
        <motion.circle
          cx={1440} cy={372} r={5}
          fill="none" stroke="#C9A96E" strokeWidth="0.9"
          animate={{ r: [4, 14, 4], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, delay: 3.7, repeat: Infinity, ease: "easeOut" }}
        />

        {/* ILLUSTRATIF label */}
        <motion.text
          x={1428} y={360}
          fill="rgba(201,169,110,0.35)"
          fontSize="7"
          fontFamily="'Space Mono', monospace"
          letterSpacing="2.5"
          textAnchor="end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
        >
          ILLUSTRATIF
        </motion.text>
      </svg>

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="data-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            backgroundColor: p.gold ? '#C9A96E' : 'rgba(237,233,227,0.85)',
            animationDuration: `${p.d}s`,
            animationDelay: `${p.dl}s`,
          }}
        />
      ))}
    </div>
  );
}

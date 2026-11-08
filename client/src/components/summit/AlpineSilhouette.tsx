import { motion } from "framer-motion";

// 3-layer alpine panorama — SVG paths designed as realistic Swiss mountain profiles
// viewBox 1440×480: far peaks ~95-290px, mid ~175-340px, near ~275-390px from top

const FAR = `M 0 290
  C 90 290 90 160 180 160
  C 240 160 240 255 300 255
  C 360 255 360 115 420 115
  C 490 115 490 255 550 255
  C 595 255 595 140 640 140
  C 700 140 700 265 760 265
  C 815 265 815 95 870 95
  C 935 95 935 250 1000 250
  C 1050 250 1050 120 1100 120
  C 1155 120 1155 260 1210 260
  C 1255 260 1255 160 1300 160
  C 1370 160 1370 220 1440 220
  L 1440 480 L 0 480 Z`;

const FAR_RIDGE = `M 0 290
  C 90 290 90 160 180 160
  C 240 160 240 255 300 255
  C 360 255 360 115 420 115
  C 490 115 490 255 550 255
  C 595 255 595 140 640 140
  C 700 140 700 265 760 265
  C 815 265 815 95 870 95
  C 935 95 935 250 1000 250
  C 1050 250 1050 120 1100 120
  C 1155 120 1155 260 1210 260
  C 1255 260 1255 160 1300 160
  C 1370 160 1370 220 1440 220`;

const MID = `M 0 340
  C 80 340 80 215 160 215
  C 240 215 285 300 330 300
  C 395 300 395 185 460 185
  C 520 185 550 305 580 305
  C 640 305 640 175 700 175
  C 760 175 790 310 820 310
  C 880 310 880 195 940 195
  C 1000 195 1035 295 1070 295
  C 1130 295 1130 210 1190 210
  C 1250 210 1280 320 1310 320
  C 1375 320 1375 295 1440 295
  L 1440 480 L 0 480 Z`;

const NEAR = `M 0 385
  C 60 385 60 315 120 315
  C 180 315 215 355 250 355
  C 305 355 305 285 360 285
  C 410 285 435 360 460 360
  C 510 360 510 275 560 275
  C 610 275 635 365 660 365
  C 710 365 710 295 760 295
  C 810 295 837 355 865 355
  C 920 355 920 280 975 280
  C 1030 280 1060 365 1090 365
  C 1150 365 1150 305 1210 305
  C 1265 305 1292 380 1320 380
  C 1380 380 1380 375 1440 375
  L 1440 480 L 0 480 Z`;

export default function AlpineSilhouette() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 2 }}
    >
      {/* Warm horizon atmospheric glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% 110%, rgba(201,169,110,0.09) 0%, rgba(29,95,168,0.04) 50%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 1440 480"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        className="w-full block"
        style={{ maxHeight: "55vh" }}
      >
        <defs>
          <linearGradient id="s1FarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1A35" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#060811" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="s1MidFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08101F" stopOpacity="0.80" />
            <stop offset="100%" stopColor="#060811" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="s1NearFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040810" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#060811" stopOpacity="1" />
          </linearGradient>
          {/* Gold atmospheric haze — brightens near ridgelines */}
          <radialGradient id="s1HazeGold" cx="50%" cy="60%" r="70%">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Far mountains ── */}
        <motion.path
          d={FAR}
          fill="url(#s1FarFill)"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Gold ridge glow — far peaks */}
        <motion.path
          d={FAR_RIDGE}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.22, pathLength: 1 }}
          transition={{ duration: 2.6, delay: 0.5, ease: "easeOut" }}
        />

        {/* Snow highlights on main peaks — far layer */}
        {/* Peak (870, 95) */}
        <motion.path
          d="M 851 110 C 858 97 870 90 882 97 C 876 92 870 90 870 95 C 862 102 854 110 851 110 Z"
          fill="rgba(255,255,255,0.32)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        {/* Peak (420, 115) */}
        <motion.path
          d="M 404 128 C 410 116 420 109 432 116 C 426 111 420 109 420 115 C 414 122 406 128 404 128 Z"
          fill="rgba(255,255,255,0.28)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        />
        {/* Peak (1100, 120) */}
        <motion.path
          d="M 1083 133 C 1090 121 1100 114 1112 121 C 1106 116 1100 114 1100 120 C 1094 127 1085 133 1083 133 Z"
          fill="rgba(255,255,255,0.25)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        />

        {/* ── Mid mountains ── */}
        <motion.path
          d={MID}
          fill="url(#s1MidFill)"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Near mountains ── */}
        <motion.path
          d={NEAR}
          fill="url(#s1NearFill)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Atmospheric gold haze overlay */}
        <rect x="0" y="0" width="1440" height="480" fill="url(#s1HazeGold)" />

        {/* Topographic contour lines — same coordinate space as the ridge */}
        {[-225,-210,-195,-180,-165,-150,-135,-120,-105,-90,-75,-60,-45,-30,-15,0,15].map((offsetY, i) => {
          const dist = Math.abs(offsetY) / 225;
          const opacity = Math.max(0.012, 0.045 - dist * 0.033);
          const isIndex = i % 4 === 0;
          return (
            <path
              key={`topo-${i}`}
              d={FAR_RIDGE}
              fill="none"
              stroke={isIndex ? `rgba(201,169,110,${opacity * 1.4})` : `rgba(237,233,227,${opacity * 0.65})`}
              strokeWidth={isIndex ? 0.9 : 0.55}
              transform={`translate(0, ${offsetY})`}
              className="topo-line"
              style={{ animationDelay: `${(i * 0.45) % 9}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

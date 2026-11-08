import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// NOT real historical data. Purely illustrative representation.
const RAW = [
  100.0, 108.0, 116.6, 111.9, 124.0, 133.0, 127.7, 140.5,
  151.1, 145.4, 158.0, 170.5, 163.6, 176.5, 191.0, 183.6,
  174.6, 169.3, 179.5, 194.0, 193.0, 208.5, 223.1, 214.6,
  231.8, 250.3, 242.8, 262.2, 283.2, 272.5, 294.3, 317.8,
  305.6, 329.9, 356.3, 342.9, 370.3, 400.0, 384.0, 414.7,
  445.3, 428.1, 462.4, 496.6, 536.1,
];

function buildChartData() {
  let runMax = RAW[0];
  return RAW.map((v, i) => {
    if (v > runMax) runMax = v;
    const dd = ((v - runMax) / runMax) * 100;
    return { m: i + 1, equity: Math.round(v * 10) / 10, dd: Math.round(dd * 100) / 100 };
  });
}

const DATA = buildChartData();
const MAX_DD = Math.min(...DATA.map(d => d.dd));

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(201,169,110,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1" style={{ color: "rgba(237,233,227,0.5)" }}>Mois {label}</div>
      {payload[0] && <div style={{ color: "#C9A96E" }}>Valeur : {payload[0].value}</div>}
    </div>
  );
}

function DDTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(192,102,90,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1" style={{ color: "rgba(237,233,227,0.5)" }}>Mois {label}</div>
      {payload[0] && <div style={{ color: "#C0665A" }}>Drawdown : {payload[0].value?.toFixed(2)} %</div>}
    </div>
  );
}

export default function PerformanceCharts() {
  const [showDD, setShowDD] = useState(false);
  const { ref, inView } = useScrollReveal(0.08);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div>
          <div className="text-white/80 text-sm font-semibold">Courbe de valorisation</div>
          <div className="text-white/35 text-xs mt-0.5">Base 100 — Illustration non contractuelle</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDD(false)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150"
            style={{
              background: !showDD ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
              color: !showDD ? "#C9A96E" : "rgba(237,233,227,0.45)",
              border: `1px solid ${!showDD ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            Performance
          </button>
          <button
            onClick={() => setShowDD(true)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150"
            style={{
              background: showDD ? "rgba(192,102,90,0.15)" : "rgba(255,255,255,0.04)",
              color: showDD ? "#C0665A" : "rgba(237,233,227,0.45)",
              border: `1px solid ${showDD ? "rgba(192,102,90,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            Drawdown
          </button>
        </div>
      </div>

      <div className="px-2 pt-4 pb-2" style={{ height: 260 }}>
        {!showDD ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pc-equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 8" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="m"
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickFormatter={(v) => `M${v}`}
                interval={8}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(v) => String(v)}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(201,169,110,0.2)", strokeWidth: 1 }} />
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 6" />
              <Area
                type="monotone"
                dataKey="equity"
                stroke="#C9A96E"
                strokeWidth={1.5}
                fill="url(#pc-equityGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#C9A96E", stroke: "#060811", strokeWidth: 2 }}
                isAnimationActive={inView}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pc-ddGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C0665A" stopOpacity="0" />
                  <stop offset="100%" stopColor="#C0665A" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 8" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="m"
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickFormatter={(v) => `M${v}`}
                interval={8}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<DDTooltip />} cursor={{ stroke: "rgba(192,102,90,0.2)", strokeWidth: 1 }} />
              <ReferenceLine
                y={MAX_DD}
                stroke="rgba(192,102,90,0.6)"
                strokeDasharray="4 4"
                label={{
                  value: `Max DD : ${MAX_DD.toFixed(2)}%`,
                  position: "insideTopRight",
                  fill: "rgba(192,102,90,0.7)",
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                }}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
              <Area
                type="monotone"
                dataKey="dd"
                stroke="#C0665A"
                strokeWidth={1.5}
                fill="url(#pc-ddGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#C0665A", stroke: "#060811", strokeWidth: 2 }}
                isAnimationActive={inView}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div
        className="px-5 py-3 text-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-white/22 text-[10px] tracking-wide">
          ILLUSTRATION — Représentation non contractuelle. Données en cours de validation documentaire indépendante.
        </span>
      </div>
    </motion.div>
  );
}

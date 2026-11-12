import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { YEARLY_RETURNS, type PerformanceYear } from "@/lib/performanceData";

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function buildChartData(year: PerformanceYear) {
  const returns = YEARLY_RETURNS[year];
  let equity = 100;
  let runMax = 100;
  const points: { m: number; label: string; equity: number; dd: number }[] = [];

  returns.forEach((gain, i) => {
    if (gain == null) return;
    equity = equity * (1 + gain / 100);
    if (equity > runMax) runMax = equity;
    const dd = ((equity - runMax) / runMax) * 100;
    points.push({
      m: i + 1,
      label: MONTH_LABELS[i],
      equity: Math.round(equity * 100) / 100,
      dd: Math.round(dd * 100) / 100,
    });
  });

  return points;
}

function CustomTooltip({ active, payload, year }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(201,169,110,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1" style={{ color: "rgba(237,233,227,0.5)" }}>{row?.label} {year}</div>
      {payload[0] && <div style={{ color: "#C9A96E" }}>Base 100 → {payload[0].value}</div>}
    </div>
  );
}

function DDTooltip({ active, payload, year }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(192,102,90,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1" style={{ color: "rgba(237,233,227,0.5)" }}>{row?.label} {year}</div>
      {payload[0] && <div style={{ color: "#C0665A" }}>Drawdown : {payload[0].value?.toFixed(2)} %</div>}
    </div>
  );
}

export default function PerformanceCharts({ year = "2025" }: { year?: PerformanceYear }) {
  const [showDD, setShowDD] = useState(false);
  const { ref, inView } = useScrollReveal(0.08);
  const DATA = useMemo(() => buildChartData(year), [year]);
  const MAX_DD = DATA.length ? Math.min(...DATA.map(d => d.dd)) : 0;

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
          <div className="text-white/80 text-sm font-semibold">Courbe de valorisation {year}</div>
          <div className="text-white/35 text-xs mt-0.5">Base 100 — Rapport de performance Summit One</div>
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
        {DATA.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/30 text-sm">Pas de données pour {year}</div>
        ) : !showDD ? (
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
                dataKey="label"
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={40}
                domain={["auto", "auto"]}
              />
              <Tooltip content={<CustomTooltip year={year} />} cursor={{ stroke: "rgba(201,169,110,0.2)", strokeWidth: 1 }} />
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
                dataKey="label"
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<DDTooltip year={year} />} cursor={{ stroke: "rgba(192,102,90,0.2)", strokeWidth: 1 }} />
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
          Rapport de performance Summit One · Performances passées ≠ performances futures
        </span>
      </div>
    </motion.div>
  );
}

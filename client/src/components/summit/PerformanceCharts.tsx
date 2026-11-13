import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  CHART_RANGES,
  EQUITY_BASE_CHF,
  buildEquitySeries,
  chartRangeLabel,
  formatChf,
  type ChartRange,
  type PerformanceYear,
} from "@/lib/performanceData";

function axisChf(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `${Math.round(v / 1000)}k`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(Math.round(v));
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; equity: number; dd: number; accountChange?: boolean; daily?: boolean } }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs min-w-[140px]"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(201,169,110,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1.5" style={{ color: "rgba(237,233,227,0.5)" }}>
        {row.accountChange ? "Oct 2025 — compte maître" : row.label}
      </div>
      {row.accountChange ? (
        <div style={{ color: "#C9A96E" }}>Changement de compte Myfxbook</div>
      ) : (
        <>
          <div style={{ color: "#C9A96E" }}>{formatChf(row.equity)}</div>
          <div className="mt-0.5" style={{ color: "rgba(237,233,227,0.4)" }}>
            Drawdown : {row.dd.toFixed(2)} %
          </div>
        </>
      )}
    </div>
  );
}

function DDTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; dd: number } }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(192,102,90,0.25)", color: "#EDE9E3" }}
    >
      <div className="font-medium mb-1" style={{ color: "rgba(237,233,227,0.5)" }}>{row.label}</div>
      <div style={{ color: "#C0665A" }}>Drawdown : {row.dd.toFixed(2)} %</div>
    </div>
  );
}

export default function PerformanceCharts({ year = "2025" }: { year?: PerformanceYear }) {
  const [range, setRange] = useState<ChartRange>("global");
  const [showDD, setShowDD] = useState(false);
  const { ref, inView } = useScrollReveal(0.08);

  const DATA = useMemo(() => buildEquitySeries(range), [range]);
  const MAX_DD = DATA.length ? Math.min(...DATA.map((d) => d.dd)) : 0;
  const last = DATA[DATA.length - 1];
  const gainPct = last ? ((last.equity / EQUITY_BASE_CHF) - 1) * 100 : 0;
  const accountChangePoint = DATA.find((d) => d.accountChange);
  const tickInterval = Math.max(1, Math.floor(DATA.length / (range === "global" ? 8 : 6)) - 1);

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
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="min-w-0">
          <div className="text-white/80 text-sm font-semibold">
            Évolution du capital — {chartRangeLabel(range)}
          </div>
          <div className="text-white/35 text-xs mt-0.5">
            Base {formatChf(EQUITY_BASE_CHF)} · un point / semaine · dates jj/mm/aa
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="perf-chart-range">Période</label>
          <select
            id="perf-chart-range"
            value={range}
            onChange={(e) => setRange(e.target.value as ChartRange)}
            className="px-3 py-1.5 rounded-md text-xs font-medium outline-none cursor-pointer"
            style={{
              background: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.35)",
              color: "#C9A96E",
            }}
          >
            {CHART_RANGES.map((r) => (
              <option key={r} value={r} style={{ background: "#0A0E1A", color: "#EDE9E3" }}>
                {chartRangeLabel(r)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowDD(false)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150"
            style={{
              background: !showDD ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
              color: !showDD ? "#C9A96E" : "rgba(237,233,227,0.45)",
              border: `1px solid ${!showDD ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            Capital
          </button>
          <button
            type="button"
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

      {last && !showDD && (
        <div className="flex flex-wrap gap-6 px-5 pt-4">
          <div>
            <div className="text-white/30 text-[10px] tracking-wider uppercase">Capital final</div>
            <div className="font-data text-sm font-bold" style={{ color: "#C9A96E" }}>
              {formatChf(last.equity)}
            </div>
          </div>
          <div>
            <div className="text-white/30 text-[10px] tracking-wider uppercase">Performance</div>
            <div className="font-data text-sm font-bold" style={{ color: "#5BAF8A" }}>
              +{gainPct.toFixed(1).replace(".", ",")} %
            </div>
          </div>
          <div>
            <div className="text-white/30 text-[10px] tracking-wider uppercase">Max drawdown</div>
            <div className="font-data text-sm font-bold" style={{ color: "#C0665A" }}>
              {MAX_DD.toFixed(2).replace(".", ",")} %
            </div>
          </div>
        </div>
      )}

      <div className="px-2 pt-4 pb-2" style={{ height: 400 }}>
        {DATA.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/30 text-sm">
            Pas de données pour {chartRangeLabel(range)}
          </div>
        ) : !showDD ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 8, right: 20, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="pc-equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 8" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                interval={tickInterval}
                minTickGap={28}
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={axisChf}
                domain={["auto", "auto"]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(201,169,110,0.2)", strokeWidth: 1 }} />
              <ReferenceLine y={EQUITY_BASE_CHF} stroke="rgba(255,255,255,0.12)" strokeDasharray="4 6" />
              {accountChangePoint && (
                <ReferenceDot
                  x={accountChangePoint.label}
                  y={accountChangePoint.equity}
                  r={5}
                  fill="#C9A96E"
                  stroke="#060811"
                  strokeWidth={2}
                />
              )}
              <Area
                type="linear"
                dataKey="equity"
                stroke="#C9A96E"
                strokeWidth={1.5}
                fill="url(#pc-equityGrad)"
                dot={false}
                activeDot={{ r: 3.5, fill: "#C9A96E", stroke: "#060811", strokeWidth: 2 }}
                isAnimationActive={inView}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 8, right: 20, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="pc-ddGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C0665A" stopOpacity="0" />
                  <stop offset="100%" stopColor="#C0665A" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 8" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                interval={tickInterval}
                minTickGap={28}
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <YAxis
                tick={{ fill: "rgba(237,233,227,0.3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={(v) => `${v}%`}
                domain={[Math.min(MAX_DD - 1, -12), 0]}
                reversed
              />
              <Tooltip content={<DDTooltip />} cursor={{ stroke: "rgba(192,102,90,0.2)", strokeWidth: 1 }} />
              <ReferenceLine
                y={MAX_DD}
                stroke="rgba(192,102,90,0.6)"
                strokeDasharray="4 4"
                label={{
                  value: `Max DD : ${MAX_DD.toFixed(2)}%`,
                  position: "insideBottomRight",
                  fill: "rgba(192,102,90,0.85)",
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                }}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
              {(() => {
                const trough = DATA.find((d) => d.dd === MAX_DD);
                return trough ? (
                  <ReferenceDot
                    x={trough.label}
                    y={trough.dd}
                    r={5}
                    fill="#C0665A"
                    stroke="#060811"
                    strokeWidth={2}
                  />
                ) : null;
              })()}
              <Area
                type="linear"
                dataKey="dd"
                stroke="#C0665A"
                strokeWidth={1.5}
                fill="url(#pc-ddGrad)"
                dot={false}
                activeDot={{ r: 3.5, fill: "#C0665A", stroke: "#060811", strokeWidth: 2 }}
                isAnimationActive={inView}
                animationDuration={1400}
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
          Base {formatChf(EQUITY_BASE_CHF)} · rapport Summit One
          {year ? ` · tableau ${year}` : ""} · Performances passées ≠ performances futures
        </span>
      </div>
    </motion.div>
  );
}

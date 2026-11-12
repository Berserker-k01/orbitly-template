import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

function formatCHF(n: number): string {
  return new Intl.NumberFormat('fr-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(n);
}

export default function Calculator() {
  const { t } = useI18n();
  const { ref, inView } = useScrollReveal(0.1);
  const { ref: calcRef, inView: calcInView } = useScrollReveal(0.06);
  const c = t.calculator;

  const [initial, setInitial] = useState(10000);
  const [rate, setRate] = useState(2.5);
  const [years, setYears] = useState(3);

  const chartData = useMemo(() => {
    const months = years * 12;
    return Array.from({ length: months + 1 }, (_, m) => ({
      month: m,
      capital: initial * Math.pow(1 + rate / 100, m),
    }));
  }, [initial, rate, years]);

  const finalCapital = chartData[chartData.length - 1]?.capital ?? initial;
  const growth = finalCapital - initial;
  const growthPct = initial > 0 ? ((growth / initial) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 60%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.88) 0%, rgba(6,8,17,0.80) 50%, rgba(6,8,17,1) 100%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-15 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={ref}>
            <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {c.title}
              </motion.h1>
              <motion.p variants={staggerItem} className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
                {c.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Calculator ── */}
        <section className="relative py-14 pb-24 overflow-hidden" ref={calcRef}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 right-0 w-[500px] h-[400px] ambient-breathe"
              style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(201,169,110,0.06) 0%, transparent 55%)", filter: "blur(60px)" }}
            />
            <div className="absolute inset-0 dot-grid opacity-15" />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={calcInView ? { opacity: 1, y: 0 } : {}}
              className="grid md:grid-cols-2 gap-10 items-start"
            >
              {/* Inputs */}
              <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex flex-col gap-7">
                  {/* Capital initial */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-3">
                      {c.initial_label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1000}
                        max={500000}
                        step={1000}
                        value={initial}
                        onChange={(e) => setInitial(Number(e.target.value))}
                        className="flex-1 accent-[#C9A96E]"
                      />
                      <span className="font-data text-sm font-bold w-28 text-right" style={{ color: "#C9A96E" }}>
                        {formatCHF(initial)}
                      </span>
                    </div>
                  </div>

                  {/* Rendement mensuel */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-3">
                      {c.rate_label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="flex-1 accent-[#C9A96E]"
                      />
                      <span className="font-data text-sm font-bold w-16 text-right" style={{ color: "#C9A96E" }}>
                        {rate.toFixed(1)} %
                      </span>
                    </div>
                  </div>

                  {/* Durée */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-3">
                      {c.years_label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="flex-1 accent-[#C9A96E]"
                      />
                      <span className="font-data text-sm font-bold w-16 text-right" style={{ color: "#C9A96E" }}>
                        {years} ans
                      </span>
                    </div>
                  </div>
                </div>

                {/* Result tiles */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-5 rounded-xl" style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.2)" }}>
                    <div className="text-white/35 text-xs mb-2 uppercase tracking-wider">{c.result_label}</div>
                    <div className="font-data text-xl font-bold" style={{ color: "#C9A96E" }}>{formatCHF(finalCapital)}</div>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "rgba(91,175,138,0.05)", border: "1px solid rgba(91,175,138,0.2)" }}>
                    <div className="text-white/35 text-xs mb-2 uppercase tracking-wider">{c.growth_label}</div>
                    <div className="font-data text-xl font-bold" style={{ color: "#5BAF8A" }}>+{growthPct} %</div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-white/35 text-xs tracking-[0.1em] uppercase">Évolution du capital simulé</span>
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-medium"
                    style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E" }}
                  >
                    SIMULATION
                  </span>
                </div>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#C9A96E" stopOpacity={0.03} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "rgba(237,233,227,0.25)", fontSize: 10, fontFamily: "Space Mono, monospace" }}
                        tickFormatter={(m) => m % 12 === 0 ? `${m / 12}a` : ''}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "rgba(237,233,227,0.25)", fontSize: 10, fontFamily: "Space Mono, monospace" }}
                        tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(10,14,26,0.95)",
                          border: "1px solid rgba(201,169,110,0.2)",
                          borderRadius: 8,
                          fontSize: 11,
                          fontFamily: "Space Mono, monospace",
                          color: "#EDE9E3",
                        }}
                        formatter={(value: number) => [formatCHF(value), 'Capital']}
                        labelFormatter={(m: number) => `Mois ${m}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="capital"
                        stroke="#C9A96E"
                        strokeWidth={1.5}
                        fill="url(#capitalGrad)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={calcInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-10 p-5 rounded-xl flex items-start gap-3"
              style={{ background: "rgba(201,169,110,0.03)", border: "1px solid rgba(201,169,110,0.1)" }}
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#C9A96E" }} />
              <p className="text-white/35 text-xs leading-relaxed">{c.disclaimer}</p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

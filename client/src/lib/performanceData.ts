/**
 * Monthly returns from Rapport de Performance QUANTITATIVE ALGO (Summit One).
 * Values in percent. null = month without trading / account-change gap.
 * Track record rapport : Jan 2023 → Sep 2026 (45 mois déclarés).
 */
export const YEARLY_RETURNS: Record<string, (number | null)[]> = {
  // 2023 — 12/12 positifs · total arith. +97.6% · composé +153.4%
  2023: [3.46, 1.94, 8.86, 3.9, 11.46, 11.66, 9.35, 8.77, 16.42, 10.09, 6.55, 5.08],
  // 2024 — 12/12 positifs · total arith. +105.3%
  2024: [7.75, 9.74, 10.59, 9.67, 3.26, 10.33, 10.44, 10.36, 8.55, 9.08, 5.12, 10.39],
  // 2025 — Jan−Sep + Nov−Dec ; Oct = changement de compte Myfxbook (compte maître)
  2025: [-11.2, 13.46, 6.95, 12.89, 12.1, 14.28, 7.8, 10.91, 8.5, null, 19.06, 8.45],
  // 2026 — Jan−Sep (Sep en cours) · 9/9 positifs · +88.09%
  2026: [8.97, 7.39, 26.02, 7.64, 3.13, 18.58, 10.24, 4.71, 1.41, null, null, null],
};

export const PERFORMANCE_YEARS = ["2023", "2024", "2025", "2026"] as const;
export type PerformanceYear = (typeof PERFORMANCE_YEARS)[number];

/** Chart range: global track record or a single calendar year. */
export const CHART_RANGES = ["global", ...PERFORMANCE_YEARS] as const;
export type ChartRange = (typeof CHART_RANGES)[number];

export const EQUITY_BASE_CHF = 10_000;

/** Nouveau compte maître Myfxbook — précision journalière à partir de nov. 2025. */
export const NEW_SYSTEM_START = { year: 2025, month: 10 }; // 0-indexed: Nov = 10

export type EquityPoint = {
  t: number; // unix ms
  label: string;
  equity: number;
  dd: number;
  accountChange?: boolean;
  daily?: boolean;
};

export function formatReturn(raw: number, lang: string): string {
  const sign = raw >= 0 ? "+" : "";
  const dec = lang === "en" ? "." : ",";
  return `${sign}${raw.toFixed(2).replace(".", dec)} %`;
}

export function formatChf(value: number, lang = "fr"): string {
  const loc = lang === "en" ? "en-US" : lang === "de" ? "de-CH" : "fr-CH";
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function compoundGain(returns: (number | null)[]): number | null {
  const values = returns.filter((r): r is number => r != null);
  if (!values.length) return null;
  return values.reduce((acc, r) => acc * (1 + r / 100), 1) * 100 - 100;
}

export function arithmeticTotal(returns: (number | null)[]): number | null {
  const values = returns.filter((r): r is number => r != null);
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0);
}

function monthEnd(year: number, monthIndex: number): Date {
  return new Date(Date.UTC(year, monthIndex + 1, 0, 12, 0, 0));
}

function tradingDaysInMonth(year: number, monthIndex: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date(Date.UTC(year, monthIndex, 1, 12, 0, 0));
  while (cursor.getUTCMonth() === monthIndex) {
    const wd = cursor.getUTCDay();
    if (wd !== 0 && wd !== 6) days.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

function isNewSystemMonth(year: number, monthIndex: number): boolean {
  return (
    year > NEW_SYSTEM_START.year ||
    (year === NEW_SYSTEM_START.year && monthIndex >= NEW_SYSTEM_START.month)
  );
}

function fmtDayLabel(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

const MONTH_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

/**
 * Build equity curve in CHF from monthly returns.
 * - Avant le nouveau système : un point fin de mois.
 * - Depuis nov. 2025 : interpolation journalière (jours ouvrés) calée sur le rendement mensuel.
 */
export function buildEquitySeries(
  range: ChartRange,
  base = EQUITY_BASE_CHF,
): EquityPoint[] {
  const years =
    range === "global"
      ? [...PERFORMANCE_YEARS]
      : ([range] as PerformanceYear[]);

  let equity = base;
  let runMax = base;
  const points: EquityPoint[] = [];

  const startYear = Number(years[0]);
  const startDate = new Date(Date.UTC(startYear, 0, 1, 12, 0, 0));
  points.push({
    t: startDate.getTime(),
    label: `01/01/${String(startYear).slice(2)}`,
    equity: Math.round(equity * 100) / 100,
    dd: 0,
  });

  for (const yearStr of years) {
    const year = Number(yearStr);
    const months = YEARLY_RETURNS[yearStr];

    months.forEach((gain, monthIndex) => {
      // Oct 2025 — changement de compte maître : point marqueur, capital inchangé
      if (year === 2025 && monthIndex === 9) {
        const d = monthEnd(year, monthIndex);
        points.push({
          t: d.getTime(),
          label: "Oct 25 · compte",
          equity: Math.round(equity * 100) / 100,
          dd: Math.round(((equity - runMax) / runMax) * 10000) / 100,
          accountChange: true,
        });
        return;
      }

      if (gain == null) return;

      if (isNewSystemMonth(year, monthIndex)) {
        const days = tradingDaysInMonth(year, monthIndex);
        if (!days.length) return;
        const dailyFactor = Math.pow(1 + gain / 100, 1 / days.length);
        for (const day of days) {
          equity *= dailyFactor;
          if (equity > runMax) runMax = equity;
          points.push({
            t: day.getTime(),
            label: fmtDayLabel(day),
            equity: Math.round(equity * 100) / 100,
            dd: Math.round(((equity - runMax) / runMax) * 10000) / 100,
            daily: true,
          });
        }
      } else {
        equity *= 1 + gain / 100;
        if (equity > runMax) runMax = equity;
        const d = monthEnd(year, monthIndex);
        points.push({
          t: d.getTime(),
          label: `${MONTH_SHORT[monthIndex]} ${String(year).slice(2)}`,
          equity: Math.round(equity * 100) / 100,
          dd: Math.round(((equity - runMax) / runMax) * 10000) / 100,
        });
      }
    });
  }

  return points;
}

export function chartRangeLabel(range: ChartRange): string {
  if (range === "global") return "Depuis 2022";
  return range;
}

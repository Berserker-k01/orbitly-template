/**
 * Monthly returns from Rapport de Performance QUANTITATIVE ALGO (Summit One).
 * Values in percent. null = month without trading / maintenance.
 */
export const YEARLY_RETURNS: Record<string, (number | null)[]> = {
  // 2023 — 12/12 positifs · total arith. +97.6% · composé +153.4%
  2023: [3.46, 1.94, 8.86, 3.9, 11.46, 11.66, 9.35, 8.77, 16.42, 10.09, 6.55, 5.08],
  // 2024 — 12/12 positifs · total arith. +105.3%
  2024: [7.75, 9.74, 10.59, 9.67, 3.26, 10.33, 10.44, 10.36, 8.55, 9.08, 5.12, 10.39],
  // 2025 — Jan−Sep + Nov−Dec ; Oct = maintenance (changement compte maître)
  2025: [-11.2, 13.46, 6.95, 12.89, 12.1, 14.28, 7.8, 10.91, 8.5, null, 19.06, 8.45],
  // 2026 — Jan−Sep (Sep en cours) · 9/9 positifs · +88.09%
  2026: [8.97, 7.39, 26.02, 7.64, 3.13, 18.58, 10.24, 4.71, 1.41, null, null, null],
};

export const PERFORMANCE_YEARS = ["2023", "2024", "2025", "2026"] as const;
export type PerformanceYear = (typeof PERFORMANCE_YEARS)[number];

export function formatReturn(raw: number, lang: string): string {
  const sign = raw >= 0 ? "+" : "";
  const dec = lang === "en" ? "." : ",";
  return `${sign}${raw.toFixed(2).replace(".", dec)} %`;
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

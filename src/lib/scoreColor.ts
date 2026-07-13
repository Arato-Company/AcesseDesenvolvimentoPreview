/**
 * Cor do score de aderência/match (classe Tailwind).
 * Extraído da vitrine (`/empresa/vitrine`) para reuso na tela de matching.
 *  - ≥ 90 → gold-deep (aderência muito alta)
 *  - ≥ 75 → gold (aderência alta)
 *  - < 75 → ink-2 (aderência moderada)
 */
export function scoreColor(score: number): string {
  if (score >= 90) return "text-gold-deep";
  if (score >= 75) return "text-gold";
  return "text-ink-2";
}

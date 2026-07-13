import type { Candidato, CandidatoMatch, MatchReason, Vaga } from "@/types";

/**
 * Mock de matching determinístico (v0 — sem backend, sem LLM).
 * Cruza os critérios da busca (vaga) com o pool de candidatos e devolve
 * os aderentes rankeados por score desc. A mesma vaga sempre produz o
 * mesmo resultado (sem aleatoriedade).
 *
 * Pesos (score 0–100):
 *  - Mesma cidade      → +25  (reason "Mesma cidade", high)
 *  - Área compatível   → +35  (reason "Área compatível", base)
 *  - Senioridade igual → +15  (reason "Senioridade certa", base)
 *  - Skills overlap    → ratio × 25  (reason "{k}/{n} skills",
 *                         high se ratio ≥ 0.6, senão base)
 *
 * Candidatos com score < THRESHOLD são filtrados (não exibimos aderência
 * baixa). O selo "curado" não altera o score — é herdado no visual.
 */
export const MATCH_THRESHOLD = 60;

const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(value: string): string {
  return value.trim().toLowerCase().normalize("NFD").replace(DIACRITICS, "");
}

export function matchCandidatos(
  vaga: Vaga,
  candidatos: Candidato[],
): CandidatoMatch[] {
  const vagaSkills = vaga.skills.map(normalize);

  return candidatos
    .map((candidato): CandidatoMatch => {
      let score = 0;
      const reasons: MatchReason[] = [];

      if (candidato.cidade === vaga.cidade) {
        score += 25;
        reasons.push({ label: "Mesma cidade", strength: "high" });
      }
      if (candidato.area === vaga.area) {
        score += 35;
        reasons.push({ label: "Área compatível", strength: "base" });
      }
      if (candidato.nivel === vaga.senioridade) {
        score += 15;
        reasons.push({ label: "Senioridade certa", strength: "base" });
      }
      if (vagaSkills.length > 0) {
        const candTags = candidato.tags.map(normalize);
        const overlap = vagaSkills.filter((s) => candTags.includes(s));
        if (overlap.length > 0) {
          const ratio = overlap.length / vagaSkills.length;
          score += Math.round(ratio * 25);
          reasons.push({
            label: `${overlap.length}/${vagaSkills.length} skills`,
            strength: ratio >= 0.6 ? "high" : "base",
          });
        }
      }

      return {
        candidato,
        score: Math.min(100, Math.round(score)),
        reasons,
      };
    })
    .filter((m) => m.score >= MATCH_THRESHOLD)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Desempate determinístico: curado primeiro, depois id.
      if (a.candidato.curado !== b.candidato.curado) {
        return a.candidato.curado ? -1 : 1;
      }
      return a.candidato.id.localeCompare(b.candidato.id);
    });
}

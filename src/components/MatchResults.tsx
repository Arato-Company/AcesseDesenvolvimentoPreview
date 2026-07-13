"use client";

import { useEffect, useMemo, useState } from "react";
import { MatchBanner } from "@/components/MatchBanner";
import { CardCandidatoMatch } from "@/components/CardCandidatoMatch";
import { matchCandidatos } from "@/lib/matching";
import { cidadeNome } from "@/data/lookups";
import candidatos from "@/data/candidatos.json";
import type { Candidato, CandidatoMatch, StatusBusca, Vaga } from "@/types";

const candidatosTyped = candidatos as Candidato[];

type Ordenacao = "aderencia" | "curados" | "cidade";

function ordenar(matches: CandidatoMatch[], modo: Ordenacao): CandidatoMatch[] {
  const copia = [...matches];
  if (modo === "curados") {
    return copia.sort((a, b) => {
      if (a.candidato.curado !== b.candidato.curado) {
        return a.candidato.curado ? -1 : 1;
      }
      return b.score - a.score;
    });
  }
  if (modo === "cidade") {
    return copia.sort((a, b) => {
      const c = cidadeNome(a.candidato.cidade).localeCompare(
        cidadeNome(b.candidato.cidade),
      );
      return c !== 0 ? c : b.score - a.score;
    });
  }
  // "aderencia" — já vem ordenado por score desc de matchCandidatos.
  return copia;
}

/**
 * Corpo interativo da tela de matching. Simula a busca (processando ~2s →
 * resultado), aplica ordenação e renderiza a lista de aderentes ou o empty state.
 */
export function MatchResults({ vaga }: { vaga: Vaga }) {
  const [status, setStatus] = useState<StatusBusca>("processando");
  const [ordem, setOrdem] = useState<Ordenacao>("aderencia");

  useEffect(() => {
    const t = setTimeout(() => setStatus("resultado"), 2000);
    return () => clearTimeout(t);
  }, []);

  const matches = useMemo(
    () => matchCandidatos(vaga, candidatosTyped),
    [vaga],
  );
  const curados = useMemo(
    () => matches.filter((m) => m.candidato.curado).length,
    [matches],
  );
  const listaOrdenada = useMemo(
    () => ordenar(matches, ordem),
    [matches, ordem],
  );

  return (
    <>
      <div className="mt-6">
        <MatchBanner status={status} total={matches.length} curados={curados} />
      </div>

      {status === "resultado" && matches.length > 0 ? (
        <>
          <div className="my-6 flex items-center justify-end gap-3">
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              Ordenar por
            </span>
            <select
              className="field-select w-52"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as Ordenacao)}
              aria-label="Ordenar candidatos"
            >
              <option value="aderencia">Maior aderencia</option>
              <option value="curados">Curados primeiro</option>
              <option value="cidade">Cidade</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            {listaOrdenada.map((m) => (
              <CardCandidatoMatch key={m.candidato.id} match={m} />
            ))}
          </div>
        </>
      ) : null}

      {status === "resultado" && matches.length === 0 ? (
        <div className="empty-state mt-6">
          <p className="eyebrow text-ink-3">Ainda sem aderentes</p>
          <h3 className="display-md">
            Por enquanto, ninguem combinou com essa busca.
          </h3>
          <p className="max-w-md text-sm text-ink-2">
            A gente continua olhando o pool do Circuito e avisa assim que
            encontrar alguem aderente. Se quiser, ajuste os criterios da busca.
          </p>
        </div>
      ) : null}
    </>
  );
}

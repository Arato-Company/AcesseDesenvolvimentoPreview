"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import candidatos from "@/data/candidatos.json";
import { allAreas, allCidades, areaNome, cidadeNome } from "@/data/lookups";
import type { AreaSlug, Candidato, CidadeSlug, PlanoCandidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

const PLANOS: PlanoCandidato[] = ["start", "destaque", "premium"];

/**
 * /admin/candidatos — fonte: Web/11 - Admin Candidatos.html.
 * Tabela com filtros area/cidade/plano/curado.
 */
export default function AdminCandidatosPage() {
  const [area, setArea] = useState<AreaSlug | "">("");
  const [cidade, setCidade] = useState<CidadeSlug | "">("");
  const [plano, setPlano] = useState<PlanoCandidato | "">("");
  const [apenasCurados, setApenasCurados] = useState(false);

  const lista = useMemo(
    () =>
      candidatosTyped.filter((c) => {
        if (area && c.area !== area) return false;
        if (cidade && c.cidade !== cidade) return false;
        if (plano && c.plano !== plano) return false;
        if (apenasCurados && !c.curado) return false;
        return true;
      }),
    [area, cidade, plano, apenasCurados],
  );

  return (
    <AppShell audience="admin" topbarTitle="Candidatos" topbarUserLabel="AD">
      <header className="mb-8">
        <p className="caps mb-2">Base ativa</p>
        <h1 className="display-lg">
          {lista.length} candidatos{" "}
          <span className="text-ink-3">de {candidatosTyped.length}</span>
        </h1>
      </header>

      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-line bg-offwhite p-4 shadow-1">
        <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-ink-3">
          Area
          <select
            className="field-select"
            value={area}
            onChange={(e) => setArea(e.target.value as AreaSlug | "")}
          >
            <option value="">Todas</option>
            {allAreas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-ink-3">
          Cidade
          <select
            className="field-select"
            value={cidade}
            onChange={(e) => setCidade(e.target.value as CidadeSlug | "")}
          >
            <option value="">Todas</option>
            {allCidades.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-ink-3">
          Plano
          <select
            className="field-select"
            value={plano}
            onChange={(e) => setPlano(e.target.value as PlanoCandidato | "")}
          >
            <option value="">Todos</option>
            {PLANOS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={apenasCurados}
            onChange={(e) => setApenasCurados(e.target.checked)}
          />
          Apenas curados
        </label>
        <button
          type="button"
          className="ml-auto btn btn-ghost btn-sm"
          onClick={() => {
            setArea("");
            setCidade("");
            setPlano("");
            setApenasCurados(false);
          }}
        >
          Limpar filtros
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3 font-mono">Nome</th>
              <th className="px-5 py-3 font-mono">Cargo</th>
              <th className="px-5 py-3 font-mono">Cidade</th>
              <th className="px-5 py-3 font-mono">Area</th>
              <th className="px-5 py-3 font-mono">Nivel</th>
              <th className="px-5 py-3 font-mono">Plano</th>
              <th className="px-5 py-3 font-mono">Status</th>
              <th className="px-5 py-3 text-right font-mono">Match</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {lista.map((c) => (
              <tr key={c.id} className="hover:bg-paper/60">
                <td className="px-5 py-3 font-semibold text-navy">
                  <Link
                    href={`/empresa/candidato/${c.id}`}
                    className="hover:text-gold-deep"
                  >
                    {c.nome}
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-2">{c.cargo}</td>
                <td className="px-5 py-3 text-ink-2">{cidadeNome(c.cidade)}</td>
                <td className="px-5 py-3 text-ink-2">{areaNome(c.area)}</td>
                <td className="px-5 py-3 text-ink-2">{c.nivel}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                    {c.plano}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`font-mono text-2xs uppercase tracking-widest ${c.curado ? "text-gold-deep" : "text-ink-3"}`}
                  >
                    {c.curado ? "✦ Curado" : "Ativo"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-semibold text-navy">
                  {c.matchScore}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

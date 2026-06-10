"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import empresas from "@/data/empresas.json";
import vagas from "@/data/vagas.json";
import { allAreas, allCidades, areaNome, cidadeNome } from "@/data/lookups";
import type {
  AreaSlug,
  CidadeSlug,
  Empresa,
  PlanoEmpresa,
  Vaga,
} from "@/types";

const empresasTyped = empresas as Empresa[];
const vagasTyped = vagas as Vaga[];

const PLANOS: PlanoEmpresa[] = ["basico", "destaque", "premium"];

/**
 * /admin/empresas — fonte: Web/12 - Admin Empresas.html.
 * Tabela com filtros + contagem de vagas por empresa.
 */
export default function AdminEmpresasPage() {
  const [area, setArea] = useState<AreaSlug | "">("");
  const [cidade, setCidade] = useState<CidadeSlug | "">("");
  const [plano, setPlano] = useState<PlanoEmpresa | "">("");

  const lista = useMemo(
    () =>
      empresasTyped.filter((e) => {
        if (area && e.area !== area) return false;
        if (cidade && e.cidade !== cidade) return false;
        if (plano && e.plano !== plano) return false;
        return true;
      }),
    [area, cidade, plano],
  );

  const vagasPorEmpresa = (empresaId: string) =>
    vagasTyped.filter((v) => v.empresaId === empresaId).length;

  return (
    <AppShell audience="admin" topbarTitle="Empresas" topbarUserLabel="AD">
      <header className="mb-8">
        <p className="caps mb-2">Contas ativas</p>
        <h1 className="display-lg">
          {lista.length} empresas{" "}
          <span className="text-ink-3">de {empresasTyped.length}</span>
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
            onChange={(e) => setPlano(e.target.value as PlanoEmpresa | "")}
          >
            <option value="">Todos</option>
            {PLANOS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="ml-auto btn btn-ghost btn-sm"
          onClick={() => {
            setArea("");
            setCidade("");
            setPlano("");
          }}
        >
          Limpar filtros
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3 font-mono">Empresa</th>
              <th className="px-5 py-3 font-mono">Cidade</th>
              <th className="px-5 py-3 font-mono">Area</th>
              <th className="px-5 py-3 font-mono">Porte</th>
              <th className="px-5 py-3 font-mono">Plano</th>
              <th className="px-5 py-3 text-right font-mono">Vagas ativas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {lista.map((e) => (
              <tr key={e.id} className="hover:bg-paper/60">
                <td className="px-5 py-3">
                  <p className="font-semibold text-navy">{e.nome}</p>
                  <p className="text-xs text-ink-2">{e.resumo}</p>
                </td>
                <td className="px-5 py-3 text-ink-2">{cidadeNome(e.cidade)}</td>
                <td className="px-5 py-3 text-ink-2">{areaNome(e.area)}</td>
                <td className="px-5 py-3 text-ink-2">{e.porte}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                    {e.plano}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-semibold text-navy">
                  {vagasPorEmpresa(e.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

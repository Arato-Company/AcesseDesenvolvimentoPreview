"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ExternalLink,
  ChevronDown,
  Building2,
  Layers,
  Star,
  Sparkles,
  Plus,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import empresas from "@/data/empresas.json";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import { cidadeNome } from "@/data/lookups";
import type { Area, Cidade, Empresa, PlanoEmpresa } from "@/types";

const empresasTyped = empresas as Empresa[];
const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const NOVOS_HOJE = 1;

const PLANO_BADGE: Record<PlanoEmpresa, string> = {
  premium: "bg-gold/20 text-gold-deep",
  destaque: "bg-paper text-navy",
  basico: "bg-paper text-ink-2",
};
const PLANO_LABEL: Record<PlanoEmpresa, string> = {
  premium: "Premium",
  destaque: "Destaque",
  basico: "Basico",
};
const STATUS_BADGE: Record<string, string> = {
  Ativa: "bg-success/10 text-success",
  Inativa: "bg-paper text-ink-2",
  "Pendente pagamento": "bg-warning/10 text-warning",
};

const CREDITOS_MOCK = [62, 28, 75, 12, 90];
const STATUS_MOCK = ["Ativa", "Ativa", "Pendente pagamento", "Inativa", "Ativa"];

// Enriquece com mocks estaveis por empresa (nao por linha filtrada).
const ROWS = empresasTyped.map((e, i) => ({
  ...e,
  creditos: CREDITOS_MOCK[i % CREDITOS_MOCK.length],
  status: STATUS_MOCK[i % STATUS_MOCK.length],
}));

type PlanoFiltro = PlanoEmpresa | "todos";

/**
 * /admin/empresas — W12 + Stitch v2: stat cards (total/por plano/novos) +
 * barra de filtros (plano/status/cidade/setor) + tabela.
 */
export default function AdminEmpresasPage() {
  const [plano, setPlano] = useState<PlanoFiltro>("todos");
  const [status, setStatus] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [setor, setSetor] = useState<string>("");

  const counts = useMemo(() => {
    const by = (p: PlanoEmpresa) =>
      empresasTyped.filter((e) => e.plano === p).length;
    return {
      total: empresasTyped.length,
      basico: by("basico"),
      destaque: by("destaque"),
      premium: by("premium"),
    };
  }, []);

  const linhas = useMemo(
    () =>
      ROWS.filter((e) => {
        if (plano !== "todos" && e.plano !== plano) return false;
        if (status && e.status !== status) return false;
        if (cidade && e.cidade !== cidade) return false;
        if (setor && e.area !== setor) return false;
        return true;
      }),
    [plano, status, cidade, setor],
  );

  const limparTodos = () => {
    setPlano("todos");
    setStatus("");
    setCidade("");
    setSetor("");
  };

  const todosAtivo = plano === "todos" && !status && !cidade && !setor;

  return (
    <AppAdminShell topbarTitle="Empresas">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Base parceira
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Empresas
          </h1>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-success">
          {counts.total} parceiras
        </span>
      </header>

      {/* Barra de filtros */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={limparTodos}
          className={`rounded-lg px-5 py-2 font-mono text-2xs uppercase tracking-widest transition ${
            todosAtivo
              ? "bg-navy text-offwhite"
              : "border border-line bg-offwhite text-ink-2 hover:border-navy"
          }`}
        >
          Todos
        </button>
        <span className="h-6 w-px bg-line" aria-hidden="true" />

        <FilterSelect
          label="Plano"
          value={plano === "todos" ? "" : plano}
          onChange={(v) => setPlano((v || "todos") as PlanoFiltro)}
          options={[
            { value: "basico", label: "Basico" },
            { value: "destaque", label: "Destaque" },
            { value: "premium", label: "Premium" },
          ]}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "Ativa", label: "Ativa" },
            { value: "Pendente pagamento", label: "Pendente" },
            { value: "Inativa", label: "Inativa" },
          ]}
        />
        <FilterSelect
          label="Cidade"
          value={cidade}
          onChange={setCidade}
          options={cidadesTyped.map((c) => ({ value: c.slug, label: c.nome }))}
        />
        <FilterSelect
          label="Setor"
          value={setor}
          onChange={setSetor}
          options={areasTyped.map((a) => ({ value: a.slug, label: a.nome }))}
        />
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Total"
          valor={String(counts.total)}
          hint="Parceiras"
          icon={Building2}
          active={plano === "todos"}
          onClick={() => setPlano("todos")}
        />
        <StatCard
          label="Basico"
          valor={String(counts.basico)}
          hint="Plano basico"
          icon={Layers}
          active={plano === "basico"}
          onClick={() => setPlano("basico")}
        />
        <StatCard
          label="Destaque"
          valor={String(counts.destaque)}
          hint="Mais escolhido"
          icon={Star}
          active={plano === "destaque"}
          onClick={() => setPlano("destaque")}
        />
        <StatCard
          label="Premium"
          valor={String(counts.premium)}
          hint="Concierge"
          icon={Sparkles}
          active={plano === "premium"}
          onClick={() => setPlano("premium")}
        />
        <StatCard
          label="Novas hoje"
          valor={`+${NOVOS_HOJE}`}
          hint="Ultimos 7 dias"
          icon={Plus}
        />
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3">Empresa</th>
              <th className="px-5 py-3">Cidade</th>
              <th className="px-5 py-3">Plano</th>
              <th className="w-40 px-5 py-3">Creditos</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {linhas.map((e) => (
              <tr key={e.id} className="hover:bg-paper/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-line bg-paper">
                      {e.logoUrl ? (
                        <Image
                          src={e.logoUrl}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="40px"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{e.nome}</p>
                      <p className="text-xs text-ink-2">{e.porte}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-ink-2">{cidadeNome(e.cidade)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${PLANO_BADGE[e.plano]}`}
                  >
                    {PLANO_LABEL[e.plano]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-paper">
                      <div
                        className="h-full bg-gold"
                        style={{ width: `${e.creditos}%` }}
                      />
                    </div>
                    <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                      {e.creditos}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${STATUS_BADGE[e.status]}`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
                  >
                    Ver conta <ExternalLink size={11} strokeWidth={1.7} />
                  </button>
                </td>
              </tr>
            ))}
            {linhas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-ink-2"
                >
                  Nenhuma empresa com esses filtros.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AppAdminShell>
  );
}

function StatCard({
  label,
  valor,
  hint,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  valor: string;
  hint?: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border bg-offwhite p-5 text-left shadow-1 transition ${
        active
          ? "border-gold shadow-gold"
          : "border-line hover:border-gold-light hover:shadow-2"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          {label}
        </p>
        {Icon ? (
          <Icon size={16} strokeWidth={1.7} className="text-gold-deep" />
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold leading-none text-navy">
        {valor}
      </p>
      <p className="mt-2 font-mono text-2xs uppercase tracking-widest text-gold-deep">
        {hint ?? ""}
      </p>
    </button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const active = value !== "";
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={`appearance-none rounded-lg border bg-offwhite py-2 pl-4 pr-9 font-mono text-2xs uppercase tracking-widest transition ${
          active
            ? "border-navy text-navy"
            : "border-line text-ink-2 hover:border-navy"
        }`}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-3"
        aria-hidden="true"
      />
    </div>
  );
}

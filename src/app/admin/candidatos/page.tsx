"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
  Users,
  Layers,
  Star,
  UserPlus,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import candidatos from "@/data/candidatos.json";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import { cidadeNome, areaNome } from "@/data/lookups";
import type {
  Area,
  Candidato,
  Cidade,
  PlanoCandidato,
} from "@/types";

const candidatosTyped = candidatos as Candidato[];
const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

// Mock v0: sem timestamp real de cadastro.
const NOVOS_HOJE = 2;

const PLANO_BADGE: Record<PlanoCandidato, string> = {
  premium: "bg-gold/20 text-gold-deep",
  destaque: "bg-paper text-navy",
  start: "bg-paper text-ink-2",
};
const PLANO_LABEL: Record<PlanoCandidato, string> = {
  premium: "Premium",
  destaque: "Destaque",
  start: "Start",
};
const STATUS_BADGE: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Curado: "bg-gold/20 text-gold-deep",
  Inativo: "bg-paper text-ink-2",
};

function statusFor(c: Candidato): "Ativo" | "Curado" | "Inativo" {
  if (c.curado) return "Curado";
  if (c.matchScore >= 70) return "Ativo";
  return "Inativo";
}

const DIAS_OFFSET = [3, 7, 12, 18, 22, 25, 28, 30, 4, 9];

type PlanoFiltro = PlanoCandidato | "todos";

/**
 * /admin/candidatos — W11 + Stitch v2: stat cards (total/por plano/novos) +
 * barra de filtros (plano/status/cidade/area/curado) + tabela.
 */
export default function AdminCandidatosPage() {
  const [plano, setPlano] = useState<PlanoFiltro>("todos");
  const [status, setStatus] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [soCurados, setSoCurados] = useState(false);

  const counts = useMemo(() => {
    const by = (p: PlanoCandidato) =>
      candidatosTyped.filter((c) => c.plano === p).length;
    return {
      total: candidatosTyped.length,
      start: by("start"),
      destaque: by("destaque"),
      premium: by("premium"),
    };
  }, []);

  const linhas = useMemo(
    () =>
      candidatosTyped.filter((c) => {
        if (plano !== "todos" && c.plano !== plano) return false;
        if (soCurados && !c.curado) return false;
        if (status && statusFor(c) !== status) return false;
        if (cidade && c.cidade !== cidade) return false;
        if (area && c.area !== area) return false;
        return true;
      }),
    [plano, status, cidade, area, soCurados],
  );

  const limparTodos = () => {
    setPlano("todos");
    setStatus("");
    setCidade("");
    setArea("");
    setSoCurados(false);
  };

  const todosAtivo =
    plano === "todos" && !soCurados && !status && !cidade && !area;

  return (
    <AppAdminShell topbarTitle="Candidatos">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Base ativa
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Candidatos
          </h1>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-success">
          {counts.total} ativos
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
            { value: "start", label: "Start" },
            { value: "destaque", label: "Destaque" },
            { value: "premium", label: "Premium" },
          ]}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "Ativo", label: "Ativo" },
            { value: "Curado", label: "Curado" },
            { value: "Inativo", label: "Inativo" },
          ]}
        />
        <FilterSelect
          label="Cidade"
          value={cidade}
          onChange={setCidade}
          options={cidadesTyped.map((c) => ({ value: c.slug, label: c.nome }))}
        />
        <FilterSelect
          label="Area"
          value={area}
          onChange={setArea}
          options={areasTyped.map((a) => ({ value: a.slug, label: a.nome }))}
        />

        <button
          type="button"
          onClick={() => setSoCurados((v) => !v)}
          className={`inline-flex items-center gap-1 rounded-lg border px-4 py-2 font-mono text-2xs uppercase tracking-widest transition ${
            soCurados
              ? "border-gold bg-gold-light/20 text-gold-deep"
              : "border-gold/50 bg-offwhite text-gold-deep hover:border-gold"
          }`}
        >
          Curado
          <Sparkles size={12} strokeWidth={2} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Total"
          valor={String(counts.total)}
          hint="Na base"
          icon={Users}
          active={plano === "todos"}
          onClick={() => setPlano("todos")}
        />
        <StatCard
          label="Start"
          valor={String(counts.start)}
          hint="Plano start"
          icon={Layers}
          active={plano === "start"}
          onClick={() => setPlano("start")}
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
          label="Novos hoje"
          valor={`+${NOVOS_HOJE}`}
          hint="Ultimos 7 dias"
          icon={UserPlus}
        />
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3">Candidato</th>
              <th className="px-5 py-3">Area / Cidade</th>
              <th className="px-5 py-3">Plano</th>
              <th className="px-5 py-3">Cadastro</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {linhas.map((c, i) => {
              const st = statusFor(c);
              return (
                <tr key={c.id} className="hover:bg-paper/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <PlaceholderImage
                          src={`/avatares/${c.id}.webp`}
                          alt={c.nome}
                          fallbackLabel={c.nome}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        {c.curado ? (
                          <span className="absolute -bottom-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-offwhite bg-gold text-navy-deep">
                            <Sparkles size={9} strokeWidth={2.4} />
                          </span>
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{c.nome}</p>
                        <p className="text-xs text-ink-2">{c.cargo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-navy">{areaNome(c.area)}</p>
                    <p className="text-xs text-ink-3">{cidadeNome(c.cidade)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${PLANO_BADGE[c.plano]}`}
                    >
                      {c.plano === "premium" ? (
                        <Sparkles size={11} strokeWidth={2} />
                      ) : null}
                      {PLANO_LABEL[c.plano]}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
                    Ha {DIAS_OFFSET[i % DIAS_OFFSET.length]}d
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${STATUS_BADGE[st]}`}
                    >
                      {st}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
                    >
                      Ver perfil <ExternalLink size={11} strokeWidth={1.7} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {linhas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-ink-2"
                >
                  Nenhum candidato com esses filtros.
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

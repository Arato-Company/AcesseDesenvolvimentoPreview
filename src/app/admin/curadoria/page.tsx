"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  MapPin,
  Briefcase,
  Clock,
  SlidersHorizontal,
  Share2,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import candidatos from "@/data/candidatos.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Candidato, PlanoCandidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

type Tab = "Pendentes" | "Em analise" | "Aprovados" | "Rejeitados";
const TABS: Tab[] = ["Pendentes", "Em analise", "Aprovados", "Rejeitados"];

const PLANO_BADGE: Record<PlanoCandidato, string> = {
  premium: "border border-gold bg-gold/15 text-gold-deep",
  destaque: "border border-line bg-paper text-navy",
  start: "border border-line bg-paper text-ink-2",
};
const PLANO_LABEL: Record<PlanoCandidato, string> = {
  premium: "Premium",
  destaque: "Destaque",
  start: "Start",
};

const ANOS_POR_NIVEL: Record<Candidato["nivel"], string> = {
  Junior: "2 anos",
  Pleno: "5 anos",
  Senior: "10 anos",
  Especialista: "15 anos",
};

const ATUALIZACAO = ["Hoje, 10:45", "Ontem", "2 dias atras", "Ha 3 dias"];

const CIDADES_RODAPE = ["Amparo", "Jaguariuna", "Serra Negra", "Socorro"];

function listFor(tab: Tab): Candidato[] {
  switch (tab) {
    case "Pendentes":
      return candidatosTyped.filter((c) => !c.curado && c.matchScore < 85);
    case "Em analise":
      return candidatosTyped.filter((c) => !c.curado && c.matchScore >= 85);
    case "Aprovados":
      return candidatosTyped.filter((c) => c.curado);
    case "Rejeitados":
      return [];
  }
}

/** CV highlights mock deterministicos (resumo + dominios das tags). */
function highlightsFor(c: Candidato): string[] {
  const base = [c.resumo];
  for (const t of c.tags.slice(0, 2)) base.push(`Dominio avancado em ${t}.`);
  return base.slice(0, 3);
}

/**
 * /admin/curadoria — Stitch v2 (cards + quick view). Nav global navegavel,
 * tabs in-page com contagem, fotos reais dos candidatos.
 */
export default function AdminCuradoriaPage() {
  const [tab, setTab] = useState<Tab>("Pendentes");
  const linhas = useMemo(() => listFor(tab), [tab]);
  const [selected, setSelected] = useState<Candidato>(
    () => listFor("Pendentes")[0] ?? candidatosTyped[0],
  );

  const counts = useMemo(
    () =>
      ({
        Pendentes: listFor("Pendentes").length,
        "Em analise": listFor("Em analise").length,
        Aprovados: listFor("Aprovados").length,
        Rejeitados: 0,
      }) as Record<Tab, number>,
    [],
  );

  const changeTab = (t: Tab) => {
    setTab(t);
    const first = listFor(t)[0];
    if (first) setSelected(first);
  };

  return (
    <AppAdminShell topbarTitle="Fila de curadoria">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
        {/* ==================== LISTA ==================== */}
        <section>
          {/* Tabs + ordenacao */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line">
            <div className="flex flex-wrap gap-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => changeTab(t)}
                  className={`relative -mb-px px-4 py-3 font-mono text-2xs uppercase tracking-widest transition ${
                    tab === t ? "text-navy" : "text-ink-3 hover:text-navy"
                  }`}
                >
                  {t}
                  {counts[t] > 0 ? ` (${counts[t]})` : ""}
                  {tab === t ? (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold" />
                  ) : null}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mb-2 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-ink-3 hover:text-navy"
            >
              Ordenar por: recentes
              <SlidersHorizontal size={14} strokeWidth={1.7} />
            </button>
          </div>

          {/* Cards */}
          {linhas.length === 0 ? (
            <div className="empty-state">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Nada aqui
              </p>
              <h3 className="font-display text-2xl font-semibold text-navy">
                Nenhum perfil nesta fila.
              </h3>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {linhas.map((c) => {
                const ativo = selected.id === c.id;
                return (
                  <article
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`cursor-pointer rounded-xl border bg-offwhite p-6 transition-all ${
                      ativo
                        ? "border-l-4 border-l-gold border-line shadow-1"
                        : "border-line hover:border-gold-light"
                    }`}
                  >
                    {/* Topo: identidade + match */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <PlaceholderImage
                          src={`/avatares/${c.id}.webp`}
                          alt={c.nome}
                          fallbackLabel={c.nome}
                          width={56}
                          height={56}
                          className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-navy">
                              {c.nome}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${PLANO_BADGE[c.plano]}`}
                            >
                              {c.plano === "premium" ? (
                                <Sparkles size={10} strokeWidth={2.2} />
                              ) : null}
                              {PLANO_LABEL[c.plano]}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-ink-2">
                            {c.cargo} · {areaNome(c.area)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg font-bold text-navy">
                          {c.matchScore}%{" "}
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
                            match
                          </span>
                        </p>
                        <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-paper">
                          <div
                            className="h-full rounded-full bg-gold"
                            style={{ width: `${c.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-5 grid grid-cols-1 gap-4 border-t border-dashed border-line pt-5 sm:grid-cols-3">
                      <Meta
                        icon={MapPin}
                        label="Localizacao"
                        value={`${cidadeNome(c.cidade)}, SP`}
                      />
                      <Meta
                        icon={Briefcase}
                        label="Experiencia"
                        value={ANOS_POR_NIVEL[c.nivel]}
                      />
                      <Meta
                        icon={Clock}
                        label="Ultima atualizacao"
                        value={
                          ATUALIZACAO[
                            Number(c.id.replace(/\D/g, "")) % ATUALIZACAO.length
                          ]
                        }
                      />
                    </div>

                    {/* Acoes */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button type="button" className="btn btn-primary btn-sm">
                        Revisar perfil
                      </button>
                      <button type="button" className="btn btn-secondary btn-sm">
                        <Sparkles size={12} strokeWidth={2} />
                        Aprovar
                      </button>
                      <button
                        type="button"
                        className="font-mono text-2xs uppercase tracking-widest text-ink-3 hover:text-navy"
                      >
                        Solicitar ajuste
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ==================== QUICK VIEW ==================== */}
        <aside className="self-start rounded-xl border border-line bg-offwhite p-6 shadow-1 xl:sticky xl:top-20">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Quick view ·{" "}
            <span className="text-gold-deep">{selected.nome}</span>
          </p>

          <h3 className="mt-6 font-display text-xl font-semibold text-navy">
            CV Highlights
          </h3>
          <ul className="mt-4 space-y-3">
            {highlightsFor(selected).map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-2">
                <Sparkles
                  size={16}
                  strokeWidth={1.8}
                  className="mt-0.5 flex-shrink-0 text-gold-deep"
                  aria-hidden="true"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-2xs uppercase tracking-widest text-ink-3">
            Areas alvo
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selected.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md bg-navy px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-offwhite"
              >
                {t}
              </span>
            ))}
          </div>

          <label className="mt-8 block">
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              Notas da curadoria
            </span>
            <textarea
              className="field-textarea mt-3"
              rows={5}
              placeholder="Escreva aqui as observacoes internas ou orientacoes para ajuste..."
            />
          </label>

          <div className="mt-4 flex items-center gap-3">
            <button type="button" className="btn btn-gold flex-1">
              Salvar anotacao
            </button>
            <button
              type="button"
              className="btn btn-secondary flex h-11 w-11 flex-shrink-0 items-center justify-center px-0"
              aria-label="Compartilhar"
            >
              <Share2 size={16} strokeWidth={1.7} />
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          © 2026 Acesse Desenvolvimento · Circuito das Aguas
        </p>
        <div className="flex flex-wrap gap-5">
          {CIDADES_RODAPE.map((c) => (
            <span
              key={c}
              className="font-mono text-2xs uppercase tracking-widest text-ink-3"
            >
              {c}
            </span>
          ))}
        </div>
      </footer>
    </AppAdminShell>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
        {label}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-navy">
        <Icon size={14} strokeWidth={1.7} className="text-gold-deep" aria-hidden="true" />
        {value}
      </p>
    </div>
  );
}

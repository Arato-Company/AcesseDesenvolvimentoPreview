"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import candidatos from "@/data/candidatos.json";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import { cidadeNome } from "@/data/lookups";
import { scoreColor } from "@/lib/scoreColor";
import type {
  AreaSlug,
  Candidato,
  Cidade,
  CidadeSlug,
  NivelExperiencia,
  RegimeContratacao,
} from "@/types";

const candidatosTyped = candidatos as Candidato[];
const cidadesTyped = cidades as Cidade[];

const NIVEIS: NivelExperiencia[] = ["Junior", "Pleno", "Senior"];
const CONTRATOS: Array<RegimeContratacao | "todos"> = [
  "todos",
  "CLT",
  "PJ",
  "Temporario",
];

function avatarPath(id: string): string {
  // cand-001..010 — Batch 4 entrega webp; PlaceholderImage cuida do fallback.
  const num = id.replace("cand-", "");
  return `/avatares/cand-${num}.webp`;
}

/**
 * /empresa/vitrine — W03 (Batch 3, fiel ao Stitch).
 *
 * Layout:
 *  - sidebar 280px com filtros estruturados (toggle curados destaque, chips area,
 *    checkboxes senioridade, chips cidade, select contrato)
 *  - content header com display-lg "N profissionais" + pill "✦ N CURADOS"
 *  - grid 1/2/3 cols com profile-card centered (foto 96px, score 18px, tags)
 *  - paginacao inferior
 */
export default function EmpresaVitrinePage() {
  const [apenasCurados, setApenasCurados] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<Set<AreaSlug>>(new Set());
  const [selectedCidades, setSelectedCidades] = useState<Set<CidadeSlug>>(
    new Set(),
  );
  const [selectedNiveis, setSelectedNiveis] = useState<Set<NivelExperiencia>>(
    new Set(),
  );
  const [contrato, setContrato] = useState<RegimeContratacao | "todos">(
    "todos",
  );

  const filtrados = useMemo(() => {
    return candidatosTyped.filter((c) => {
      if (apenasCurados && !c.curado) return false;
      if (selectedAreas.size > 0 && !selectedAreas.has(c.area)) return false;
      if (selectedCidades.size > 0 && !selectedCidades.has(c.cidade))
        return false;
      if (selectedNiveis.size > 0 && !selectedNiveis.has(c.nivel)) return false;
      // Contrato e mock — filtro nao aplica (dados nao tem regime no Candidato).
      return true;
    });
  }, [apenasCurados, selectedAreas, selectedCidades, selectedNiveis]);

  const curadosTotal = candidatosTyped.filter((c) => c.curado).length;

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const limpar = () => {
    setApenasCurados(false);
    setSelectedAreas(new Set());
    setSelectedCidades(new Set());
    setSelectedNiveis(new Set());
    setContrato("todos");
  };

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Vitrine de profissionais"
      topbarUserName="Carolina Antunes"
      topbarUserLabel="CA"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar filtros */}
        <aside className="filters w-full lg:w-[280px]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-[20px] font-semibold text-navy">
              Filtros
            </h2>
            <button
              type="button"
              onClick={limpar}
              className="eyebrow text-gold-deep hover:text-navy"
            >
              Limpar
            </button>
          </div>

          {/* Apenas curados destacado */}
          <div className="mb-6 flex items-center justify-between rounded-lg border border-gold-light/50 bg-gold-light/20 p-4">
            <span className="eyebrow font-bold text-gold-deep">
              ✦ Apenas curados
            </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={apenasCurados}
                onChange={(e) => setApenasCurados(e.target.checked)}
              />
              <span className="toggle-switch-slider" />
            </label>
          </div>

          <div className="filter-group">
            <p className="filter-label">Area de atuacao</p>
            <div className="chip-group">
              {areas.map((a) => (
                <button
                  key={a.slug}
                  type="button"
                  aria-pressed={selectedAreas.has(a.slug as AreaSlug)}
                  className={`chip ${
                    selectedAreas.has(a.slug as AreaSlug) ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedAreas((s) => toggle(s, a.slug as AreaSlug))
                  }
                >
                  {a.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-label">Senioridade</p>
            <div className="flex flex-col gap-2">
              {NIVEIS.map((n) => (
                <label
                  key={n}
                  className="flex cursor-pointer items-center gap-3 text-sm text-ink-2 hover:text-navy"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line"
                    checked={selectedNiveis.has(n)}
                    onChange={() => setSelectedNiveis((s) => toggle(s, n))}
                  />
                  {n}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-label">Cidade</p>
            <div className="chip-group">
              {cidadesTyped.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={selectedCidades.has(c.slug)}
                  className={`chip ${
                    selectedCidades.has(c.slug) ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedCidades((s) => toggle(s, c.slug))
                  }
                >
                  {c.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-label">Contrato</p>
            <select
              className="field-select mt-3"
              value={contrato}
              onChange={(e) =>
                setContrato(e.target.value as RegimeContratacao | "todos")
              }
            >
              {CONTRATOS.map((c) => (
                <option key={c} value={c}>
                  {c === "todos" ? "Todos os tipos" : c}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Conteudo */}
        <div className="flex flex-col">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-ink-2">
                Vitrine de profissionais
              </p>
              <h2 className="display-lg font-display leading-none tracking-tight text-navy">
                {filtrados.length} profissionais
              </h2>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold bg-gold-light px-4 py-2 font-bold text-navy-deep shadow-sm">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                ✦ {curadosTotal} Curados
              </span>
              <p className="font-body text-sm italic text-ink-3">
                Atualizado hoje as 08:45
              </p>
            </div>
          </div>

          {filtrados.length === 0 ? (
            <div className="empty-state">
              <p className="eyebrow text-ink-3">Sem resultados</p>
              <h3 className="display-md">
                Nenhum perfil bate com esse filtro.
              </h3>
              <p className="max-w-md text-sm text-ink-2">
                Ajuste os filtros pra ver mais perfis ou peca triagem direta com
                a equipe pelo plano Premium.
              </p>
              <button
                type="button"
                onClick={limpar}
                className="btn btn-secondary"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((c) => (
                <article
                  key={c.id}
                  className={`profile-card ${
                    c.curado ? "profile-card-curado" : ""
                  } group relative transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
                >
                  {c.curado ? (
                    <span className="profile-curado-badge">✦ CURADO</span>
                  ) : null}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <PlaceholderImage
                        src={avatarPath(c.id)}
                        alt={c.nome}
                        fallbackLabel={c.nome}
                        width={96}
                        height={96}
                        className={`h-24 w-24 rounded-full object-cover ${
                          c.curado
                            ? "border-4 border-gold-light"
                            : "border-4 border-offwhite"
                        }`}
                      />
                      {c.curado ? (
                        <span className="absolute bottom-0 right-0 rounded-full border-2 border-offwhite bg-gold-light p-1 text-navy">
                          <BadgeCheck
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </div>
                    <h3 className="profile-name mb-1">{c.nome}</h3>
                    <p className="profile-role mb-4">{c.cargo}</p>
                    <div className="mb-6 flex items-center gap-1">
                      <MapPin
                        className="h-3 w-3 text-ink-3"
                        aria-hidden="true"
                      />
                      <span className="eyebrow text-[10px] text-ink-3">
                        {cidadeNome(c.cidade)}
                      </span>
                    </div>
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                      {c.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex w-full items-center justify-between border-t border-dashed border-line pt-4">
                      <div className="text-left">
                        <p className="eyebrow text-[9px] text-ink-3">Match</p>
                        <p
                          className={`font-display text-[18px] font-bold ${scoreColor(c.matchScore)}`}
                        >
                          {c.matchScore}%
                        </p>
                      </div>
                      <Link
                        href={`/empresa/candidato/${c.id}`}
                        className="btn btn-primary btn-sm uppercase"
                      >
                        Ver perfil
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              type="button"
              className="btn btn-ghost inline-flex items-center gap-1"
              disabled
              aria-label="Pagina anterior"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Anterior
            </button>
            <span className="pagination-info">
              Pagina <strong>01</strong> / <strong>12</strong>
            </span>
            <button
              type="button"
              className="btn btn-ghost inline-flex items-center gap-1"
            >
              Proxima
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

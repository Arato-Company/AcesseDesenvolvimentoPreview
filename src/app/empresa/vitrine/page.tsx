"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CardCandidato } from "@/components/CardCandidato";
import candidatos from "@/data/candidatos.json";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type {
  AreaSlug,
  Candidato,
  Cidade,
  CidadeSlug,
  NivelExperiencia,
} from "@/types";

const candidatosTyped = candidatos as Candidato[];
const cidadesTyped = cidades as Cidade[];

const NIVEIS: NivelExperiencia[] = ["Junior", "Pleno", "Senior", "Especialista"];

/**
 * /empresa/vitrine — fonte: Web/03 - Vitrine Profissionais.html.
 * Star do produto. Lista candidatos com filtros:
 *  - toggle "apenas curados"
 *  - chips por area
 *  - checks por nivel
 *  - chips por cidade
 * Filtros sao client-side sobre `candidatos.json` (10 perfis).
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

  const filtrados = useMemo(() => {
    return candidatosTyped.filter((c) => {
      if (apenasCurados && !c.curado) return false;
      if (selectedAreas.size > 0 && !selectedAreas.has(c.area)) return false;
      if (selectedCidades.size > 0 && !selectedCidades.has(c.cidade))
        return false;
      if (selectedNiveis.size > 0 && !selectedNiveis.has(c.nivel)) return false;
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
  };

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Vitrine de profissionais"
      topbarUserLabel="CA"
    >
      <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caps mb-2">Vitrine</p>
          <h1 className="display-lg">
            {filtrados.length} profissionais{" "}
            <span className="text-ink-3">de {candidatosTyped.length}</span>
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            ✦ {curadosTotal} perfis com selo Curado. Atualizado hoje.
          </p>
        </div>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          Recorte regional · Circuito das Aguas
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filtros */}
        <aside className="filters">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy">
              Filtros
            </h2>
            <button
              type="button"
              onClick={limpar}
              className="font-mono text-2xs uppercase tracking-widest text-gold-deep hover:text-navy"
            >
              Limpar
            </button>
          </div>

          <div className="filter-group">
            <p className="filter-label">Apenas curados</p>
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink-2">
                Mostrar so perfis com ✦
              </span>
              <span className="toggle-switch">
                <input
                  type="checkbox"
                  checked={apenasCurados}
                  onChange={(e) => setApenasCurados(e.target.checked)}
                />
                <span className="toggle-switch-slider" />
              </span>
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
                  className={`chip ${selectedAreas.has(a.slug as AreaSlug) ? "active" : ""}`}
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
                  className={`chip ${selectedCidades.has(c.slug) ? "active" : ""}`}
                  onClick={() => setSelectedCidades((s) => toggle(s, c.slug))}
                >
                  {c.nome}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div>
          {filtrados.length === 0 ? (
            <div className="empty-state">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Sem resultados
              </p>
              <h3 className="display-md">Nenhum perfil bate com esse filtro.</h3>
              <p className="max-w-md text-sm text-ink-2">
                Ajuste os filtros pra ver mais perfis. Voce tambem pode pedir
                triagem direta com a equipe pelo plano Premium.
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtrados.map((c) => (
                <CardCandidato key={c.id} candidato={c} />
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              type="button"
              className="btn btn-ghost"
              disabled
              aria-label="Pagina anterior"
            >
              ← Anterior
            </button>
            <span className="pagination-info">
              Pagina <strong>01</strong> de <strong>01</strong>
            </span>
            <button type="button" className="btn btn-ghost" disabled>
              Proxima →
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

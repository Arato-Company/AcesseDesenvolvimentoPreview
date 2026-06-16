"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FavoriteProfileCard } from "@/components/FavoriteProfileCard";
import candidatos from "@/data/candidatos.json";
import type { Candidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

const SEED_FAVORITOS: string[] = [
  "cand-001",
  "cand-002",
  "cand-003",
  "cand-006",
  "cand-009",
];

const TABS = ["MAIS RECENTES", "MAIOR MATCH", "POR AREA"];

const PRETENSAO_MOCK: Record<string, string> = {
  "cand-001": "R$ 5.500",
  "cand-002": "R$ 3.200",
  "cand-003": "R$ 4.100",
  "cand-006": "R$ 3.800",
  "cand-009": "R$ 6.200",
};

const DISPONIBILIDADE_MOCK: Record<string, string> = {
  "cand-001": "Imediata",
  "cand-002": "30 dias",
  "cand-003": "15 dias",
  "cand-006": "Imediata",
  "cand-009": "Imediata",
};

/**
 * /empresa/favoritos — W07. Grid 2-col com FavoriteProfileCard.
 * Tabs ordenacao, status contato em localStorage, WhatsApp em vez de chat interno.
 */
export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<string[]>(SEED_FAVORITOS);
  const [aba, setAba] = useState(TABS[0]);

  const candidatosFav = useMemo(() => {
    const lista = favoritos
      .map((id) => candidatosTyped.find((c) => c.id === id))
      .filter((c): c is Candidato => Boolean(c));

    if (aba === "MAIOR MATCH") {
      return [...lista].sort((a, b) => b.matchScore - a.matchScore);
    }
    if (aba === "POR AREA") {
      return [...lista].sort((a, b) => a.area.localeCompare(b.area));
    }
    return lista;
  }, [favoritos, aba]);

  const remover = (id: string) =>
    setFavoritos((prev) => prev.filter((x) => x !== id));

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Favoritos"
      topbarUserLabel="EM"
    >
      <header className="mb-10">
        <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
          Curadoria propria
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Seus favoritos
        </h1>
        <p className="mt-2 text-base text-ink-2">
          {candidatosFav.length} perfis salvos na sua curadoria.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-3">
        <div className="flex gap-6">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setAba(t)}
              className={`relative pb-3 font-mono text-2xs uppercase tracking-widest transition ${
                aba === t ? "text-navy" : "text-ink-3 hover:text-navy"
              }`}
            >
              {t}
              {aba === t ? (
                <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-gold" />
              ) : null}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-secondary btn-sm">
          <SlidersHorizontal size={14} strokeWidth={1.7} />
          Filtros avancados
        </button>
      </div>

      {candidatosFav.length === 0 ? (
        <div className="empty-state">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Lista vazia
          </p>
          <h3 className="font-display text-2xl font-semibold text-navy">
            Nenhum perfil salvo ainda.
          </h3>
          <p className="max-w-md text-sm text-ink-2">
            Salve candidatos enquanto navega pela Vitrine pra revisar com calma
            depois ou compartilhar com o time.
          </p>
          <Link href="/empresa/vitrine" className="btn btn-primary">
            Ir pra vitrine
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {candidatosFav.map((c) => (
            <FavoriteProfileCard
              key={c.id}
              candidato={c}
              pretensao={PRETENSAO_MOCK[c.id]}
              disponibilidade={DISPONIBILIDADE_MOCK[c.id]}
              onRemove={() => remover(c.id)}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}

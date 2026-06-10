"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CardCandidato } from "@/components/CardCandidato";
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

/**
 * /empresa/favoritos — fonte: Web/07 - Favoritos.html.
 * Lista candidatos salvos. Estado client-only (v0 nao persiste).
 * Permite remover; quando vazio, mostra empty state com link pra Vitrine.
 */
export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<string[]>(SEED_FAVORITOS);

  const candidatosFav = useMemo(
    () =>
      favoritos
        .map((id) => candidatosTyped.find((c) => c.id === id))
        .filter((c): c is Candidato => Boolean(c)),
    [favoritos],
  );

  const remover = (id: string) =>
    setFavoritos((prev) => prev.filter((x) => x !== id));

  const limpar = () => setFavoritos([]);

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Favoritos"
      topbarUserLabel="CA"
    >
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caps mb-2">Salvos</p>
          <h1 className="display-lg">
            {candidatosFav.length} perfis{" "}
            <span className="text-ink-3">salvos</span>
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            Lista local desta sessao. Em producao, os favoritos ficam vinculados
            a conta empresa.
          </p>
        </div>
        {candidatosFav.length > 0 ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={limpar}
          >
            Limpar lista
          </button>
        ) : null}
      </header>

      {candidatosFav.length === 0 ? (
        <div className="empty-state">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Lista vazia
          </p>
          <h3 className="display-md">Nenhum perfil salvo ainda.</h3>
          <p className="max-w-md text-sm text-ink-2">
            Salve candidatos enquanto navega pela Vitrine para revisar com calma
            depois ou compartilhar com o time.
          </p>
          <Link href="/empresa/vitrine" className="btn btn-primary">
            Ir pra vitrine
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {candidatosFav.map((c) => (
            <div key={c.id} className="relative">
              <CardCandidato candidato={c} />
              <button
                type="button"
                onClick={() => remover(c.id)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-offwhite text-ink-2 shadow-2 transition hover:border-gold hover:text-gold-deep"
                aria-label={`Remover ${c.nome} dos favoritos`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}

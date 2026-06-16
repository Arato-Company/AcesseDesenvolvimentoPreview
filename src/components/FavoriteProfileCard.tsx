"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Star, Trash2 } from "lucide-react";
import { Avatar } from "./Avatar";
import type { Candidato } from "@/types";
import { cidadeNome, areaNome } from "@/data/lookups";

const STATUS_KEY = "favoritos-status-v0";

type FavStatus = "NAO" | "EM" | "JA";
const STATUS_LABEL: Record<FavStatus, string> = {
  NAO: "Nao contatado",
  EM: "Em contato",
  JA: "Ja contatado",
};

type FavoriteProfileCardProps = {
  candidato: Candidato;
  /** Pretensao salarial mock (nao no JSON). */
  pretensao?: string;
  /** Disponibilidade mock. */
  disponibilidade?: string;
  onRemove: () => void;
};

function readStatus(id: string): FavStatus {
  if (typeof window === "undefined") return "NAO";
  try {
    const raw = window.localStorage.getItem(STATUS_KEY);
    if (!raw) return "NAO";
    const map = JSON.parse(raw) as Record<string, FavStatus>;
    return map[id] ?? "NAO";
  } catch {
    return "NAO";
  }
}

function writeStatus(id: string, status: FavStatus) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STATUS_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, FavStatus>) : {};
    map[id] = status;
    window.localStorage.setItem(STATUS_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * Card de favorito (W07). Star top-right, meta-grid + dropdown status persistido
 * em localStorage, footer com WhatsApp (sem chat interno).
 */
export function FavoriteProfileCard({
  candidato,
  pretensao = "Sob consulta",
  disponibilidade = "Imediata",
  onRemove,
}: FavoriteProfileCardProps) {
  const [status, setStatus] = useState<FavStatus>("NAO");

  useEffect(() => {
    setStatus(readStatus(candidato.id));
  }, [candidato.id]);

  const handleStatus = (v: FavStatus) => {
    setStatus(v);
    writeStatus(candidato.id, v);
  };

  const cidade = cidadeNome(candidato.cidade);
  const area = areaNome(candidato.area);
  const whatsappMsg = encodeURIComponent(
    `Olá, sou da equipe de RH e gostaria de conversar sobre uma oportunidade em ${cidade}.`,
  );

  return (
    <article className="relative flex flex-col gap-5 rounded-xl border border-line bg-offwhite p-6 transition hover:border-gold-light hover:shadow-2">
      <Star
        size={20}
        strokeWidth={1.5}
        className="absolute right-6 top-6 fill-gold text-gold"
      />

      <div className="flex items-start gap-4 pr-8">
        <Avatar name={candidato.nome} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-navy">
            {candidato.nome}
          </p>
          <p className="text-sm text-ink-2">{candidato.cargo}</p>
          <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-ink-3">
            {cidade} · SP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg bg-paper p-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Area
          </p>
          <p className="text-sm font-semibold text-navy">{area}</p>
        </div>
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Experiencia
          </p>
          <p className="text-sm font-semibold text-navy">{candidato.nivel}</p>
        </div>
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Pretensao
          </p>
          <p className="text-sm font-semibold text-navy">{pretensao}</p>
        </div>
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Disponibilidade
          </p>
          <p className="text-sm font-semibold text-navy">{disponibilidade}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <a
          href={`https://wa.me/?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
          aria-label={`Conversar via WhatsApp com ${candidato.nome}`}
        >
          <MessageCircle size={14} strokeWidth={1.7} />
          WhatsApp
        </a>

        <label className="inline-flex items-center gap-2">
          <span className="sr-only">Status contato</span>
          <select
            value={status}
            onChange={(e) => handleStatus(e.target.value as FavStatus)}
            className="rounded-md border border-line bg-offwhite px-2 py-1 font-mono text-2xs uppercase tracking-widest text-ink-2"
          >
            <option value="NAO">{STATUS_LABEL.NAO}</option>
            <option value="EM">{STATUS_LABEL.EM}</option>
            <option value="JA">{STATUS_LABEL.JA}</option>
          </select>
        </label>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-widest text-danger transition hover:opacity-70"
        >
          <Trash2 size={12} strokeWidth={1.7} />
          Remover
        </button>
      </div>
    </article>
  );
}

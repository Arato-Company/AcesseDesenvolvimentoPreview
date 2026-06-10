import Link from "next/link";
import type { Candidato } from "@/types";
import { Avatar } from "./Avatar";
import { cidadeNome } from "@/data/lookups";

type CardCandidatoProps = {
  candidato: Candidato;
  /** Quando true, esconde botao "Ver perfil" — usado em widgets compactos. */
  compact?: boolean;
};

/**
 * Card de perfil de candidato pra Vitrine e Dashboard.
 * `curado: true` ativa visual gold (`profile-card-curado` + selo).
 */
export function CardCandidato({ candidato, compact = false }: CardCandidatoProps) {
  const cidade = cidadeNome(candidato.cidade);
  const isCurado = candidato.curado;

  return (
    <article
      className={`profile-card ${isCurado ? "profile-card-curado" : ""}`}
    >
      {isCurado ? (
        <span className="profile-curado-badge">✦ Curado</span>
      ) : null}

      <div className="profile-card-header">
        <Avatar name={candidato.nome} size="md" />
        <div className="min-w-0 flex-1">
          <p className="profile-name">{candidato.nome}</p>
          <p className="profile-role">{candidato.cargo}</p>
          <p className="profile-city">
            <svg
              viewBox="0 0 24 24"
              width="11"
              height="11"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {cidade} · SP
          </p>
        </div>
      </div>

      <div className="profile-tags">
        {candidato.tags.map((t) => (
          <span key={t} className={`tag${isCurado ? " tag-gold" : ""}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="profile-match">
        <span className="match-label">Match</span>
        <span className="match-score">{candidato.matchScore}%</span>
      </div>

      {compact ? null : (
        <div className="profile-card-action">
          <Link
            href={`/empresa/candidato/${candidato.id}`}
            className="btn btn-primary btn-block btn-sm"
          >
            Ver perfil
          </Link>
        </div>
      )}
    </article>
  );
}

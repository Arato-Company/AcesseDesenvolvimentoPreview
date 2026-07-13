import Link from "next/link";
import { MapPin } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { cidadeNome } from "@/data/lookups";
import { scoreColor } from "@/lib/scoreColor";
import type { CandidatoMatch } from "@/types";

/**
 * Card horizontal de candidato aderente (tela de matching).
 * 3 zonas: score (esquerda) · identidade + motivos (centro) · ação (direita).
 * Mobile (< md): empilha, score vira badge no topo e o botão ocupa a largura.
 */
export function CardCandidatoMatch({ match }: { match: CandidatoMatch }) {
  const { candidato, score, reasons } = match;

  return (
    <article
      className={`profile-card ${
        candidato.curado ? "profile-card-curado" : ""
      } relative flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-6`}
    >
      {candidato.curado ? (
        <span className="profile-curado-badge">✦ CURADO</span>
      ) : null}

      {/* Score — badge no mobile, coluna no desktop */}
      <div className="absolute right-4 top-4 flex flex-col items-center md:static md:w-16 md:flex-shrink-0">
        <span className={`font-display text-[22px] font-bold ${scoreColor(score)}`}>
          {score}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-3">
          Match
        </span>
      </div>

      {/* Identidade + motivos */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <Avatar name={candidato.nome} className="!h-12 !w-12 text-base" />
          <div className="min-w-0">
            <h3 className="profile-name truncate">{candidato.nome}</h3>
            <p className="profile-role truncate">{candidato.cargo}</p>
            <p className="profile-city mt-0.5 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {cidadeNome(candidato.cidade)}
            </p>
          </div>
        </div>

        {reasons.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {reasons.map((r) => (
              <span
                key={r.label}
                className={r.strength === "high" ? "tag-gold" : "tag"}
              >
                {r.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Ação */}
      <div className="flex-shrink-0 self-stretch md:self-center">
        <Link
          href={`/empresa/candidato/${candidato.id}`}
          className="btn btn-primary btn-sm w-full md:w-auto"
        >
          Ver perfil completo
        </Link>
      </div>
    </article>
  );
}

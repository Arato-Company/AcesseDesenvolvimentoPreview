import type { StatusBusca } from "@/types";

type MatchBannerProps = {
  status: StatusBusca;
  total: number;
  curados: number;
};

/**
 * Banner de estado da busca inteligente na tela de matching.
 *  - processando: pulso animado + copy de "buscando".
 *  - resultado: contagem de aderentes + pill de curados.
 */
export function MatchBanner({ status, total, curados }: MatchBannerProps) {
  if (status === "processando") {
    return (
      <div className="rounded-xl bg-navy p-6">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 animate-pulse rounded-full bg-gold"
            aria-hidden="true"
          />
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-light">
            Buscando
          </p>
        </div>
        <p className="mt-3 font-display text-xl text-offwhite">
          Buscando candidatos que batem com seus criterios...
        </p>
        <p className="mt-1 text-sm text-offwhite/70">
          A gente volta em alguns instantes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-navy p-6">
      <div>
        <p className="font-mono text-2xs uppercase tracking-widest text-gold-light">
          ✦ {total} {total === 1 ? "candidato aderente" : "candidatos aderentes"}
        </p>
        <p className="mt-1 text-sm text-offwhite/70">
          Encontrados no pool do Circuito · rankeados por aderencia.
        </p>
      </div>
      {curados > 0 ? (
        <span className="eyebrow flex-shrink-0 rounded-full border border-gold px-4 py-2 text-gold">
          ✦ {curados} curados
        </span>
      ) : null}
    </div>
  );
}

import type { Vaga } from "@/types";
import { areaNome, cidadeNome, empresaById } from "@/data/lookups";

type CardVagaProps = {
  vaga: Vaga;
};

function brl(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/**
 * Card de vaga publicada — usado em Dashboard empresa, listas de vagas
 * e (futuramente) job board publico.
 */
export function CardVaga({ vaga }: CardVagaProps) {
  const empresa = empresaById(vaga.empresaId);
  const cidade = cidadeNome(vaga.cidade);
  const area = areaNome(vaga.area);

  const salarioLabel =
    vaga.salarioMin != null && vaga.salarioMax != null
      ? `${brl(vaga.salarioMin)} – ${brl(vaga.salarioMax)}`
      : "Salario a combinar";

  return (
    <article className={`profile-card ${vaga.curada ? "profile-card-curado" : ""}`}>
      {vaga.curada ? (
        <span className="profile-curado-badge">✦ Vaga destaque</span>
      ) : null}

      <div className="flex flex-col gap-2">
        <p className="caps">{area}</p>
        <p className="profile-name">{vaga.titulo}</p>
        <p className="text-sm text-ink-2">
          {empresa?.nome ?? "Empresa do recorte"} · {cidade} · SP
        </p>
      </div>

      <p className="text-sm text-ink-2 leading-relaxed">{vaga.resumo}</p>

      <div className="profile-tags">
        <span className="tag">{vaga.regime.toUpperCase()}</span>
        {vaga.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="profile-match">
        <span className="match-label">Faixa</span>
        <span className="match-score text-sm">{salarioLabel}</span>
      </div>
    </article>
  );
}

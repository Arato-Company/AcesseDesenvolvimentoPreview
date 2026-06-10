import type { ReactNode } from "react";

type PricingCardProps = {
  nome: string;
  preco: number;
  /** "/mes" pra empresa, "5 meses" pra candidato. */
  periodo: string;
  destaques: string[];
  /** Quando true, aplica `.plan-card-featured` ou `.plan-card-premium`. */
  variant?: "default" | "featured" | "premium";
  badge?: string;
  badgeVariant?: "default" | "gold";
  /** CTA passa como ReactNode (Button como link, etc.). */
  cta: ReactNode;
};

/**
 * Card de plano — usado em LP `<section>` de pricing,
 * `/empresa/planos` e `/candidato/planos`.
 */
export function PricingCard({
  nome,
  preco,
  periodo,
  destaques,
  variant = "default",
  badge,
  badgeVariant = "default",
  cta,
}: PricingCardProps) {
  const variantClass =
    variant === "featured"
      ? "plan-card-featured"
      : variant === "premium"
        ? "plan-card-premium"
        : "";

  const precoFormatted = preco.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className={`plan-card ${variantClass}`}>
      {badge ? (
        <p
          className={`plan-badge${badgeVariant === "gold" ? " plan-badge-gold" : ""}`}
        >
          {badge}
        </p>
      ) : null}
      <h3>{nome}</h3>
      <p className="plan-price">
        <span className="price-currency">R$</span>
        <span className="price-amount">{precoFormatted}</span>
        <span className="price-period">{periodo}</span>
      </p>
      <ul className="plan-feats">
        {destaques.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      {cta}
    </article>
  );
}

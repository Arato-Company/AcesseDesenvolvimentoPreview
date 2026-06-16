import { Check } from "lucide-react";

type CreditPackCardProps = {
  eyebrow: string;
  quantidade: number;
  preco: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  /** Selecionado pelo radio do parent (W08). */
  selected?: boolean;
  onSelect?: () => void;
};

/**
 * Card de pacote de creditos pra W08 (empresa).
 * One-shot: sem periodo. Featured tem badge "MELHOR CUSTO".
 */
export function CreditPackCard({
  eyebrow,
  quantidade,
  preco,
  features,
  ctaLabel,
  featured,
  selected,
  onSelect,
}: CreditPackCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border bg-offwhite p-8 transition ${
        featured || selected
          ? "border-gold shadow-gold"
          : "border-line hover:border-gold-light"
      }`}
    >
      {featured ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-gold-deep to-gold px-4 py-1 font-mono text-2xs font-semibold uppercase tracking-widest text-navy-deep">
          Melhor custo
        </span>
      ) : null}

      <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
        {eyebrow}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold text-navy">
        {quantidade}
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-3">
        creditos
      </p>

      <p className="mt-6 font-display text-2xl font-semibold text-navy">
        {preco}
      </p>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
        pagamento unico
      </p>

      <ul className="my-6 flex-1 space-y-3 border-t border-line pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-2">
            <Check
              size={14}
              strokeWidth={2}
              className="mt-0.5 flex-shrink-0 text-gold-deep"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={`btn btn-block ${
          featured || selected ? "btn-gold" : "btn-secondary"
        }`}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

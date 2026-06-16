import { Check } from "lucide-react";

type PlanCardMobileProps = {
  nome: string;
  preco: string;
  periodo: string;
  eyebrow: string;
  features: string[];
  featured?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

/**
 * Card de plano otimizado pra mobile (M07). Featured mostra badge "MAIS ESCOLHIDO".
 */
export function PlanCardMobile({
  nome,
  preco,
  periodo,
  eyebrow,
  features,
  featured,
  selected,
  onSelect,
}: PlanCardMobileProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full rounded-2xl border bg-offwhite p-6 text-left transition ${
        featured || selected
          ? "border-gold shadow-gold"
          : "border-line hover:border-gold-light"
      }`}
    >
      {featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-br from-gold-deep to-gold px-3 py-1 font-mono text-2xs font-semibold uppercase tracking-widest text-navy-deep">
          Mais escolhido
        </span>
      ) : null}

      <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
        {nome}
      </h3>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold text-navy">
          {preco}
        </span>
        <span className="text-sm text-ink-3">/{periodo}</span>
      </div>

      <ul className="mt-4 space-y-2">
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
    </button>
  );
}

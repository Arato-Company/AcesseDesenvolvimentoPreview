import type { LucideIcon } from "lucide-react";

type StatCardKPIProps = {
  label: string;
  value: string;
  /** Delta: ex `+12%` (success) ou `-3%` (danger). Sinal define cor. */
  delta?: string;
  /** Hint alternativo quando nao ha delta. */
  hint?: string;
  icon?: LucideIcon;
};

/**
 * KPI card pro dashboard admin (W10). Card offwhite + label mono + numero display
 * + delta gold/success/danger.
 */
export function StatCardKPI({
  label,
  value,
  delta,
  hint,
  icon: Icon,
}: StatCardKPIProps) {
  const deltaIsPositive = delta?.startsWith("+");
  const deltaColor = delta
    ? deltaIsPositive
      ? "text-success"
      : "text-danger"
    : "text-gold-deep";

  return (
    <div className="rounded-xl border border-line bg-offwhite p-5 shadow-1">
      <div className="flex items-start justify-between">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          {label}
        </p>
        {Icon ? (
          <Icon size={16} strokeWidth={1.7} className={deltaColor} />
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-navy leading-none">
        {value}
      </p>
      <p className={`mt-2 font-mono text-2xs uppercase tracking-widest ${deltaColor}`}>
        {delta ?? hint ?? ""}
      </p>
    </div>
  );
}

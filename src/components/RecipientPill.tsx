import { X } from "lucide-react";

type RecipientPillProps = {
  label: string;
  onRemove: () => void;
};

/**
 * Pill removivel pra destinatarios W16 (comunicacao).
 */
export function RecipientPill({ label, onRemove }: RecipientPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/20 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover ${label}`}
        className="-mr-1 flex h-4 w-4 items-center justify-center rounded-full text-gold-deep transition hover:bg-gold/30"
      >
        <X size={10} strokeWidth={2} />
      </button>
    </span>
  );
}

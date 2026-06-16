import type { LucideIcon } from "lucide-react";

type AdminAlertItemProps = {
  icon: LucideIcon;
  titulo: string;
  subtexto: string;
  /** Cor do icone (default gold). */
  tom?: "gold" | "ink" | "danger" | "success";
  href?: string;
};

const TOM_CLASS: Record<NonNullable<AdminAlertItemProps["tom"]>, string> = {
  gold: "bg-gold/15 text-gold-deep",
  ink: "bg-paper text-ink-2",
  danger: "bg-danger/10 text-danger",
  success: "bg-success/10 text-success",
};

/**
 * Row de alerta operacional pro card direito do W10.
 */
export function AdminAlertItem({
  icon: Icon,
  titulo,
  subtexto,
  tom = "gold",
  href,
}: AdminAlertItemProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-paper/60"
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${TOM_CLASS[tom]}`}
      >
        <Icon size={16} strokeWidth={1.7} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-navy">{titulo}</p>
        <p className="text-xs text-ink-2">{subtexto}</p>
      </div>
    </Wrapper>
  );
}

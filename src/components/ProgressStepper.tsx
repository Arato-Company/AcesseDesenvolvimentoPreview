type ProgressStepperProps = {
  passo: number;
  total: number;
  /** Frase encorajadora opcional ("Falta pouco — curriculo quase pronto."). */
  mensagem?: string;
};

/**
 * Barra de progresso pra onboarding M02. Bar h-1.5 + label "PASSO X DE Y" + %.
 */
export function ProgressStepper({
  passo,
  total,
  mensagem,
}: ProgressStepperProps) {
  const pct = Math.round((passo / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
          Passo {passo} de {total}
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          {pct}%
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-line/40"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gold transition-all duration-slow ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {mensagem ? <p className="text-sm text-ink-2">{mensagem}</p> : null}
    </div>
  );
}

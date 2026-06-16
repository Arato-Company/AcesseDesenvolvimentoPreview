type Distribuicao = {
  label: string;
  pct: number;
  /** Cor da barra: "navy" suave (gratuito), "navy" (profissional), "gold" (premium). */
  cor: "navy-soft" | "navy" | "gold";
};

const DEFAULT_DATA: Distribuicao[] = [
  { label: "Gratuito", pct: 65, cor: "navy-soft" },
  { label: "Profissional", pct: 28, cor: "navy" },
  { label: "Premium", pct: 7, cor: "gold" },
];

const COR_CLASS: Record<Distribuicao["cor"], string> = {
  "navy-soft": "bg-navy/20",
  navy: "bg-navy",
  gold: "bg-gold",
};

type PlanDistributionBarsProps = {
  data?: Distribuicao[];
};

/**
 * 3 linhas horizontal bar pro card "Distribuicao de planos" no W10.
 */
export function PlanDistributionBars({
  data = DEFAULT_DATA,
}: PlanDistributionBarsProps) {
  return (
    <div className="flex flex-col gap-5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-navy">{d.label}</span>
            <span className="font-mono text-xs text-ink-3">{d.pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
            <div
              className={`h-full ${COR_CLASS[d.cor]} transition-all duration-base`}
              style={{ width: `${d.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

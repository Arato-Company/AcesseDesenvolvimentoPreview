import { PageShell } from "@/components/PageShell";
import planos from "@/data/planos.json";

export default function EmpresaPlanosPage() {
  return (
    <PageShell
      eyebrow="Web/08 · Empresa"
      title="Planos · Checkout Empresa"
      description="Tres planos mensais (Basico, Destaque, Premium). Premium inclui concierge humano da curadoria."
    >
      <ul className="grid gap-4 text-left sm:grid-cols-3">
        {planos.empresa.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border border-line bg-offwhite p-6"
          >
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              {p.id}
              {p.recomendado ? " · recomendado" : ""}
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-navy">
              {p.nome}
            </p>
            <p className="mt-2 font-mono text-sm text-ink-2">
              R$ {p.preco.toFixed(2).replace(".", ",")} / mes
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

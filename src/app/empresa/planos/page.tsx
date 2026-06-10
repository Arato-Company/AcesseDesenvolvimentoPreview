import { AppShell } from "@/components/AppShell";
import { PricingCard } from "@/components/PricingCard";
import planos from "@/data/planos.json";
import type { Planos } from "@/types";

const planosTyped = planos as Planos;

/**
 * /empresa/planos — fonte: Web/08 - Planos Checkout Empresa.html.
 * Tres planos mensais. Premium inclui concierge humano.
 * Reutiliza PricingCard pro mesmo visual da LP.
 */
export default function EmpresaPlanosPage() {
  return (
    <AppShell
      audience="empresa"
      topbarTitle="Planos"
      topbarUserLabel="CA"
    >
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <p className="caps mb-3">Planos para empresas</p>
        <h1 className="display-xl mb-4">Mensal recorrente. Sem letra miuda.</h1>
        <p className="lead mx-auto">
          Cancele quando quiser. As parceiras institucionais ganham 2 meses
          gratis.
        </p>
      </header>

      <div className="mb-16 grid items-stretch gap-6 lg:grid-cols-3">
        {planosTyped.empresa.map((p) => {
          const isPremium = p.id === "premium";
          const isDestaque = p.id === "destaque";
          return (
            <PricingCard
              key={p.id}
              nome={p.nome}
              preco={p.preco}
              periodo="/mes"
              destaques={p.destaques}
              variant={
                isPremium ? "premium" : isDestaque ? "featured" : "default"
              }
              badge={
                isPremium
                  ? "✦ Concierge"
                  : isDestaque
                    ? "Mais escolhido"
                    : undefined
              }
              badgeVariant={isPremium ? "gold" : "default"}
              cta={
                <button
                  type="button"
                  className={`btn ${isPremium ? "btn-premium" : isDestaque ? "btn-primary" : "btn-secondary"} btn-block`}
                >
                  {isPremium ? "Falar com a equipe" : "Selecionar plano"}
                </button>
              }
            />
          );
        })}
      </div>

      <section className="mx-auto max-w-2xl rounded-xl border border-line bg-paper p-8">
        <h2 className="display-md mb-4">Como funciona o pagamento?</h2>
        <ul className="flex flex-col gap-3 text-sm text-ink-2">
          <li>
            <strong className="text-navy">Recorrente mensal.</strong> Cartao ou
            boleto. Voce escolhe no checkout.
          </li>
          <li>
            <strong className="text-navy">Sem fidelidade.</strong> Cancele a
            qualquer momento — cobranca para no mes seguinte.
          </li>
          <li>
            <strong className="text-navy">Concierge no Premium.</strong> A
            curadoria humana entrega de 3 a 5 perfis no seu e-mail por busca.
          </li>
          <li>
            <strong className="text-navy">Mock no v0.</strong> Checkout abaixo e
            visual — sem gateway real ainda.
          </li>
        </ul>
      </section>
    </AppShell>
  );
}

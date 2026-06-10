"use client";

import { useState } from "react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PricingCard } from "@/components/PricingCard";
import planos from "@/data/planos.json";
import type { PlanoCandidato, Planos } from "@/types";

const planosTyped = planos as Planos;

/**
 * /candidato/planos — fonte: Mobile/07 - Planos Checkout Candidato.html.
 * 3 planos pre-pagos de 5 meses (Start, Destaque, Premium).
 * Layout em pilha vertical (otimo pra mobile, OK em desktop dentro do
 * phone-frame).
 */
export default function CandidatoPlanosPage() {
  const [selected, setSelected] = useState<PlanoCandidato>("destaque");

  const planoSelecionado = planosTyped.candidato.find((p) => p.id === selected);

  return (
    <CandidatoLayout title="Planos" backHref="/candidato/dashboard">
      <header className="mb-8 text-center">
        <p className="caps mb-2">Visibilidade</p>
        <h1 className="display-md mb-2">Escolha seu plano</h1>
        <p className="text-sm text-ink-2">
          Acesso total por 5 meses. Sem renovacao automatica.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {planosTyped.candidato.map((p) => {
          const isPremium = p.id === "premium";
          const isDestaque = p.id === "destaque";
          const isSelected = selected === p.id;
          return (
            <PricingCard
              key={p.id}
              nome={p.nome}
              preco={p.preco}
              periodo={`/ ${p.periodoMeses} meses`}
              destaques={p.destaques}
              variant={
                isPremium ? "premium" : isDestaque ? "featured" : "default"
              }
              badge={
                p.recomendado
                  ? "Mais escolhido"
                  : isPremium
                    ? "✦ Completo"
                    : undefined
              }
              badgeVariant={p.recomendado ? "gold" : "default"}
              cta={
                <button
                  type="button"
                  onClick={() => setSelected(p.id)}
                  className={`btn btn-block ${isSelected ? "btn-primary" : isPremium ? "btn-premium" : "btn-secondary"}`}
                >
                  {isSelected ? "✓ Selecionado" : "Selecionar"}
                </button>
              }
            />
          );
        })}
      </div>

      {planoSelecionado ? (
        <section className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-lg font-semibold text-navy">
            Pagamento
          </h2>
          <div className="mt-4 flex items-end justify-between border-b border-line pb-4">
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Total a pagar
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-navy">
                R${" "}
                {planoSelecionado.preco
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            </div>
            <p className="text-sm italic text-ink-2">
              {planoSelecionado.periodoMeses} meses de acesso
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mt-6"
          >
            Assinar {planoSelecionado.nome}
          </button>
          <p className="mt-4 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
            Mock · Sem cobranca real no v0
          </p>
        </section>
      ) : null}
    </CandidatoLayout>
  );
}

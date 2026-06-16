"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PlanCardMobile } from "@/components/PlanCardMobile";
import { PaymentForm } from "@/components/PaymentForm";
import planos from "@/data/planos.json";
import type { PlanoCandidato, Planos } from "@/types";

const planosTyped = planos as Planos;

const EYEBROW: Record<PlanoCandidato, string> = {
  start: "Basico",
  destaque: "Mais escolhido",
  premium: "Completo",
};

/**
 * /candidato/planos — M07. Assinatura mobile.
 * PlanCardMobile x3 (feature list do Modelo de Negocio.md) + PaymentForm mode="assinatura".
 */
export default function PlanosCandidatoPage() {
  const [planoSel, setPlanoSel] = useState<PlanoCandidato>("destaque");

  const planoAtual = planosTyped.candidato.find((p) => p.id === planoSel)!;

  const precoFmt = (preco: number) =>
    preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <CandidatoLayout
      title="Planos"
      hideBottomNav
      backHref="/candidato/dashboard"
    >
      <div className="flex flex-col gap-8 pb-32">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-navy">
            Escolha seu plano
          </h1>
          <p className="mt-2 text-base text-ink-2">
            Acesso total por um periodo de 5 meses.
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {planosTyped.candidato.map((p) => (
            <PlanCardMobile
              key={p.id}
              nome={p.nome}
              preco={precoFmt(p.preco)}
              periodo={`${p.periodoMeses}m`}
              eyebrow={EYEBROW[p.id]}
              features={p.destaques}
              featured={p.recomendado}
              selected={planoSel === p.id}
              onSelect={() => setPlanoSel(p.id)}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-paper p-6">
          <PaymentForm
            mode="assinatura"
            resumoLabel="Total a pagar"
            resumoValor={precoFmt(planoAtual.preco)}
            ctaLabel={`Assinar ${planoAtual.nome.replace("Cadastro ", "")} — ${planoAtual.periodoMeses} meses →`}
          />
        </div>

        <button
          type="button"
          className="flex items-center justify-between border-t border-line pt-4 text-sm text-ink-2"
        >
          <span className="font-mono text-2xs uppercase tracking-widest">
            Comparar detalhes dos planos
          </span>
          <ChevronDown size={14} strokeWidth={1.7} />
        </button>
      </div>
    </CandidatoLayout>
  );
}

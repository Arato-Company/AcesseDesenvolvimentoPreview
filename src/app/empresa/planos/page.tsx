"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CreditPackCard } from "@/components/CreditPackCard";
import { PaymentForm } from "@/components/PaymentForm";

type Pack = {
  id: "inicial" | "crescimento" | "volume";
  eyebrow: string;
  quantidade: number;
  preco: string;
  precoLabel: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
};

const PACKS: Pack[] = [
  {
    id: "inicial",
    eyebrow: "Pacote inicial",
    quantidade: 10,
    preco: "R$ 49,90",
    precoLabel: "10 creditos",
    features: [
      "Validade 12 meses",
      "Busca curada",
      "Contato com candidatos curados",
    ],
    ctaLabel: "Escolher inicial",
  },
  {
    id: "crescimento",
    eyebrow: "Pacote crescimento",
    quantidade: 50,
    preco: "R$ 199,90",
    precoLabel: "50 creditos",
    features: [
      "Validade 18 meses",
      "Prioridade na curadoria",
      "Acesso a vitrine premium",
      "Relatorios mensais",
    ],
    ctaLabel: "Escolher crescimento",
    featured: true,
  },
  {
    id: "volume",
    eyebrow: "Pacote volume",
    quantidade: 200,
    preco: "R$ 699,90",
    precoLabel: "200 creditos",
    features: [
      "Validade 24 meses",
      "Concierge dedicado",
      "Listas exportaveis",
      "API parceira",
    ],
    ctaLabel: "Escolher volume",
  },
];

/**
 * /empresa/planos — W08. Creditos de busca empresa (one-shot).
 * CreditPackCard x3 + PaymentForm mode="credito".
 */
export default function PlanosEmpresaPage() {
  const [selected, setSelected] = useState<Pack>(PACKS[1]);

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Creditos"
      topbarUserLabel="EM"
    >
      <div className="mx-auto max-w-[1100px] px-2 py-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
          Creditos de busca
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
          Compre creditos pra desbloquear buscas e contatos.
        </h1>
        <p className="mt-2 max-w-2xl text-base text-ink-2">
          Cada credito libera 1 contato direto com um candidato curado. Sem
          assinatura, sem renovacao automatica.
        </p>

        <div className="mb-20 mt-10 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {PACKS.map((p) => (
            <CreditPackCard
              key={p.id}
              eyebrow={p.eyebrow}
              quantidade={p.quantidade}
              preco={p.preco}
              features={p.features}
              ctaLabel={p.ctaLabel}
              featured={p.featured}
              selected={selected.id === p.id}
              onSelect={() => setSelected(p)}
            />
          ))}
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-offwhite p-8 shadow-1">
          <PaymentForm
            mode="credito"
            resumoLabel={`${PACKS.find((p) => p.id === selected.id)?.eyebrow} · ${selected.precoLabel}`}
            resumoValor={selected.preco}
            ctaLabel="Comprar creditos"
          />
        </div>
      </div>
    </AppShell>
  );
}

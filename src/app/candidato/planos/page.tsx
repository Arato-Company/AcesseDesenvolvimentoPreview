"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CircleCheck, Sparkles } from "lucide-react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PlanCardMobile } from "@/components/PlanCardMobile";
import { PaymentForm } from "@/components/PaymentForm";
import { setStage } from "@/lib/onboarding";
import planos from "@/data/planos.json";
import type { PlanoCandidato, Planos } from "@/types";

const planosTyped = planos as Planos;

const EYEBROW: Record<PlanoCandidato, string> = {
  start: "Basico",
  destaque: "Mais escolhido",
  premium: "Completo",
};

/**
 * Conteudo desktop da tabela de precos (fiel a referencia enviada).
 * Copy de marketing propria — distinta do modelo "5 meses" do mobile.
 */
type PlanoDesktop = {
  id: PlanoCandidato;
  nome: string;
  desc: string;
  preco: number;
  features: { label: string; off?: boolean }[];
  featured?: boolean;
  cta: string;
};

const DESKTOP_PLANOS: PlanoDesktop[] = [
  {
    id: "start",
    nome: "Start",
    desc: "Ideal para quem esta iniciando a transicao de carreira no Circuito das Aguas.",
    preco: 19.9,
    features: [
      { label: "Seu perfil visivel na vitrine" },
      { label: "Encontre oportunidades que combinam com voce" },
      { label: "Destaque nas buscas de recrutadores", off: true },
    ],
    cta: "Selecionar",
  },
  {
    id: "destaque",
    nome: "Destaque",
    desc: "Sua visibilidade multiplicada por 5x nas buscas de recrutadores regionais.",
    preco: 29.9,
    features: [
      { label: 'Selo "Curadoria Acesse" no perfil' },
      { label: "Prioridade nas buscas de recrutadores" },
      { label: "Visualizacao de quem viu seu perfil" },
    ],
    featured: true,
    cta: "Contratar agora",
  },
  {
    id: "premium",
    nome: "Premium",
    desc: "Visibilidade maxima. Voce e encontrado primeiro pelas melhores oportunidades.",
    preco: 39.9,
    features: [
      { label: "Todos os beneficios Destaque" },
      { label: "Vagas VIP — oportunidades exclusivas curadas" },
      { label: "Relatorio mensal de performance" },
    ],
    cta: "Selecionar",
  },
];

/**
 * /candidato/planos — M07. Assinatura mobile.
 * PlanCardMobile x3 (feature list do Modelo de Negocio.md) + PaymentForm mode="assinatura".
 */
export default function PlanosCandidatoPage() {
  const [planoSel, setPlanoSel] = useState<PlanoCandidato>("destaque");
  const router = useRouter();

  // Mock v0: pagar -> ativo. Libera o sistema completo.
  const ativar = () => {
    setStage("candidato", "ativo");
    router.push("/candidato/dashboard");
  };

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
      {/* ==================== MOBILE ==================== */}
      <div className="flex flex-col gap-8 pb-32 md:hidden">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-navy">
            Escolha seu plano
          </h1>
          <p className="mt-2 text-base text-ink-2">
            Seu perfil visivel por 5 meses. Quanto mais destaque, mais voce e
            encontrado.
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
            onConfirm={ativar}
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

      {/* ==================== DESKTOP ==================== */}
      <div className="hidden md:block">
        {/* Header editorial */}
        <header className="mx-auto max-w-2xl pt-4 text-center">
          <p className="eyebrow text-gold-deep">Investimento na carreira</p>
          <h1 className="mt-3 font-display text-[40px] leading-tight text-navy">
            Escolha o nivel de visibilidade para sua proxima conquista.
          </h1>
          <p className="mt-4 font-body text-base text-ink-2">
            Curadoria regional focada no eixo Jaguariuna–Amparo. Diferente de
            plataformas globais, nos conhecemos as empresas locais.
          </p>
        </header>

        {/* Pricing table */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-3 items-stretch gap-6">
          {DESKTOP_PLANOS.map((p) => (
            <PricingCard key={p.id} plano={p} onActivate={ativar} />
          ))}
        </div>
      </div>
    </CandidatoLayout>
  );
}

function PricingCard({
  plano,
  onActivate,
}: {
  plano: PlanoDesktop;
  onActivate: () => void;
}) {
  const reais = Math.floor(plano.preco);
  const cents = Math.round((plano.preco - reais) * 100)
    .toString()
    .padStart(2, "0");

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-offwhite p-8 ${
        plano.featured
          ? "border-2 border-gold shadow-gold md:-my-2"
          : "border-line"
      }`}
    >
      {plano.featured ? (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-br from-gold-deep to-gold px-4 py-1 font-mono text-2xs font-semibold uppercase tracking-widest text-navy-deep">
          Mais procurado
          <Sparkles className="h-3 w-3" aria-hidden="true" />
        </span>
      ) : null}

      <h3 className="font-display text-2xl font-semibold text-navy">
        {plano.nome}
      </h3>
      <p className="mt-3 min-h-[60px] font-body text-sm leading-relaxed text-ink-2">
        {plano.desc}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-[44px] font-bold leading-none text-navy">
          R${reais}
        </span>
        <span className="font-display text-lg text-navy">,{cents}</span>
        <span className="ml-1 font-mono text-2xs uppercase tracking-widest text-ink-3">
          /mes
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {plano.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-start gap-3 text-sm ${
              f.off ? "text-ink-3/60" : "text-ink-2"
            }`}
          >
            <CircleCheck
              size={18}
              strokeWidth={1.8}
              className={`mt-px flex-shrink-0 ${
                f.off ? "text-line" : "text-gold-deep"
              }`}
              aria-hidden="true"
            />
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onActivate}
        className={`mt-8 w-full text-center uppercase tracking-widest ${
          plano.featured ? "btn btn-primary py-4" : "btn btn-secondary py-4"
        }`}
      >
        {plano.cta}
      </button>
    </article>
  );
}

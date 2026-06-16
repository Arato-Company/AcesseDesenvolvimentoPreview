"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Building2,
  UserPlus,
  ShieldCheck,
  Hourglass,
  CreditCard,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { StatCardKPI } from "@/components/StatCardKPI";
import { RevenueBarChart } from "@/components/RevenueBarChart";
import { PlanDistributionBars } from "@/components/PlanDistributionBars";
import { AdminAlertItem } from "@/components/AdminAlertItem";

const PERIODOS = ["HOJE", "7D", "30D", "90D"] as const;
type Periodo = (typeof PERIODOS)[number];

const TRANSACOES = [
  { data: "16/06", plano: "Premium · Candidato", valor: "R$ 39,90" },
  { data: "16/06", plano: "Destaque · Empresa", valor: "R$ 99,90" },
  { data: "15/06", plano: "Premium · Empresa", valor: "R$ 197,90" },
  { data: "15/06", plano: "Destaque · Candidato", valor: "R$ 29,90" },
  { data: "14/06", plano: "Premium · Candidato", valor: "R$ 39,90" },
];

/**
 * /admin — W10 Visao Geral.
 * Reescrita fiel ao Stitch: KPIs + grafico Recharts + distribuicao planos
 * + alertas operacionais + ultimas transacoes.
 */
export default function AdminVisaoGeralPage() {
  const [periodo, setPeriodo] = useState<Periodo>("30D");

  return (
    <AppAdminShell
      topbarTitle="Painel geral"
      topbarLeft={
        <div className="flex gap-1 rounded-lg border border-line bg-paper p-1">
          {PERIODOS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriodo(p)}
              className={`rounded-md px-3 py-1.5 font-mono text-2xs uppercase tracking-widest transition ${
                periodo === p
                  ? "bg-navy text-offwhite"
                  : "text-ink-2 hover:text-navy"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Coluna esquerda */}
        <section className="flex flex-col gap-6 lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <StatCardKPI
              label="MRR atual"
              value="R$ 12.840"
              delta="+12%"
              icon={TrendingUp}
            />
            <StatCardKPI
              label="Receita bruta"
              value="R$ 18.290"
              delta="+8,4%"
              icon={TrendingUp}
            />
            <StatCardKPI
              label="Candidatos"
              value="432"
              hint="Ativos na base"
              icon={Users}
            />
            <StatCardKPI
              label="Empresas"
              value="67"
              hint="Parceiras locais"
              icon={Building2}
            />
            <StatCardKPI
              label="Novos cadastros"
              value="+38"
              hint="Ultimos 7 dias"
              icon={UserPlus}
            />
          </div>

          <div className="rounded-xl border border-line bg-offwhite p-8 shadow-1">
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                  Receita 30 dias
                </p>
                <h2 className="font-display text-xl font-semibold text-navy">
                  Direta vs. Recorrencia
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-ink-2">
                  <span className="h-2 w-2 rounded-full bg-navy" /> Direta
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-ink-2">
                  <span className="h-2 w-2 rounded-full bg-gold-deep" />{" "}
                  Recorrencia
                </span>
              </div>
            </header>
            <RevenueBarChart periodo={periodo} />
          </div>

          <div className="rounded-xl border border-line bg-offwhite p-8 shadow-1">
            <p className="mb-1 font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Distribuicao de planos
            </p>
            <h2 className="mb-6 font-display text-xl font-semibold text-navy">
              Base ativa por tier
            </h2>
            <PlanDistributionBars />
          </div>
        </section>

        {/* Coluna direita */}
        <aside className="flex flex-col gap-6 lg:col-span-4">
          <div className="rounded-xl border border-line bg-offwhite p-6 shadow-1">
            <h3 className="mb-4 font-display text-lg font-semibold text-navy">
              Alertas operacionais
            </h3>
            <div className="flex flex-col gap-2">
              <AdminAlertItem
                icon={ShieldCheck}
                titulo="14 perfis aguardando curadoria"
                subtexto="SLA 48h · prioridade gold first"
                tom="gold"
                href="/admin/curadoria"
              />
              <AdminAlertItem
                icon={Hourglass}
                titulo="3 reembolsos pendentes"
                subtexto="Aguardando revisao manual"
                tom="ink"
                href="/admin/reembolsos"
              />
              <AdminAlertItem
                icon={CreditCard}
                titulo="2 cobrancas com falha"
                subtexto="Acao requerida — Stripe"
                tom="danger"
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm btn-block mt-6"
            >
              Ver todas pendencias
            </button>
          </div>

          <div className="rounded-xl border border-line bg-offwhite p-6 shadow-1">
            <h3 className="mb-4 font-display text-lg font-semibold text-navy">
              Ultimas transacoes
            </h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Plano</th>
                  <th className="pb-2 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {TRANSACOES.map((t, i) => (
                  <tr key={i}>
                    <td className="py-2 font-mono text-2xs uppercase tracking-widest text-ink-3">
                      {t.data}
                    </td>
                    <td className="py-2 text-sm text-ink-2">{t.plano}</td>
                    <td className="py-2 text-right text-sm font-semibold text-navy">
                      {t.valor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </AppAdminShell>
  );
}

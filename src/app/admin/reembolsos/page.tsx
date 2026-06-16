import { ExternalLink, SlidersHorizontal } from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";

type ReembolsoStatus = "PENDENTE" | "APROVADO" | "REJEITADO";

type Reembolso = {
  id: string;
  solicitante: string;
  tipo: "Candidato" | "Empresa";
  valor: string;
  data: string;
  motivo: string;
  status: ReembolsoStatus;
};

const STATUS_BADGE: Record<ReembolsoStatus, string> = {
  PENDENTE: "bg-warning/10 text-warning",
  APROVADO: "bg-success/10 text-success",
  REJEITADO: "bg-danger/10 text-danger",
};

const REEMBOLSOS: Reembolso[] = [
  {
    id: "rf-001",
    solicitante: "Joao Pedro Silva",
    tipo: "Candidato",
    valor: "R$ 39,90",
    data: "14/06",
    motivo: "Conta duplicada",
    status: "PENDENTE",
  },
  {
    id: "rf-002",
    solicitante: "Termas Serra Verde",
    tipo: "Empresa",
    valor: "R$ 197,90",
    data: "12/06",
    motivo: "Plano nao usado",
    status: "PENDENTE",
  },
  {
    id: "rf-003",
    solicitante: "Mariana Costa",
    tipo: "Candidato",
    valor: "R$ 29,90",
    data: "10/06",
    motivo: "Recolocacao antes do prazo",
    status: "APROVADO",
  },
  {
    id: "rf-004",
    solicitante: "Mercado Central Jaguariuna",
    tipo: "Empresa",
    valor: "R$ 49,90",
    data: "08/06",
    motivo: "Cobranca em duplicidade",
    status: "PENDENTE",
  },
  {
    id: "rf-005",
    solicitante: "Pedro Henrique Lima",
    tipo: "Candidato",
    valor: "R$ 39,90",
    data: "05/06",
    motivo: "Insatisfacao com plano",
    status: "REJEITADO",
  },
];

/**
 * /admin/reembolsos — W15. Tabela reembolsos com badges status v0
 * (text-warning/success/danger — NUNCA Tailwind amber raw).
 */
export default function AdminReembolsosPage() {
  const pendentes = REEMBOLSOS.filter((r) => r.status === "PENDENTE").length;

  return (
    <AppAdminShell topbarTitle="Reembolsos">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Operacao financeira
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Pedidos de reembolso
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-warning/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-warning">
            {pendentes} aguardando
          </span>
          <button className="btn btn-secondary btn-sm">
            <SlidersHorizontal size={14} strokeWidth={1.7} />
            Filtros
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3">Solicitante</th>
              <th className="px-5 py-3">Tipo</th>
              <th className="px-5 py-3">Valor</th>
              <th className="px-5 py-3">Data</th>
              <th className="px-5 py-3">Motivo</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {REEMBOLSOS.map((r) => (
              <tr key={r.id} className="hover:bg-paper/40">
                <td className="px-5 py-4 font-semibold text-navy">
                  {r.solicitante}
                </td>
                <td className="px-5 py-4 text-ink-2">{r.tipo}</td>
                <td className="px-5 py-4 font-semibold text-navy">{r.valor}</td>
                <td className="px-5 py-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
                  {r.data}
                </td>
                <td className="px-5 py-4 text-ink-2">{r.motivo}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${STATUS_BADGE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {r.status === "PENDENTE" ? (
                    <div className="inline-flex gap-2">
                      <button type="button" className="btn btn-gold btn-sm">
                        Aprovar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm border border-danger text-danger hover:bg-danger hover:text-offwhite"
                      >
                        Rejeitar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
                    >
                      Ver <ExternalLink size={11} strokeWidth={1.7} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppAdminShell>
  );
}

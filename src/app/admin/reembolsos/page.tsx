import { AppShell } from "@/components/AppShell";

type Reembolso = {
  id: string;
  candidato: string;
  empresaContratante: string;
  cidade: string;
  planoOriginal: "destaque" | "premium";
  valor: number;
  status: "pendente" | "aprovado" | "recusado";
  motivo: string;
  solicitadoEm: string;
};

const REEMBOLSOS: Reembolso[] = [
  {
    id: "rmb-001",
    candidato: "Mariana Costa",
    empresaContratante: "Termas Serra Verde",
    cidade: "Serra Negra",
    planoOriginal: "premium",
    valor: 149,
    status: "pendente",
    motivo: "Vaga fechada via vitrine em 14 dias.",
    solicitadoEm: "2026-06-04",
  },
  {
    id: "rmb-002",
    candidato: "Pedro Henrique Lima",
    empresaContratante: "Cooperativa Holambra Flores",
    cidade: "Holambra",
    planoOriginal: "destaque",
    valor: 89,
    status: "pendente",
    motivo: "Vaga fechada em 22 dias.",
    solicitadoEm: "2026-06-06",
  },
  {
    id: "rmb-003",
    candidato: "Ana Beatriz Souza",
    empresaContratante: "Hospital Sao Lucas Amparo",
    cidade: "Amparo",
    planoOriginal: "premium",
    valor: 119,
    status: "aprovado",
    motivo: "Contratacao confirmada pela empresa.",
    solicitadoEm: "2026-05-22",
  },
  {
    id: "rmb-004",
    candidato: "Fernanda Ribeiro",
    empresaContratante: "Cooperativa Holambra Flores",
    cidade: "Holambra",
    planoOriginal: "premium",
    valor: 149,
    status: "recusado",
    motivo: "Vaga fechada por canal externo (fora da plataforma).",
    solicitadoEm: "2026-05-12",
  },
];

const STATUS_CORES: Record<Reembolso["status"], string> = {
  pendente: "text-amber-700",
  aprovado: "text-gold-deep",
  recusado: "text-ink-3",
};

const moeda = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * /admin/reembolsos — fonte: Web/15 - Admin Reembolsos.html.
 * Fila de reembolso proporcional. Mock inline (sem JSON, escopo restrito a esta rota).
 */
export default function AdminReembolsosPage() {
  const pendentes = REEMBOLSOS.filter((r) => r.status === "pendente");
  const totalPendente = pendentes.reduce((sum, r) => sum + r.valor, 0);

  return (
    <AppShell audience="admin" topbarTitle="Reembolsos" topbarUserLabel="AD">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caps mb-2">Politica de reembolso</p>
          <h1 className="display-lg">
            {pendentes.length} pedidos{" "}
            <span className="text-ink-3">na fila</span>
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            Reembolso proporcional pra candidatos que fecharam vaga via vitrine
            antes do ciclo de 5 meses. SLA: 7 dias uteis.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-offwhite px-5 py-3 shadow-1">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Total pendente
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-navy">
            {moeda(totalPendente)}
          </p>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3 font-mono">ID</th>
              <th className="px-5 py-3 font-mono">Candidato</th>
              <th className="px-5 py-3 font-mono">Empresa</th>
              <th className="px-5 py-3 font-mono">Cidade</th>
              <th className="px-5 py-3 font-mono">Plano</th>
              <th className="px-5 py-3 text-right font-mono">Valor</th>
              <th className="px-5 py-3 font-mono">Status</th>
              <th className="px-5 py-3 text-right font-mono">Acao</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {REEMBOLSOS.map((r) => (
              <tr key={r.id} className="hover:bg-paper/60">
                <td className="px-5 py-3 font-mono text-2xs uppercase tracking-widest text-ink-3">
                  {r.id}
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-navy">{r.candidato}</p>
                  <p className="text-xs text-ink-2">{r.motivo}</p>
                </td>
                <td className="px-5 py-3 text-ink-2">
                  {r.empresaContratante}
                </td>
                <td className="px-5 py-3 text-ink-2">{r.cidade}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                    {r.planoOriginal}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-semibold text-navy">
                  {moeda(r.valor)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`font-mono text-2xs uppercase tracking-widest ${STATUS_CORES[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  {r.status === "pendente" ? (
                    <div className="inline-flex gap-2">
                      <button type="button" className="btn btn-ghost btn-sm">
                        Recusar
                      </button>
                      <button type="button" className="btn btn-gold btn-sm">
                        Aprovar
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

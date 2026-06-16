import Image from "next/image";
import { SlidersHorizontal, ExternalLink } from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import empresas from "@/data/empresas.json";
import { cidadeNome } from "@/data/lookups";
import type { Empresa, PlanoEmpresa } from "@/types";

const empresasTyped = empresas as Empresa[];

const PLANO_BADGE: Record<PlanoEmpresa, string> = {
  premium: "bg-gold/20 text-gold-deep",
  destaque: "bg-paper text-navy",
  basico: "bg-paper text-ink-2",
};
const PLANO_LABEL: Record<PlanoEmpresa, string> = {
  premium: "Premium",
  destaque: "Destaque",
  basico: "Basico",
};

const STATUS_BADGE: Record<string, string> = {
  Ativa: "bg-success/10 text-success",
  Inativa: "bg-paper text-ink-2",
  "Pendente pagamento": "bg-warning/10 text-warning",
};

const CREDITOS_MOCK = [62, 28, 75, 12, 90];
const STATUS_MOCK = ["Ativa", "Ativa", "Pendente pagamento", "Inativa", "Ativa"];

/**
 * /admin/empresas — W12. Tabela admin: empresa (logo)/cidade/plano/creditos (progress)/status.
 */
export default function AdminEmpresasPage() {
  return (
    <AppAdminShell topbarTitle="Empresas">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Base parceira
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Empresas
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-success">
            67 parceiras
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
              <th className="px-5 py-3">Empresa</th>
              <th className="px-5 py-3">Cidade</th>
              <th className="px-5 py-3">Plano</th>
              <th className="px-5 py-3 w-40">Creditos</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {empresasTyped.map((e, i) => {
              const creditos = CREDITOS_MOCK[i % CREDITOS_MOCK.length];
              const status = STATUS_MOCK[i % STATUS_MOCK.length];
              return (
                <tr key={e.id} className="hover:bg-paper/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-line bg-paper">
                        {e.logoUrl ? (
                          <Image
                            src={e.logoUrl}
                            alt=""
                            fill
                            className="object-contain p-1"
                            sizes="40px"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{e.nome}</p>
                        <p className="text-xs text-ink-2">{e.porte}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-2">
                    {cidadeNome(e.cidade)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${PLANO_BADGE[e.plano]}`}
                    >
                      {PLANO_LABEL[e.plano]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-paper">
                        <div
                          className="h-full bg-gold"
                          style={{ width: `${creditos}%` }}
                        />
                      </div>
                      <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                        {creditos}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${STATUS_BADGE[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
                    >
                      Ver conta <ExternalLink size={11} strokeWidth={1.7} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppAdminShell>
  );
}

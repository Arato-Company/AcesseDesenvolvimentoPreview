import { SlidersHorizontal, Sparkles, ExternalLink } from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { Avatar } from "@/components/Avatar";
import candidatos from "@/data/candidatos.json";
import { cidadeNome } from "@/data/lookups";
import type { Candidato, PlanoCandidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

const PLANO_BADGE: Record<PlanoCandidato, string> = {
  premium: "bg-gold/20 text-gold-deep",
  destaque: "bg-paper text-navy",
  start: "bg-paper text-ink-2",
};

const PLANO_LABEL: Record<PlanoCandidato, string> = {
  premium: "Premium",
  destaque: "Destaque",
  start: "Start",
};

const STATUS_BADGE: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Curado: "bg-gold/20 text-gold-deep",
  Inativo: "bg-paper text-ink-2",
};

function statusFor(c: Candidato): "Ativo" | "Curado" | "Inativo" {
  if (c.curado) return "Curado";
  if (c.matchScore >= 70) return "Ativo";
  return "Inativo";
}

const DIAS_OFFSET = [3, 7, 12, 18, 22, 25, 28, 30, 4, 9];

/**
 * /admin/candidatos — W11. Tabela admin: candidato/plano/cidade/data/status/acoes.
 */
export default function AdminCandidatosPage() {
  const linhas = candidatosTyped;

  return (
    <AppAdminShell topbarTitle="Candidatos">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Base ativa
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Candidatos
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-success">
            432 ativos
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
              <th className="px-5 py-3">Candidato</th>
              <th className="px-5 py-3">Plano</th>
              <th className="px-5 py-3">Cidade</th>
              <th className="px-5 py-3">Cadastro</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {linhas.map((c, i) => {
              const status = statusFor(c);
              return (
                <tr key={c.id} className="hover:bg-paper/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.nome} size="sm" />
                      <div>
                        <p className="font-semibold text-navy">{c.nome}</p>
                        <p className="text-xs text-ink-2">{c.cargo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${PLANO_BADGE[c.plano]}`}
                    >
                      {c.plano === "premium" ? (
                        <Sparkles size={11} strokeWidth={2} />
                      ) : null}
                      {PLANO_LABEL[c.plano]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink-2">
                    {cidadeNome(c.cidade)}
                  </td>
                  <td className="px-5 py-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
                    Ha {DIAS_OFFSET[i % DIAS_OFFSET.length]}d
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
                      Ver perfil <ExternalLink size={11} strokeWidth={1.7} />
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

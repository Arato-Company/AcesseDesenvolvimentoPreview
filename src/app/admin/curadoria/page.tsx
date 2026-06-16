"use client";

import { useState } from "react";
import {
  Inbox,
  UserCheck,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import type { AdminNavItem } from "@/components/AppAdminSidebar";
import { Avatar } from "@/components/Avatar";
import candidatos from "@/data/candidatos.json";
import { cidadeNome } from "@/data/lookups";
import type { Candidato, PlanoCandidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

const CURADORIA_NAV: AdminNavItem[] = [
  { href: "/admin/curadoria", label: "Fila de triagem", icon: Inbox },
  { href: "/admin/curadoria", label: "Perfis pendentes", icon: UserCheck },
  {
    href: "/admin/curadoria",
    label: "Publicados hoje",
    icon: CalendarCheck,
  },
];

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

/**
 * /admin/curadoria — W09. Fila de triagem + preview card.
 * Usa `AppAdminSidebar` com prop `navItems` override (3 itens proprios).
 */
export default function AdminCuradoriaPage() {
  const pendentes = candidatosTyped.filter((c) => !c.curado);
  const [selected, setSelected] = useState<Candidato>(
    pendentes[0] ?? candidatosTyped[0],
  );

  return (
    <AppAdminShell
      navItems={CURADORIA_NAV}
      activeHref="/admin/curadoria"
      topbarTitle="Curadoria"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                Triagem humana
              </p>
              <h1 className="font-display text-3xl font-semibold text-navy">
                Fila de curadoria
              </h1>
              <p className="mt-1 text-sm text-ink-2">
                {pendentes.length} perfis aguardando · SLA 48h uteis
              </p>
            </div>
            <button className="btn btn-secondary btn-sm">
              <SlidersHorizontal size={14} strokeWidth={1.7} />
              Filtros
            </button>
          </header>

          <div className="overflow-hidden rounded-xl border border-line bg-offwhite shadow-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper">
                <tr className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  <th className="px-5 py-3">Candidato</th>
                  <th className="px-5 py-3">Plano</th>
                  <th className="px-5 py-3">Data entrada</th>
                  <th className="px-5 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pendentes.map((c, i) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`cursor-pointer hover:bg-paper/40 ${
                      selected.id === c.id ? "bg-paper/60" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar name={c.nome} size="md" />
                          {c.plano === "premium" ? (
                            <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-navy-deep">
                              <Sparkles size={11} strokeWidth={2.2} />
                            </span>
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold text-navy">{c.nome}</p>
                          <p className="text-xs text-ink-2">
                            {c.cargo} · {cidadeNome(c.cidade)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${PLANO_BADGE[c.plano]}`}
                      >
                        {PLANO_LABEL[c.plano]}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
                      Ha {i + 1}d
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex gap-2">
                        {c.plano === "premium" ? (
                          <button type="button" className="btn btn-gold btn-sm">
                            <Sparkles size={11} strokeWidth={2} />
                            Marcar curado
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                          >
                            Ajuste
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="sticky top-20 self-start rounded-xl border border-line bg-offwhite p-6 shadow-1">
          <div className="flex flex-col items-center gap-3 border-b border-line pb-4 text-center">
            <Avatar name={selected.nome} size="xl" />
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-gold-deep to-gold px-3 py-1 font-mono text-2xs font-semibold uppercase tracking-widest text-navy-deep">
              <Sparkles size={11} strokeWidth={2.2} />
              Pronto pra curar
            </span>
            <h3 className="font-display text-lg font-semibold text-navy">
              {selected.nome}
            </h3>
            <p className="text-xs text-ink-2">
              {selected.cargo} · {cidadeNome(selected.cidade)}
            </p>
          </div>

          <dl className="my-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Match
              </dt>
              <dd className="font-display text-lg font-semibold text-gold-deep">
                {selected.matchScore}%
              </dd>
            </div>
            <div>
              <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Nivel
              </dt>
              <dd className="font-semibold text-navy">{selected.nivel}</dd>
            </div>
          </dl>

          <label className="block">
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-2">
              Notas da curadoria
            </span>
            <textarea
              className="field-textarea mt-2"
              rows={3}
              placeholder="Observacoes internas, ajustes sugeridos..."
            />
          </label>

          <label className="my-3 flex items-center gap-2 text-sm text-ink-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line"
              defaultChecked
            />
            Incluir na curadoria desta semana
          </label>

          <button type="button" className="btn btn-gold btn-block">
            <ShieldCheck size={14} strokeWidth={1.7} />
            Aprovar curadoria
          </button>
        </aside>
      </div>
    </AppAdminShell>
  );
}

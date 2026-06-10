import { AppShell } from "@/components/AppShell";
import candidatos from "@/data/candidatos.json";
import empresas from "@/data/empresas.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Candidato, Empresa } from "@/types";

const candidatosTyped = candidatos as Candidato[];
const empresasTyped = empresas as Empresa[];

type Pendente =
  | { tipo: "candidato"; ref: Candidato }
  | { tipo: "empresa"; ref: Empresa };

/**
 * /admin/curadoria — fonte: Web/09 - Admin Curadoria.html.
 * Lista de candidatos+empresas pendentes de revisao. Acoes nao-funcionais (demo).
 */
export default function AdminCuradoriaPage() {
  const candidatosPendentes = candidatosTyped.filter((c) => !c.curado);
  const empresasPendentes = empresasTyped.filter((e) => e.plano === "basico");

  const pendentes: Pendente[] = [
    ...candidatosPendentes.map<Pendente>((c) => ({ tipo: "candidato", ref: c })),
    ...empresasPendentes.map<Pendente>((e) => ({ tipo: "empresa", ref: e })),
  ];

  return (
    <AppShell audience="admin" topbarTitle="Curadoria" topbarUserLabel="AD">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caps mb-2">Triagem humana</p>
          <h1 className="display-lg">
            {pendentes.length} cadastros{" "}
            <span className="text-ink-3">pendentes</span>
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            Revise candidatos e empresas antes da publicacao na vitrine. SLA da
            curadoria: 48h uteis.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-paper px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep">
            {candidatosPendentes.length} candidatos
          </span>
          <span className="rounded-full bg-paper px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep">
            {empresasPendentes.length} empresas
          </span>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3 font-mono">Tipo</th>
              <th className="px-5 py-3 font-mono">Nome</th>
              <th className="px-5 py-3 font-mono">Area</th>
              <th className="px-5 py-3 font-mono">Cidade</th>
              <th className="px-5 py-3 font-mono">Status</th>
              <th className="px-5 py-3 text-right font-mono">Acao</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {pendentes.map((p) => {
              const id = p.ref.id;
              const nome = p.ref.nome;
              const area = areaNome(p.ref.area);
              const cidade = cidadeNome(p.ref.cidade);
              const subtitulo =
                p.tipo === "candidato"
                  ? (p.ref as Candidato).cargo
                  : `Porte ${(p.ref as Empresa).porte}`;
              return (
                <tr key={`${p.tipo}-${id}`} className="hover:bg-paper/60">
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                      {p.tipo}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-navy">{nome}</p>
                    <p className="text-xs text-ink-2">{subtitulo}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-2">{area}</td>
                  <td className="px-5 py-4 text-ink-2">{cidade}</td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-2xs uppercase tracking-widest text-amber-700">
                      Pendente
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button type="button" className="btn btn-ghost btn-sm">
                        Recusar
                      </button>
                      <button type="button" className="btn btn-gold btn-sm">
                        Aprovar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 font-mono text-2xs uppercase tracking-widest text-ink-3">
        CURADORIA · acoes nesta tela sao definitivas. Revisao manual obrigatoria.
      </p>
    </AppShell>
  );
}

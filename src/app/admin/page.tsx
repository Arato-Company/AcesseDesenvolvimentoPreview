import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import candidatos from "@/data/candidatos.json";
import empresas from "@/data/empresas.json";
import vagas from "@/data/vagas.json";
import posts from "@/data/posts.json";
import type { Candidato, Empresa, Vaga, Post } from "@/types";
import { cidadeNome, areaNome, empresaById } from "@/data/lookups";

const candidatosTyped = candidatos as Candidato[];
const empresasTyped = empresas as Empresa[];
const vagasTyped = vagas as Vaga[];
const postsTyped = posts as Post[];

type Atividade = {
  tipo: "candidato" | "empresa" | "vaga" | "post";
  titulo: string;
  contexto: string;
  data: string;
};

function ultimasAtividades(): Atividade[] {
  const acts: Atividade[] = [];
  candidatosTyped.slice(0, 3).forEach((c) =>
    acts.push({
      tipo: "candidato",
      titulo: c.nome,
      contexto: `${c.cargo} · ${cidadeNome(c.cidade)}`,
      data: "ha 2h",
    }),
  );
  vagasTyped.slice(0, 3).forEach((v) =>
    acts.push({
      tipo: "vaga",
      titulo: v.titulo,
      contexto: `${cidadeNome(v.cidade)} · ${empresaById(v.empresaId)?.nome ?? "—"}`,
      data: v.publicadaEm,
    }),
  );
  empresasTyped.slice(0, 2).forEach((e) =>
    acts.push({
      tipo: "empresa",
      titulo: e.nome,
      contexto: `${areaNome(e.area)} · ${cidadeNome(e.cidade)}`,
      data: "ha 1d",
    }),
  );
  return acts.slice(0, 8);
}

/**
 * /admin — fonte: Web/10 - Admin Visao Geral.html.
 * KPIs + atividade recente. Demo navegavel.
 */
export default function AdminPage() {
  const totalCurados = candidatosTyped.filter((c) => c.curado).length;
  const vagasCuradas = vagasTyped.filter((v) => v.curada).length;
  const totalAtivos = candidatosTyped.length + empresasTyped.length;

  const kpis = [
    {
      label: "Candidatos ativos",
      value: candidatosTyped.length,
      hint: `${totalCurados} com selo ✦`,
    },
    {
      label: "Empresas ativas",
      value: empresasTyped.length,
      hint: "5 regioes cobertas",
    },
    {
      label: "Vagas publicadas",
      value: vagasTyped.length,
      hint: `${vagasCuradas} curadas`,
    },
    {
      label: "Posts no feed",
      value: postsTyped.length,
      hint: "ultimos 30 dias",
    },
  ];

  const atividades = ultimasAtividades();

  return (
    <AppShell audience="admin" topbarTitle="Visao geral" topbarUserLabel="AD">
      <header className="mb-10">
        <p className="caps mb-2">Concierge</p>
        <h1 className="display-lg">Visao geral da curadoria.</h1>
        <p className="mt-2 text-sm text-ink-2">
          {totalAtivos} contas ativas · {vagasTyped.length} vagas publicadas ·
          atualizado agora.
        </p>
      </header>

      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-line bg-offwhite p-5 shadow-1"
          >
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              {kpi.label}
            </p>
            <p className="mt-3 font-display text-3xl font-semibold text-navy">
              {kpi.value}
            </p>
            <p className="mt-1 text-2xs uppercase tracking-widest text-gold-deep">
              {kpi.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-line bg-offwhite p-6 shadow-1">
          <header className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy">
              Ultimas atividades
            </h2>
            <Link
              href="/admin/curadoria"
              className="font-mono text-2xs uppercase tracking-widest text-gold-deep hover:text-navy"
            >
              Ver curadoria →
            </Link>
          </header>
          <ul className="divide-y divide-line">
            {atividades.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-navy">{a.titulo}</p>
                  <p className="text-xs text-ink-2">{a.contexto}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-paper px-3 py-1 font-mono text-2xs uppercase tracking-widest text-ink-3">
                    {a.tipo}
                  </span>
                  <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                    {a.data}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-offwhite p-6 shadow-1">
          <h2 className="mb-5 font-display text-lg font-semibold text-navy">
            Atalhos
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/curadoria"
              className="btn btn-primary btn-block"
            >
              Curadoria pendente
            </Link>
            <Link
              href="/admin/posts"
              className="btn btn-secondary btn-block"
            >
              Publicar post no feed
            </Link>
            <Link
              href="/admin/comunicacao"
              className="btn btn-ghost btn-block"
            >
              Disparo de comunicacao
            </Link>
          </div>
          <p className="mt-6 border-t border-line pt-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
            Concierge · Acesse Desenvolvimento
          </p>
        </section>
      </div>
    </AppShell>
  );
}

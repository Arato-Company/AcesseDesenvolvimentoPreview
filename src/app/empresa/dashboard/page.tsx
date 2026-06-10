import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CardCandidato } from "@/components/CardCandidato";
import { CardVaga } from "@/components/CardVaga";
import candidatos from "@/data/candidatos.json";
import vagas from "@/data/vagas.json";
import type { Candidato, Vaga } from "@/types";

const candidatosTyped = candidatos as Candidato[];
const vagasTyped = vagas as Vaga[];

/**
 * /empresa/dashboard — fonte: Web/02 - Dashboard Empresa.html.
 * Home pos-login da empresa. Mostra:
 *  - saudacao (concierge anonimo, sem nome de pessoa real)
 *  - 4 stat cards
 *  - curadoria da semana (3 curados)
 *  - duas formas de contratar (vitrine vs publicar)
 *  - 3 vagas ativas mais recentes
 */
export default function EmpresaDashboardPage() {
  const curados = candidatosTyped.filter((c) => c.curado).slice(0, 3);
  const vagasRecentes = [...vagasTyped]
    .sort((a, b) => b.publicadaEm.localeCompare(a.publicadaEm))
    .slice(0, 3);

  const stats = [
    { label: "Vagas ativas", value: vagasTyped.length.toString().padStart(2, "0") },
    {
      label: "Candidatos curados",
      value: candidatosTyped
        .filter((c) => c.curado)
        .length.toString()
        .padStart(2, "0"),
    },
    { label: "Cidades cobertas", value: "09" },
    { label: "Areas seed", value: "05" },
  ];

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Painel empresa"
      topbarUserName="Conta empresa"
      topbarUserLabel="CA"
    >
      {/* Welcome */}
      <section className="mb-12">
        <p className="caps mb-2">Boa tarde · curadoria desta semana</p>
        <h1 className="display-lg mb-3">Bem-vindo de volta.</h1>
        <p className="text-ink-2">
          {candidatosTyped.filter((c) => c.curado).length} candidatos novos com
          selo <strong className="text-navy">✦ Curado</strong> ·{" "}
          {vagasTyped.length} vagas ativas
        </p>
      </section>

      {/* Stats */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <p className="stat-card-num">{s.value}</p>
            <p className="stat-card-label">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Curadoria da semana */}
      <section className="mb-16">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="caps mb-2">Curadoria</p>
            <h2 className="display-md">Curados desta semana</h2>
            <p className="mt-2 text-sm text-ink-2">
              Selecionados a dedo pela equipe regional. Veja se algum te
              interessa.
            </p>
          </div>
          <Link
            href="/empresa/vitrine"
            className="border-b border-gold pb-1 font-mono text-2xs uppercase tracking-widest text-navy"
          >
            Ver vitrine completa →
          </Link>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {curados.map((c) => (
            <CardCandidato key={c.id} candidato={c} />
          ))}
        </div>
      </section>

      {/* 2 formas de contratar */}
      <section className="mb-16 grid gap-6 lg:grid-cols-2">
        <Link
          href="/empresa/vitrine"
          className="group flex flex-col justify-between rounded-xl bg-navy p-12 text-offwhite transition-all hover:bg-navy-deep"
        >
          <div>
            <p className="caps caps-on-dark mb-4">Vitrine</p>
            <h3
              className="display-md mb-4"
              style={{ color: "var(--c-offwhite)" }}
            >
              Buscar na vitrine
            </h3>
            <p className="mb-8 text-offwhite/80">
              Explore a base de profissionais ja avaliados. Filtros objetivos —
              area, senioridade, cidade.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-gold-light transition-transform group-hover:translate-x-1">
            Abrir vitrine agora →
          </span>
        </Link>

        <Link
          href="/empresa/vaga/nova"
          className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-12 text-navy transition-all hover:bg-paper/70"
        >
          <div>
            <p className="caps mb-4">Vagas</p>
            <h3 className="display-md mb-4">Publicar uma vaga</h3>
            <p className="mb-8 text-ink-2">
              Cadastre uma vaga e os candidatos certos chegam ate voce — sem
              filtro de palavra-chave.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-navy transition-transform group-hover:translate-x-1">
            Publicar nova vaga →
          </span>
        </Link>
      </section>

      {/* Vagas ativas */}
      <section className="mb-16">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <p className="caps mb-2">Suas vagas</p>
            <h2 className="display-md">Publicadas recentes</h2>
          </div>
          <Link
            href="/empresa/vaga/nova"
            className="btn btn-secondary btn-sm"
          >
            Publicar nova
          </Link>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vagasRecentes.map((v) => (
            <CardVaga key={v.id} vaga={v} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

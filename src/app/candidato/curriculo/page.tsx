"use client";

import { CandidatoLayout } from "@/components/CandidatoLayout";
import candidatos from "@/data/candidatos.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Candidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

// Candidato mock fixo pro v0 (sem auth ainda).
const CANDIDATO_DEMO = candidatosTyped.find((c) => c.id === "cand-002") ??
  candidatosTyped[0]!;

type Experiencia = {
  periodo: string;
  cargo: string;
  empresa: string;
  detalhe: string;
};

function gerarExperiencias(c: Candidato): Experiencia[] {
  const anoBase = 2026;
  const area = areaNome(c.area);
  const cidade = cidadeNome(c.cidade);
  return [
    {
      periodo: `${anoBase - 3} — atual`,
      cargo: c.cargo,
      empresa: `Empresa regional · ${cidade}`,
      detalhe: `Responsavel por rotina de ${area.toLowerCase()}, atendimento ao publico e processos do dia a dia.`,
    },
    {
      periodo: `${anoBase - 5} — ${anoBase - 3}`,
      cargo: `${c.cargo} Junior`,
      empresa: `Empresa local · Circuito das Aguas`,
      detalhe: `Primeira experiencia formal na area. Consolidacao tecnica e formacao em servico.`,
    },
  ];
}

/**
 * /candidato/curriculo — fonte: Mobile/06 - Curriculo Gerado.html.
 * CV print-friendly. Botao "Imprimir" chama window.print().
 * Layout A4 via tokens.css (@media print, secao 19).
 */
export default function CandidatoCurriculoPage() {
  const c = CANDIDATO_DEMO;
  const experiencias = gerarExperiencias(c);
  const cidade = cidadeNome(c.cidade);

  return (
    <CandidatoLayout title="Meu curriculo" userName={c.nome} backHref="/candidato/dashboard">
      <div className="no-print mb-6 flex items-center justify-between">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          Pre-visualizacao
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-gold btn-sm"
        >
          Imprimir / PDF
        </button>
      </div>

      <article className="cv-page rounded-xl border border-line bg-offwhite p-6 shadow-1">
        <header className="border-b-2 border-navy pb-4">
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            {areaNome(c.area)} · {c.nivel}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
            {c.nome}
          </h1>
          <p className="mt-1 text-base text-ink-2">{c.cargo}</p>
          <p className="mt-2 text-sm text-ink-2">
            {cidade} · SP · contato@acesse.dev · (19) 9 9999-9999
          </p>
        </header>

        <section className="mt-6">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Resumo
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.resumo}</p>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Experiencia profissional
          </h2>
          <ol className="mt-3 space-y-4">
            {experiencias.map((exp, i) => (
              <li key={i}>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  {exp.periodo}
                </p>
                <p className="font-display text-base font-semibold text-navy">
                  {exp.cargo}
                </p>
                <p className="text-sm text-ink-2">{exp.empresa}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">
                  {exp.detalhe}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Formacao
          </h2>
          <div className="mt-3">
            <p className="font-display text-base font-semibold text-navy">
              Ensino tecnico em {areaNome(c.area)}
            </p>
            <p className="text-sm text-ink-2">
              Instituto regional · Circuito das Aguas
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Habilidades
            </h2>
            <div className="profile-tags mt-3">
              {c.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Disponibilidade
            </h2>
            <p className="mt-3 text-sm text-ink-2">
              Imediata · CLT preferencial · Aceita ate 30km de {cidade}
            </p>
          </div>
        </section>

        <footer className="mt-8 border-t border-line pt-4 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
          Gerado em {new Date().toLocaleDateString("pt-BR")} ·
          acesse.dev/curriculo/{c.id}
        </footer>
      </article>
    </CandidatoLayout>
  );
}

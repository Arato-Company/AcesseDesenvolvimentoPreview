import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import candidatos from "@/data/candidatos.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Candidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return candidatosTyped.map((c) => ({ id: c.id }));
}

type Experiencia = {
  periodo: string;
  cargo: string;
  empresa: string;
  bullets: string[];
};

type Formacao = {
  titulo: string;
  instituicao: string;
  periodo: string;
};

/**
 * Gera timeline mock deterministica a partir do nivel/cargo/area.
 * Spec W04 pede bullets — cada experiencia vira <ul> de 2-3 itens.
 */
function gerarExperiencias(c: Candidato): Experiencia[] {
  const anoBase = 2026;
  const area = areaNome(c.area);
  const cidade = cidadeNome(c.cidade);

  const blocosPorNivel: Record<Candidato["nivel"], Experiencia[]> = {
    Junior: [
      {
        periodo: `${anoBase - 1} — atual`,
        cargo: c.cargo,
        empresa: `Empresa regional · ${cidade}`,
        bullets: [
          `Primeira experiencia formal em ${area.toLowerCase()}.`,
          "Aprendizado de rotina, atendimento e processos operacionais.",
        ],
      },
      {
        periodo: `${anoBase - 2} — ${anoBase - 1}`,
        cargo: "Aprendiz / Estagio",
        empresa: "Programa Jovem Aprendiz · Circuito das Aguas",
        bullets: [
          "Formacao tecnica em programa social regional.",
          "Primeiros contatos com mercado de trabalho local.",
        ],
      },
    ],
    Pleno: [
      {
        periodo: `${anoBase - 2} — atual`,
        cargo: c.cargo,
        empresa: `Empresa de medio porte · ${cidade}`,
        bullets: [
          `Atuacao plena em ${area.toLowerCase()} com autonomia tecnica.`,
          "Responsabilidade direta sobre rotina, processos e atendimento.",
          "Mentoria de juniores em onboarding.",
        ],
      },
      {
        periodo: `${anoBase - 5} — ${anoBase - 2}`,
        cargo: `${c.cargo} Junior`,
        empresa: `Empresa local · ${cidade}`,
        bullets: [
          "Consolidacao tecnica.",
          "Primeira passagem por gestao de demandas.",
        ],
      },
    ],
    Senior: [
      {
        periodo: `${anoBase - 4} — atual`,
        cargo: `${c.cargo} Senior`,
        empresa: `Empresa lider regional · ${cidade}`,
        bullets: [
          `Lideranca tecnica em ${area.toLowerCase()}.`,
          "Mentoria de juniores e responsavel por entregas criticas.",
          "Definicao de processos operacionais.",
        ],
      },
      {
        periodo: `${anoBase - 8} — ${anoBase - 4}`,
        cargo: c.cargo,
        empresa: "Empresa de medio porte",
        bullets: [
          "Atuacao plena com participacao em projetos de melhoria.",
        ],
      },
    ],
    Especialista: [
      {
        periodo: `${anoBase - 6} — atual`,
        cargo: `Especialista em ${area}`,
        empresa: `Empresa lider regional · ${cidade}`,
        bullets: [
          `Referencia tecnica em ${area.toLowerCase()}.`,
          "Definicao de processos e padrao operacional.",
          "Mentoria estrategica de seniors.",
        ],
      },
      {
        periodo: `${anoBase - 10} — ${anoBase - 6}`,
        cargo: `${c.cargo} Senior`,
        empresa: "Empresa de grande porte",
        bullets: [
          "Lideranca tecnica em projetos estruturantes.",
        ],
      },
    ],
  };

  return blocosPorNivel[c.nivel];
}

function gerarFormacao(c: Candidato): Formacao[] {
  const area = areaNome(c.area);
  return [
    {
      titulo: `Ensino tecnico em ${area}`,
      instituicao: "Instituto regional · Circuito das Aguas",
      periodo: "2017 — 2019",
    },
    {
      titulo: "Curso de aperfeicoamento profissional",
      instituicao: "SENAI · Polo regional",
      periodo: "2020",
    },
  ];
}

/**
 * Tier salarial mock por nivel — v0. Em v1 vira campo opcional no backend
 * (premium-only). Spec PM: mostrar em todos perfis no v0.
 */
function faixaSalarial(c: Candidato): { min: number; max: number } {
  const tabela: Record<Candidato["nivel"], { min: number; max: number }> = {
    Junior: { min: 2200, max: 3200 },
    Pleno: { min: 4500, max: 6800 },
    Senior: { min: 8500, max: 12500 },
    Especialista: { min: 14500, max: 18000 },
  };
  return tabela[c.nivel];
}

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/**
 * /empresa/candidato/[id] — fonte ground truth: Stitch Web/04.
 * Spec: PM/deliverables/specs-telas-criticas-batch2/_index.md (Batch 2).
 *
 * Hero foto 4:5 + nome + match circular + metadados regionais.
 * Sidebar: CTA WhatsApp, info card, curadoria card.
 * Mantemos AppShell empresa pra sidebar/topbar v0.
 */
export default async function PerfilCandidatoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const candidato = candidatosTyped.find((c) => c.id === id);
  if (!candidato) notFound();

  const experiencias = gerarExperiencias(candidato);
  const formacao = gerarFormacao(candidato);
  const faixa = faixaSalarial(candidato);
  const cidade = cidadeNome(candidato.cidade);
  const area = areaNome(candidato.area);
  const isCurado = candidato.curado;

  // Contato anonimizado — placeholder DDD regional, sem dados reais.
  const waMessage = encodeURIComponent(
    "Ola! Vi seu perfil na Acesse Desenvolvimento e gostaria de conversar sobre uma vaga.",
  );
  const waHref = `https://wa.me/5519999000000?text=${waMessage}`;

  return (
    <AppShell
      audience="empresa"
      topbarTitle={`Perfil · ${candidato.nome}`}
      topbarUserLabel="CA"
    >
      {/* ================= HERO ================= */}
      <section className="-mx-10 bg-offwhite px-10 py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row">
          {/* Foto */}
          <div className="w-full max-w-[400px] lg:w-1/3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <PlaceholderImage
                src={`/avatares/${candidato.id}.webp`}
                alt={`Foto de ${candidato.nome}`}
                fallbackLabel={`AVATAR ${candidato.id.toUpperCase()}`}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
                priority
              />
              {isCurado ? (
                <span className="profile-curado-badge absolute left-6 top-6">
                  ✦ Curado
                </span>
              ) : null}
            </div>
          </div>

          {/* Identidade */}
          <div className="flex flex-1 flex-col justify-end pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-deep">
              Candidata em destaque
            </p>
            <h1 className="mt-3 font-display text-[48px] leading-tight text-navy">
              {candidato.nome}
            </h1>
            <p className="mt-2 font-display text-xl text-ink-2">
              {candidato.cargo}
            </p>

            {/* Match circular + linha tracejada */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-gold bg-offwhite shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-deep">
                  Match
                </span>
                <span className="font-display text-[36px] leading-none text-navy">
                  {candidato.matchScore}
                </span>
              </div>
              <div
                className="h-px flex-1 border-t border-dashed border-line/60"
                aria-hidden="true"
              />
            </div>

            {/* Metadados */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2">
                <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                {cidade}, SP
              </span>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2">
                <Clock className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Disponibilidade imediata
              </span>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {candidato.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto -mx-10 grid max-w-[1280px] grid-cols-1 gap-6 px-10 pb-24 lg:grid-cols-12">
        {/* MAIN */}
        <div className="space-y-16 lg:col-span-8">
          {/* Sobre */}
          <section>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Sobre a profissional
            </p>
            <p className="font-body text-lg leading-relaxed text-ink-2">
              {candidato.resumo}
            </p>
          </section>

          {/* Experiencia — timeline */}
          <section>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Experiencia profissional
            </p>
            <ol className="timeline">
              {experiencias.map((exp, i) => (
                <li key={i} className="timeline-item">
                  <p className="timeline-period">{exp.periodo}</p>
                  <p className="timeline-role">{exp.cargo}</p>
                  <p className="timeline-company">{exp.empresa}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* Formacao */}
          <section>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Formacao academica
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {formacao.map((f, i) => (
                <div key={i}>
                  <h4 className="font-display text-xl text-navy">{f.titulo}</h4>
                  <p className="mt-1 font-body text-base text-ink-2">
                    {f.instituicao}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                    {f.periodo}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Pretensao salarial */}
          <section>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Compensacao
            </p>
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-line/30 bg-paper p-8 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-2">
                  Pretensao salarial
                </p>
                <p className="mt-2 font-display text-[36px] leading-none text-navy">
                  {formatBRL(faixa.min)} — {formatBRL(faixa.max)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-2">
                  Modalidade
                </p>
                <span className="mt-2 inline-block rounded-full bg-navy px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-offwhite">
                  CLT / PJ
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* CTA card */}
            <div className="space-y-4 rounded-xl border border-line bg-offwhite p-8 shadow-1">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-block flex items-center justify-center gap-2 rounded-lg py-4"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Contato WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-secondary btn-block flex items-center justify-center gap-2 py-3"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Salvar nos favoritos
              </button>
            </div>

            {/* Info card */}
            <div className="rounded-xl border border-line bg-offwhite p-8">
              <dl className="space-y-3">
                <div className="flex items-center justify-between border-b border-line/30 pb-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-2">
                    Disponibilidade
                  </dt>
                  <dd className="text-sm text-navy">Imediata</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line/30 pb-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-2">
                    Modalidade
                  </dt>
                  <dd className="text-sm text-navy">CLT / PJ</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line/30 pb-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-2">
                    Area
                  </dt>
                  <dd className="text-sm text-navy">{area}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-2">
                    Perfil verificado
                  </dt>
                  <dd className="flex items-center gap-1 text-sm text-navy">
                    <CheckCircle
                      className="h-4 w-4 text-gold-deep"
                      aria-hidden="true"
                    />
                    Verificado
                  </dd>
                </div>
              </dl>
            </div>

            {/* Curadoria card */}
            <div className="space-y-4 rounded-xl bg-navy p-8">
              <div className="flex items-center gap-2">
                <Sparkles
                  className="h-6 w-6 text-gold"
                  aria-hidden="true"
                />
                <span className="rounded-full bg-navy-soft px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold">
                  Curadoria
                </span>
              </div>
              <h4 className="font-display text-xl text-offwhite">
                Quer uma curadoria pra voce?
              </h4>
              <p className="font-body text-sm leading-relaxed text-offwhite/80">
                Conta pra gente o que procura e nossa equipe seleciona
                candidatos da regiao no perfil certo.
              </p>
              <button
                type="button"
                className="btn btn-gold btn-block rounded py-3 uppercase tracking-wider"
              >
                Solicitar curadoria
              </button>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

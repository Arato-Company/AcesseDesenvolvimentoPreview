import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
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
  detalhe: string;
};

/**
 * Gera mock de timeline a partir do nivel/cargo/area do candidato.
 * Mantemos deterministico por id pra evitar ruido em build estatico.
 */
function gerarExperiencias(c: Candidato): Experiencia[] {
  const anoBase = 2026;
  const cargo = c.cargo;
  const area = areaNome(c.area);
  const cidade = cidadeNome(c.cidade);

  const blocos: Record<Candidato["nivel"], Experiencia[]> = {
    Junior: [
      {
        periodo: `${anoBase - 1} — atual`,
        cargo,
        empresa: `Empresa regional · ${cidade}`,
        detalhe: `Primeira experiencia formal em ${area.toLowerCase()}. Aprendizado de rotina, atendimento e processos.`,
      },
      {
        periodo: `${anoBase - 2} — ${anoBase - 1}`,
        cargo: `Aprendiz / Estagio`,
        empresa: `Programa Jovem Aprendiz · Circuito das Aguas`,
        detalhe: `Formacao tecnica e primeiros contatos com o mercado regional.`,
      },
    ],
    Pleno: [
      {
        periodo: `${anoBase - 2} — atual`,
        cargo,
        empresa: `Empresa de medio porte · ${cidade}`,
        detalhe: `Atuacao plena em ${area.toLowerCase()} com responsabilidade direta sobre rotina, processos e atendimento.`,
      },
      {
        periodo: `${anoBase - 5} — ${anoBase - 2}`,
        cargo: `${cargo} Junior`,
        empresa: `Empresa local · ${cidade}`,
        detalhe: `Consolidacao tecnica e primeira passagem por gestao de demandas.`,
      },
      {
        periodo: `${anoBase - 6} — ${anoBase - 5}`,
        cargo: `Funcao de apoio em ${area}`,
        empresa: `Empresa familiar do Circuito`,
        detalhe: `Primeira experiencia em ${area.toLowerCase()}. Base operacional.`,
      },
    ],
    Senior: [
      {
        periodo: `${anoBase - 4} — atual`,
        cargo: `${cargo} Senior`,
        empresa: `Empresa lider regional · ${cidade}`,
        detalhe: `Lideranca tecnica em ${area.toLowerCase()}. Mentoria de juniores e responsabilidade por entregas criticas.`,
      },
      {
        periodo: `${anoBase - 8} — ${anoBase - 4}`,
        cargo,
        empresa: `Empresa de medio porte`,
        detalhe: `Atuacao plena com participacao em projetos de melhoria.`,
      },
      {
        periodo: `${anoBase - 10} — ${anoBase - 8}`,
        cargo: `${cargo} Junior`,
        empresa: `Empresa local`,
        detalhe: `Formacao tecnica intensiva. Certificacoes da area.`,
      },
    ],
    Especialista: [
      {
        periodo: `${anoBase - 6} — atual`,
        cargo: `Especialista em ${area}`,
        empresa: `Empresa lider regional · ${cidade}`,
        detalhe: `Referencia tecnica em ${area.toLowerCase()}. Definicao de processos e padrao operacional.`,
      },
      {
        periodo: `${anoBase - 10} — ${anoBase - 6}`,
        cargo: `${cargo} Senior`,
        empresa: `Empresa de grande porte`,
        detalhe: `Lideranca tecnica em projetos estruturantes.`,
      },
      {
        periodo: `${anoBase - 12} — ${anoBase - 10}`,
        cargo,
        empresa: `Empresa regional`,
        detalhe: `Consolidacao da especializacao tecnica.`,
      },
    ],
  };

  return blocos[c.nivel];
}

export default async function PerfilCandidatoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const candidato = candidatosTyped.find((c) => c.id === id);
  if (!candidato) notFound();

  const experiencias = gerarExperiencias(candidato);
  const cidade = cidadeNome(candidato.cidade);
  const area = areaNome(candidato.area);
  const isCurado = candidato.curado;

  // Contato anonimizado — placeholder DDD regional, sem dados reais.
  const waMessage = encodeURIComponent(
    `Ola! Vi seu perfil na Acesse Desenvolvimento e gostaria de conversar sobre uma vaga.`,
  );
  const waHref = `https://wa.me/5519999000000?text=${waMessage}`;
  const mailHref = `mailto:contato@acesse.dev?subject=${encodeURIComponent(
    `Contato via Acesse — ${candidato.nome}`,
  )}`;

  return (
    <AppShell
      audience="empresa"
      topbarTitle={`Perfil · ${candidato.nome}`}
      topbarUserLabel="CA"
    >
      <div className="mb-6 flex items-center gap-3 text-sm">
        <Link
          href="/empresa/vitrine"
          className="font-mono text-2xs uppercase tracking-widest text-ink-2 hover:text-navy"
        >
          ← Vitrine
        </Link>
        <span className="text-ink-3">/</span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          {candidato.id}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Coluna principal */}
        <div>
          <header
            className={`profile-card ${isCurado ? "profile-card-curado" : ""} !p-8`}
          >
            {isCurado ? (
              <span className="profile-curado-badge">✦ Curado</span>
            ) : null}
            <div className="profile-card-header">
              <Avatar name={candidato.nome} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="caps mb-2 text-gold-deep">{area}</p>
                <h1 className="font-display text-3xl font-semibold text-navy">
                  {candidato.nome}
                </h1>
                <p className="mt-1 text-base text-ink-2">{candidato.cargo}</p>
                <p className="profile-city mt-2">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {cidade} · SP · {candidato.nivel}
                </p>
              </div>
            </div>

            <div className="profile-tags">
              {candidato.tags.map((t) => (
                <span
                  key={t}
                  className={`tag${isCurado ? " tag-gold" : ""}`}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="profile-match">
              <span className="match-label">Match com sua empresa</span>
              <span className="match-score">{candidato.matchScore}%</span>
            </div>
          </header>

          <section className="mt-10">
            <p className="caps mb-3">Sobre</p>
            <p className="text-base leading-relaxed text-ink-2">
              {candidato.resumo}
            </p>
          </section>

          <section className="mt-10">
            <p className="caps mb-4">Experiencia profissional</p>
            <ol className="timeline">
              {experiencias.map((exp, i) => (
                <li key={i} className="timeline-item">
                  <p className="timeline-period">{exp.periodo}</p>
                  <p className="timeline-role">{exp.cargo}</p>
                  <p className="timeline-company">{exp.empresa}</p>
                  <p className="timeline-detail">{exp.detalhe}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <p className="caps mb-3">Disponibilidade</p>
            <p className="text-base text-ink-2">
              Disponibilidade imediata · CLT preferencial · Aceita ate 30km de{" "}
              {cidade}
            </p>
          </section>
        </div>

        {/* Sidebar de contato */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-offwhite p-6 shadow-2">
            <p className="caps mb-3">Entrar em contato</p>
            <p className="mb-5 text-sm text-ink-2">
              Contato direto sem chat interno. Identifique a vaga e a empresa na
              primeira mensagem.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-block"
            >
              Chamar no WhatsApp
            </a>
            <a href={mailHref} className="btn btn-secondary btn-block mt-3">
              Enviar email
            </a>
            <p className="mt-5 border-t border-line pt-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
              CURADORIA · Perfil revisado em {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-line bg-paper p-5">
            <p className="caps mb-2 text-gold-deep">Plano {candidato.plano}</p>
            <p className="text-sm text-ink-2">
              Este perfil esta visivel pela vitrine padrao. Empresas Premium tem
              acesso antecipado a candidatos curados.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

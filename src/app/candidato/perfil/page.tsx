import {
  MapPin,
  Clock,
  Pencil,
  CheckCircle,
  Download,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PlaceholderImage } from "@/components/PlaceholderImage";

/**
 * /candidato/perfil — visao do proprio perfil (net-new, responsivo).
 * Mobile: coluna. Desktop: hero split + secoes largas.
 * Espelha a estrutura da tela que a empresa ve (W04), mas em 1a pessoa
 * com acoes de edicao/visibilidade.
 */

const SELF = {
  nome: "Joao Pedro Alves",
  cargo: "Tecnico em Logistica",
  cidade: "Amparo",
  curado: true,
  perfilCompleto: 92,
  visualizacoes: 12,
  resumo:
    "Tecnico em logistica com foco em operacoes regionais no Circuito das Aguas. Experiencia em gestao de estoque, roteirizacao e atendimento a clientes B2B.",
  tags: ["Estoque", "Roteirizacao", "Excel", "WMS", "Atendimento B2B"],
};

const EXPERIENCIAS = [
  {
    periodo: "2023 — atual",
    cargo: "Tecnico em Logistica",
    empresa: "LogTech · Jaguariuna",
    bullets: [
      "Gestao de estoque e roteirizacao de entregas regionais.",
      "Reducao de 18% no tempo medio de expedicao.",
    ],
  },
  {
    periodo: "2020 — 2023",
    cargo: "Assistente de Logistica",
    empresa: "Empresa regional · Amparo",
    bullets: ["Conferencia de cargas e apoio a expedicao."],
  },
];

const FORMACAO = [
  {
    titulo: "Ensino tecnico em Logistica",
    instituicao: "SENAI · Polo regional",
    periodo: "2018 — 2020",
  },
];

export default function CandidatoPerfilPage() {
  return (
    <CandidatoLayout userName={SELF.nome} title="Meu perfil">
      {/* ==================== HERO ==================== */}
      <section className="flex flex-col gap-6 md:flex-row md:gap-12 md:pt-4">
        {/* Foto */}
        <div className="mx-auto w-full max-w-[280px] md:mx-0 md:w-1/3 md:max-w-[320px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <PlaceholderImage
              src="/avatares/cand-joao.webp"
              alt={SELF.nome}
              fallbackLabel={SELF.nome}
              fill
              sizes="(min-width: 768px) 320px, 280px"
              className="object-cover"
              priority
            />
            {SELF.curado ? (
              <span className="profile-curado-badge absolute left-5 top-5">
                ✦ Curado
              </span>
            ) : null}
          </div>
        </div>

        {/* Identidade */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-deep">Meu perfil</p>
              <h1 className="mt-2 font-display text-[32px] font-semibold leading-tight tracking-tight text-navy antialiased md:text-[48px]">
                {SELF.nome}
              </h1>
              <p className="mt-1 font-display text-lg text-ink-2 md:text-xl">
                {SELF.cargo}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm hidden md:inline-flex"
            >
              <Pencil size={14} strokeWidth={1.7} />
              Editar
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2">
              <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              {SELF.cidade}, SP
            </span>
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2">
              <Clock className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              Disponibilidade imediata
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {SELF.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-2"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/candidato/curriculo" className="btn btn-primary">
              <Download size={16} strokeWidth={1.7} />
              Baixar curriculo
            </Link>
            <button type="button" className="btn btn-secondary md:hidden">
              <Pencil size={16} strokeWidth={1.7} />
              Editar perfil
            </button>
          </div>
        </div>
      </section>

      {/* ==================== STATS + CONTENT ==================== */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-12">
        {/* MAIN */}
        <div className="space-y-12 md:col-span-8 md:space-y-16">
          <section>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Sobre mim
            </p>
            <p className="font-body text-base leading-relaxed text-ink-2 md:text-lg">
              {SELF.resumo}
            </p>
          </section>

          <section>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Experiencia profissional
            </p>
            <ol className="timeline">
              {EXPERIENCIAS.map((exp, i) => (
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

          <section>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold-deep">
              Formacao academica
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {FORMACAO.map((f, i) => (
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
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6 md:col-span-4">
          <div className="rounded-xl border border-line bg-offwhite p-6">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              Forca do perfil
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[40px] font-semibold leading-none text-gold-deep">
                {SELF.perfilCompleto}%
              </span>
              <span className="text-sm text-ink-2">completo</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${SELF.perfilCompleto}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-ink-2">
              Adicione uma foto profissional pra chegar a 100%.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-offwhite p-6">
            <dl className="space-y-3">
              <div className="flex items-center justify-between border-b border-line/30 pb-3">
                <dt className="flex items-center gap-2 font-mono text-2xs uppercase tracking-wider text-ink-2">
                  <Eye className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  Visualizacoes
                </dt>
                <dd className="text-sm font-semibold text-navy">
                  {SELF.visualizacoes}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 font-mono text-2xs uppercase tracking-wider text-ink-2">
                  <CheckCircle
                    className="h-4 w-4 text-gold-deep"
                    aria-hidden="true"
                  />
                  Status
                </dt>
                <dd className="text-sm font-semibold text-navy">
                  Curado ✦
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4 rounded-xl bg-navy p-6">
            <h4 className="font-display text-lg text-offwhite">
              Quer aparecer mais?
            </h4>
            <p className="font-body text-sm leading-relaxed text-offwhite/80">
              Perfis em destaque sao vistos ate 5x mais pelas empresas da regiao.
            </p>
            <Link
              href="/candidato/planos"
              className="btn btn-gold btn-block rounded py-3 uppercase tracking-wider"
            >
              Ver planos
            </Link>
          </div>
        </aside>
      </div>
    </CandidatoLayout>
  );
}

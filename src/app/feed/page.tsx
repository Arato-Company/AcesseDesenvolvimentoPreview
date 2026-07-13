import { Sparkles } from "lucide-react";
import Link from "next/link";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PlaceholderImage } from "@/components/PlaceholderImage";

type Artigo = {
  id: string;
  categoria: string;
  titulo: string;
  resumo: string;
  data: string;
  leitura: string;
  imagem: string;
};

/**
 * /feed — reescrito fiel ao Stitch Web/14 (Feed Novidades Desktop).
 *
 * Estrutura: header editorial · featured post split (imagem + painel navy) ·
 * grid 4 cards (2-col) + sidebar Categorias · footer de cidades.
 * Mantem o top navbar da jornada (CandidatoLayout) em vez da sidebar do W14.
 * Mobile: mesmo markup reflui (featured empilha, cards 1-col).
 */

const FEATURED = {
  titulo: "O futuro da manufatura na regiao norte",
  resumo:
    "Como a automacao e a sustentabilidade estao redefinindo os polos industriais de Jaguariuna e Amparo, criando novas demandas por talentos qualificados e infraestrutura tecnologica de ponta.",
  leitura: "12 min leitura",
  imagem: "/feed/artigo-02.webp",
};

const ARTIGOS: Artigo[] = [
  {
    id: "art-1",
    categoria: "Dica de carreira",
    titulo: "Como se destacar em entrevistas tecnicas",
    resumo:
      "Estrategias comprovadas para profissionais de engenharia e tecnologia que buscam posicoes seniores na regiao.",
    data: "15 Out, 2026",
    leitura: "6 min",
    imagem: "/feed/artigo-01.webp",
  },
  {
    id: "art-2",
    categoria: "Mercado local",
    titulo: "Nova unidade fabril abre 200 vagas",
    resumo:
      "Multinacional do setor automotivo confirma expansao em Pedreira com foco em novas tecnologias de producao.",
    data: "12 Out, 2026",
    leitura: "4 min",
    imagem: "/feed/artigo-02.webp",
  },
  {
    id: "art-3",
    categoria: "Editorial",
    titulo: "O talento regional e nosso maior ativo",
    resumo:
      "Por que investir na retencao de talentos locais e a estrategia mais inteligente para o crescimento sustentavel.",
    data: "10 Out, 2026",
    leitura: "8 min",
    imagem: "/feed/artigo-03.webp",
  },
  {
    id: "art-4",
    categoria: "Desenvolvimento",
    titulo: "Soft skills: o diferencial no setor de servicos",
    resumo:
      "Comunicacao e lideranca tornam-se competencias criticas para os novos lideres do setor terciario regional.",
    data: "08 Out, 2026",
    leitura: "5 min",
    imagem: "/feed/artigo-01.webp",
  },
];

const CATEGORIAS = [
  "Industria",
  "Tecnologia",
  "Vagas",
  "Carreira",
  "Lideranca",
  "Cidades",
];

const CIDADES = [
  "Jaguariuna",
  "Amparo",
  "Pedreira",
  "Serra Negra",
  "Lindoia",
  "Aguas de Lindoia",
  "Socorro",
];

export default function FeedPage() {
  return (
    <CandidatoLayout userName="Joao Pedro" title="Novidades">
      {/* Header editorial */}
      <div className="pt-2 md:pt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-gold-light" aria-hidden="true" />
          <span className="eyebrow text-gold-deep">Editorial Curado</span>
        </div>
        <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-navy antialiased md:text-[36px]">
          Novidades da regiao
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base text-ink-2 md:text-lg">
          Acompanhe as transformacoes do mercado de trabalho e as principais
          movimentacoes industriais no Circuito das Aguas.
        </p>
      </div>

      {/* Featured post */}
      <section className="mt-10 md:mt-12">
        <div className="grid grid-cols-12 overflow-hidden rounded-xl border-[1.5px] border-gold-light/40 bg-navy text-offwhite">
          <div className="relative col-span-12 min-h-[240px] md:min-h-[400px] lg:col-span-7">
            <PlaceholderImage
              src={FEATURED.imagem}
              alt={FEATURED.titulo}
              fallbackLabel="CURADORIA DA SEMANA"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover opacity-90"
              priority
            />
            <div
              className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/40 to-transparent lg:block"
              aria-hidden="true"
            />
          </div>
          <div className="col-span-12 flex flex-col justify-center p-8 md:p-12 lg:col-span-5">
            <span className="mb-6 inline-flex w-fit items-center gap-1 rounded-full border border-gold-light bg-gold-light/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold-light">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Curadoria da semana
            </span>
            <h2 className="mb-6 font-display text-[28px] font-semibold leading-tight md:text-[36px]">
              {FEATURED.titulo}
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-offwhite/80">
              {FEATURED.resumo}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-4">
              <button type="button" className="btn btn-gold">
                Ler artigo completo
              </button>
              <span className="font-mono text-[11px] uppercase tracking-widest text-offwhite/50">
                {FEATURED.leitura}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid artigos + sidebar */}
      <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ARTIGOS.map((a) => (
              <ArtigoCard key={a.id} artigo={a} />
            ))}
          </div>
        </div>

        <aside className="col-span-12 space-y-12 lg:col-span-4">
          <section>
            <h3 className="mb-6 flex items-center gap-2 font-display text-[20px] font-semibold text-navy">
              Categorias
              <span
                className="h-px flex-1 bg-line/60"
                aria-hidden="true"
              />
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat, i) => (
                <button
                  key={cat}
                  type="button"
                  className={`rounded-lg px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    i === 0
                      ? "bg-navy text-offwhite hover:bg-navy-soft"
                      : "bg-paper text-ink-2 hover:bg-line/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* CTA perfil */}
          <section className="rounded-xl bg-navy-soft p-8 text-center">
            <h4 className="mb-3 font-display text-[20px] font-semibold text-offwhite">
              Quer ser encontrado pelas empresas?
            </h4>
            <p className="mb-6 font-body text-sm text-offwhite/70">
              Seu perfil atualizado aumenta as chances de ser encontrado. Escolha
              um plano e destaque-se.
            </p>
            <Link
              href="/candidato/curriculo"
              className="btn btn-gold btn-block rounded-lg py-3 uppercase tracking-wider"
            >
              Atualizar curriculo
            </Link>
          </section>
        </aside>
      </div>

      {/* Footer cidades */}
      <footer className="mt-16 border-t border-line/40 pt-10 md:mt-20">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {CIDADES.map((c) => (
              <span
                key={c}
                className="font-mono text-[11px] uppercase tracking-widest text-ink-2"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="font-body text-sm text-ink-3">
            © 2026 Acesse Desenvolvimento. Editorial Curado.
          </p>
        </div>
      </footer>
    </CandidatoLayout>
  );
}

function ArtigoCard({ artigo }: { artigo: Artigo }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line/40 bg-offwhite transition-all hover:border-gold-light/60">
      <div className="aspect-[16/9] overflow-hidden bg-paper">
        <PlaceholderImage
          src={artigo.imagem}
          alt={artigo.titulo}
          fallbackLabel="Editorial"
          width={640}
          height={360}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow mb-3 block text-gold-deep">
          {artigo.categoria}
        </span>
        <h4 className="mb-3 font-display text-[20px] font-semibold leading-snug text-navy transition-colors group-hover:text-gold-deep">
          {artigo.titulo}
        </h4>
        <p className="mb-6 line-clamp-2 font-body text-sm text-ink-2">
          {artigo.resumo}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-line/30 pt-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
            {artigo.data}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
            {artigo.leitura}
          </span>
        </div>
      </div>
    </article>
  );
}

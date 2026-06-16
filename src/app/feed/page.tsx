import { ArrowRight, Bell, UserCircle } from "lucide-react";
import Link from "next/link";
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

const ARTIGOS: Artigo[] = [
  {
    id: "art-1",
    categoria: "Dica de carreira",
    titulo: "Como se destacar em entrevistas tecnicas locais",
    resumo:
      "Recrutadores do Circuito compartilham o que pesa numa entrevista presencial regional.",
    data: "14 Out",
    leitura: "5 min leitura",
    imagem: "/feed/artigo-01.webp",
  },
  {
    id: "art-2",
    categoria: "Mercado local",
    titulo: "Nova unidade fabril abre 200 vagas",
    resumo:
      "Inauguracao em Jaguariuna deve absorver mao de obra das cidades vizinhas ate dezembro.",
    data: "13 Out",
    leitura: "3 min leitura",
    imagem: "/feed/artigo-02.webp",
  },
  {
    id: "art-3",
    categoria: "Dica de carreira",
    titulo: "Soft skills: O diferencial no setor de servicos",
    resumo:
      "Pesquisa regional mostra que escuta e adaptacao pesam mais que tempo de casa.",
    data: "11 Out",
    leitura: "4 min leitura",
    imagem: "/feed/artigo-03.webp",
  },
];

/**
 * /feed — M09 (Batch 3, fiel ao Stitch).
 *
 * Decisao PM: feed NAO usa CandidatoLayout (foco no conteudo, sem bottom-nav
 * intrusiva). Standalone mobile-first com max-w-md. Topbar custom.
 *
 * Conteudo:
 *  - post pinned navy "Curadoria da semana" (hardcoded v0, v1 vira CMS)
 *  - 2 cards article (artigo-01, artigo-02)
 *  - artigo editorial expandido com blockquote
 *  - 1 card article (artigo-03)
 *  - CTA final navy-soft "Atualizar curriculo"
 */
export default function FeedPage() {
  return (
    <div className="min-h-screen bg-offwhite pb-24 text-ink-1">
      {/* TopAppBar mobile */}
      <header className="mobile-header sticky top-0 z-50">
        <h1 className="font-display text-[20px] font-bold tracking-tight text-navy">
          Novidades
        </h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="icon-btn rounded-full"
            aria-label="Notificacoes"
          >
            <Bell className="h-6 w-6 text-navy" aria-hidden="true" />
          </button>
          <Link
            href="/candidato/dashboard"
            className="icon-btn rounded-full"
            aria-label="Perfil"
          >
            <UserCircle className="h-6 w-6 text-navy" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-md space-y-12 px-4">
        {/* Post pinned — Curadoria da semana */}
        <section className="relative overflow-hidden rounded-xl border-2 border-gold-light bg-navy text-offwhite shadow-sm">
          <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="eyebrow caps-on-dark text-gold-light">
                ✦ Curadoria da semana
              </span>
            </div>
            <h2 className="mb-3 font-display text-[28px] font-semibold leading-tight">
              O futuro da manufatura na regiao norte
            </h2>
            <p className="mb-6 font-body text-base opacity-90">
              Uma analise profunda sobre como as industrias locais estao se
              adaptando a automacao e o que isso significa pra quem trabalha
              hoje no Circuito.
            </p>
            <div className="flex items-center justify-between text-offwhite/60">
              <div className="flex items-center gap-4">
                <span className="eyebrow text-[10px]">12 Out</span>
                <span className="eyebrow text-[10px]">8 min leitura</span>
              </div>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* Cards artigos 1-2 */}
        {ARTIGOS.slice(0, 2).map((a) => (
          <ArtigoCard key={a.id} artigo={a} />
        ))}

        {/* Artigo editorial expandido (entre artigo 2 e 3) */}
        <article className="border-y border-line py-8">
          <span className="eyebrow mb-4 block text-gold-deep">
            Entrevista exclusiva
          </span>
          <h2 className="mb-6 font-display text-[28px] font-semibold leading-tight text-navy">
            “O talento regional e nosso maior ativo”, diz CEO da TechLog
          </h2>
          <div className="space-y-4 font-body text-base text-ink-1">
            <p>
              Conversamos com Ricardo Almeida sobre os desafios de contratar em
              um cenario de rapida transformacao digital e por que a empresa
              decidiu manter o centro de operacoes no interior paulista.
            </p>
            <blockquote className="border-l-4 border-gold-light bg-paper py-4 pl-4 italic text-ink-2">
              “Nao buscamos apenas o melhor curriculo, buscamos quem entende a
              dinamica e as necessidades da nossa gente.”
            </blockquote>
            <p>
              A TechLog planeja implementar um programa de mentorias gratuitas
              para jovens da regiao a partir do proximo trimestre.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <PlaceholderImage
              src="/avatares/autor-joao.webp"
              alt="Joao Pedro"
              fallbackLabel="JP"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-[16px] font-semibold text-navy">
                Por Joao Pedro
              </p>
              <p className="font-body text-xs text-ink-3">Editor de Carreira</p>
            </div>
          </div>
        </article>

        {/* Card artigo 3 */}
        {ARTIGOS.slice(2).map((a) => (
          <ArtigoCard key={a.id} artigo={a} />
        ))}

        {/* CTA final */}
        <div className="rounded-xl bg-navy-soft p-8 text-center">
          <h3 className="mb-4 font-display text-[20px] font-semibold text-offwhite">
            Quer aparecer pras empresas?
          </h3>
          <p className="mb-6 font-body text-sm text-offwhite/70">
            Mantenha seu curriculo atualizado e seu perfil em destaque na
            vitrine.
          </p>
          <Link
            href="/candidato/curriculo"
            className="btn btn-gold flex h-14 w-full items-center justify-center gap-2 rounded-xl font-semibold active:scale-95"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
            Atualizar curriculo
          </Link>
        </div>
      </main>
    </div>
  );
}

function ArtigoCard({ artigo }: { artigo: Artigo }) {
  return (
    <article className="group">
      <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-paper">
        <PlaceholderImage
          src={artigo.imagem}
          alt={artigo.titulo}
          fallbackLabel="Editorial"
          width={640}
          height={360}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="eyebrow mb-2 block text-gold-deep">
        {artigo.categoria}
      </span>
      <h3 className="mb-2 font-display text-[20px] font-semibold text-navy">
        {artigo.titulo}
      </h3>
      <p className="mb-3 line-clamp-2 font-body text-sm text-ink-2">
        {artigo.resumo}
      </p>
      <div className="flex items-center gap-4 text-ink-3">
        <span className="eyebrow text-[10px]">{artigo.data}</span>
        <span className="eyebrow text-[10px]">·</span>
        <span className="eyebrow text-[10px]">{artigo.leitura}</span>
      </div>
    </article>
  );
}

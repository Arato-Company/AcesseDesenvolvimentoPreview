import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import planos from "@/data/planos.json";
import type { Planos } from "@/types";

const planosTyped = planos as Planos;

/**
 * Landing page principal — porte fiel do `Marketing/LP/index.html`.
 * Todas as 10 secoes da LP, usando classes do tokens.css. Pricing
 * consome `planos.json` (lado empresa).
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 80% 10%, rgba(201,162,74,0.08), transparent 50%), var(--c-offwhite)",
            padding: "var(--s-24) 0 var(--s-32)",
          }}
          aria-labelledby="hero-title"
        >
          <div className="container-ds grid items-center gap-16 lg:grid-cols-2">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">
                Vitrine regional · Circuito das Aguas
              </p>
              <h1 id="hero-title" className="display-2xl mb-6">
                Tem gente olhando.
              </h1>
              <p className="lead mb-8">
                Plataforma regional de empregabilidade no Circuito das Aguas
                paulista. Vitrine padronizada, job board e triagem humana —
                feita por quem conhece a regiao ha 10 anos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/login" className="btn btn-primary btn-lg">
                  Sou candidato
                </Link>
                <Link href="#planos" className="btn btn-secondary btn-lg">
                  Sou empresa
                </Link>
              </div>
              <p className="mt-10 flex flex-wrap items-center gap-4 text-sm text-ink-2">
                <span>
                  <span className="font-display text-xl font-semibold text-navy">
                    9
                  </span>{" "}
                  cidades atendidas
                </span>
                <span className="text-line" aria-hidden="true">
                  ·
                </span>
                <span>
                  <span className="font-display text-xl font-semibold text-navy">
                    10
                  </span>{" "}
                  anos de R&amp;S regional
                </span>
                <span className="text-line" aria-hidden="true">
                  ·
                </span>
                <span>Curadoria humana</span>
              </p>
            </div>
            <aside className="relative">
              <figure
                className="relative overflow-hidden rounded-2xl bg-paper shadow-4"
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src="/hero-foto-solo.webp"
                  alt="Profissional em ambiente regional do Circuito das Aguas"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "55% 30%" }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <figcaption
                  className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium text-offwhite backdrop-blur"
                  style={{ background: "rgba(14,42,71,0.85)" }}
                >
                  <span aria-hidden="true" className="text-gold-light">
                    ✦
                  </span>
                  <span>Curado pela equipe</span>
                </figcaption>
              </figure>
            </aside>
          </div>
        </section>

        {/* PAIN DUAL */}
        <section
          className="border-y border-line bg-paper"
          style={{ padding: "var(--s-20) 0" }}
          aria-labelledby="pain-title"
        >
          <div className="container-ds">
            <h2 id="pain-title" className="visually-hidden">
              Para quem e?
            </h2>
            <div className="grid gap-16 md:grid-cols-2">
              <article>
                <p className="caps mb-3">Para profissionais</p>
                <h3 className="display-md mb-4">
                  Ja mandou curriculo e ouviu silencio?
                </h3>
                <p className="mb-5 max-w-prose text-ink-2">
                  O algoritmo passou direto. Seu perfil sumiu numa pilha de
                  mil. Aqui, alguem olha cada cadastro — e abre porta com
                  empresa real da regiao.
                </p>
                <Link
                  href="/candidato/cadastro"
                  className="inline-flex items-center gap-2 border-b border-navy pb-1 text-sm font-medium text-navy"
                >
                  Como funciona pra mim{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
              <article>
                <p className="caps mb-3">Para empresas</p>
                <h3 className="display-md mb-4">
                  Vaga aberta, ninguem certo aparece?
                </h3>
                <p className="mb-5 max-w-prose text-ink-2">
                  Aqui voce pula a indicacao enviesada e o LinkedIn frio. Ve
                  candidatos da regiao com perfil padronizado e — se quiser —
                  recebe a triagem feita pela equipe.
                </p>
                <Link
                  href="/empresa/vitrine"
                  className="inline-flex items-center gap-2 border-b border-navy pb-1 text-sm font-medium text-navy"
                >
                  Como funciona pra empresa{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          style={{ padding: "var(--s-24) 0" }}
          aria-labelledby="how-title"
        >
          <div className="container-ds">
            <header className="mx-auto mb-16 max-w-3xl text-center">
              <p className="caps mb-3">Como funciona</p>
              <h2 id="how-title" className="display-xl mb-4">
                Tres passos pra cada lado.
              </h2>
            </header>
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <h3 className="display-md mb-8 inline-block border-b-2 border-gold pb-4">
                  Candidato
                </h3>
                <ol className="flex flex-col gap-8">
                  {[
                    {
                      n: "01",
                      t: "Cadastro padronizado.",
                      d: 'Formulario guiado. Sem PDF perdido, sem "curriculo cabeludo".',
                    },
                    {
                      n: "02",
                      t: "Curriculo gerado.",
                      d: "A gente entrega versao pra impressao e versao profissional em PDF.",
                    },
                    {
                      n: "03",
                      t: "Visibilidade real.",
                      d: "Empresas da regiao veem seu perfil. Algumas falam direto contigo.",
                    },
                  ].map((s) => (
                    <li key={s.n} className="grid grid-cols-[48px_1fr] gap-x-5">
                      <span className="font-mono text-xs font-medium tracking-widest text-gold-deep">
                        {s.n}
                      </span>
                      <div>
                        <h4 className="mb-1 font-display text-xl font-medium text-navy">
                          {s.t}
                        </h4>
                        <p className="text-ink-2">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="display-md mb-8 inline-block border-b-2 border-gold pb-4">
                  Empresa
                </h3>
                <ol className="flex flex-col gap-8">
                  {[
                    {
                      n: "01",
                      t: "Filtro objetivo.",
                      d: "Area, senioridade, certificacao, cidade. Sem buscar por palavra-chave.",
                    },
                    {
                      n: "02",
                      t: "Contato direto.",
                      d: "WhatsApp ou e-mail com candidato qualificado. Sem CV cego.",
                    },
                    {
                      n: "03",
                      t: "Triagem humana.",
                      d: "A gente seleciona os 3 a 5 melhores e entrega no e-mail.",
                      tag: "Premium",
                    },
                  ].map((s) => (
                    <li key={s.n} className="grid grid-cols-[48px_1fr] gap-x-5">
                      <span className="font-mono text-xs font-medium tracking-widest text-gold-deep">
                        {s.n}
                      </span>
                      <div>
                        <h4 className="mb-1 font-display text-xl font-medium text-navy">
                          {s.t}{" "}
                          {s.tag ? (
                            <span className="ml-2 inline-block rounded-sm bg-gold-light px-2 py-0.5 text-xs font-medium text-navy-deep">
                              {s.tag}
                            </span>
                          ) : null}
                        </h4>
                        <p className="text-ink-2">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIAS REGIONAIS */}
        <section
          className="border-y border-line bg-paper"
          style={{ padding: "var(--s-24) 0" }}
          aria-labelledby="cat-title"
        >
          <div className="container-ds">
            <header className="mx-auto mb-16 max-w-3xl text-center">
              <p className="caps mb-3">Categorias regionais</p>
              <h2 id="cat-title" className="display-xl mb-4">
                Curado pra quem trabalha aqui.
              </h2>
              <p className="lead mx-auto">
                9 cidades. 5 frentes profissionais que movem a economia do
                Circuito das Aguas paulista.
              </p>
            </header>

            <article
              className="mb-12 grid items-center gap-12 overflow-hidden rounded-2xl border border-line bg-offwhite shadow-2 lg:grid-cols-[1.2fr_1fr]"
            >
              <div
                className="flex h-full items-center justify-center p-8"
                style={{
                  background:
                    "linear-gradient(135deg, #FBFAF7 0%, #F4EFE3 100%)",
                  minHeight: 320,
                }}
              >
                <Image
                  src="/categorias/turismo.png"
                  alt="Paisagem do Circuito das Aguas com hoteis e sol nascente"
                  width={520}
                  height={520}
                  className="h-auto w-full max-w-md"
                />
              </div>
              <div className="p-8 pr-12 lg:py-12">
                <p className="caps caps-on-light mb-3">
                  Turismo &amp; Hospitalidade
                </p>
                <h3 className="display-lg mb-4">
                  A regiao vive de quem recebe gente.
                </h3>
                <p className="mb-5 text-ink-2">
                  Hoteis em Serra Negra, pousadas em Aguas de Lindoia,
                  restaurantes do circuito. Recepcao, governanca, A&amp;B,
                  eventos.
                </p>
                <p className="flex flex-wrap gap-2">
                  {[
                    "Serra Negra",
                    "Aguas de Lindoia",
                    "Lindoia",
                    "Socorro",
                    "Monte Alegre do Sul",
                  ].map((c) => (
                    <span
                      key={c}
                      className="inline-block rounded-pill border border-line bg-paper px-3 py-1 font-mono text-xs text-navy"
                    >
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  slug: "industria",
                  title: "Industria",
                  desc: "Mahle, IBM Jaguariuna, fabricas locais. Operacao, manutencao, qualidade, engenharia.",
                },
                {
                  slug: "agro",
                  title: "Agro & Floricultura",
                  desc: "Holambra, Cooperflora, fazendas. Estufa, logistica, vendas, agronomia.",
                },
                {
                  slug: "saude",
                  title: "Saude",
                  desc: "Hospital Amparo, clinicas, Santa Casa. Enfermagem, tecnicos, atendimento.",
                },
                {
                  slug: "comercio",
                  title: "Comercio & Atendimento",
                  desc: "Lojas do centro de Amparo, mercados, restaurantes. Vendas, caixa, gerencia.",
                },
              ].map((cat) => (
                <article
                  key={cat.slug}
                  className="rounded-xl border border-line bg-offwhite p-8 text-center transition-all duration-base ease hover:-translate-y-0.5 hover:border-gold hover:shadow-3"
                >
                  <Image
                    src={`/categorias/${cat.slug}.png`}
                    alt=""
                    width={96}
                    height={96}
                    className="mx-auto mb-4 h-24 w-24 object-contain"
                  />
                  <h3 className="mb-2 font-display text-lg font-semibold text-navy">
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-2">
                    {cat.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          style={{ padding: "var(--s-20) 0" }}
          aria-labelledby="testi-title"
        >
          <div className="container-ds">
            <header className="mx-auto mb-16 max-w-3xl text-center">
              <p className="caps mb-3">Historias</p>
              <h2 id="testi-title" className="display-xl">
                Quem ja passou por aqui.
              </h2>
            </header>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote:
                    "Mandei curriculo em varios lugares e nunca tinha resposta. Aqui, em duas semanas, recebi uma mensagem de uma pousada em Serra Negra. Hoje sou recepcionista la.",
                  name: "Ana Paula S.",
                  meta: "Recepcionista · contratada em mar/2026",
                },
                {
                  quote:
                    "A gente precisava de gente da regiao, com perfil bom, sem ter que peneirar 200 curriculos. Eles entregaram 4 candidatos. Contratamos 2.",
                  name: "Carolina M.",
                  meta: "RH em fabrica de autopecas · Jaguariuna",
                },
              ].map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-lg border border-l-4 border-line border-l-gold bg-offwhite p-10"
                >
                  <p className="mb-6 font-display text-xl italic leading-relaxed text-navy">
                    “{t.quote}”
                  </p>
                  <footer>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-sm text-ink-3">{t.meta}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING EMPRESA */}
        <section
          id="planos"
          className="border-t border-line bg-paper"
          style={{ padding: "var(--s-24) 0" }}
          aria-labelledby="pricing-title"
        >
          <div className="container-ds">
            <header className="mx-auto mb-16 max-w-3xl text-center">
              <p className="caps mb-3">Planos para empresas</p>
              <h2 id="pricing-title" className="display-xl mb-4">
                Mensal recorrente. Sem letra miuda.
              </h2>
              <p className="lead mx-auto">
                Cancele quando quiser. As parceiras institucionais ganham 2
                meses gratis.
              </p>
            </header>
            <div className="grid items-stretch gap-6 lg:grid-cols-3">
              {planosTyped.empresa.map((p) => {
                const isPremium = p.id === "premium";
                const isDestaque = p.id === "destaque";
                return (
                  <PricingCard
                    key={p.id}
                    nome={p.nome}
                    preco={p.preco}
                    periodo="/mes"
                    destaques={p.destaques}
                    variant={
                      isPremium ? "premium" : isDestaque ? "featured" : "default"
                    }
                    badge={
                      isPremium
                        ? "✦ Concierge"
                        : isDestaque
                          ? "Mais escolhido"
                          : undefined
                    }
                    badgeVariant={isPremium ? "gold" : "default"}
                    cta={
                      <Link
                        href="/empresa/planos"
                        className={`btn ${isPremium ? "btn-premium" : isDestaque ? "btn-primary" : "btn-secondary"} btn-block`}
                      >
                        {isPremium ? "Falar com a equipe" : "Comecar agora"}
                      </Link>
                    }
                  />
                );
              })}
            </div>
            <p className="mt-12 text-center text-sm text-ink-2">
              Para profissionais, planos em pacote unico de 5 meses (R$ 19,90 /
              29,90 / 39,90).{" "}
              <Link
                href="/candidato/planos"
                className="border-b border-gold font-medium text-navy"
              >
                Ver planos do candidato →
              </Link>
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          aria-labelledby="cta-title"
          style={{
            padding: "var(--s-32) 0",
            background:
              "radial-gradient(circle at 20% 80%, rgba(201,162,74,0.18), transparent 40%), linear-gradient(180deg, var(--c-navy-deep), var(--c-navy))",
            color: "var(--c-offwhite)",
          }}
        >
          <div className="container-ds mx-auto max-w-3xl text-center">
            <p className="caps caps-on-dark mb-4">
              Pronto pra sair do silencio?
            </p>
            <h2
              id="cta-title"
              className="display-2xl mb-5"
              style={{ color: "var(--c-offwhite)" }}
            >
              Tem gente olhando.
            </h2>
            <p className="lead lead-on-dark mx-auto mb-10">
              Manda seu curriculo. A gente olha.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/candidato/cadastro" className="btn btn-gold btn-lg">
                Sou candidato
              </Link>
              <Link href="#planos" className="btn btn-outline-light btn-lg">
                Sou empresa
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

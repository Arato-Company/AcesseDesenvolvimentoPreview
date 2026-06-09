import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { rotas, rotaGrupos } from "@/data/rotas";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import vagas from "@/data/vagas.json";
import candidatos from "@/data/candidatos.json";
import empresas from "@/data/empresas.json";

const stats = [
  { label: "Telas mapeadas", value: rotas.length },
  { label: "Cidades atendidas", value: cidades.length },
  { label: "Areas seed", value: areas.length },
  { label: "Vagas seed", value: vagas.length },
  { label: "Candidatos seed", value: candidatos.length },
  { label: "Empresas seed", value: empresas.length },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24">
          <Container>
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Vitrine regional · Circuito das Aguas
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-navy">
              Tem gente olhando.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-2">
              Scaffold v0 do produto. Use esta pagina como indice navegavel das
              telas mapeadas no Stitch (Etapa 9). UI completa entra na proxima
              rodada — aqui o foco e estrutura, rotas, design system e mock
              data.
            </p>
          </Container>
        </section>

        {/* Stats seed */}
        <section className="border-y border-line bg-paper/60 py-12">
          <Container>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-6">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-3xl font-semibold text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-ink-2">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Galeria de rotas */}
        <section className="py-24">
          <Container>
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Mapa de rotas
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
              {rotas.length} telas navegaveis
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink-2">
              Cada link abre o placeholder da tela com link de volta. Mobile e
              responsivo (sem rotas separadas) — telas marcadas com{" "}
              <span className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                mobile
              </span>{" "}
              sao referencia mobile-first do Stitch.
            </p>

            <div className="mt-12 space-y-12">
              {rotaGrupos.map((grupo) => {
                const rotasDoGrupo = rotas.filter((r) => r.grupo === grupo.id);
                return (
                  <div key={grupo.id}>
                    <div className="flex items-baseline justify-between border-b border-line pb-3">
                      <h3 className="font-display text-xl font-semibold text-navy">
                        {grupo.nome}
                      </h3>
                      <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                        {rotasDoGrupo.length} rotas
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-ink-2">
                      {grupo.descricao}
                    </p>

                    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {rotasDoGrupo.map((rota) => (
                        <li key={rota.href}>
                          <Link
                            href={rota.href}
                            className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-offwhite p-6 transition-all duration-base ease hover:-translate-y-0.5 hover:border-gold-light hover:shadow-2"
                          >
                            <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                              {rota.origem}
                              {rota.responsivoMobile ? (
                                <span className="ml-2 inline-block rounded-sm border border-gold/40 bg-paper px-1.5 text-gold-deep">
                                  mobile
                                </span>
                              ) : null}
                            </p>
                            <p className="font-display text-lg font-semibold text-navy">
                              {rota.titulo}
                            </p>
                            <p className="mt-auto font-mono text-2xs text-ink-2 group-hover:text-navy">
                              {rota.href} →
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

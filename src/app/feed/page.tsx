import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import postsRaw from "@/data/posts.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Post } from "@/types";

const posts = postsRaw as Post[];

const ordenados = [...posts].sort((a, b) =>
  b.publicadoEm.localeCompare(a.publicadoEm),
);
const [destaque, ...restante] = ordenados;

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (!ano || !mes || !dia) return iso;
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * /feed — fonte: Web/14 + Mobile/09.
 * Conteudo regional. Posts servidos de `posts.json`. Sem rota de detalhe ainda
 * (links de "Ler" caem em `#` placeholder pra demo).
 */
export default function FeedPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper py-12 md:py-16">
        <Container>
          <header className="mb-10 max-w-3xl md:mb-14">
            <p className="caps mb-3 text-gold-deep">Feed regional</p>
            <h1 className="display-xl mb-4">
              O que esta rolando no Circuito.
            </h1>
            <p className="lead text-ink-2">
              Vagas em alta, dicas da curadoria e movimentacao do mercado nas 9
              cidades do Circuito das Aguas paulista. Atualizado pela equipe
              Acesse.
            </p>
          </header>

          {/* Destaque */}
          {destaque ? (
            <Link
              href="#"
              className="group mb-12 grid gap-6 overflow-hidden rounded-2xl border border-line bg-offwhite shadow-2 transition hover:border-gold hover:shadow-3 md:mb-16 md:grid-cols-[1.2fr_1fr]"
            >
              <div
                className="relative aspect-[16/10] md:aspect-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #FBFAF7 0%, #F4EFE3 100%)",
                }}
              >
                {destaque.imagemUrl ? (
                  <Image
                    src={destaque.imagemUrl}
                    alt=""
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                      Editorial Acesse
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-2xs uppercase tracking-widest text-ink-3">
                  <span className="text-gold-deep">Destaque</span>
                  {destaque.area ? (
                    <>
                      <span>·</span>
                      <span>{areaNome(destaque.area)}</span>
                    </>
                  ) : null}
                  {destaque.cidade ? (
                    <>
                      <span>·</span>
                      <span>{cidadeNome(destaque.cidade)}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="display-md mb-3 text-navy group-hover:text-gold-deep">
                  {destaque.titulo}
                </h2>
                <p className="mb-4 text-ink-2">{destaque.resumo}</p>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  {formatarData(destaque.publicadoEm)} · {destaque.autor}
                </p>
              </div>
            </Link>
          ) : null}

          {/* Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restante.map((post) => (
              <Link
                key={post.id}
                href="#"
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-offwhite transition hover:-translate-y-0.5 hover:border-gold hover:shadow-3"
              >
                <div
                  className="relative aspect-[16/10]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBFAF7 0%, #F4EFE3 100%)",
                  }}
                >
                  {post.imagemUrl ? (
                    <Image
                      src={post.imagemUrl}
                      alt=""
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                        Editorial
                      </p>
                    </div>
                  )}
                  {post.area ? (
                    <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-offwhite">
                      {areaNome(post.area)}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-display text-lg font-semibold text-navy group-hover:text-gold-deep">
                    {post.titulo}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-ink-2">
                    {post.resumo}
                  </p>
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                    {formatarData(post.publicadoEm)}
                    {post.cidade ? ` · ${cidadeNome(post.cidade)}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
            CURADORIA · publicacoes revisadas pela equipe Acesse
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}

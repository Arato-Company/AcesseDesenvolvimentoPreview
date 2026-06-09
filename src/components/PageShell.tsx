import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Shell padrao das rotas placeholder do scaffold v0.
 * Cabecalho + main com eyebrow/title/description + link de volta + Footer.
 * Quando a UI real chegar (proxima rodada), cada rota substitui o children.
 */
export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <Container>
          {eyebrow ? (
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-lg text-ink-2">{description}</p>
          ) : null}

          <div className="mt-10 rounded-xl border border-dashed border-line bg-paper/60 p-12 text-center">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              Placeholder · UI completa na proxima rodada
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="font-mono text-2xs uppercase tracking-widest text-ink-2 hover:text-navy"
            >
              ← Voltar para o indice
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

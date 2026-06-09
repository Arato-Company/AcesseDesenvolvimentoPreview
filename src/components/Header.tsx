import Link from "next/link";
import { Container } from "./Container";

/**
 * Header shared do scaffold v0. Logo textual (sem imagem real ainda)
 * + nav minima que cobre os 3 publicos (candidato, empresa, admin).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-offwhite/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-display">
          <span className="text-lg font-semibold text-navy">
            Acesse<span className="text-gold">.</span>
          </span>
          <span className="hidden font-mono text-2xs uppercase tracking-widest text-ink-2 md:inline">
            Desenvolvimento
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-mono text-2xs uppercase tracking-widest text-ink-2">
          <Link href="/candidato/dashboard" className="hover:text-navy">
            Candidato
          </Link>
          <Link href="/empresa/dashboard" className="hover:text-navy">
            Empresa
          </Link>
          <Link href="/admin" className="hover:text-navy">
            Admin
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-navy px-4 py-2 text-2xs font-medium uppercase tracking-widest text-offwhite transition-colors duration-base ease hover:bg-navy-deep"
          >
            Entrar
          </Link>
        </nav>
      </Container>
    </header>
  );
}

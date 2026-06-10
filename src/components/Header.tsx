import Link from "next/link";
import { LogoArch } from "./LogoArch";

/**
 * Header publico (LP + login). Replica `.site-header` do tokens.css.
 * Nav e CTAs ficam invisiveis em mobile (controlado dentro do tokens.css).
 */
export function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container-ds header-inner">
        <Link href="/" className="logo-mark" aria-label="Acesse Desenvolvimento">
          <LogoArch />
          <span className="logo-text">
            Acesse Desenvolvimento<span className="logo-dot">.</span>
          </span>
        </Link>
        <nav className="nav-public" aria-label="Navegacao principal">
          <Link href="/feed">Conteudos</Link>
          <Link href="/empresa/vitrine">Vitrine</Link>
          <Link href="/empresa/planos">Empresas</Link>
          <Link href="/candidato/planos">Candidatos</Link>
        </nav>
        <div className="nav-cta">
          <Link href="/login" className="btn btn-ghost">
            Entrar
          </Link>
          <Link href="/login" className="btn btn-primary">
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}

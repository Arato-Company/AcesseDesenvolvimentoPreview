import Link from "next/link";
import { LogoArch } from "./LogoArch";

/**
 * Footer publico (LP + paginas publicas).
 * Lista das 9 cidades nao vem do JSON aqui pra manter o footer fora
 * do client/data boundary e casar com o markup de `.site-footer`.
 */
export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-ds">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-mark logo-mark">
              <LogoArch />
              <span>Acesse Desenvolvimento</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-offwhite/70">
              Plataforma regional de empregabilidade no Circuito das Aguas
              paulista. Tem gente olhando.
            </p>
          </div>
          <div className="footer-col">
            <h4>Plataforma</h4>
            <ul>
              <li>
                <Link href="/empresa/vitrine">Vitrine</Link>
              </li>
              <li>
                <Link href="/feed">Conteudos</Link>
              </li>
              <li>
                <Link href="/empresa/planos">Empresas</Link>
              </li>
              <li>
                <Link href="/candidato/planos">Candidatos</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Sobre</h4>
            <ul>
              <li>
                <Link href="/">Como funciona</Link>
              </li>
              <li>
                <Link href="/feed">Historias</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal &amp; Contato</h4>
            <ul>
              <li>
                <Link href="/">Termos de uso</Link>
              </li>
              <li>
                <Link href="/">Privacidade</Link>
              </li>
              <li>
                <a href="mailto:contato@acessedesenvolvimento.com.br">
                  contato@acessedesenvolvimento.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Acesse Desenvolvimento · Amparo · SP</p>
          <p className="footer-region">
            9 cidades · Circuito das Aguas paulista
          </p>
        </div>
      </div>
    </footer>
  );
}

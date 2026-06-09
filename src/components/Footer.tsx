import { Container } from "./Container";
import cidades from "@/data/cidades.json";

/**
 * Footer shared do scaffold v0. Lista das 9 cidades do recorte
 * (Circuito das Aguas paulista) + selo de marca neutra.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy-deep py-12 text-offwhite">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl font-semibold">
            Tem gente olhando.
          </p>
          <p className="mt-3 text-sm text-offwhite/70">
            Plataforma regional de empregabilidade do Circuito das Aguas
            paulista. Curadoria humana, vitrine de profissionais e vagas
            regionais.
          </p>
        </div>

        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-light">
            Cidades atendidas
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-2xs text-offwhite/70">
            {cidades.map((cidade) => (
              <li key={cidade.slug}>{cidade.nome}</li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="mt-10 border-t border-offwhite/10 pt-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-offwhite/40">
          Acesse Desenvolvimento · v0 demo · {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}

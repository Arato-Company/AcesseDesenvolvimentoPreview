import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FilePlus,
  MapPin,
  Search,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import cidades from "@/data/cidades.json";
import vagas from "@/data/vagas.json";
import candidatos from "@/data/candidatos.json";
import { areaNome } from "@/data/lookups";
import { matchCandidatos } from "@/lib/matching";
import type { Candidato, Cidade, Vaga } from "@/types";

const cidadesTyped = cidades as Cidade[];
const vagasTyped = vagas as Vaga[];
const candidatosTyped = candidatos as Candidato[];

/** Buscas em destaque no painel (ids de `vagas.json`). */
const BUSCAS_DESTAQUE = ["vaga-004", "vaga-003", "vaga-001"];

function diasDesde(iso: string): number {
  const inicio = new Date(iso).getTime();
  const agora = Date.now();
  return Math.max(0, Math.round((agora - inicio) / 86_400_000));
}

type FavoritoLinha = {
  id: string;
  nome: string;
  cargo: string;
  cidade: string;
  avatar: string;
  ha: string;
};

const FAVORITOS: FavoritoLinha[] = [
  {
    id: "fav-1",
    nome: "Ana Clara Ferreira",
    cargo: "Analista Financeiro",
    cidade: "Amparo",
    avatar: "/avatares/cand-010.webp",
    ha: "2 dias",
  },
  {
    id: "fav-2",
    nome: "Gabriel Souza",
    cargo: "Dev Fullstack",
    cidade: "Jaguariuna",
    avatar: "/avatares/cand-011.webp",
    ha: "4 dias",
  },
  {
    id: "fav-3",
    nome: "Helena Martins",
    cargo: "Designer de Produto",
    cidade: "Serra Negra",
    avatar: "/avatares/cand-012.webp",
    ha: "1 semana",
  },
];

type CuradoCard = {
  id: string;
  /** Id do candidato real (candidatos.json) — destino do "Visualizar perfil". */
  candidatoId: string;
  nome: string;
  cargo: string;
  cidade: string;
  avatar: string;
};

const CURADOS: CuradoCard[] = [
  {
    id: "cur-1",
    candidatoId: "cand-007",
    nome: "Ricardo Mendes",
    cargo: "Gerente de Operacoes",
    cidade: "Jaguariuna",
    avatar: "/avatares/cand-007.webp",
  },
  {
    id: "cur-2",
    candidatoId: "cand-008",
    nome: "Beatriz Soares",
    cargo: "Analista de Marketing",
    cidade: "Amparo",
    avatar: "/avatares/cand-008.webp",
  },
  {
    id: "cur-3",
    candidatoId: "cand-009",
    nome: "Lucas Oliveira",
    cargo: "Tecnico em Logistica",
    cidade: "Pedreira",
    avatar: "/avatares/cand-009.webp",
  },
];

/**
 * /empresa/dashboard — W02 (Batch 3, fiel ao Stitch).
 *
 * Estrutura:
 *  - welcome (Bom dia, Carolina + linha resumo)
 *  - 1 stat card "Vagas ativas" (decisao PM: substitui os 4 anteriores)
 *  - curadoria desta semana (3 cards centered)
 *  - 2 formas de contratar (vitrine navy vs publicar paper)
 *  - tabela "Ultimos favoritos" foto 40px (substitui "Vagas recentes")
 *  - footer inline centralizado cidades Circuito
 */
export default function EmpresaDashboardPage() {
  const vagasAtivas = "08";

  const buscas = BUSCAS_DESTAQUE.map((id) => {
    const vaga = vagasTyped.find((v) => v.id === id)!;
    return {
      vaga,
      total: matchCandidatos(vaga, candidatosTyped).length,
    };
  });

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Painel empresa"
      topbarUserName="Carolina Antunes"
      topbarUserLabel="CA"
    >
      {/* Welcome */}
      <section className="mb-12">
        <h2 className="font-display text-[28px] font-semibold leading-tight text-navy">
          Bom dia, Carolina.
        </h2>
        <p className="mt-2 font-body text-base text-ink-2">
          12 candidatos novos ·{" "}
          <span className="font-semibold text-navy">
            3 buscas ativas esta semana
          </span>
        </p>
      </section>

      {/* 1 stat card — fiel Stitch */}
      <section className="mb-16">
        <div className="stat-card max-w-sm">
          <p className="eyebrow mb-2">Vagas ativas</p>
          <p className="stat-card-num">{vagasAtivas}</p>
        </div>
      </section>

      {/* Buscas ativas */}
      <section className="mb-16">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-[28px] font-semibold text-navy">
              Buscas ativas
            </h3>
            <p className="mt-2 font-body text-sm text-ink-2">
              Acompanhe quem a gente ja encontrou pra cada busca.
            </p>
          </div>
          <Link
            href="/empresa/vaga/nova"
            className="eyebrow border-b border-navy pb-1 text-navy"
          >
            VER TODAS
          </Link>
        </header>

        <div className="flex flex-col gap-3">
          {buscas.map(({ vaga, total }) => (
            <div
              key={vaga.id}
              className="flex items-center gap-4 rounded-xl border border-line bg-offwhite p-4 transition-colors hover:bg-paper"
            >
              <span className="tag flex-shrink-0">{areaNome(vaga.area)}</span>
              <p className="min-w-0 flex-1 truncate font-body text-sm font-semibold text-navy">
                {vaga.titulo}
              </p>
              {vaga.status === "processando" ? (
                <span className="eyebrow inline-flex flex-shrink-0 items-center gap-2 text-gold-deep">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  Buscando
                </span>
              ) : (
                <span className="eyebrow flex-shrink-0 text-ink-3">
                  {total} candidatos · ha {diasDesde(vaga.createdAt)} dias
                </span>
              )}
              <Link
                href={`/empresa/vaga/${vaga.id}`}
                className="btn btn-ghost btn-sm flex-shrink-0"
              >
                Ver resultados
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Curadoria desta semana */}
      <section className="mb-16">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-[28px] font-semibold text-navy">
              Curadoria desta semana
            </h3>
            <p className="mt-2 font-body text-sm text-ink-2">
              Veja se algum candidato te interessa.
            </p>
          </div>
          <Link
            href="/empresa/vitrine?filter=curado"
            className="eyebrow border-b border-navy pb-1 text-navy"
          >
            VER CURADORIA COMPLETA
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CURADOS.map((c) => (
            <article
              key={c.id}
              className="profile-card profile-card-curado group relative"
            >
              <span className="profile-curado-badge">✦ CURADO</span>
              <div className="flex flex-col items-center text-center">
                <PlaceholderImage
                  src={c.avatar}
                  alt={c.nome}
                  fallbackLabel={c.nome}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <h4 className="profile-name mt-4">{c.nome}</h4>
                <p className="profile-role">{c.cargo}</p>
                <p className="profile-city mt-1 inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {c.cidade}, SP
                </p>
                <Link
                  href={`/empresa/candidato/${c.candidatoId}`}
                  className="btn btn-primary mt-4 w-full text-xs uppercase tracking-widest"
                >
                  Visualizar perfil
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2 formas de contratar */}
      <section className="mb-16 grid gap-6 lg:grid-cols-2">
        <Link
          href="/empresa/vitrine"
          className="group flex flex-col justify-between rounded-xl bg-navy p-12 text-offwhite transition-all hover:bg-navy-soft"
        >
          <div>
            <Search
              className="mb-6 h-12 w-12 text-gold-light"
              aria-hidden="true"
            />
            <h3
              className="font-display text-[28px] font-semibold"
              style={{ color: "var(--c-offwhite)" }}
            >
              Buscar na vitrine
            </h3>
            <p className="mt-4 max-w-md font-body text-offwhite/80">
              Explore nossa base exclusiva de talentos pre-avaliados. Use
              filtros para encontrar exatamente quem voce precisa.
            </p>
          </div>
          <span className="eyebrow mt-8 inline-flex items-center gap-2 text-gold-light transition-transform group-hover:translate-x-2">
            Acessar vitrine agora
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href="/empresa/vaga/nova"
          className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-12 text-navy transition-all hover:bg-line/30"
        >
          <div>
            <FilePlus
              className="mb-6 h-12 w-12 text-gold-deep"
              aria-hidden="true"
            />
            <h3 className="font-display text-[28px] font-semibold text-navy">
              Encontrar candidatos
            </h3>
            <p className="mt-4 max-w-md font-body text-ink-2">
              Crie sua busca com os criterios que voce quer. A gente encontra os
              candidatos que batem.
            </p>
          </div>
          <span className="eyebrow mt-8 inline-flex items-center gap-2 text-navy transition-transform group-hover:translate-x-2">
            Comecar nova busca
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </section>

      {/* Ultimos favoritos */}
      <section className="mb-16">
        <h3 className="mb-6 font-display text-[20px] font-semibold text-navy">
          Ultimos favoritos
        </h3>
        <div className="overflow-hidden rounded-xl border border-line bg-offwhite">
          <table className="w-full border-collapse text-left">
            <tbody className="divide-y divide-line">
              {FAVORITOS.map((f) => (
                <tr key={f.id} className="transition-colors hover:bg-paper">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <PlaceholderImage
                        src={f.avatar}
                        alt={f.nome}
                        fallbackLabel={f.nome}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-body text-sm font-semibold text-navy">
                          {f.nome}
                        </p>
                        <p className="eyebrow text-[10px] text-ink-3">
                          {f.cargo} · {f.cidade}, SP
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="eyebrow text-[10px] text-ink-3">
                      Favoritado ha {f.ha}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/empresa/favoritos"
                      className="icon-btn inline-flex rounded border border-line"
                      aria-label={`Abrir perfil de ${f.nome}`}
                    >
                      <ExternalLink
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer inline */}
      <footer className="border-t border-line bg-paper py-12 text-center">
        <p className="eyebrow mb-3 text-ink-3">9 cidades · Circuito</p>
        <p className="font-body text-sm text-ink-2">
          {cidadesTyped.map((c) => c.nome).join(" · ")}
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-3">
          © {new Date().getFullYear()} Acesse Desenvolvimento · Amparo · SP
        </p>
      </footer>
    </AppShell>
  );
}

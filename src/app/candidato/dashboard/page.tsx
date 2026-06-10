import Link from "next/link";
import Image from "next/image";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { CardVaga } from "@/components/CardVaga";
import vagas from "@/data/vagas.json";
import areas from "@/data/areas.json";
import type { Area, Vaga } from "@/types";

const vagasTyped = vagas as Vaga[];
const areasTyped = areas as Area[];

/**
 * /candidato/dashboard — fonte: Mobile/03 - Dashboard Candidato.html.
 * Home pos-login do candidato. Mobile-first dentro do phone-frame.
 * - badge de selo curado (mock pra Joao Pedro)
 * - stats (visualizacoes, completude do perfil)
 * - "empresas que olharam voce" (anonimizado)
 * - vagas recomendadas (industria — match do cand-001 mock)
 * - atalhos de area
 */
export default function CandidatoDashboardPage() {
  // Mock — assumimos que o candidato logado e cand-001 (Joao Pedro, industria, Senior).
  const vagasRecomendadas = vagasTyped
    .filter((v) => v.area === "industria")
    .slice(0, 3);

  return (
    <CandidatoLayout userName="Joao Pedro">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-gold/40 bg-offwhite px-4 py-2 shadow-gold">
          <span className="text-gold-deep" aria-hidden="true">
            ✦
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Perfil curado
          </span>
        </span>
        <h1 className="display-md">Oi, Joao.</h1>
        <p className="text-sm text-ink-2">
          Seu painel profissional · Eletricista industrial em Amparo
        </p>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-2 gap-3">
        <Link
          href="/candidato/dashboard"
          className="rounded-xl border border-line bg-offwhite p-4"
        >
          <p className="font-display text-2xl font-semibold text-navy">12</p>
          <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-ink-2">
            Visualizacoes
          </p>
        </Link>
        <Link
          href="/candidato/curriculo"
          className="rounded-xl border border-gold bg-offwhite p-4 shadow-gold"
        >
          <p className="font-display text-2xl font-semibold text-gold-deep">
            92%
          </p>
          <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-navy">
            Perfil completo
          </p>
        </Link>
      </section>

      {/* Empresas que olharam */}
      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">
          Empresas que olharam voce
        </h2>
        <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-ink-3">
          Ultimos 7 dias · 4 empresas
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {["MA", "CH", "PC", "HA"].map((label) => (
            <div
              key={label}
              className="flex aspect-square items-center justify-center rounded-lg border border-line bg-paper font-display font-semibold text-navy"
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">
          Areas no Circuito
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {areasTyped.slice(0, 4).map((a) => (
            <Link
              key={a.slug}
              href="/feed"
              className="flex flex-col items-center gap-3 rounded-xl border border-line bg-offwhite p-4 text-center transition-all hover:border-gold hover:shadow-2"
            >
              <Image
                src={`/categorias/${a.slug}.png`}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <span className="font-mono text-2xs uppercase tracking-widest text-navy">
                {a.nome}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Vagas recomendadas */}
      <section className="mt-10">
        <header className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">
              Pra voce
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              Vagas com match na sua area.
            </p>
          </div>
          <Link
            href="/feed"
            className="font-mono text-2xs uppercase tracking-widest text-gold-deep"
          >
            Ver todas →
          </Link>
        </header>
        <div className="mt-4 flex flex-col gap-4">
          {vagasRecomendadas.map((v) => (
            <CardVaga key={v.id} vaga={v} />
          ))}
        </div>
      </section>
    </CandidatoLayout>
  );
}

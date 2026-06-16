import { Bell, Star } from "lucide-react";
import Link from "next/link";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { PlaceholderImage } from "@/components/PlaceholderImage";

type EmpresaLogo = {
  nome: string;
  src: string;
};

const EMPRESAS: EmpresaLogo[] = [
  { nome: "LogTech", src: "/empresas/logo-logtech.svg" },
  { nome: "BioFarm", src: "/empresas/logo-biofarm.svg" },
  { nome: "Acesse", src: "/empresas/logo-acesse.svg" },
];

/**
 * /candidato/dashboard — M03 (Batch 3, fiel ao Stitch).
 *
 * - sem phone-frame (CandidatoLayout noFrame + hideHeader, topbar custom)
 * - headline "Oi, Joao." 18px (NAO display-md 36px)
 * - 2 stats compactos (visualizacoes link + 92% perfil)
 * - empresas que olharam voce: 3 logos centralizados
 * - REMOVIDO: secao "Areas no Circuito" e "Vagas recomendadas"
 */
export default function CandidatoDashboardPage() {
  return (
    <CandidatoLayout userName="Joao Pedro" noFrame hideHeader>
      <div className="mx-auto min-h-screen max-w-md bg-offwhite pb-20">
        {/* TopAppBar custom */}
        <header className="mobile-header sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-paper">
              <PlaceholderImage
                src="/avatares/cand-joao.webp"
                alt="Joao Pedro"
                fallbackLabel="JP"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-display text-[18px] font-bold text-navy">
              Oi, Joao.
            </span>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Notificacoes"
          >
            <Bell className="h-6 w-6 text-navy" aria-hidden="true" />
          </button>
        </header>

        <main className="mx-auto max-w-md space-y-8 px-4 pt-6">
          {/* Hero badge + H1 */}
          <section className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-offwhite px-4 py-2 shadow-[0_4px_12px_rgba(201,162,74,0.15)]">
              <Star
                className="h-4 w-4 text-gold-deep"
                fill="currentColor"
                aria-hidden="true"
              />
              <span className="eyebrow text-gold-deep">✦ Curado</span>
            </span>
            <h1 className="font-display text-[24px] font-semibold leading-tight text-navy">
              Seu painel profissional
            </h1>
          </section>

          {/* Stats grid 2-col */}
          <section className="grid grid-cols-2 gap-3">
            <Link
              href="/candidato/curriculo"
              className="flex flex-col gap-1 rounded-xl border border-line/30 bg-paper p-4 text-left transition-colors hover:border-navy/30 active:scale-95"
            >
              <span className="font-display text-[20px] font-semibold text-navy">
                12
              </span>
              <span className="eyebrow text-[10px] leading-tight text-ink-2">
                Visualizacoes · ver detalhes →
              </span>
            </Link>
            <div className="flex flex-col gap-1 rounded-xl border border-gold/20 bg-gold/10 p-4">
              <span className="font-display text-[20px] font-semibold text-gold-deep">
                92%
              </span>
              <span className="eyebrow text-[10px] leading-tight text-gold-deep">
                Perfil
              </span>
            </div>
          </section>

          {/* Empresas que olharam voce */}
          <section className="space-y-4">
            <h2 className="font-display text-[20px] font-semibold text-navy">
              Empresas que olharam voce
            </h2>
            <div className="flex items-center justify-around rounded-xl border border-line/40 bg-offwhite p-6">
              {EMPRESAS.map((e) => (
                <div
                  key={e.nome}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-paper p-2">
                    <PlaceholderImage
                      src={e.src}
                      alt={e.nome}
                      fallbackLabel={e.nome}
                      width={56}
                      height={56}
                      className="h-full w-full object-contain opacity-80 grayscale"
                    />
                  </div>
                  <span className="eyebrow text-[10px] text-ink-3">
                    {e.nome}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </CandidatoLayout>
  );
}

import Link from "next/link";
import { Building2 } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

/**
 * /login — fonte ground truth: Stitch Web/01 (W01 desktop) + Mobile/01 (M01).
 * Spec: PM/deliverables/specs-telas-criticas-batch2/_index.md (Batch 2).
 *
 * Decisao Caminho C hibrido: layout split-screen 50/50 (desktop) + split vertical
 * 60/40 (mobile). Sem form de auth nesta rota — CTA leva direto pra dashboard
 * (mock v0). Branding "Tem gente olhando." no centro como tagline-pill.
 */

function LogoOverlay({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <svg
          width="60"
          height="30"
          viewBox="0 0 60 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5,30 C5,10 55,10 55,30"
            stroke="var(--c-gold-light)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="font-display text-[36px] leading-none text-navy">
          Acesse Desenvolvimento.
        </h1>
      </div>
    </div>
  );
}

function LogoOverlayMobile() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="48"
        height="24"
        viewBox="0 0 60 30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5,30 C5,10 55,10 55,30"
          stroke="var(--c-gold-light)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="font-display text-[18px] font-bold uppercase tracking-tighter text-navy">
        Acesse Desenvolvimento
      </h1>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      {/* ===================== W01 — DESKTOP ===================== */}
      <main className="relative hidden h-screen overflow-hidden md:flex">
        <LogoOverlay className="absolute left-1/2 top-8 z-50 -translate-x-1/2" />

        {/* Left — Candidato */}
        <section className="flex flex-1 flex-col items-center justify-center border-r border-line/30 bg-offwhite px-8">
          <div className="max-w-md space-y-8 text-center">
            <div className="mx-auto w-72">
              <PlaceholderImage
                src="/avatares/hero-login-candidato.webp"
                alt="Profissional regional em ambiente de trabalho"
                fallbackLabel="HERO CANDIDATO"
                width={288}
                height={256}
                className="h-64 w-72 rounded-xl object-cover"
                priority
              />
            </div>
            <h2 className="font-display text-[48px] leading-tight text-navy">
              Sou candidato
            </h2>
            <p className="mx-auto max-w-sm font-body text-base leading-relaxed text-ink-2">
              Explore as melhores oportunidades da regiao em um ecossistema
              focado no seu crescimento profissional.
            </p>
            <Link
              href="/candidato/dashboard"
              className="btn btn-primary btn-lg inline-block rounded-lg px-12 py-4 transition-all hover:-translate-y-px hover:shadow-md active:scale-95"
            >
              Acessar vagas
            </Link>
          </div>
        </section>

        {/* Right — Empresa */}
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-navy px-8">
          <Building2
            className="pointer-events-none absolute inset-0 m-auto h-64 w-64 text-gold-light opacity-30"
            aria-hidden="true"
            strokeWidth={1}
          />
          <div className="relative z-10 max-w-md space-y-8 text-center">
            <h2 className="font-display text-[48px] leading-tight text-gold-light">
              Sou empresa
            </h2>
            <p className="mx-auto max-w-sm font-body text-base leading-relaxed text-offwhite/70">
              Encontre talentos curados e acelere o desenvolvimento da sua
              equipe com as melhores mentes da regiao.
            </p>
            <Link
              href="/empresa/vitrine"
              className="btn btn-gold btn-lg inline-block rounded-lg px-12 py-4 transition-all hover:-translate-y-px hover:shadow-md active:scale-95"
            >
              Buscar talentos
            </Link>
          </div>
        </section>

        {/* Tagline pill */}
        <div className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line/50 bg-offwhite/80 px-6 py-2 backdrop-blur-sm">
          <span className="font-display italic text-gold-deep">
            Tem gente olhando.
          </span>
        </div>

        {/* Footer barra */}
        <div className="fixed bottom-0 left-0 z-40 w-full border-t border-line/20 bg-navy/10 py-4 backdrop-blur-md">
          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-navy/60">
            <span>ECOSSISTEMA REGIONAL</span>
            <span aria-hidden="true">•</span>
            <span>VITRINE</span>
            <span aria-hidden="true">•</span>
            <span>VAGAS</span>
            <span aria-hidden="true">•</span>
            <span>CURADORIA</span>
          </p>
        </div>

        {/* Location decorators — desktop wide */}
        <div
          className="fixed bottom-24 left-10 z-40 hidden lg:block"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/30">
            Jaguariuna · Amparo
          </p>
        </div>
        <div
          className="fixed bottom-24 right-10 z-40 hidden lg:block"
          style={{ writingMode: "vertical-lr" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold-light/30">
            Socorro · Serra Negra
          </p>
        </div>
      </main>

      {/* ===================== M01 — MOBILE ===================== */}
      <main className="relative flex min-h-screen flex-col overflow-x-hidden md:hidden">
        {/* Header fixo */}
        <header className="fixed left-0 top-0 z-30 flex h-20 w-full items-center justify-center bg-offwhite/80 px-4 backdrop-blur-sm">
          <LogoOverlayMobile />
        </header>

        {/* Upper Candidato — 60% */}
        <section
          className="flex flex-col items-center justify-center bg-paper px-4 pt-16 text-center"
          style={{ height: "60vh", minHeight: "60vh" }}
        >
          <PlaceholderImage
            src="/avatares/hero-login-candidato-mobile.webp"
            alt="Profissional regional"
            fallbackLabel="HERO MOBILE"
            width={192}
            height={192}
            className="mb-6 h-48 w-48 rounded-xl object-contain opacity-80 mix-blend-multiply grayscale"
            priority
          />
          <h2 className="mb-4 font-display text-2xl text-navy">
            Sou candidato
          </h2>
          <Link
            href="/candidato/dashboard"
            className="btn btn-primary rounded-lg px-8 py-3 font-bold uppercase tracking-wider transition-all hover:-translate-y-px hover:shadow-md active:scale-95"
          >
            Acessar vagas
          </Link>
        </section>

        {/* Split badge */}
        <div
          className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/30 bg-offwhite px-6 py-2 shadow-sm"
          style={{ top: "60vh" }}
        >
          <span className="font-mono text-xs uppercase text-gold-deep">
            Tem gente olhando
          </span>
        </div>

        {/* Lower Empresa — 40% */}
        <section
          className="relative flex flex-col items-center justify-center overflow-hidden bg-navy px-4 text-center"
          style={{ height: "40vh", minHeight: "40vh" }}
        >
          <Building2
            className="pointer-events-none absolute inset-0 m-auto text-gold-light opacity-10"
            style={{ width: "300px", height: "300px" }}
            aria-hidden="true"
            strokeWidth={1}
          />
          <h2 className="relative z-10 mb-4 font-display text-lg text-offwhite">
            Sou empresa
          </h2>
          <Link
            href="/empresa/vitrine"
            className="btn btn-gold relative z-10 rounded-lg px-8 py-3 font-bold uppercase tracking-wider transition-all hover:-translate-y-px hover:shadow-md active:scale-95"
          >
            Buscar talentos
          </Link>
        </section>

        {/* Footer discreto */}
        <div className="pointer-events-none fixed bottom-4 left-0 z-30 w-full text-center">
          <p className="font-mono text-[10px] uppercase text-ink-2/40">
            © 2026 ACESSE DESENVOLVIMENTO · ECOSSISTEMA REGIONAL
          </p>
        </div>
      </main>
    </>
  );
}

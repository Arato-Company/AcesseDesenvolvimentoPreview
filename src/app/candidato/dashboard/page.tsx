import { Bell, Star, ArrowRight, FileText, CreditCard, Newspaper } from "lucide-react";
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

const ATALHOS = [
  {
    href: "/candidato/curriculo",
    label: "Curriculo",
    desc: "Gere e baixe seu PDF curado",
    icon: FileText,
  },
  {
    href: "/candidato/planos",
    label: "Planos",
    desc: "Destaque seu perfil na vitrine",
    icon: CreditCard,
  },
  {
    href: "/feed",
    label: "Feed",
    desc: "Novidades da curadoria regional",
    icon: Newspaper,
  },
];

/**
 * /candidato/dashboard — M03 (mobile) + adaptacao desktop hero-split (net-new).
 *
 * Mobile (< md): topbar custom + coluna max-w-md (fiel Stitch M03).
 * Desktop (md+): hero editorial (foto 4:5 + saudacao + stats) + empresas + atalhos.
 */
export default function CandidatoDashboardPage() {
  return (
    <CandidatoLayout userName="Joao Pedro" noFrame hideHeader>
      {/* ==================== MOBILE ==================== */}
      <div className="md:hidden">
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
            <button type="button" className="icon-btn" aria-label="Notificacoes">
              <Bell className="h-6 w-6 text-navy" aria-hidden="true" />
            </button>
          </header>

          <main className="mx-auto max-w-md space-y-8 px-4 pt-6">
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

            <section className="space-y-4">
              <h2 className="font-display text-[20px] font-semibold text-navy">
                Empresas que olharam voce
              </h2>
              <div className="flex items-center justify-around rounded-xl border border-line/40 bg-offwhite p-6">
                {EMPRESAS.map((e) => (
                  <div key={e.nome} className="flex flex-col items-center gap-2">
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
      </div>

      {/* ==================== DESKTOP ==================== */}
      <div className="hidden px-8 pt-10 md:block">
        {/* Hero split */}
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* Foto 4:5 */}
          <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-2xl">
            <PlaceholderImage
              src="/avatares/cand-joao.webp"
              alt="Joao Pedro"
              fallbackLabel="JOAO PEDRO"
              fill
              sizes="360px"
              className="object-cover"
              priority
            />
            <span className="profile-curado-badge absolute left-5 top-5">
              ✦ Curado
            </span>
          </div>

          {/* Identidade + stats */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-gold-deep">Painel do candidato</p>
            <h1 className="mt-3 font-display text-[48px] font-semibold leading-tight tracking-tight text-navy antialiased">
              Oi, Joao Pedro.
            </h1>
            <p className="mt-2 font-display text-xl text-ink-2">
              Tecnico em Logistica · Amparo, SP
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <Link
                href="/candidato/curriculo"
                className="group flex flex-col gap-1 rounded-xl border border-line/40 bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-2"
              >
                <span className="font-display text-[32px] font-semibold leading-none text-navy">
                  12
                </span>
                <span className="eyebrow mt-1 inline-flex items-center gap-1 text-[10px] text-ink-2">
                  Visualizacoes
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <div className="flex flex-col gap-1 rounded-xl border border-gold/30 bg-gold/10 p-5">
                <span className="font-display text-[32px] font-semibold leading-none text-gold-deep">
                  92%
                </span>
                <span className="eyebrow mt-1 text-[10px] text-gold-deep">
                  Perfil completo
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-line/40 bg-paper p-5">
                <span className="font-display text-[32px] font-semibold leading-none text-navy">
                  3
                </span>
                <span className="eyebrow mt-1 text-[10px] text-ink-2">
                  Empresas de olho
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/candidato/curriculo" className="btn btn-primary">
                Ver meu curriculo
              </Link>
              <Link href="/candidato/planos" className="btn btn-secondary">
                Destacar perfil
              </Link>
            </div>
          </div>
        </section>

        {/* Empresas que olharam voce */}
        <section className="mt-16">
          <h2 className="font-display text-[28px] font-semibold text-navy">
            Empresas que olharam voce
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            Perfis do Circuito das Aguas que visualizaram seu currículo.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {EMPRESAS.map((e) => (
              <div
                key={e.nome}
                className="flex items-center gap-4 rounded-xl border border-line/40 bg-offwhite p-6"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-paper p-3">
                  <PlaceholderImage
                    src={e.src}
                    alt={e.nome}
                    fallbackLabel={e.nome}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain opacity-80 grayscale"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-navy">
                    {e.nome}
                  </p>
                  <p className="eyebrow text-[10px] text-ink-3">
                    Visualizou seu perfil
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Atalhos da jornada */}
        <section className="mt-16">
          <h2 className="font-display text-[28px] font-semibold text-navy">
            Continue sua jornada
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ATALHOS.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex flex-col gap-3 rounded-xl border border-line/40 bg-offwhite p-6 transition-all hover:-translate-y-0.5 hover:border-gold-light hover:shadow-2"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <p className="font-display text-lg font-semibold text-navy">
                    {a.label}
                  </p>
                  <p className="text-sm text-ink-2">{a.desc}</p>
                  <span className="eyebrow mt-1 inline-flex items-center gap-1 text-[10px] text-gold-deep">
                    Acessar
                    <ArrowRight
                      className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </CandidatoLayout>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LogoArch } from "./LogoArch";
import { PlaceholderImage } from "./PlaceholderImage";
import { PaywallGate } from "./PaywallGate";

/** Botao de perfil com foto real + ring gold (topbar candidato). */
function ProfileButton({ name }: { name: string }) {
  return (
    <span className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-gold-light ring-offset-2 ring-offset-offwhite transition group-hover:ring-gold">
      <PlaceholderImage
        src="/avatares/cand-joao.webp"
        alt={name}
        fallbackLabel={name}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover"
      />
    </span>
  );
}

type CandidatoLayoutProps = {
  /** Titulo opcional no topo (mobile header). */
  title?: string;
  /** Avatar name pra topbar (fallback "Candidato"). */
  userName?: string;
  /** Esconder bottom nav (ex: durante onboarding linear). */
  hideBottomNav?: boolean;
  /** Mostrar botao back (em vez do logo). */
  backHref?: string;
  /** Esconder o phone-frame decorativo (M06 + telas que precisam fullscreen). */
  noFrame?: boolean;
  /** Esconder o header mobile (dashboard renderiza topbar custom no mobile). */
  hideHeader?: boolean;
  children: ReactNode;
};

/**
 * Nav da jornada candidato. Mobile usa 3 itens (bottom-nav, spec Batch 2);
 * desktop usa a lista completa na top navbar.
 */
const NAV_ITEMS = [
  {
    href: "/candidato/dashboard",
    label: "Inicio",
    iconPath:
      "M3 12L12 3l9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10",
  },
  {
    href: "/candidato/curriculo",
    label: "Curriculo",
    iconPath:
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  },
  {
    href: "/candidato/perfil",
    label: "Perfil",
    iconPath:
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
  {
    href: "/candidato/planos",
    label: "Planos",
    iconPath:
      "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
  },
  {
    href: "/feed",
    label: "Feed",
    iconPath:
      "M4 4h16v16H4zM4 9h16M9 9v11",
  },
];

// Bottom-nav mobile fica com 3 itens (spec Batch 2/3, alinha Stitch).
const BOTTOM_NAV = NAV_ITEMS.slice(0, 3);

function Icon({ d, size = 22 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/** Top navbar desktop (md+). Logo esquerda, nav centro, avatar direita. */
function DesktopNav({
  userName,
  pathname,
}: {
  userName: string;
  pathname: string;
}) {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-line bg-offwhite shadow-sm md:block">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-8">
        <Link
          href="/candidato/dashboard"
          className="flex items-center gap-3"
          aria-label="Acesse Desenvolvimento"
        >
          <LogoArch width={112} height={52} />
          <span className="font-display text-xl font-semibold leading-tight text-navy">
            Acesse{" "}
            <span className="font-normal text-gold-deep">Desenvolvimento</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Navegacao candidato">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-4 py-2 font-body text-sm transition-colors ${
                  isActive
                    ? "bg-paper font-semibold text-navy"
                    : "text-ink-2 hover:bg-paper hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/candidato/perfil"
          className="inline-flex items-center"
          aria-label="Perfil"
        >
          <ProfileButton name={userName} />
        </Link>
      </div>
    </header>
  );
}

/**
 * Shell da jornada candidato — responsivo.
 *  - mobile (< md): header + conteudo fullscreen + bottom-nav (3 itens).
 *  - desktop (md+): top navbar + conteudo largo (max-w-[1280px]), sem bottom-nav.
 *
 * Conteudo de cada pagina usa utilitarios responsivos (max-w-md md:max-w-none,
 * grids que expandem) pra reflow entre os dois shells.
 */
export function CandidatoLayout({
  title,
  userName = "Candidato",
  hideBottomNav = false,
  backHref,
  noFrame = false,
  hideHeader = false,
  children,
}: CandidatoLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Desktop navbar */}
      <DesktopNav userName={userName} pathname={pathname} />

      {/* Mobile header */}
      {hideHeader ? null : (
        <header className="mobile-header sticky top-0 z-40 md:hidden">
          {backHref ? (
            <Link
              href={backHref}
              className="mobile-header-back"
              aria-label="Voltar"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/candidato/dashboard"
              className="logo-mark"
              aria-label="Acesse Desenvolvimento"
            >
              <LogoArch />
              <span>
                Acesse<span className="logo-dot">.</span>
              </span>
            </Link>
          )}
          {title ? (
            <span className="mobile-header-title">{title}</span>
          ) : (
            <span />
          )}
          <Link
            href="/candidato/perfil"
            className="inline-flex items-center"
            aria-label="Perfil"
          >
            <ProfileButton name={userName} />
          </Link>
        </header>
      )}

      {/* Conteudo — mobile coluna, desktop largo */}
      <main
        className={
          noFrame
            ? "mx-auto w-full max-w-md pb-24 md:max-w-[1280px] md:px-8 md:pb-16"
            : "mx-auto w-full max-w-md px-5 pb-24 pt-6 md:max-w-[1280px] md:px-8 md:pb-16 md:pt-10"
        }
      >
        <PaywallGate audience="candidato">{children}</PaywallGate>
      </main>

      {/* Footer — desktop (mobile usa bottom-nav) */}
      <footer className="mt-8 hidden border-t border-line bg-navy text-offwhite md:block">
        <div className="mx-auto max-w-[1280px] px-8 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-lg bg-offwhite p-2">
                  <LogoArch width={72} height={34} />
                </span>
                <span className="font-display text-lg font-semibold">
                  Acesse{" "}
                  <span className="font-normal text-gold-light">
                    Desenvolvimento
                  </span>
                </span>
              </div>
              <p className="mt-4 max-w-xs font-display text-lg italic text-gold-light">
                Tem gente olhando.
              </p>
              <p className="mt-2 max-w-xs font-body text-sm text-offwhite opacity-70">
                Ecossistema regional de empregabilidade do Circuito das Águas
                paulista.
              </p>
            </div>

            {/* Nav */}
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-gold-light">
                Navegação
              </p>
              <ul className="mt-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-offwhite opacity-80 transition hover:text-gold-light hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cidades */}
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-gold-light">
                Circuito das Águas
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-offwhite opacity-70">
                Amparo · Jaguariúna · Serra Negra · Socorro · Águas de Lindóia ·
                Lindóia · Monte Alegre do Sul · Pedreira · Holambra
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy-soft pt-6">
            <p className="font-mono text-2xs uppercase tracking-widest text-offwhite opacity-60">
              © 2026 Acesse Desenvolvimento
            </p>
            <p className="font-mono text-2xs uppercase tracking-widest text-offwhite opacity-60">
              Dados protegidos · LGPD
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom nav — mobile only */}
      {hideBottomNav ? null : (
        <nav
          className="bottom-nav md:hidden"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          aria-label="Navegacao candidato"
        >
          {BOTTOM_NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon d={item.iconPath} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

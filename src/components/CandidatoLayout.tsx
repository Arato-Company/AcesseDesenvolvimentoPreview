"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LogoArch } from "./LogoArch";
import { Avatar } from "./Avatar";

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
  /** Esconder o header mobile (M06 renderiza topbar custom). */
  hideHeader?: boolean;
  children: ReactNode;
};

/**
 * BottomNav reduzido pra 3 itens conforme spec Batch 2 (alinha com Stitch).
 * Remove "Feed" e "Planos" do mobile candidato — Planos vira pagina dedicada
 * acessada via Perfil, Feed permanece desktop-only por enquanto.
 */
const BOTTOM_NAV = [
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
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

/**
 * Shell mobile-first pras telas do candidato.
 * Phone-frame visivel apenas em telas largas (>= md).
 * Em telas pequenas, vira layout fullscreen — bottom nav fixa.
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
  const wrapperClass = noFrame
    ? "min-h-screen bg-offwhite"
    : "bg-paper min-h-screen md:py-12";
  const innerClass = noFrame ? "min-h-screen" : "phone-frame";

  return (
    <div className={wrapperClass}>
      <div className={innerClass}>
        {hideHeader ? null : (
        <header className="mobile-header">
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
              <span>Acesse<span className="logo-dot">.</span></span>
            </Link>
          )}
          {title ? (
            <span className="mobile-header-title">{title}</span>
          ) : (
            <span />
          )}
          <Link
            href="/candidato/dashboard"
            className="inline-flex items-center"
            aria-label="Perfil"
          >
            <Avatar name={userName} size="sm" />
          </Link>
        </header>
        )}

        <main className={noFrame ? "" : "px-5 pb-12 pt-6"}>{children}</main>

        {hideBottomNav ? null : (
          <nav className="bottom-nav" aria-label="Navegacao candidato">
            {BOTTOM_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
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
    </div>
  );
}

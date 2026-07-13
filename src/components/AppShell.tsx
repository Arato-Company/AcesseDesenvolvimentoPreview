"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar } from "./Avatar";
import { PaywallGate } from "./PaywallGate";
import cidades from "@/data/cidades.json";

type AppShellNavItem = {
  href: string;
  label: string;
  iconPath: string; // single SVG path (heroicon-style)
};

type AppShellProps = {
  /** Determina qual sidebar mostrar — empresa, admin ou concierge. */
  audience: "empresa" | "admin";
  /** Topbar title (a esquerda da barra de busca). */
  topbarTitle?: string;
  /** Nome mostrado no canto direito da topbar (anonimo no v0). */
  topbarUserName?: string;
  /** Topbar avatar label (iniciais). */
  topbarUserLabel?: string;
  children: ReactNode;
};

const NAV_EMPRESA: AppShellNavItem[] = [
  {
    href: "/empresa/dashboard",
    label: "Dashboard",
    iconPath:
      "M3 12L12 3l9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10",
  },
  {
    href: "/empresa/vitrine",
    label: "Vitrine",
    iconPath:
      "M4 5h16M4 12h16M4 19h16",
  },
  {
    href: "/empresa/vaga/nova",
    label: "Publicar vaga",
    iconPath:
      "M12 5v14M5 12h14",
  },
  {
    href: "/empresa/favoritos",
    label: "Favoritos",
    iconPath:
      "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z",
  },
  {
    href: "/empresa/planos",
    label: "Planos",
    iconPath:
      "M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  },
];

const NAV_ADMIN: AppShellNavItem[] = [
  {
    href: "/admin",
    label: "Visao geral",
    iconPath:
      "M3 12L12 3l9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10",
  },
  {
    href: "/admin/curadoria",
    label: "Curadoria",
    iconPath:
      "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  },
  {
    href: "/admin/candidatos",
    label: "Candidatos",
    iconPath:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    href: "/admin/empresas",
    label: "Empresas",
    iconPath:
      "M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M13 9h.01M13 13h.01",
  },
  {
    href: "/admin/posts",
    label: "Posts",
    iconPath:
      "M4 4h16v16H4zM4 9h16M9 4v16",
  },
  {
    href: "/admin/reembolsos",
    label: "Reembolsos",
    iconPath:
      "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 7v5l3 2",
  },
  {
    href: "/admin/comunicacao",
    label: "Comunicacao",
    iconPath:
      "M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-7-3.7L3 21l4.7-2A8.38 8.38 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z",
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
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

export function AppShell({
  audience,
  topbarTitle,
  topbarUserName = "Equipe Acesse",
  topbarUserLabel,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const nav = audience === "empresa" ? NAV_EMPRESA : NAV_ADMIN;
  const initials = topbarUserLabel ?? (audience === "empresa" ? "EA" : "AD");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/empresa/dashboard") return pathname === "/empresa/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Fecha o drawer ao navegar entre rotas.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Trava scroll do body quando drawer aberto (mobile).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="app-shell" data-drawer-open={drawerOpen ? "true" : "false"}>
      <button
        type="button"
        className={`app-drawer-overlay${drawerOpen ? " is-open" : ""}`}
        aria-hidden={!drawerOpen}
        tabIndex={-1}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        id="app-sidebar"
        className="app-sidebar"
        aria-label="Navegacao do painel"
      >
        <Link
          href={audience === "empresa" ? "/empresa/dashboard" : "/admin"}
          className="app-sidebar-brand"
          aria-label="Acesse Desenvolvimento"
        >
          <span className="app-sidebar-logo-panel">
            <Image
              className="brand-full"
              src="/logo-full.webp"
              alt="Acesse Desenvolvimento"
              width={200}
              height={140}
              priority
            />
            <Image
              className="brand-mini"
              src="/logo-mark.webp"
              alt=""
              width={68}
              height={32}
              priority
            />
          </span>
          <span className="app-sidebar-brand-cap">Circuito das Aguas</span>
        </Link>
        <nav className="app-sidebar-nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <Icon d={item.iconPath} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="app-sidebar-cities">
          <p className="app-sidebar-cities-label">9 cidades · Circuito</p>
          <p className="app-sidebar-cities-list">
            {cidades.map((c) => c.nome).join(" · ")}
          </p>
        </div>
      </aside>

      <header className="app-topbar">
        <button
          type="button"
          className="app-drawer-toggle"
          aria-label="Abrir menu de navegacao"
          aria-expanded={drawerOpen}
          aria-controls="app-sidebar"
          onClick={() => setDrawerOpen((v) => !v)}
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
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="app-topbar-search">
          <svg
            className="icon-search"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder={
              audience === "empresa"
                ? "Buscar perfis, vagas, cidades..."
                : "Buscar candidatos, empresas, posts..."
            }
            aria-label="Buscar"
          />
        </div>
        {topbarTitle ? (
          <p className="mono text-xs uppercase tracking-widest text-ink-3 hidden md:inline">
            {topbarTitle}
          </p>
        ) : null}
        <div className="app-topbar-actions">
          <button className="icon-btn" aria-label="Notificacoes">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="badge">3</span>
          </button>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-navy">
              {topbarUserName}
            </span>
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              {audience === "empresa" ? "Conta empresa" : "Concierge"}
            </span>
          </div>
          <Avatar name={initials} size="sm" />
        </div>
      </header>

      <main className="app-main">
        {audience === "empresa" ? (
          <PaywallGate audience="empresa">{children}</PaywallGate>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

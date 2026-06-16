"use client";

import { Bell, UserCircle } from "lucide-react";
import type { ReactNode } from "react";
import { AppAdminSidebar, type AdminNavItem } from "./AppAdminSidebar";

type AppAdminShellProps = {
  navItems?: AdminNavItem[];
  activeHref?: string;
  /** Slot acima do main (ex: tabs periodo no W10). */
  topbarLeft?: ReactNode;
  topbarTitle?: string;
  sidebarFooter?: ReactNode;
  /** Bypass do .app-main padding/maxw (W13 CMS full-height). */
  noMainPadding?: boolean;
  children: ReactNode;
};

/**
 * Variante admin do AppShell: usa `AppAdminSidebar` (9 itens) + topbar simplificada
 * (sem search, avatar neutro). Compartilha o grid do `.app-shell` token.
 */
export function AppAdminShell({
  navItems,
  activeHref,
  topbarLeft,
  topbarTitle,
  sidebarFooter,
  noMainPadding,
  children,
}: AppAdminShellProps) {
  return (
    <div className="app-shell">
      <AppAdminSidebar
        navItems={navItems}
        activeHref={activeHref}
        footer={sidebarFooter}
      />

      <header className="app-topbar">
        {topbarLeft}
        {topbarTitle ? (
          <h1 className="font-display text-xl font-semibold text-navy">
            {topbarTitle}
          </h1>
        ) : null}
        <div className="app-topbar-actions">
          <button className="icon-btn" aria-label="Notificacoes">
            <Bell size={18} strokeWidth={1.7} />
            <span className="badge">3</span>
          </button>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-navy">
              Equipe Acesse
            </span>
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              Admin
            </span>
          </div>
          <span
            className="inline-flex items-center justify-center text-ink-2"
            aria-label="Avatar admin neutro"
          >
            <UserCircle size={32} strokeWidth={1.4} />
          </span>
        </div>
      </header>

      <main
        className="app-main"
        style={
          noMainPadding
            ? {
                padding: 0,
                maxWidth: "none",
                height: "calc(100vh - var(--topbar-h))",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {children}
      </main>
    </div>
  );
}

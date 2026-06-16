"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  ArrowLeftRight,
  Mail,
  ShieldCheck,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { LogoArch } from "./LogoArch";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const DEFAULT_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Visao geral", icon: LayoutDashboard },
  { href: "/admin/candidatos", label: "Candidatos", icon: Users },
  { href: "/admin/empresas", label: "Empresas", icon: Building2 },
  { href: "/admin", label: "Receita", icon: TrendingUp },
  { href: "/admin/reembolsos", label: "Reembolsos", icon: ArrowLeftRight },
  { href: "/admin/comunicacao", label: "Comunicacao", icon: Mail },
  { href: "/admin/curadoria", label: "Curadoria", icon: ShieldCheck },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin", label: "Configuracoes", icon: Settings },
];

type AppAdminSidebarProps = {
  /** Override do default nav (W09 curadoria usa subnav propria). */
  navItems?: AdminNavItem[];
  /** Rota atualmente ativa (default: usePathname). Necessario quando navItems usam hrefs nao-rota. */
  activeHref?: string;
  /** Footer slot — usado em W16 pra CTA "Enviar e-mail". */
  footer?: React.ReactNode;
};

/**
 * Variante admin do AppSidebar com 9 itens default + prop `navItems` opcional.
 * Mantem visual do `.app-sidebar` token CSS pra coerencia.
 */
export function AppAdminSidebar({
  navItems,
  activeHref,
  footer,
}: AppAdminSidebarProps) {
  const pathname = usePathname();
  const nav = navItems ?? DEFAULT_NAV;
  const active = activeHref ?? pathname;

  const isActive = (href: string) => {
    if (href === "/admin") return active === "/admin";
    return active === href || active.startsWith(href + "/");
  };

  return (
    <aside
      className="app-sidebar"
      aria-label="Navegacao admin"
      style={{ position: "fixed" }}
    >
      <div className="app-sidebar-brand">
        <LogoArch />
        <span className="app-sidebar-brand-text">
          Acesse<span className="dot">.</span>
        </span>
      </div>
      <nav className="app-sidebar-nav">
        {nav.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={`${item.href}-${i}`}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <Icon className="icon" size={18} strokeWidth={1.7} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {footer ? <div className="px-6 pb-6">{footer}</div> : null}
    </aside>
  );
}

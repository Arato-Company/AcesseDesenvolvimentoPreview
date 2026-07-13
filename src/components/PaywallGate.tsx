"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import {
  getStage,
  planosFor,
  type Audience,
  type Stage,
} from "@/lib/onboarding";

/**
 * Envolve o conteudo do sistema. Quando o stage e "onboarded" (cadastrou,
 * nao pagou), mostra banner de ativacao + deixa o conteudo dimmed/opaco,
 * porem navegavel. Em "ativo" ou nas rotas de cadastro/planos, passa direto.
 */
const EXCLUDE: Record<Audience, string[]> = {
  empresa: ["/empresa/cadastro", "/empresa/planos"],
  candidato: ["/candidato/cadastro", "/candidato/planos"],
};

export function PaywallGate({
  audience,
  children,
}: {
  audience: Audience;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<Stage>("ativo");

  useEffect(() => {
    setMounted(true);
    setStage(getStage(audience));
  }, [audience, pathname]);

  const excluded = EXCLUDE[audience].some((p) => pathname.startsWith(p));
  const locked = mounted && stage === "onboarded" && !excluded;

  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Banner de ativacao */}
      <div className="sticky top-4 z-30 mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold bg-navy px-6 py-4 shadow-1">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold-light/20 text-gold-light">
            <Lock size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-offwhite">
              Acesso em modo preview
            </p>
            <p className="font-body text-sm text-offwhite opacity-80">
              Ative seu plano pra liberar o sistema completo.
            </p>
          </div>
        </div>
        <Link
          href={planosFor(audience)}
          className="btn btn-gold flex-shrink-0"
        >
          Ativar plano
        </Link>
      </div>

      {/* Conteudo bloqueado: borrao forte pra nao dar pra ler as infos.
          Navegacao segue pela sidebar/topbar (fora do gate). */}
      <div
        className="pointer-events-none select-none opacity-90 blur-[6px] transition"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

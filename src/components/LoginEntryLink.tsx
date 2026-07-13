"use client";

import { useRouter } from "next/navigation";
import { getStage, routeForStage, type Audience } from "@/lib/onboarding";

/**
 * CTA de entrada do /login. Roteia pelo stage da audiencia:
 *  - novo       -> cadastro (empresa) / perfil (candidato)
 *  - onboarded  -> home do sistema (entra em modo preview/opaco)
 *  - ativo      -> home do sistema (liberado)
 */
export function LoginEntryLink({
  audience,
  className,
  children,
}: {
  audience: Audience;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleClick = () => {
    const stage = getStage(audience);
    router.push(routeForStage(audience, stage));
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

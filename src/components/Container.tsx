import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Container responsivo padrao (max 1280px, padding lateral 24 mobile / 64 desktop).
 * Replica o `--container-max` do DS sem inflar utilitarios.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-container px-6 md:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

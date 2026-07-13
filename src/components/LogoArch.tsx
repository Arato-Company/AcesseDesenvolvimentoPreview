import Image from "next/image";

type LogoArchProps = {
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Logo da marca (LogoOriginal otimizado em /logo.webp).
 * Mantemos o nome `LogoArch` por compatibilidade com call sites (LP,
 * Header, Footer, AppShell, CandidatoLayout). Decorativo: o wordmark
 * adjacente ja anuncia "Acesse Desenvolvimento" — alt vazio + aria-hidden.
 */
export function LogoArch({ className, width = 40, height = 40 }: LogoArchProps) {
  return (
    <span
      className={`logo-arch inline-flex items-center ${className ?? ""}`}
      aria-hidden="true"
    >
      <Image
        src="/logo-mark.webp"
        alt=""
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain"
      />
    </span>
  );
}

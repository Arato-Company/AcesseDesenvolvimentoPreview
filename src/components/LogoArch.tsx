type LogoArchProps = {
  className?: string;
};

/**
 * SVG do "arco" do logo (mesma marca usada em LP + topbar autenticada + footer).
 * Mantemos como componente puro pra reutilizar nos 3 contextos sem duplicar SVG.
 */
export function LogoArch({ className }: LogoArchProps) {
  return (
    <span className={`logo-arch ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 28V14a10 10 0 0 1 20 0v14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          d="M4 28h24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          d="M9 28V18M23 28V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

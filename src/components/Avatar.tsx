type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

/**
 * Placeholder de avatar baseado em iniciais do nome — usado em vez
 * de fotos reais (constraint LGPD / marca neutra).
 * Cores derivam dos 5 gradientes do tokens.css `.profile-photo.gradient-N`.
 */
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function gradientFromName(name: string): 1 | 2 | 3 | 4 | 5 {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  const idx = (sum % 5) + 1;
  return idx as 1 | 2 | 3 | 4 | 5;
}

const sizeStyle: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-14 h-14 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-xl",
};

export function Avatar({ name, size = "md", variant, className }: AvatarProps) {
  const g = variant ?? gradientFromName(name);
  return (
    <span
      className={`profile-photo gradient-${g} ${sizeStyle[size]} ${className ?? ""}`}
      aria-label={name}
      role="img"
    >
      {getInitials(name)}
    </span>
  );
}

import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";

export type PostStatus = "PUBLICADO" | "RASCUNHO" | "AGENDADO";

type PostListCardProps = {
  titulo: string;
  thumbnailUrl: string | null;
  status: PostStatus;
  /** Data ou hora relativa: "Ha 2h", "Amanha", etc. */
  meta: string;
  views: number;
  comentarios: number;
  selecionado?: boolean;
  onSelect?: () => void;
};

const STATUS_BADGE: Record<PostStatus, string> = {
  PUBLICADO: "bg-success/10 text-success",
  RASCUNHO: "bg-paper text-ink-2",
  AGENDADO: "bg-warning/10 text-warning",
};

/**
 * Card de lista do CMS de posts (W13). Thumbnail 64x64 + titulo + badge status
 * + meta + stats. Selecionavel.
 */
export function PostListCard({
  titulo,
  thumbnailUrl,
  status,
  meta,
  views,
  comentarios,
  selecionado,
  onSelect,
}: PostListCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border bg-offwhite p-3 text-left transition hover:border-gold ${
        selecionado ? "border-gold shadow-2" : "border-line"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-paper">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold text-navy">{titulo}</p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-widest ${STATUS_BADGE[status]}`}
            >
              {status}
            </span>
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
              {meta}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-2xs text-ink-3">
            <span className="inline-flex items-center gap-1">
              <Eye size={11} strokeWidth={1.7} /> {views.toLocaleString("pt-BR")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle size={11} strokeWidth={1.7} /> {comentarios}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

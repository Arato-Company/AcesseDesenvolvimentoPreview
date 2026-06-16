"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FilePen,
  UploadCloud,
  Trash2,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { PostListCard, type PostStatus } from "@/components/PostListCard";
import { PostEditor } from "@/components/PostEditor";
import { ToggleSetting } from "@/components/ToggleSetting";

type CMSPost = {
  id: string;
  titulo: string;
  thumbnail: string | null;
  status: PostStatus;
  meta: string;
  views: number;
  comentarios: number;
  categorias: string[];
};

const POSTS: CMSPost[] = [
  {
    id: "p1",
    titulo: "Alta temporada 2026: hoteis de Serra Negra abrem 120 vagas",
    thumbnail: "/feed/artigo-01.webp",
    status: "PUBLICADO",
    meta: "Ha 2h",
    views: 1240,
    comentarios: 12,
    categorias: ["REGIONAL", "TURISMO"],
  },
  {
    id: "p2",
    titulo: "Curriculo de hotelaria no Circuito: 5 erros que custam a vaga",
    thumbnail: "/feed/artigo-02.webp",
    status: "PUBLICADO",
    meta: "Ontem",
    views: 892,
    comentarios: 8,
    categorias: ["CARREIRA"],
  },
  {
    id: "p3",
    titulo: "Polo ceramico de Pedreira abre 40 vagas pro segundo turno",
    thumbnail: "/feed/artigo-03.webp",
    status: "RASCUNHO",
    meta: "3 dias atras",
    views: 0,
    comentarios: 0,
    categorias: ["MERCADO LOCAL"],
  },
  {
    id: "p4",
    titulo: "Hospital Sao Lucas: edital pra tecnicos de enfermagem",
    thumbnail: "/categorias/saude.png",
    status: "AGENDADO",
    meta: "Amanha 09h",
    views: 0,
    comentarios: 0,
    categorias: ["CURADORIA"],
  },
  {
    id: "p5",
    titulo: "Cooperativas de Holambra ampliam vagas pra jovens do agro",
    thumbnail: "/categorias/agro.png",
    status: "PUBLICADO",
    meta: "Semana passada",
    views: 2104,
    comentarios: 22,
    categorias: ["REGIONAL", "AGRO"],
  },
];

const FILTROS = ["Tudo", "Publicados", "Rascunhos", "Agendados"];

const SUGESTOES_CATEGORIA = [
  "CARREIRA",
  "REGIONAL",
  "MERCADO LOCAL",
  "CURADORIA",
];

const INITIAL_HTML = `
<p>O Circuito das Aguas vive um momento singular pra empregabilidade. Hoteis,
restaurantes e operacoes ligadas a alta temporada concentram demanda — e
a Acesse esta no meio dessa conversa.</p>

<blockquote style="border-left:4px solid var(--c-gold); padding-left:16px; margin:24px 0; font-style:italic; color:var(--c-navy-soft); background:var(--c-paper); padding:16px 20px; border-radius:8px;">
Curadoria humana antes da publicacao. So perfis revisados pela equipe
chegam na vitrine.
</blockquote>

<p>O resultado? Empresas economizam tempo, candidatos ganham contexto
regional e a regiao se profissionaliza junto.</p>
`;

/**
 * /admin/posts — W13. Split-panel CMS. Lista 35% + editor 65% full-height.
 */
export default function AdminPostsPage() {
  const [selected, setSelected] = useState<CMSPost>(POSTS[0]);
  const [filtro, setFiltro] = useState("Tudo");

  const filtered = POSTS.filter((p) => {
    if (filtro === "Tudo") return true;
    if (filtro === "Publicados") return p.status === "PUBLICADO";
    if (filtro === "Rascunhos") return p.status === "RASCUNHO";
    if (filtro === "Agendados") return p.status === "AGENDADO";
    return true;
  });

  return (
    <AppAdminShell topbarTitle="Posts" noMainPadding>
      <div className="flex h-full overflow-hidden">
        {/* Coluna lista 35% */}
        <section className="flex w-[35%] min-w-[320px] flex-col overflow-hidden border-r border-line">
          <header className="px-6 pb-3 pt-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-navy">
                Posts para candidatos
              </h2>
              <button className="btn btn-gold btn-sm">
                <FilePen size={14} strokeWidth={1.7} />
                Novo post
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {FILTROS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  className={`rounded-full border px-3 py-1 font-mono text-2xs uppercase tracking-widest transition ${
                    filtro === f
                      ? "border-navy bg-navy text-offwhite"
                      : "border-line bg-paper text-ink-2 hover:border-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6">
            {filtered.map((p) => (
              <PostListCard
                key={p.id}
                titulo={p.titulo}
                thumbnailUrl={p.thumbnail}
                status={p.status}
                meta={p.meta}
                views={p.views}
                comentarios={p.comentarios}
                selecionado={selected.id === p.id}
                onSelect={() => setSelected(p)}
              />
            ))}
          </div>
        </section>

        {/* Coluna editor 65% */}
        <section className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-10 py-8">
              {/* Cover upload */}
              <div className="relative h-64 overflow-hidden rounded-xl border-2 border-dashed border-line bg-paper">
                {selected.thumbnail ? (
                  <Image
                    src={selected.thumbnail}
                    alt=""
                    fill
                    className="object-cover opacity-80"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : null}
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center gap-2 bg-navy-deep/0 font-mono text-2xs uppercase tracking-widest text-offwhite transition hover:bg-navy-deep/40"
                >
                  <UploadCloud size={16} strokeWidth={1.7} />
                  Alterar capa
                </button>
              </div>

              {/* Titulo borderless */}
              <input
                type="text"
                defaultValue={selected.titulo}
                placeholder="Titulo do post"
                className="mt-6 w-full bg-transparent font-display text-4xl font-semibold text-navy placeholder:text-ink-3 outline-none"
                key={selected.id}
              />

              {/* Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selected.categorias.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-navy/10 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-navy"
                  >
                    {cat}
                  </span>
                ))}
                <button
                  type="button"
                  className="rounded-full border border-dashed border-line px-3 py-1 font-mono text-2xs uppercase tracking-widest text-ink-3 transition hover:border-gold hover:text-gold-deep"
                  title={`Sugestoes: ${SUGESTOES_CATEGORIA.join(", ")}`}
                >
                  + Categoria
                </button>
              </div>

              <hr className="my-6 border-line" />

              <PostEditor initialHtml={INITIAL_HTML} key={`editor-${selected.id}`} />

              {/* Settings panel */}
              <div className="mt-10 rounded-xl border border-line bg-offwhite p-6">
                <h4 className="mb-2 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                  Publicacao
                </h4>
                <ToggleSetting
                  label="Notificar candidatos"
                  description="Envia push para a base segmentada ao publicar."
                  defaultChecked
                />
                <ToggleSetting
                  label="Agendamento"
                  description="Publica automaticamente na data selecionada."
                />
                <div className="mt-3 flex items-center gap-3 rounded-lg bg-paper px-4 py-3">
                  <Calendar size={14} strokeWidth={1.7} className="text-navy" />
                  <input
                    type="datetime-local"
                    className="flex-1 bg-transparent font-mono text-2xs uppercase tracking-widest text-ink-2 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between border-t border-line bg-offwhite px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="icon-btn"
                aria-label="Excluir post"
              >
                <Trash2 size={16} strokeWidth={1.7} />
              </button>
              <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                Salvo automaticamente ha 2 min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="btn btn-secondary btn-sm">
                Salvar rascunho
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                <ChevronDown size={12} strokeWidth={1.7} />
                Agendar
              </button>
              <button type="button" className="btn btn-primary">
                Publicar agora
              </button>
            </div>
          </footer>
        </section>
      </div>
    </AppAdminShell>
  );
}

import { AppShell } from "@/components/AppShell";
import posts from "@/data/posts.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Post } from "@/types";

const postsTyped = posts as Post[];

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (!ano || !mes || !dia) return iso;
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * /admin/posts — fonte: Web/13 - Admin Posts CMS.html.
 * CMS minimal: tabela posts + CTA novo (nao funcional v0).
 */
export default function AdminPostsPage() {
  const ordenados = [...postsTyped].sort((a, b) =>
    b.publicadoEm.localeCompare(a.publicadoEm),
  );

  return (
    <AppShell audience="admin" topbarTitle="Posts CMS" topbarUserLabel="AD">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caps mb-2">Feed editorial</p>
          <h1 className="display-lg">
            {postsTyped.length} posts{" "}
            <span className="text-ink-3">publicados</span>
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            Conteudo regional revisado pela curadoria. Posts aparecem na rota
            publica /feed.
          </p>
        </div>
        <button type="button" className="btn btn-gold">
          + Novo post
        </button>
      </header>

      <div className="overflow-x-auto rounded-xl border border-line bg-offwhite shadow-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr className="text-2xs uppercase tracking-widest text-ink-3">
              <th className="px-5 py-3 font-mono">Titulo</th>
              <th className="px-5 py-3 font-mono">Area</th>
              <th className="px-5 py-3 font-mono">Cidade</th>
              <th className="px-5 py-3 font-mono">Autor</th>
              <th className="px-5 py-3 font-mono">Publicado em</th>
              <th className="px-5 py-3 font-mono">Status</th>
              <th className="px-5 py-3 text-right font-mono">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ordenados.map((p) => (
              <tr key={p.id} className="hover:bg-paper/60">
                <td className="px-5 py-3">
                  <p className="font-semibold text-navy">{p.titulo}</p>
                  <p className="text-xs text-ink-2">{p.slug}</p>
                </td>
                <td className="px-5 py-3 text-ink-2">
                  {p.area ? areaNome(p.area) : "Institucional"}
                </td>
                <td className="px-5 py-3 text-ink-2">
                  {p.cidade ? cidadeNome(p.cidade) : "—"}
                </td>
                <td className="px-5 py-3 text-ink-2">{p.autor}</td>
                <td className="px-5 py-3 text-ink-2">
                  {formatarData(p.publicadoEm)}
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
                    Publicado
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button type="button" className="btn btn-ghost btn-sm">
                      Editar
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm">
                      Despublicar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

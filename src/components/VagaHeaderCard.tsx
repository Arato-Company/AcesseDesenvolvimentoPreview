import Link from "next/link";
import { Pencil } from "lucide-react";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { ModalidadeTrabalho, Vaga } from "@/types";

const MODALIDADE_LABEL: Record<ModalidadeTrabalho, string> = {
  presencial: "Presencial",
  hibrido: "Hibrido",
  remoto: "Remoto",
};

/**
 * Cabeçalho da tela de matching (`/empresa/vaga/[id]`).
 * Resume a busca (brief) que a empresa criou: área, cidade, senioridade,
 * tipo, modalidade e competências desejadas.
 */
export function VagaHeaderCard({ vaga }: { vaga: Vaga }) {
  const chips = [
    cidadeNome(vaga.cidade),
    vaga.senioridade,
    vaga.tipo,
    MODALIDADE_LABEL[vaga.modalidade],
  ];

  return (
    <section className="relative rounded-xl border border-line bg-offwhite p-8">
      <Link
        href="/empresa/vaga/nova"
        className="btn btn-ghost btn-sm absolute right-6 top-6"
      >
        <Pencil size={14} strokeWidth={1.8} aria-hidden="true" />
        Editar busca
      </Link>

      <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
        Busca ativa · {areaNome(vaga.area)}
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-2xl font-semibold text-navy">
        {vaga.titulo}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span key={c} className="tag">
            {c}
          </span>
        ))}
      </div>

      {vaga.skills.length > 0 ? (
        <div className="mt-6">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Competencias
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {vaga.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-gold-light bg-gold-light/20 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

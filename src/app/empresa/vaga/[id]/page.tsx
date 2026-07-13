import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { VagaHeaderCard } from "@/components/VagaHeaderCard";
import { MatchResults } from "@/components/MatchResults";
import vagas from "@/data/vagas.json";
import type { Vaga } from "@/types";

const vagasTyped = vagas as Vaga[];

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return vagasTyped.map((v) => ({ id: v.id }));
}

/**
 * /empresa/vaga/[id] — Resultados de matching (pivô busca inteligente).
 * A empresa criou uma busca (brief) e aqui vê os candidatos aderentes do
 * pool, rankeados por score. Candidato nunca vê nem se candidata.
 */
export default async function VagaMatchingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const vaga = vagasTyped.find((v) => v.id === id);
  if (!vaga) notFound();

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Resultados da busca"
      topbarUserName="Carolina Antunes"
      topbarUserLabel="CA"
    >
      <div className="mx-auto max-w-4xl">
        <VagaHeaderCard vaga={vaga} />
        <MatchResults vaga={vaga} />
      </div>
    </AppShell>
  );
}

import { PageShell } from "@/components/PageShell";
import candidatos from "@/data/candidatos.json";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return candidatos.map((c) => ({ id: c.id }));
}

export default async function PerfilCandidatoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const candidato = candidatos.find((c) => c.id === id);

  return (
    <PageShell
      eyebrow="Web/04 · Empresa"
      title={candidato ? `Perfil · ${candidato.nome}` : "Perfil Candidato"}
      description={
        candidato
          ? `${candidato.cargo} · ${candidato.cidade.replace(/-/g, " ")} · match ${candidato.matchScore}%.`
          : "Pagina de perfil completo do candidato, com timeline de experiencia e CTA de contato."
      }
    />
  );
}

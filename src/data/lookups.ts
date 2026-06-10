import cidades from "./cidades.json";
import areas from "./areas.json";
import empresas from "./empresas.json";
import type {
  Area,
  AreaSlug,
  Cidade,
  CidadeSlug,
  Empresa,
} from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];
const empresasTyped = empresas as Empresa[];

const cidadeMap = new Map(cidadesTyped.map((c) => [c.slug, c]));
const areaMap = new Map(areasTyped.map((a) => [a.slug, a]));
const empresaMap = new Map(empresasTyped.map((e) => [e.id, e]));

export function cidadeNome(slug: CidadeSlug): string {
  return cidadeMap.get(slug)?.nome ?? slug;
}

export function areaNome(slug: AreaSlug): string {
  return areaMap.get(slug)?.nome ?? slug;
}

export function empresaById(id: string): Empresa | undefined {
  return empresaMap.get(id);
}

export const allCidades = cidadesTyped;
export const allAreas = areasTyped;
export const allEmpresas = empresasTyped;

/**
 * Tipos do dominio para o scaffold v0.
 * Sem backend ainda; tudo servido de `src/data/*.json`.
 * Mantemos como `type` (nao enum) para casar com convencao TS strict do projeto.
 */

export type CidadeSlug =
  | "amparo"
  | "holambra"
  | "jaguariuna"
  | "serra-negra"
  | "aguas-de-lindoia"
  | "lindoia"
  | "socorro"
  | "monte-alegre-do-sul"
  | "pedreira";

export type Cidade = {
  slug: CidadeSlug;
  nome: string;
  uf: "SP";
};

export type AreaSlug =
  | "turismo"
  | "comercio"
  | "industria"
  | "saude"
  | "agro";

export type Area = {
  slug: AreaSlug;
  nome: string;
  descricao: string;
};

export type RegimeContratacao = "CLT" | "PJ" | "Temporario" | "Estagio" | "Freelancer";

export type Vaga = {
  id: string;
  titulo: string;
  empresaId: string;
  cidade: CidadeSlug;
  area: AreaSlug;
  regime: RegimeContratacao;
  salarioMin: number | null;
  salarioMax: number | null;
  resumo: string;
  tags: string[];
  publicadaEm: string;
  curada: boolean;
};

export type NivelExperiencia = "Junior" | "Pleno" | "Senior" | "Especialista";

export type PlanoCandidato = "start" | "destaque" | "premium";

export type Candidato = {
  id: string;
  nome: string;
  cargo: string;
  cidade: CidadeSlug;
  area: AreaSlug;
  nivel: NivelExperiencia;
  resumo: string;
  tags: string[];
  matchScore: number;
  plano: PlanoCandidato;
  curado: boolean;
  /** Caminho relativo a `public/` para a foto do candidato. `null` ou ausente -> usa fallback. */
  foto?: string | null;
};

export type PlanoEmpresa = "basico" | "destaque" | "premium";

export type Empresa = {
  id: string;
  nome: string;
  cidade: CidadeSlug;
  area: AreaSlug;
  porte: "Pequena" | "Media" | "Grande";
  resumo: string;
  plano: PlanoEmpresa;
  /** Caminho relativo a `public/` para a logo da empresa. `null` ou ausente -> usa fallback. */
  logoUrl?: string | null;
};

export type PlanoCandidatoInfo = {
  id: PlanoCandidato;
  nome: string;
  preco: number;
  periodoMeses: number;
  destaques: string[];
  recomendado?: boolean;
};

export type PlanoEmpresaInfo = {
  id: PlanoEmpresa;
  nome: string;
  preco: number;
  periodoMeses: number;
  destaques: string[];
  recomendado?: boolean;
};

export type Planos = {
  candidato: PlanoCandidatoInfo[];
  empresa: PlanoEmpresaInfo[];
};

export type Post = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  /** Area pode ser null quando o post for institucional/regional puro. */
  area: AreaSlug | null;
  /** Cidade-foco do post; opcional pra posts regionais amplos. */
  cidade: CidadeSlug | null;
  /** Data ISO `YYYY-MM-DD`. */
  publicadoEm: string;
  /** Caminho relativo a `public/` ou null pra cards text-only. */
  imagemUrl: string | null;
  autor: string;
};

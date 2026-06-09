/**
 * Mapa central das 20 rotas do scaffold v0.
 * Mantemos como `as const` para casar com TS strict
 * sem precisar de enum (convencao do projeto).
 */

export type RotaGrupo = "candidato" | "empresa" | "admin" | "publico";

export type Rota = {
  href: string;
  titulo: string;
  origem: string;
  grupo: RotaGrupo;
  responsivoMobile?: boolean;
};

export const rotas: readonly Rota[] = [
  // Publicas
  {
    href: "/login",
    titulo: "Entrada Login Dual",
    origem: "Web/01 + Mobile/01",
    grupo: "publico",
    responsivoMobile: true,
  },
  {
    href: "/feed",
    titulo: "Feed Novidades",
    origem: "Web/14 + Mobile/09",
    grupo: "publico",
    responsivoMobile: true,
  },

  // Candidato
  {
    href: "/candidato/cadastro",
    titulo: "Onboarding Cadastro",
    origem: "Mobile/02",
    grupo: "candidato",
    responsivoMobile: true,
  },
  {
    href: "/candidato/dashboard",
    titulo: "Dashboard Candidato",
    origem: "Mobile/03",
    grupo: "candidato",
    responsivoMobile: true,
  },
  {
    href: "/candidato/curriculo",
    titulo: "Curriculo Gerado",
    origem: "Mobile/06",
    grupo: "candidato",
    responsivoMobile: true,
  },
  {
    href: "/candidato/planos",
    titulo: "Planos Checkout Candidato",
    origem: "Mobile/07",
    grupo: "candidato",
    responsivoMobile: true,
  },

  // Empresa
  {
    href: "/empresa/dashboard",
    titulo: "Dashboard Empresa",
    origem: "Web/02",
    grupo: "empresa",
  },
  {
    href: "/empresa/cadastro",
    titulo: "Cadastro Empresa",
    origem: "Web/02a",
    grupo: "empresa",
  },
  {
    href: "/empresa/vitrine",
    titulo: "Vitrine Profissionais",
    origem: "Web/03",
    grupo: "empresa",
  },
  {
    href: "/empresa/candidato/cand-001",
    titulo: "Perfil Candidato",
    origem: "Web/04",
    grupo: "empresa",
  },
  {
    href: "/empresa/vaga/nova",
    titulo: "Publicar Vaga",
    origem: "Web/05",
    grupo: "empresa",
  },
  {
    href: "/empresa/favoritos",
    titulo: "Favoritos",
    origem: "Web/07",
    grupo: "empresa",
  },
  {
    href: "/empresa/planos",
    titulo: "Planos Checkout Empresa",
    origem: "Web/08",
    grupo: "empresa",
  },

  // Admin
  {
    href: "/admin",
    titulo: "Admin Visao Geral",
    origem: "Web/10",
    grupo: "admin",
  },
  {
    href: "/admin/curadoria",
    titulo: "Admin Curadoria",
    origem: "Web/09",
    grupo: "admin",
  },
  {
    href: "/admin/candidatos",
    titulo: "Admin Candidatos",
    origem: "Web/11",
    grupo: "admin",
  },
  {
    href: "/admin/empresas",
    titulo: "Admin Empresas",
    origem: "Web/12",
    grupo: "admin",
  },
  {
    href: "/admin/posts",
    titulo: "Admin Posts CMS",
    origem: "Web/13",
    grupo: "admin",
  },
  {
    href: "/admin/reembolsos",
    titulo: "Admin Reembolsos",
    origem: "Web/15",
    grupo: "admin",
  },
  {
    href: "/admin/comunicacao",
    titulo: "Admin Comunicacao",
    origem: "Web/16",
    grupo: "admin",
  },
] as const;

export const rotaGrupos: { id: RotaGrupo; nome: string; descricao: string }[] =
  [
    {
      id: "publico",
      nome: "Publico",
      descricao: "Rotas sem login (login dual + feed regional).",
    },
    {
      id: "candidato",
      nome: "Candidato",
      descricao: "Jornada candidato — pensada mobile-first.",
    },
    {
      id: "empresa",
      nome: "Empresa",
      descricao: "Jornada empresa — desktop com sidebar + topbar.",
    },
    {
      id: "admin",
      nome: "Admin (concierge)",
      descricao: "Painel da curadoria humana — operacao interna.",
    },
  ];

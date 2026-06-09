# Acesse Desenvolvimento — Frontend v0

SaaS de empregabilidade regional pro **Circuito das Aguas paulista** (Amparo, Holambra, Jaguariuna, Serra Negra, Aguas de Lindoia, Lindoia, Socorro, Monte Alegre do Sul, Pedreira).

Esta v0 e **estatica + sem backend** — scaffold navegavel cobrindo as 20 rotas mapeadas no Stitch (Etapa 9) com mock data local. UI completa entra na proxima rodada.

## Como rodar

```bash
npm install
npm run dev      # localhost:3000
npm run build    # gera /out (static export)
npm run lint     # ESLint
npm run format   # Prettier
```

## Stack

- **Next.js 15** (App Router, `output: "export"`)
- **React 19**
- **TypeScript** strict
- **Tailwind v3** consumindo CSS vars de `src/styles/tokens.css`
- **ESLint** (`next/core-web-vitals` + `next/typescript`) + **Prettier**
- **next/font/google** para Fraunces, Inter e JetBrains Mono

Sem backend, sem API routes, sem deploy ainda.

## Estrutura

```
src/
  app/
    layout.tsx         # fontes via next/font + metadata
    page.tsx           # home / galeria de rotas
    globals.css        # tailwind + tokens
    login/
    feed/
    candidato/{cadastro,dashboard,curriculo,planos}/
    empresa/{dashboard,cadastro,vitrine,favoritos,planos,vaga/nova,candidato/[id]}/
    admin/{,curadoria,candidatos,empresas,posts,reembolsos,comunicacao}/
  components/          # Header, Footer, Container, PageShell
  data/                # cidades, areas, vagas, candidatos, empresas, planos, rotas
  styles/tokens.css    # tokens canonicos do Design System
  types/               # tipos do dominio (sem enum — convencao TS strict)
```

## Mapa de rotas (20)

**Publicas**
- `/` — galeria de rotas (home)
- `/login` — entrada dual (mobile responsivo)
- `/feed` — feed regional (mobile responsivo)

**Candidato (mobile-first)**
- `/candidato/cadastro`
- `/candidato/dashboard`
- `/candidato/curriculo`
- `/candidato/planos`

**Empresa**
- `/empresa/dashboard`
- `/empresa/cadastro`
- `/empresa/vitrine`
- `/empresa/candidato/[id]`
- `/empresa/vaga/nova`
- `/empresa/favoritos`
- `/empresa/planos`

**Admin (concierge)**
- `/admin`
- `/admin/curadoria`
- `/admin/candidatos`
- `/admin/empresas`
- `/admin/posts`
- `/admin/reembolsos`
- `/admin/comunicacao`

## Design System

Tokens canonicos em `src/styles/tokens.css` — paleta Navy/Gold, fontes Fraunces/Inter/JetBrains Mono, escala 4px, raios, sombras com tom navy. Tailwind consumindo CSS vars via `tailwind.config.ts`.

Referencia completa no vault: `Clientes/Luciana/Acesse Desenvolvimento/Design System.md`.

## Hard constraints

- Marca neutra (Luciana nao aparece como rosto)
- Regional-only (somente Circuito das Aguas no mock data)
- Bilateral (candidato + empresa visiveis no scaffold)
- Sem chat interno (contato = WhatsApp/email)
- LGPD: nada persistido na v0

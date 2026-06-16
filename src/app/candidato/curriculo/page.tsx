"use client";

import { useState } from "react";
import { Bell, Lightbulb, FileText } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { Avatar } from "@/components/Avatar";
import candidatos from "@/data/candidatos.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Candidato } from "@/types";

const candidatosTyped = candidatos as Candidato[];

// Candidato mock fixo pro v0 (sem auth ainda).
const CANDIDATO_DEMO =
  candidatosTyped.find((c) => c.id === "cand-002") ?? candidatosTyped[0]!;

type ModeloCV = {
  id: string;
  label: string;
  destaque?: boolean;
};

const MODELOS: ModeloCV[] = [
  { id: "editorial", label: "Editorial" },
  { id: "classico", label: "Classico" },
  { id: "duas-colunas", label: "Duas colunas" },
  { id: "minimalista", label: "Minimalista" },
  { id: "regional-qr", label: "Regional QR", destaque: true },
];

function slugify(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Experiencia = {
  periodo: string;
  cargo: string;
  empresa: string;
  descricao: string;
};

function gerarExperiencias(c: Candidato): Experiencia[] {
  const anoBase = 2026;
  const area = areaNome(c.area);
  const cidade = cidadeNome(c.cidade);
  return [
    {
      periodo: `${anoBase - 3} — atual`,
      cargo: c.cargo,
      empresa: `Empresa regional · ${cidade}`,
      descricao: `Responsavel por rotina de ${area.toLowerCase()} e processos do dia a dia.`,
    },
    {
      periodo: `${anoBase - 5} — ${anoBase - 3}`,
      cargo: `${c.cargo} Junior`,
      empresa: "Empresa local · Circuito das Aguas",
      descricao:
        "Primeira experiencia formal. Consolidacao tecnica e formacao em servico.",
    },
  ];
}

type ThumbProps = {
  modelo: ModeloCV;
  ativo: boolean;
  onSelect: () => void;
};

function ModeloThumb({ modelo, ativo, onSelect }: ThumbProps) {
  const borderClass = ativo ? "border-navy" : "border-line";
  const labelClass = modelo.destaque
    ? "text-gold-deep font-bold"
    : ativo
      ? "text-navy font-bold"
      : "text-ink-2";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-24 flex-shrink-0 flex-col items-center space-y-2"
      aria-pressed={ativo}
      aria-label={`Modelo ${modelo.label}`}
    >
      <div
        className={`aspect-[3/4] w-full rounded border-2 bg-white p-2 shadow-sm ${borderClass}`}
      >
        {/* Preview mock: linhas + bloco que sugerem layout do modelo */}
        <div className="flex h-full flex-col gap-1">
          <div className="h-1 w-2/3 rounded-sm bg-navy/60" />
          <div className="h-0.5 w-1/2 rounded-sm bg-gold/70" />
          <div className="mt-1 h-px w-full bg-line" />
          <div className="mt-1 flex flex-1 gap-1">
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="h-0.5 w-full rounded-sm bg-ink-3/50" />
              <div className="h-0.5 w-5/6 rounded-sm bg-ink-3/50" />
              <div className="h-0.5 w-4/6 rounded-sm bg-ink-3/50" />
            </div>
            {modelo.destaque ? (
              <div className="h-4 w-4 self-end rounded-sm bg-gold-light" />
            ) : (
              <div className="h-3 w-3 self-end rounded-sm bg-ink-3/30" />
            )}
          </div>
        </div>
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-wider ${labelClass}`}>
        {modelo.destaque ? "✦ " : ""}
        {modelo.label}
      </span>
    </button>
  );
}

/**
 * /candidato/curriculo — fonte ground truth: Stitch Mobile/06 (M06).
 * Spec: PM/deliverables/specs-telas-criticas-batch2/_index.md (Batch 2).
 *
 * Layout: topbar custom (marca "Acesse Desenvolvimento" canonica) + galeria
 * de modelos + insight regional + canvas A4 com preview do CV + acoes.
 * BottomNav reduzido pra 3 itens (Inicio/Curriculo/Perfil) no proprio Layout.
 * Phone-frame removido via prop noFrame.
 */
export default function CandidatoCurriculoPage() {
  const c = CANDIDATO_DEMO;
  const experiencias = gerarExperiencias(c);
  const cidade = cidadeNome(c.cidade);
  const slug = slugify(c.nome);
  const cvUrl = `https://acesse.dev/p/${slug}`;
  const dataGeracao = new Date().toLocaleDateString("pt-BR");

  const [modeloAtivo, setModeloAtivo] = useState<string>("editorial");

  return (
    <CandidatoLayout userName={c.nome} noFrame hideHeader>
      {/* Topbar custom */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line/20 bg-offwhite px-4">
        <div className="flex items-center gap-3">
          <Avatar name={c.nome} size="sm" />
          <span className="font-display text-2xl tracking-tighter text-navy">
            Acesse Desenvolvimento
          </span>
        </div>
        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-paper"
          aria-label="Notificacoes"
        >
          <Bell className="h-6 w-6 text-navy" aria-hidden="true" />
        </button>
      </header>

      <main className="px-4 pb-32 pt-6">
        {/* Galeria modelos */}
        <section className="mb-8">
          <div className="mb-3 flex items-end justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-2">
              Escolha um modelo
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
              {MODELOS.length} modelos
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {MODELOS.map((m) => (
              <ModeloThumb
                key={m.id}
                modelo={m}
                ativo={modeloAtivo === m.id}
                onSelect={() => setModeloAtivo(m.id)}
              />
            ))}
          </div>
        </section>

        {/* Insight regional */}
        <aside className="mb-8 flex gap-3 rounded-r-lg border-l-4 border-gold-deep bg-gold/10 p-4">
          <Lightbulb
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-deep"
            aria-hidden="true"
          />
          <div>
            <p className="font-body text-sm font-bold text-navy">
              Toque Regional
            </p>
            <p className="font-body text-sm text-ink-2">
              Empresas locais valorizam a entrega fisica. Esta versao foi
              otimizada para legibilidade em papel e economia de tinta.
            </p>
          </div>
        </aside>

        {/* Canvas A4 */}
        <article
          className="cv-page relative flex w-full flex-col overflow-hidden rounded-sm border border-line/40 p-8 shadow-xl"
          style={{
            aspectRatio: "1 / 1.41",
            backgroundColor: "white",
            backgroundImage:
              "radial-gradient(var(--c-line) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* CV Header */}
          <header className="mb-6 border-b-2 border-navy pb-6">
            <h1 className="font-display text-3xl text-navy">{c.nome}</h1>
            <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-gold-deep">
              {c.cargo}
            </p>
          </header>

          {/* CV Body */}
          <div className="flex flex-1 gap-6">
            {/* Main col */}
            <div className="flex-[2] space-y-6">
              <section>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold-deep">
                  Experiencia
                </p>
                <div className="space-y-3">
                  {experiencias.map((exp, i) => (
                    <div key={i}>
                      <p className="font-body text-sm font-bold text-navy">
                        {exp.cargo}
                      </p>
                      <p className="font-body text-xs italic text-ink-2">
                        {exp.empresa} · {exp.periodo}
                      </p>
                      <p className="mt-1 font-body text-xs text-ink-2">
                        {exp.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold-deep">
                  Educacao
                </p>
                <div>
                  <p className="font-body text-sm font-bold text-navy">
                    Ensino tecnico em {areaNome(c.area)}
                  </p>
                  <p className="font-body text-xs italic text-ink-2">
                    Instituto regional · Circuito das Aguas
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar col */}
            <div className="flex-1 space-y-6">
              {/* QR box */}
              <div className="flex flex-col items-center rounded-lg bg-paper/50 p-4 text-center">
                <div className="rounded-lg border border-gold bg-white p-2 shadow-sm">
                  <QRCodeSVG
                    value={cvUrl}
                    size={64}
                    bgColor="#ffffff"
                    fgColor="var(--c-navy)"
                    aria-label="QR para curriculo online"
                  />
                </div>
                <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-wider text-gold-deep">
                  Curriculo online
                </p>
                <p className="mt-1 font-body text-[7px] leading-tight text-ink-2">
                  Escaneie para ver portfolio completo
                </p>
              </div>

              {/* Contato */}
              <section>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold-deep">
                  Contato
                </p>
                <ul className="space-y-1 font-body text-[10px] text-navy">
                  <li>contato@acesse.dev</li>
                  <li>(19) 9 9999-9999</li>
                  <li>
                    {cidade}, SP
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* CV Footer */}
          <footer className="mt-auto flex items-end justify-between border-t border-line/20 pt-4">
            <span className="font-display text-3xl text-navy/20">Curado</span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-ink-2">
              Gerado em {dataGeracao}
            </span>
          </footer>
        </article>

        {/* Action area */}
        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-primary flex h-14 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-lg"
          >
            <FileText className="h-5 w-5" aria-hidden="true" />
            Baixar PDF
          </button>
          <button
            type="button"
            className="btn btn-secondary h-12 w-full rounded-xl border border-line/30"
          >
            Editar curriculo
          </button>
        </div>
      </main>
    </CandidatoLayout>
  );
}

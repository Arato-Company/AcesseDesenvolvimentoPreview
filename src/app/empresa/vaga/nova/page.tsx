"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FormField } from "@/components/FormField";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type { Area, Cidade, RegimeContratacao } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const REGIMES: RegimeContratacao[] = [
  "CLT",
  "PJ",
  "Temporario",
  "Estagio",
  "Freelancer",
];

const STEPS = [
  { num: "01", label: "Tutorial" },
  { num: "02", label: "Detalhes" },
  { num: "03", label: "Requisitos" },
  { num: "04", label: "Publicar" },
] as const;

/**
 * /empresa/vaga/nova — fonte: Web/05 - Publicar Vaga.html.
 * Stepper de 4 passos. Passo 1 e tutorial (4 bullets), 2-3 formulario,
 * 4 revisao. State local — mock sem persistencia.
 */
export default function PublicarVagaPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    titulo: "",
    area: "",
    cidade: "",
    regime: "CLT" as RegimeContratacao,
    salarioMin: "",
    salarioMax: "",
    resumo: "",
    requisitos: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <AppShell
      audience="empresa"
      topbarTitle="Publicar vaga"
      topbarUserLabel="CA"
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="caps mb-2">Vagas</p>
          <h1 className="display-lg">Publicar uma vaga</h1>
          <p className="mt-2 text-ink-2">
            Sem letra miuda. Voce cria a vaga em 2 minutos — a gente entrega
            candidatos da regiao.
          </p>
        </header>

        <div className="stepper">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex flex-1 items-center gap-2">
              <div
                className={`step ${i < step ? "done" : ""} ${i === step ? "active" : ""}`}
              >
                <span className="step-num-circle">
                  {i < step ? "✓" : s.num}
                </span>
                <span className="step-label hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 ? <span className="step-bar" /> : null}
            </div>
          ))}
        </div>

        {step === 0 ? (
          <section className="rounded-xl border border-line bg-offwhite p-10 shadow-1">
            <p className="caps mb-3">Passo 01 · Tutorial</p>
            <h2 className="display-md mb-6">Por que publicar a vaga aqui?</h2>
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              {[
                {
                  t: "Candidatos da regiao",
                  d: "Sua vaga aparece pra profissionais do Circuito das Aguas — sem CV cego, sem perfil de fora.",
                },
                {
                  t: "Perfil padronizado",
                  d: "Cada candidato preenche os mesmos campos. Voce compara maca com maca.",
                },
                {
                  t: "Curadoria humana",
                  d: "Os perfis com selo ✦ Curado passaram por avaliacao manual da equipe regional.",
                },
                {
                  t: "Voce no controle",
                  d: "Filtra por area, senioridade, cidade. Fala direto via WhatsApp.",
                },
              ].map((b) => (
                <div key={b.t}>
                  <p className="caps mb-2">{b.t}</p>
                  <p className="text-ink-2">{b.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm italic text-ink-2">
              Nos proximos passos: detalhes da vaga e requisitos. Depois e so
              publicar.
            </p>
          </section>
        ) : step === 1 ? (
          <section className="rounded-xl border border-line bg-offwhite p-10 shadow-1">
            <p className="caps mb-3">Passo 02 · Detalhes</p>
            <h2 className="display-md mb-8">Informacoes da vaga</h2>
            <div className="flex flex-col gap-6">
              <FormField
                label="Titulo da vaga"
                value={form.titulo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titulo: e.target.value }))
                }
                placeholder="Ex: Tecnica de enfermagem - PS 12x36"
              />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  as="select"
                  label="Area"
                  value={form.area}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, area: e.target.value }))
                  }
                >
                  <option value="">Selecione</option>
                  {areasTyped.map((a) => (
                    <option key={a.slug} value={a.slug}>
                      {a.nome}
                    </option>
                  ))}
                </FormField>
                <FormField
                  as="select"
                  label="Cidade"
                  value={form.cidade}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cidade: e.target.value }))
                  }
                  help="Apenas cidades do Circuito das Aguas."
                >
                  <option value="">Selecione</option>
                  {cidadesTyped.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nome}
                    </option>
                  ))}
                </FormField>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  as="select"
                  label="Regime"
                  value={form.regime}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      regime: e.target.value as RegimeContratacao,
                    }))
                  }
                >
                  {REGIMES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </FormField>
                <FormField
                  label="Salario min (R$)"
                  type="number"
                  inputMode="numeric"
                  value={form.salarioMin}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salarioMin: e.target.value }))
                  }
                  placeholder="2400"
                />
                <FormField
                  label="Salario max (R$)"
                  type="number"
                  inputMode="numeric"
                  value={form.salarioMax}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salarioMax: e.target.value }))
                  }
                  placeholder="2900"
                />
              </div>
              <FormField
                as="textarea"
                label="Descricao curta (pitch)"
                value={form.resumo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, resumo: e.target.value }))
                }
                placeholder="Uma frase impactante que resume a vaga..."
                rows={3}
              />
            </div>
          </section>
        ) : step === 2 ? (
          <section className="rounded-xl border border-line bg-offwhite p-10 shadow-1">
            <p className="caps mb-3">Passo 03 · Requisitos</p>
            <h2 className="display-md mb-8">O que voce procura</h2>
            <FormField
              as="textarea"
              label="Requisitos e beneficios"
              value={form.requisitos}
              onChange={(e) =>
                setForm((f) => ({ ...f, requisitos: e.target.value }))
              }
              placeholder="Ex: COREN ativo, escala 12x36, vale-transporte e refeicao no local. CIPA desejavel."
              rows={6}
              help="Liste 4 a 6 itens objetivos. Quanto mais claro, melhor."
            />
          </section>
        ) : (
          <section className="rounded-xl border border-gold bg-offwhite p-10 shadow-gold">
            <p className="caps mb-3">Passo 04 · Publicar</p>
            <h2 className="display-md mb-6">Revise antes de publicar</h2>
            <dl className="mb-8 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  Titulo
                </dt>
                <dd className="mt-1 text-navy">
                  {form.titulo || (
                    <span className="text-ink-3">(em branco)</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  Cidade · Area
                </dt>
                <dd className="mt-1 text-navy">
                  {form.cidade || "—"} · {form.area || "—"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  Regime · Faixa
                </dt>
                <dd className="mt-1 text-navy">
                  {form.regime}
                  {form.salarioMin ? ` · R$ ${form.salarioMin}` : ""}
                  {form.salarioMax ? ` – R$ ${form.salarioMax}` : ""}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                  Pitch
                </dt>
                <dd className="mt-1 text-ink-2">
                  {form.resumo || (
                    <span className="text-ink-3">(em branco)</span>
                  )}
                </dd>
              </div>
            </dl>
            {submitted ? (
              <div className="rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-navy">
                Mock — vaga enviada pra curadoria. Em produto real, a equipe
                aprova em ate 24h.
              </div>
            ) : null}
          </section>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={prev}
            disabled={step === 0}
          >
            ← Voltar
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={next}
            >
              Proximo passo →
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-gold btn-lg"
              onClick={() => setSubmitted(true)}
            >
              Publicar vaga
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

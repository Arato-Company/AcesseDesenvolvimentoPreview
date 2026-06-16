"use client";

import { Fragment } from "react";
import { MapPin, Users, ShieldCheck, Sliders } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type { Area, Cidade } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const STEPS = ["Tutorial", "Detalhes", "Requisitos", "Criar"];

const BENEFICIOS = [
  {
    icon: MapPin,
    label: "Candidatos da regiao",
    text: "Apenas perfis do Circuito das Aguas. Sem ruido nacional.",
  },
  {
    icon: Users,
    label: "Perfil padronizado",
    text: "Curriculo formatado por curadoria humana antes de chegar pra voce.",
  },
  {
    icon: ShieldCheck,
    label: "Curadoria humana",
    text: "Nossa equipe valida cadastros antes da vitrine. SLA 48h.",
  },
  {
    icon: Sliders,
    label: "Voce no controle",
    text: "Tabula filtros por experiencia, area e disponibilidade — direto.",
  },
];

/**
 * /empresa/vaga/nova — W05. Stepper horizontal + tutorial card + form.
 * Inputs underline. Cidade = select 9 Circuito (nao input livre).
 */
export default function PublicarVagaPage() {
  return (
    <AppShell audience="empresa" topbarTitle="Publicar vaga">
      <div className="mx-auto max-w-3xl">
        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((label, i) => {
            const stateClass = i === 0 ? "active" : "";
            return (
              <Fragment key={label}>
                <div className={`step ${stateClass}`}>
                  <span className="step-num-circle">{i + 1}</span>
                  <span className="step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 ? (
                  <span className="step-bar" />
                ) : null}
              </Fragment>
            );
          })}
        </div>

        {/* Tutorial card */}
        <section className="rounded-lg border border-line bg-offwhite p-12">
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Passo 1 · Tutorial
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
            Por que publicar a vaga aqui?
          </h2>
          <p className="mt-2 max-w-xl text-base text-ink-2">
            Diferente de plataformas nacionais, a Acesse trabalha so o recorte
            regional do Circuito das Aguas. Voce ganha:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {BENEFICIOS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-deep">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-2xs uppercase tracking-widest text-navy">
                      {b.label}
                    </p>
                    <p className="text-sm text-ink-2">{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section className="mt-8 rounded-lg border border-line bg-offwhite p-12">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Informacoes da vaga
          </h2>
          <p className="mt-1 text-sm text-ink-2">
            Preencha o essencial — voce ajusta requisitos no proximo passo.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <UnderlineField
              label="Titulo da oportunidade"
              id="titulo"
              placeholder="Ex: Recepcionista bilingue · resort"
            />

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <UnderlineSelect label="Area" id="area">
                <option value="">Selecione a area</option>
                {areasTyped.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.nome}
                  </option>
                ))}
              </UnderlineSelect>
              <UnderlineSelect label="Senioridade" id="senioridade">
                <option value="">Selecione</option>
                <option value="Junior">Junior</option>
                <option value="Pleno">Pleno</option>
                <option value="Senior">Senior</option>
                <option value="Especialista">Especialista</option>
              </UnderlineSelect>
              <UnderlineSelect label="Cidade" id="cidade">
                <option value="">Selecione a cidade</option>
                {cidadesTyped.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.nome}
                  </option>
                ))}
              </UnderlineSelect>
              <UnderlineSelect label="Modalidade" id="modalidade">
                <option value="">Selecione</option>
                <option value="presencial">Presencial</option>
                <option value="hibrido">Hibrido</option>
                <option value="remoto">Remoto</option>
              </UnderlineSelect>
              <UnderlineSelect label="Tipo de contrato" id="tipo">
                <option value="">Selecione</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Temporario">Temporario</option>
                <option value="Estagio">Estagio</option>
              </UnderlineSelect>
              <UnderlineField
                label="Faixa salarial"
                id="salario"
                placeholder="R$ 2.500 – R$ 3.200"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="descricao">
                Descricao
              </label>
              <textarea
                id="descricao"
                rows={3}
                placeholder="Resumo da rotina, expectativas e diferenciais"
                className="field-textarea"
              />
            </div>
          </div>
        </section>

        <div className="mt-8 flex justify-between">
          <button type="button" className="btn btn-ghost">
            ← Voltar
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Proximo passo →
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function UnderlineField({
  label,
  id,
  placeholder,
}: {
  label: string;
  id: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
      />
    </div>
  );
}

function UnderlineSelect({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
      >
        {children}
      </select>
    </div>
  );
}

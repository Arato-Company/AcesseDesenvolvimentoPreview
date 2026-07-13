"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Target,
  Eye,
  Sliders,
  Check,
  X,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import { areaNome, cidadeNome } from "@/data/lookups";
import type { Area, AreaSlug, Cidade, CidadeSlug } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const STEPS = ["Como funciona", "Detalhes", "Criterios", "Confirmar"];

const BENEFICIOS = [
  {
    icon: Search,
    label: "Busca + curadoria",
    text: "Voce define os criterios. A gente busca no pool de profissionais ja validados do Circuito.",
  },
  {
    icon: Target,
    label: "Candidatos aderentes",
    text: "Perfis que batem com sua busca aparecem rankeados. Voce ve por que combinaram.",
  },
  {
    icon: Eye,
    label: "Curadoria + inteligencia",
    text: "Cada candidato foi revisado pela equipe. Sem bots, sem cadastro fake.",
  },
  {
    icon: Sliders,
    label: "Voce decide",
    text: "Filtros por area, senioridade, cidade, disponibilidade — controle total sobre quem voce quer encontrar.",
  },
];

const BENEFICIOS_VAGA = [
  "Vale-transporte",
  "Vale-refeicao",
  "Plano de saude",
  "Home office parcial",
  "Bonus por meta",
  "Horario flexivel",
];

type FormState = {
  titulo: string;
  area: string;
  senioridade: string;
  cidade: string;
  modalidade: string;
  tipo: string;
  salario: string;
  descricao: string;
  skills: string[];
  beneficios: string[];
  perguntaTriagem: string;
};

const INITIAL: FormState = {
  titulo: "",
  area: "",
  senioridade: "",
  cidade: "",
  modalidade: "",
  tipo: "",
  salario: "",
  descricao: "",
  skills: [],
  beneficios: [],
  perguntaTriagem: "",
};

/**
 * /empresa/vaga/nova — W05. Wizard de 4 passos:
 *  1. Tutorial · 2. Detalhes · 3. Requisitos · 4. Criar (revisao)
 * Stepper reflete estado (done/active). Estado do form em memoria (mock v0).
 */
export default function PublicarVagaPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1..4
  const [form, setForm] = useState<FormState>(INITIAL);
  const [skillInput, setSkillInput] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v || form.skills.includes(v)) return;
    set("skills", [...form.skills, v]);
    setSkillInput("");
  };

  const toggleBeneficio = (b: string) =>
    set(
      "beneficios",
      form.beneficios.includes(b)
        ? form.beneficios.filter((x) => x !== b)
        : [...form.beneficios, b],
    );

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const publicar = () => {
    // Mock v0 — sem persistencia. A busca "comeca" e leva direto pra tela de
    // matching de uma vaga seed representativa (holambra/agro com aderentes).
    router.push("/empresa/vaga/vaga-003");
  };

  return (
    <AppShell audience="empresa" topbarTitle="Nova busca">
      <div className="mx-auto max-w-3xl">
        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const stateClass =
              n === step ? "active" : n < step ? "done" : "";
            return (
              <Fragment key={label}>
                <div className={`step ${stateClass}`}>
                  <span className="step-num-circle">
                    {n < step ? <Check size={14} strokeWidth={2.5} /> : n}
                  </span>
                  <span className="step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 ? <span className="step-bar" /> : null}
              </Fragment>
            );
          })}
        </div>

        {/* ---------------- STEP 1 — TUTORIAL ---------------- */}
        {step === 1 ? (
          <section className="rounded-lg border border-line bg-offwhite p-12">
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Passo 1 · Como funciona
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
              Como funciona a busca inteligente aqui?
            </h2>
            <p className="mt-2 max-w-xl text-base text-ink-2">
              Aqui e diferente. Voce nao publica e espera. Voce cria os criterios
              que procura. A gente busca quem ja esta aqui.
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
        ) : null}

        {/* ---------------- STEP 2 — DETALHES ---------------- */}
        {step === 2 ? (
          <section className="rounded-lg border border-line bg-offwhite p-12">
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Passo 2 · Detalhes
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
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
                value={form.titulo}
                onChange={(v) => set("titulo", v)}
              />

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <UnderlineSelect
                  label="Area"
                  id="area"
                  value={form.area}
                  onChange={(v) => set("area", v)}
                >
                  <option value="">Selecione a area</option>
                  {areasTyped.map((a) => (
                    <option key={a.slug} value={a.slug}>
                      {a.nome}
                    </option>
                  ))}
                </UnderlineSelect>
                <UnderlineSelect
                  label="Senioridade"
                  id="senioridade"
                  value={form.senioridade}
                  onChange={(v) => set("senioridade", v)}
                >
                  <option value="">Selecione</option>
                  <option value="Junior">Junior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Senior">Senior</option>
                  <option value="Especialista">Especialista</option>
                </UnderlineSelect>
                <UnderlineSelect
                  label="Cidade"
                  id="cidade"
                  value={form.cidade}
                  onChange={(v) => set("cidade", v)}
                >
                  <option value="">Selecione a cidade</option>
                  {cidadesTyped.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nome}
                    </option>
                  ))}
                </UnderlineSelect>
                <UnderlineSelect
                  label="Modalidade"
                  id="modalidade"
                  value={form.modalidade}
                  onChange={(v) => set("modalidade", v)}
                >
                  <option value="">Selecione</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Hibrido</option>
                  <option value="remoto">Remoto</option>
                </UnderlineSelect>
                <UnderlineSelect
                  label="Tipo de contrato"
                  id="tipo"
                  value={form.tipo}
                  onChange={(v) => set("tipo", v)}
                >
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
                  value={form.salario}
                  onChange={(v) => set("salario", v)}
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
                  value={form.descricao}
                  onChange={(e) => set("descricao", e.target.value)}
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- STEP 3 — REQUISITOS ---------------- */}
        {step === 3 ? (
          <section className="rounded-lg border border-line bg-offwhite p-12">
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Passo 3 · Requisitos
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
              Requisitos e beneficios
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              O que o candidato precisa ter e o que voce oferece.
            </p>

            {/* Skills */}
            <div className="mt-8">
              <label className="field-label" htmlFor="skill-input">
                Competencias desejadas
              </label>
              <div className="flex gap-2">
                <input
                  id="skill-input"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Ex: Excel avancado — Enter pra adicionar"
                  className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn btn-secondary btn-sm flex-shrink-0"
                >
                  <Plus size={14} strokeWidth={2} />
                  Adicionar
                </button>
              </div>
              {form.skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {form.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-full border border-gold-light bg-gold-light/20 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "skills",
                            form.skills.filter((x) => x !== s),
                          )
                        }
                        aria-label={`Remover ${s}`}
                        className="hover:text-navy"
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Beneficios */}
            <div className="mt-8">
              <span className="field-label">Beneficios oferecidos</span>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BENEFICIOS_VAGA.map((b) => (
                  <label
                    key={b}
                    className="flex cursor-pointer items-center gap-3 text-sm text-ink-2 hover:text-navy"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-line text-navy focus:ring-gold"
                      checked={form.beneficios.includes(b)}
                      onChange={() => toggleBeneficio(b)}
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            {/* Pergunta triagem */}
            <div className="mt-8">
              <label className="field-label" htmlFor="pergunta">
                Pergunta de triagem (opcional)
              </label>
              <textarea
                id="pergunta"
                rows={2}
                placeholder="Ex: Tem disponibilidade para trabalhar aos finais de semana?"
                className="field-textarea"
                value={form.perguntaTriagem}
                onChange={(e) => set("perguntaTriagem", e.target.value)}
              />
            </div>
          </section>
        ) : null}

        {/* ---------------- STEP 4 — CRIAR / REVISAO ---------------- */}
        {step === 4 ? (
          <section className="rounded-lg border border-line bg-offwhite p-12">
            <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
              Passo 4 · Confirmar
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
              Revise antes de confirmar
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              Sua busca comeca imediatamente. Vamos encontrar os melhores
              candidatos nos proximos passos.
            </p>

            <div className="mt-8 space-y-4">
              <ReviewRow
                label="Titulo"
                value={form.titulo || "—"}
              />
              <div className="grid grid-cols-2 gap-4">
                <ReviewRow
                  label="Area"
                  value={form.area ? areaNome(form.area as AreaSlug) : "—"}
                />
                <ReviewRow label="Senioridade" value={form.senioridade || "—"} />
                <ReviewRow
                  label="Cidade"
                  value={
                    form.cidade ? cidadeNome(form.cidade as CidadeSlug) : "—"
                  }
                />
                <ReviewRow label="Modalidade" value={form.modalidade || "—"} />
                <ReviewRow label="Contrato" value={form.tipo || "—"} />
                <ReviewRow label="Faixa salarial" value={form.salario || "—"} />
              </div>
              <ReviewRow
                label="Descricao"
                value={form.descricao || "—"}
              />
              <ReviewRow
                label="Competencias"
                value={
                  form.skills.length > 0 ? form.skills.join(" · ") : "—"
                }
              />
              <ReviewRow
                label="Beneficios"
                value={
                  form.beneficios.length > 0 ? form.beneficios.join(" · ") : "—"
                }
              />
            </div>
          </section>
        ) : null}

        {/* ---------------- NAV ---------------- */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={back}
            className="btn btn-ghost"
            disabled={step === 1}
            style={step === 1 ? { visibility: "hidden" } : undefined}
          >
            ← Voltar
          </button>
          {step < 4 ? (
            <button type="button" onClick={next} className="btn btn-primary btn-lg">
              Proximo passo →
            </button>
          ) : (
            <button
              type="button"
              onClick={publicar}
              className="btn btn-gold btn-lg"
            >
              Confirmar busca ✦
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line/40 pb-3">
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
        {label}
      </p>
      <p className="mt-1 text-base text-navy">{value}</p>
    </div>
  );
}

function UnderlineField({
  label,
  id,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
      />
    </div>
  );
}

function UnderlineSelect({
  label,
  id,
  value,
  onChange,
  children,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
      >
        {children}
      </select>
    </div>
  );
}

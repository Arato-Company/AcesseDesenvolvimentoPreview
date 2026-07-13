"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Plus, X, Check } from "lucide-react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { setStage } from "@/lib/onboarding";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type { Area, Cidade } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const STEPS = ["Dados", "Experiência", "Sobre", "Aceite"];

const MODALIDADES = ["Presencial", "Hibrido", "Remoto"];
const REGIMES = ["CLT", "PJ", "Temporario", "Estagio"];
const SENIORIDADES = ["Junior", "Pleno", "Senior", "Especialista"];
const DISPONIBILIDADES = ["Imediata", "15 dias", "30 dias", "A combinar"];

/**
 * /candidato/cadastro — perfil completo (onboarding). Base M02 Stitch +
 * campos do perfil (W04/perfil). Sem CPF antecipado (LGPD).
 * Form em secoes numeradas, responsivo (desktop centrado + grids 2-col).
 */
export default function CandidatoCadastroPage() {
  const router = useRouter();

  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  const [anos, setAnos] = useState(5);
  const [modalidade, setModalidade] = useState("Presencial");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [step, setStep] = useState(1); // 1..4

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  // Perfil preenchido (ou pulado) -> onboarded. Entra em modo preview ate pagar.
  const entrar = () => {
    setStage("candidato", "onboarded");
    router.push("/candidato/dashboard");
  };

  const toggleArea = (a: string) =>
    setAreasSelecionadas((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v || skills.includes(v)) return;
    setSkills((s) => [...s, v]);
    setSkillInput("");
  };

  return (
    <CandidatoLayout
      title="Cadastro"
      hideBottomNav
      backHref="/candidato/dashboard"
      userName="Candidato"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length) next();
          else entrar();
        }}
        className="mx-auto flex max-w-3xl flex-col gap-6 pb-16 md:pt-4"
      >
        <header className="mb-2">
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Primeiro acesso
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
            Monte seu perfil profissional.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-2">
            Quanto mais completo, mais fácil as empresas do Circuito te acharem.
            Nada disso é público antes da curadoria aprovar.
          </p>
        </header>

        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((label, i) => {
            const nStep = i + 1;
            const stateClass =
              nStep === step ? "active" : nStep < step ? "done" : "";
            return (
              <Fragment key={label}>
                <div className={`step ${stateClass}`}>
                  <span className="step-num-circle">
                    {nStep < step ? <Check size={14} strokeWidth={2.5} /> : nStep}
                  </span>
                  <span className="step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 ? <span className="step-bar" /> : null}
              </Fragment>
            );
          })}
        </div>

        {/* Secao 1 — Dados pessoais */}
        {step === 1 ? (
        <Section n={1} titulo="Dados pessoais">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <Field label="Nome completo" id="nome" placeholder="Seu nome" colSpan={2} />
            <Field label="E-mail" id="email" type="email" placeholder="voce@email.com" />
            <Field label="WhatsApp" id="wpp" placeholder="(19) 9 9999-9999" />
            <SelectField label="Cidade" id="cidade">
              <option value="">Selecione</option>
              {cidadesTyped.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nome}
                </option>
              ))}
            </SelectField>
            <SelectField label="Disponibilidade" id="disponibilidade">
              {DISPONIBILIDADES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </SelectField>
          </div>
          <p className="mt-4 font-mono text-2xs uppercase tracking-widest text-ink-3">
            Não pedimos CPF neste passo. Seus dados ficam protegidos (LGPD).
          </p>
        </Section>
        ) : null}

        {/* Secao 2 — Experiencia */}
        {step === 2 ? (
        <Section n={2} titulo="Experiência profissional">
          <p className="field-label">Áreas de atuação</p>
          <div className="mb-6 mt-2 flex flex-wrap gap-2">
            {areasTyped.map((a) => {
              const selected = areasSelecionadas.includes(a.slug);
              return (
                <button
                  key={a.slug}
                  type="button"
                  onClick={() => toggleArea(a.slug)}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    selected
                      ? "border-navy bg-navy text-offwhite"
                      : "border-line bg-paper text-ink-2 hover:border-gold"
                  }`}
                >
                  {a.nome}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <Field label="Cargo atual/último" id="cargo" placeholder="Ex: Recepcionista bilíngue" />
            <Field label="Empresa atual/última" id="empresaAtual" placeholder="Onde trabalha hoje" />
            <SelectField label="Senioridade" id="senioridade">
              <option value="">Selecione</option>
              {SENIORIDADES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
            <SelectField label="Regime preferido" id="regime">
              <option value="">Selecione</option>
              {REGIMES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </SelectField>
            <Field label="Pretensão salarial (opcional)" id="pretensao" placeholder="R$ 3.000 – R$ 4.000" />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="field-label !mb-0">Anos de experiência</span>
              <span className="font-display text-lg font-semibold text-navy">
                {anos}
                {anos === 30 ? "+" : ""}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={anos}
              onChange={(e) => setAnos(Number(e.target.value))}
              className="w-full accent-navy"
            />
            <div className="mt-1 flex justify-between font-mono text-2xs uppercase tracking-widest text-ink-3">
              <span>0</span>
              <span>30+ anos</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="field-label">Modalidade preferida</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {MODALIDADES.map((m) => {
                const selected = modalidade === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModalidade(m)}
                    className={`rounded-lg border px-3 py-3 text-center text-sm transition ${
                      selected
                        ? "border-navy bg-navy-soft text-offwhite"
                        : "border-line bg-paper text-ink-2 hover:border-gold"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>
        ) : null}

        {/* Secao 3 — Sobre voce */}
        {step === 3 ? (
        <Section n={3} titulo="Sobre você">
          <div>
            <label className="field-label" htmlFor="resumo">
              Resumo profissional
            </label>
            <textarea
              id="resumo"
              rows={4}
              placeholder="Conte em poucas linhas sua trajetória, seus pontos fortes e o que procura."
              className="field-textarea"
            />
          </div>

          <div className="mt-6">
            <label className="field-label" htmlFor="skill-input">
              Habilidades
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
                placeholder="Ex: Excel avançado — Enter pra adicionar"
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
            {skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-full border border-gold-light bg-gold-light/20 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-gold-deep"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => setSkills((v) => v.filter((x) => x !== s))}
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

          <div className="mt-6">
            <span className="field-label">Foto de perfil (opcional)</span>
            <button
              type="button"
              className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-line bg-paper p-8 text-center transition hover:border-gold"
            >
              <UploadCloud size={28} strokeWidth={1.4} className="text-ink-3" />
              <span className="font-mono text-2xs uppercase tracking-widest text-ink-2">
                Anexar foto (JPG ou PNG)
              </span>
              <span className="text-xs text-ink-3">
                Perfis com foto são vistos até 3x mais
              </span>
            </button>
          </div>
        </Section>
        ) : null}

        {/* Secao 4 — Aceite */}
        {step === 4 ? (
        <Section n={4} titulo="Aceite legal">
          <label className="flex items-start gap-3 text-sm text-ink-2">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-line text-navy focus:ring-gold"
            />
            <span>
              Autorizo a curadoria da Acesse a revisar meu perfil e apresentá-lo
              a empresas do Circuito das Águas.
            </span>
          </label>
          <label className="mt-3 flex items-start gap-3 text-sm text-ink-2">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-line text-navy focus:ring-gold"
            />
            <span>
              Li e aceito os Termos de Uso e a Política de Privacidade (LGPD).
            </span>
          </label>
        </Section>
        ) : null}

        {/* Nav wizard */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={step === 1 ? entrar : back}
            className="btn btn-ghost"
          >
            {step === 1 ? "Pular por agora" : "← Voltar"}
          </button>
          {step < STEPS.length ? (
            <button type="submit" className="btn btn-primary btn-lg">
              Próximo passo →
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-lg">
              Concluir cadastro →
            </button>
          )}
        </div>
      </form>
    </CandidatoLayout>
  );
}

function Section({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-line bg-offwhite p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-offwhite">
          {n}
        </span>
        <h2 className="font-display text-xl font-semibold text-navy">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  colSpan,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  colSpan?: 2;
}) {
  return (
    <div className={colSpan === 2 ? "md:col-span-2" : undefined}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
      />
    </div>
  );
}

function SelectField({
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

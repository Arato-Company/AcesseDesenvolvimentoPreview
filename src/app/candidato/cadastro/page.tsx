"use client";

import Link from "next/link";
import { useState } from "react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { FormField } from "@/components/FormField";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type { Area, AreaSlug, Cidade } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

const TOTAL_STEPS = 3;

/**
 * /candidato/cadastro — fonte: Mobile/02 - Onboarding Cadastro.html.
 * Onboarding em 3 passos (basico, experiencia, preferencias).
 * Sem bottom nav (linear). Mobile-first. Pula CPF nesse v0 (LGPD).
 */
export default function CandidatoCadastroPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cidade: "",
    area: "" as AreaSlug | "",
    cargo: "",
    anosExperiencia: 5,
    modalidade: "hibrido" as "remoto" | "hibrido" | "presencial",
    aceitaContato: true,
  });

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const progress = Math.round(((step + 1) / (TOTAL_STEPS + 1)) * 100);

  return (
    <CandidatoLayout
      title="Cadastro"
      hideBottomNav
      backHref={step === 0 ? "/login" : undefined}
      userName={form.nome || "Novo perfil"}
    >
      {/* Stepper mobile (progress bar) */}
      <div className="mb-10">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
            Passo {Math.min(step + 1, TOTAL_STEPS)} de {TOTAL_STEPS}
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-line">
          <div
            className="h-full bg-gradient-to-r from-gold-deep to-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-gold-deep italic">
          Falta pouco — seu perfil ja vai entrar na vitrine.
        </p>
      </div>

      {step === 0 ? (
        <section className="flex flex-col gap-6">
          <h1 className="display-md">Vamos comecar.</h1>
          <p className="text-sm text-ink-2">
            Sem login social, sem CPF agora. Voce decide o que mostrar pra
            empresa depois.
          </p>
          <FormField
            label="Como voce gostaria de ser chamado"
            value={form.nome}
            onChange={(e) =>
              setForm((f) => ({ ...f, nome: e.target.value }))
            }
            placeholder="Ex: Joao Pedro"
          />
          <FormField
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="voce@email.com"
            autoComplete="email"
          />
          <FormField
            as="select"
            label="Cidade do Circuito"
            value={form.cidade}
            onChange={(e) =>
              setForm((f) => ({ ...f, cidade: e.target.value }))
            }
            help="9 cidades do Circuito das Aguas paulista."
          >
            <option value="">Selecione</option>
            {cidadesTyped.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nome}
              </option>
            ))}
          </FormField>
        </section>
      ) : step === 1 ? (
        <section className="flex flex-col gap-8">
          <h1 className="display-md">Sua experiencia.</h1>
          <div>
            <p className="filter-label">Area de atuacao</p>
            <div className="chip-group">
              {areasTyped.map((a) => (
                <button
                  key={a.slug}
                  type="button"
                  aria-pressed={form.area === a.slug}
                  className={`chip ${form.area === a.slug ? "active" : ""}`}
                  onClick={() =>
                    setForm((f) => ({ ...f, area: a.slug as AreaSlug }))
                  }
                >
                  {a.nome}
                </button>
              ))}
            </div>
          </div>
          <FormField
            label="Cargo atual ou ultimo"
            value={form.cargo}
            onChange={(e) =>
              setForm((f) => ({ ...f, cargo: e.target.value }))
            }
            placeholder="Ex: Eletricista industrial"
          />
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="filter-label mb-0">Anos de experiencia</p>
              <span className="font-display text-xl font-semibold text-navy">
                {form.anosExperiencia}{" "}
                <span className="text-sm text-ink-3">
                  ano{form.anosExperiencia === 1 ? "" : "s"}
                </span>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={form.anosExperiencia}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  anosExperiencia: Number(e.target.value),
                }))
              }
              className="w-full accent-navy"
            />
            <div className="mt-2 flex justify-between font-mono text-2xs uppercase tracking-widest text-ink-3">
              <span>0</span>
              <span>30+ anos</span>
            </div>
          </div>
        </section>
      ) : step === 2 ? (
        <section className="flex flex-col gap-8">
          <h1 className="display-md">Preferencias.</h1>
          <div>
            <p className="filter-label">Modalidade preferida</p>
            <div className="flex flex-col gap-3">
              {(
                [
                  { id: "remoto", label: "Remoto" },
                  { id: "hibrido", label: "Hibrido" },
                  { id: "presencial", label: "Presencial" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                    form.modalidade === opt.id
                      ? "border-navy bg-paper shadow-2"
                      : "border-line bg-offwhite hover:border-gold"
                  }`}
                >
                  <span className="text-navy">{opt.label}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${form.modalidade === opt.id ? "border-navy" : "border-line"}`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-transform ${form.modalidade === opt.id ? "scale-100 bg-navy" : "scale-0"}`}
                    />
                  </span>
                  <input
                    type="radio"
                    name="modalidade"
                    value={opt.id}
                    className="hidden"
                    checked={form.modalidade === opt.id}
                    onChange={() =>
                      setForm((f) => ({ ...f, modalidade: opt.id }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-offwhite p-4">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-line"
              checked={form.aceitaContato}
              onChange={(e) =>
                setForm((f) => ({ ...f, aceitaContato: e.target.checked }))
              }
            />
            <span className="text-sm text-ink-2">
              <strong className="text-navy">Aceito contato direto</strong> de
              empresas via WhatsApp ou e-mail. Voce pode revogar a qualquer
              momento — sem CPF agora, sem dado bancario.
            </span>
          </label>
        </section>
      ) : (
        <section className="flex flex-col gap-6 text-center">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-pill bg-gold/15 text-2xl text-gold-deep">
            ✦
          </span>
          <h1 className="display-md">Perfil criado.</h1>
          <p className="text-ink-2">
            Sua entrada esta na fila da curadoria. Em ate 48h, alguem da equipe
            olha — e seu perfil entra na vitrine das empresas regionais.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/candidato/dashboard"
              className="btn btn-primary btn-lg btn-block"
            >
              Abrir meu painel
            </Link>
            <Link
              href="/candidato/planos"
              className="btn btn-secondary btn-block"
            >
              Ver planos de visibilidade
            </Link>
          </div>
        </section>
      )}

      {step < TOTAL_STEPS ? (
        <div className="mt-10 flex gap-3">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={prev}>
              ← Voltar
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={next}
          >
            {step === TOTAL_STEPS - 1 ? "Concluir cadastro" : "Continuar"}
          </button>
        </div>
      ) : null}
    </CandidatoLayout>
  );
}

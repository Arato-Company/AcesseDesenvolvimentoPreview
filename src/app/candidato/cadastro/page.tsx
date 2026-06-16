"use client";

import { useState } from "react";
import { CandidatoLayout } from "@/components/CandidatoLayout";
import { ProgressStepper } from "@/components/ProgressStepper";

const AREAS = ["Tecnologia", "Manutencao", "Design", "Logistica", "Vendas"];
const MODALIDADES = ["CLT", "PJ", "Hibrido"];

/**
 * /candidato/cadastro — M02. Onboarding mobile passo 2 de 3.
 * ProgressStepper + chips area + inputs underline + range anos + RadioCards modalidade.
 */
export default function CandidatoCadastroPage() {
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([
    "Tecnologia",
  ]);
  const [anos, setAnos] = useState(8);
  const [modalidade, setModalidade] = useState("CLT");

  const toggleArea = (a: string) =>
    setAreasSelecionadas((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  return (
    <CandidatoLayout
      title="Cadastro"
      hideBottomNav
      backHref="/candidato/dashboard"
      userName="Candidato"
    >
      <div className="flex flex-col gap-8 pb-32">
        <ProgressStepper
          passo={2}
          total={3}
          mensagem="Falta pouco — curriculo quase pronto."
        />

        <header>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Sua experiencia
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
            Conte um pouco mais
          </h1>
        </header>

        {/* Area de atuacao - chips */}
        <section>
          <p className="field-label">Area de atuacao</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AREAS.map((a) => {
              const selected = areasSelecionadas.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleArea(a)}
                  className={`rounded-lg border px-5 py-2.5 text-sm transition ${
                    selected
                      ? "border-navy bg-navy text-offwhite"
                      : "border-line bg-paper text-ink-2 hover:border-gold"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </section>

        {/* Cargo + Empresa - underline */}
        <section className="flex flex-col gap-5">
          <div>
            <label className="field-label" htmlFor="cargo">
              Cargo atual
            </label>
            <input
              id="cargo"
              placeholder="Ex: Recepcionista bilingue"
              className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="empresa">
              Empresa atual
            </label>
            <input
              id="empresa"
              placeholder="Onde voce trabalha hoje"
              className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none transition focus:border-gold"
            />
          </div>
        </section>

        {/* Range anos */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <span className="field-label !mb-0">Anos de experiencia</span>
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
        </section>

        {/* Modalidade radios */}
        <section>
          <p className="field-label">Modalidade de contrato</p>
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
        </section>
      </div>

      {/* Footer fixo */}
      <div className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-[420px] -translate-x-1/2 gap-3 border-t border-line bg-offwhite/95 px-4 py-5 backdrop-blur">
        <button type="button" className="btn btn-ghost flex-1">
          Pular
        </button>
        <button type="submit" className="btn btn-primary flex-[2]">
          Continuar
        </button>
      </div>
    </CandidatoLayout>
  );
}

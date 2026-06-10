"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FormField } from "@/components/FormField";
import { allCidades, allAreas } from "@/data/lookups";

type Step = 1 | 2 | 3;

/**
 * /empresa/cadastro — fonte: Web/02a - Cadastro Empresa.html.
 * Stepper 3 passos: empresa -> contato -> confirmacao.
 * v0: tudo client-side, sem persistencia (LGPD: sem backend ainda).
 */
export default function EmpresaCadastroPage() {
  const [step, setStep] = useState<Step>(1);
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [area, setArea] = useState("");
  const [cidade, setCidade] = useState("");
  const [porte, setPorte] = useState("Pequena");
  const [contatoNome, setContatoNome] = useState("");
  const [contatoEmail, setContatoEmail] = useState("");
  const [contatoWhatsapp, setContatoWhatsapp] = useState("");
  const [aceiteLGPD, setAceiteLGPD] = useState(false);

  const podeAvancar1 =
    razaoSocial.trim() && cnpj.trim() && area && cidade && porte;
  const podeAvancar2 =
    contatoNome.trim() &&
    contatoEmail.trim() &&
    contatoWhatsapp.trim() &&
    aceiteLGPD;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1 && podeAvancar1) setStep(2);
    else if (step === 2 && podeAvancar2) setStep(3);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-paper py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="caps mb-3 text-gold-deep">Cadastro empresa</p>
            <h1 className="display-lg mb-3">
              Acesse a vitrine do Circuito das Aguas.
            </h1>
            <p className="lead mb-10 text-ink-2">
              Vitrine padronizada, triagem humana e contato direto. Sem chat
              interno. Resposta da curadoria em ate 48h uteis.
            </p>

            <ol className="stepper mb-10" aria-label="Etapas do cadastro">
              {(
                [
                  { n: 1 as Step, label: "Empresa" },
                  { n: 2 as Step, label: "Contato" },
                  { n: 3 as Step, label: "Pronto" },
                ] satisfies Array<{ n: Step; label: string }>
              ).map(({ n, label }) => (
                <li
                  key={n}
                  className={`stepper-item${
                    step === n ? " active" : step > n ? " done" : ""
                  }`}
                >
                  <span className="stepper-circle">{n}</span>
                  <span className="stepper-label">{label}</span>
                </li>
              ))}
            </ol>

            {step === 3 ? (
              <div className="rounded-xl border border-line bg-offwhite p-10 text-center shadow-2">
                <p className="caps mb-3 text-gold-deep">CURADORIA · pendente</p>
                <h2 className="display-md mb-4">Recebemos seus dados.</h2>
                <p className="mb-8 text-ink-2">
                  Em ate 48h uteis, nossa curadoria revisa o cadastro de{" "}
                  <strong>{razaoSocial || "sua empresa"}</strong> e libera o
                  acesso a vitrine completa. Voce vai receber confirmacao em{" "}
                  <strong>{contatoEmail}</strong>.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/" className="btn btn-secondary">
                    Voltar pra home
                  </Link>
                  <Link href="/empresa/planos" className="btn btn-primary">
                    Ver planos
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-xl border border-line bg-offwhite p-8 shadow-2"
              >
                {step === 1 ? (
                  <div className="grid gap-6">
                    <FormField
                      label="Razao social"
                      placeholder="Termas Serra Verde Hotelaria Ltda"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      required
                    />
                    <FormField
                      label="CNPJ"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      required
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        as="select"
                        label="Area de atuacao"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        {allAreas.map((a) => (
                          <option key={a.slug} value={a.slug}>
                            {a.nome}
                          </option>
                        ))}
                      </FormField>
                      <FormField
                        as="select"
                        label="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        {allCidades.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.nome} · SP
                          </option>
                        ))}
                      </FormField>
                    </div>
                    <FormField
                      as="select"
                      label="Porte"
                      value={porte}
                      onChange={(e) => setPorte(e.target.value)}
                      help="Pequena: ate 19 funcionarios · Media: 20-99 · Grande: 100+"
                    >
                      <option value="Pequena">Pequena</option>
                      <option value="Media">Media</option>
                      <option value="Grande">Grande</option>
                    </FormField>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    <FormField
                      label="Nome do responsavel"
                      placeholder="Maria Souza"
                      value={contatoNome}
                      onChange={(e) => setContatoNome(e.target.value)}
                      required
                    />
                    <FormField
                      label="Email corporativo"
                      type="email"
                      placeholder="rh@suaempresa.com.br"
                      value={contatoEmail}
                      onChange={(e) => setContatoEmail(e.target.value)}
                      required
                    />
                    <FormField
                      label="WhatsApp"
                      placeholder="(19) 9 9999-9999"
                      value={contatoWhatsapp}
                      onChange={(e) => setContatoWhatsapp(e.target.value)}
                      help="Usamos so pra validacao de curadoria. Sem chat interno na plataforma."
                      required
                    />
                    <label className="flex items-start gap-3 text-sm text-ink-2">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-line"
                        checked={aceiteLGPD}
                        onChange={(e) => setAceiteLGPD(e.target.checked)}
                        required
                      />
                      <span>
                        Concordo com a{" "}
                        <Link href="/" className="text-gold-deep underline">
                          politica de privacidade
                        </Link>{" "}
                        e autorizo o uso destes dados pela curadoria Acesse para
                        validacao do cadastro.
                      </span>
                    </label>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
                  {step === 1 ? (
                    <Link
                      href="/"
                      className="font-mono text-2xs uppercase tracking-widest text-ink-2 hover:text-navy"
                    >
                      ← Cancelar
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-mono text-2xs uppercase tracking-widest text-ink-2 hover:text-navy"
                    >
                      ← Voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      (step === 1 && !podeAvancar1) ||
                      (step === 2 && !podeAvancar2)
                    }
                  >
                    {step === 1 ? "Avancar" : "Enviar pra curadoria"}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-6 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
              CURADORIA · cadastro revisado por humano em ate 48h
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

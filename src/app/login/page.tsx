"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";
import { FormField } from "@/components/FormField";

/**
 * /login — fonte: Web/01 - Entrada Login Dual.html (+ Mobile/01 referencia).
 * Reinterpretado: ao inves do split-screen 50/50 do Stitch, usamos tabs
 * candidato/empresa (mais responsivo + cabe melhor mobile).
 * Form e mock — submit so muda o feedback visual.
 */
function LoginForm({ tipo }: { tipo: "candidato" | "empresa" }) {
  const [submitted, setSubmitted] = useState(false);

  const isEmpresa = tipo === "empresa";
  const cadastroHref = isEmpresa ? "/empresa/cadastro" : "/candidato/cadastro";
  const dashboardHref = isEmpresa ? "/empresa/dashboard" : "/candidato/dashboard";

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <FormField
        label={isEmpresa ? "E-mail corporativo" : "E-mail"}
        type="email"
        placeholder={isEmpresa ? "rh@suaempresa.com.br" : "voce@email.com"}
        required
        autoComplete="email"
      />
      <FormField
        label="Senha"
        type="password"
        placeholder="********"
        required
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-line"
            defaultChecked
          />
          Manter conectado
        </label>
        <a
          href="#"
          className="font-medium text-navy underline-offset-4 hover:underline"
        >
          Esqueci a senha
        </a>
      </div>

      <button type="submit" className="btn btn-primary btn-lg btn-block">
        {isEmpresa ? "Entrar como empresa" : "Entrar"}
      </button>

      <p className="text-center text-sm text-ink-2">
        Ainda nao tem conta?{" "}
        <Link
          href={cadastroHref}
          className="font-medium text-navy underline-offset-4 hover:underline"
        >
          {isEmpresa ? "Cadastrar empresa" : "Cadastrar perfil"} →
        </Link>
      </p>

      {submitted ? (
        <div className="rounded-lg border border-success/40 bg-success/10 p-4 text-center text-sm text-navy">
          Mock — sem auth real. Va pra{" "}
          <Link href={dashboardHref} className="font-medium underline">
            {dashboardHref}
          </Link>
        </div>
      ) : null}
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />

      <main
        className="bg-paper py-20"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <div className="container-ds max-w-2xl">
          <div className="rounded-2xl border border-line bg-offwhite p-10 shadow-2 md:p-12">
            <p className="eyebrow mb-3 text-center">Tem gente olhando.</p>
            <h1 className="display-lg mb-2 text-center">Entrar</h1>
            <p className="mb-10 text-center text-ink-2">
              Escolha o seu lado da plataforma.
            </p>

            <div className="flex flex-col items-center">
              <Tabs
                ariaLabel="Tipo de conta"
                tabs={[
                  {
                    id: "candidato",
                    label: "Sou candidato",
                    content: <LoginForm tipo="candidato" />,
                  },
                  {
                    id: "empresa",
                    label: "Sou empresa",
                    content: <LoginForm tipo="empresa" />,
                  },
                ]}
              />
            </div>
          </div>

          <p className="mt-8 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
            Ecossistema regional · Vitrine · Vagas · Curadoria
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

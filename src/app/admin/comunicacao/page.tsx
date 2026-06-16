"use client";

import { useState } from "react";
import { Send, Users, Building2, Globe, Search } from "lucide-react";
import { AppAdminShell } from "@/components/AppAdminShell";
import { RadioCard } from "@/components/RadioCard";
import { RecipientPill } from "@/components/RecipientPill";

type Audience = "todos" | "empresas" | "candidatos";

const SUGGESTIONS = [
  "Termas Serra Verde",
  "Cooperativa Holambra Flores",
  "Hospital Sao Lucas Amparo",
  "Joao Pedro Silva",
  "Mariana Costa",
  "Ana Beatriz Souza",
];

/**
 * /admin/comunicacao — W16. Coluna unica + modal busca "+ ADICIONAR".
 * CTA "Enviar" no footer do AppAdminSidebar.
 */
export default function AdminComunicacaoPage() {
  const [audience, setAudience] = useState<Audience>("todos");
  const [recipients, setRecipients] = useState<string[]>([
    "Termas Serra Verde",
    "Joao Pedro Silva",
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const adicionar = (label: string) => {
    if (!recipients.includes(label)) setRecipients((r) => [...r, label]);
    setModalOpen(false);
    setQuery("");
  };

  const remover = (label: string) =>
    setRecipients((r) => r.filter((x) => x !== label));

  const filtered = SUGGESTIONS.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) && !recipients.includes(s),
  );

  return (
    <AppAdminShell
      topbarTitle="Comunicacao"
      sidebarFooter={
        <button className="btn btn-gold btn-block">
          <Send size={14} strokeWidth={1.7} />
          Enviar e-mail
        </button>
      }
    >
      <div className="mx-auto max-w-3xl px-2 py-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
          Comunicacao
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-navy">
          Enviar e-mail
        </h1>
        <p className="mt-2 text-base text-ink-2">
          Componha uma mensagem para a base. Marca neutra Acesse, sem
          identificacao pessoal.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Titulo do e-mail"
            className="w-full border-b border-line bg-transparent py-3 font-display text-2xl font-semibold text-navy placeholder:text-ink-3 outline-none transition focus:border-gold"
          />
          <textarea
            placeholder="Escreva a mensagem..."
            rows={10}
            className="field-textarea"
          />
        </div>

        <hr className="my-10 border-line" />

        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Quem recebe
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-navy">
            Audiencia
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <RadioCard
              name="audience"
              value="todos"
              label="Todos"
              description="Toda a base ativa Acesse"
              icon={Globe}
              checked={audience === "todos"}
              onChange={(v) => setAudience(v as Audience)}
            />
            <RadioCard
              name="audience"
              value="empresas"
              label="Empresas"
              description="67 contas parceiras"
              icon={Building2}
              checked={audience === "empresas"}
              onChange={(v) => setAudience(v as Audience)}
            />
            <RadioCard
              name="audience"
              value="candidatos"
              label="Candidatos"
              description="432 perfis ativos"
              icon={Users}
              checked={audience === "candidatos"}
              onChange={(v) => setAudience(v as Audience)}
            />
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-line bg-offwhite p-6">
          <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-2">
              Destinatarios · {recipients.length}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                className="font-mono text-2xs uppercase tracking-widest text-navy transition hover:text-gold-deep"
              >
                Selecionar todos
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="font-mono text-2xs uppercase tracking-widest text-gold-deep transition hover:text-navy"
              >
                + Adicionar
              </button>
            </div>
          </header>

          <div className="relative">
            <Search
              size={14}
              strokeWidth={1.7}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
            />
            <input
              type="search"
              placeholder="Buscar nos destinatarios"
              className="w-full rounded-md border border-line bg-paper py-2 pl-9 pr-3 font-mono text-2xs uppercase tracking-widest text-ink-2 outline-none focus:border-gold"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recipients.length === 0 ? (
              <p className="text-sm text-ink-3">
                Nenhum destinatario adicionado.
              </p>
            ) : (
              recipients.map((r) => (
                <RecipientPill
                  key={r}
                  label={r}
                  onRemove={() => remover(r)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-line bg-offwhite p-6 shadow-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 font-display text-xl font-semibold text-navy">
              Adicionar destinatario
            </h3>
            <div className="relative">
              <Search
                size={14}
                strokeWidth={1.7}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar candidato ou empresa..."
                className="w-full rounded-md border border-line bg-offwhite py-2 pl-9 pr-3 text-sm outline-none focus:border-gold"
              />
            </div>
            <ul className="mt-4 max-h-64 divide-y divide-line overflow-y-auto">
              {filtered.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => adicionar(s)}
                    className="w-full px-2 py-3 text-left text-sm text-navy transition hover:bg-paper"
                  >
                    {s}
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="py-3 text-sm text-ink-3">
                  Nenhum resultado encontrado.
                </li>
              ) : null}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost btn-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppAdminShell>
  );
}

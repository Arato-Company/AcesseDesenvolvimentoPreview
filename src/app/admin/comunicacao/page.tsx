"use client";

import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { FormField } from "@/components/FormField";
import { allAreas, allCidades } from "@/data/lookups";

type Canal = "email" | "whatsapp";
type Publico = "candidatos" | "empresas" | "todos";

type Envio = {
  id: string;
  data: string;
  canal: Canal;
  publico: Publico;
  area: string;
  cidade: string;
  assunto: string;
  alcance: number;
};

const HISTORICO: Envio[] = [
  {
    id: "env-001",
    data: "2026-06-06",
    canal: "email",
    publico: "candidatos",
    area: "Turismo",
    cidade: "Serra Negra",
    assunto: "120 vagas em hoteis da regiao",
    alcance: 87,
  },
  {
    id: "env-002",
    data: "2026-06-03",
    canal: "whatsapp",
    publico: "empresas",
    area: "Todas",
    cidade: "Todas",
    assunto: "Politica de reembolso atualizada",
    alcance: 5,
  },
  {
    id: "env-003",
    data: "2026-05-28",
    canal: "email",
    publico: "todos",
    area: "Todas",
    cidade: "Amparo",
    assunto: "Hospital Sao Lucas abriu novo edital",
    alcance: 142,
  },
];

/**
 * /admin/comunicacao — fonte: Web/16 - Admin Comunicacao.html.
 * Composer + historico de envios. v0: mock, sem disparo real.
 */
export default function AdminComunicacaoPage() {
  const [canal, setCanal] = useState<Canal>("email");
  const [publico, setPublico] = useState<Publico>("candidatos");
  const [area, setArea] = useState("");
  const [cidade, setCidade] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <AppShell
      audience="admin"
      topbarTitle="Comunicacao"
      topbarUserLabel="AD"
    >
      <header className="mb-10">
        <p className="caps mb-2">Disparo de mensagens</p>
        <h1 className="display-lg">Composer da curadoria.</h1>
        <p className="mt-2 text-sm text-ink-2">
          Email transacional ou WhatsApp Business pra candidatos e empresas.
          Sem chat interno. Mensagens passam por revisao antes do envio.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-line bg-offwhite p-6 shadow-1"
        >
          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                as="select"
                label="Canal"
                value={canal}
                onChange={(e) => setCanal(e.target.value as Canal)}
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp Business</option>
              </FormField>
              <FormField
                as="select"
                label="Publico"
                value={publico}
                onChange={(e) => setPublico(e.target.value as Publico)}
              >
                <option value="candidatos">Candidatos</option>
                <option value="empresas">Empresas</option>
                <option value="todos">Todos</option>
              </FormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                as="select"
                label="Filtro por area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Todas areas</option>
                {allAreas.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.nome}
                  </option>
                ))}
              </FormField>
              <FormField
                as="select"
                label="Filtro por cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              >
                <option value="">Todas cidades</option>
                {allCidades.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.nome}
                  </option>
                ))}
              </FormField>
            </div>

            <FormField
              label="Assunto"
              placeholder="Novas vagas em Serra Negra"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              required
            />

            <FormField
              as="textarea"
              label="Mensagem"
              rows={6}
              placeholder="Ola! Selecionamos 12 vagas que combinam com seu perfil em Serra Negra..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              help="Use {{nome}} e {{cidade}} pra personalizar."
              required
            />

            {enviado ? (
              <div className="rounded-md border border-gold/40 bg-gold/10 p-4 text-sm text-gold-deep">
                ✦ Mensagem enviada pra fila de aprovacao. Curadoria revisa em
                ate 2h antes do disparo.
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-3">
                CURADORIA · revisao manual antes do disparo
              </p>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!assunto.trim() || !mensagem.trim()}
              >
                Enviar pra fila
              </button>
            </div>
          </div>
        </form>

        <section className="rounded-xl border border-line bg-offwhite p-6 shadow-1">
          <h2 className="mb-5 font-display text-lg font-semibold text-navy">
            Historico recente
          </h2>
          <ul className="divide-y divide-line">
            {HISTORICO.map((h) => (
              <li key={h.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-navy">{h.assunto}</p>
                  <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-2xs uppercase tracking-widest text-gold-deep">
                    {h.canal}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-2">
                  {h.publico} · {h.area} · {h.cidade}
                </p>
                <p className="mt-2 font-mono text-2xs uppercase tracking-widest text-ink-3">
                  {h.data} · {h.alcance} destinatarios
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

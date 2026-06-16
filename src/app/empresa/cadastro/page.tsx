import { UploadCloud } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import cidades from "@/data/cidades.json";
import areas from "@/data/areas.json";
import type { Area, Cidade } from "@/types";

const cidadesTyped = cidades as Cidade[];
const areasTyped = areas as Area[];

/**
 * /empresa/cadastro — W02a. Primeiro acesso empresa.
 * Inputs underline (border-b only), 3 secoes numeradas, CTA "CONCLUIR CADASTRO".
 */
export default function EmpresaCadastroPage() {
  return (
    <AppShell
      audience="empresa"
      topbarTitle="Cadastro"
      topbarUserLabel="EM"
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="font-mono text-2xs uppercase tracking-widest text-gold-deep">
            Primeiro acesso
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
            Vamos completar o cadastro da sua empresa.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-2">
            Esses dados garantem que sua conta apareca certa pra candidatos do
            Circuito. Ninguem ve isso antes da curadoria aprovar.
          </p>
        </header>

        <form className="flex flex-col gap-6">
          {/* Secao 1 */}
          <section className="rounded-lg border border-line bg-offwhite p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-offwhite">
                1
              </span>
              <h2 className="font-display text-xl font-semibold text-navy">
                Dados da empresa
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <Field label="CNPJ" id="cnpj" placeholder="00.000.000/0000-00" />
              <Field label="Razao social" id="razao" placeholder="Razao social conforme RFB" />
              <Field
                label="Nome fantasia"
                id="fantasia"
                placeholder="Nome conhecido publicamente"
                colSpan={2}
              />
              <SelectField label="Cidade" id="cidade">
                <option value="">Selecione</option>
                {cidadesTyped.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.nome}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Setor" id="setor">
                <option value="">Selecione</option>
                {areasTyped.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.nome}
                  </option>
                ))}
              </SelectField>
              <Field
                label="WhatsApp"
                id="wpp"
                placeholder="(19) 9 9999-9999"
              />
              <Field
                label="E-mail cobranca"
                id="email"
                placeholder="financeiro@empresa.com.br"
                type="email"
              />

              <div className="md:col-span-2">
                <span className="field-label">Logotipo</span>
                <button
                  type="button"
                  className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-line bg-paper p-8 text-center transition hover:border-gold"
                >
                  <UploadCloud size={28} strokeWidth={1.4} className="text-ink-3" />
                  <span className="font-mono text-2xs uppercase tracking-widest text-ink-2">
                    Anexar logotipo (PNG ou SVG)
                  </span>
                  <span className="text-xs text-ink-3">
                    Recomendado quadrado, ate 2MB
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Secao 2 */}
          <section className="rounded-lg border border-line bg-offwhite p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-offwhite">
                2
              </span>
              <h2 className="font-display text-xl font-semibold text-navy">
                Como podemos contatar?
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Checkbox
                label="Aceito contato via WhatsApp de candidatos curados"
                defaultChecked
              />
              <Checkbox label="Aceito contato de outras empresas parceiras" />
              <Checkbox
                label="Aceito comunicacoes operacionais da Acesse (curadoria, fatura, manutencao)"
                defaultChecked
              />
            </div>
          </section>

          {/* Secao 3 */}
          <section className="rounded-lg border border-line bg-offwhite p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-offwhite">
                3
              </span>
              <h2 className="font-display text-xl font-semibold text-navy">
                Aceite legal
              </h2>
            </div>
            <Checkbox
              label="Li e aceito os Termos de Uso e a Politica de Privacidade da Acesse Desenvolvimento."
            />
          </section>

          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-ghost">
              Sair
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              Concluir cadastro →
            </button>
          </div>
        </form>
      </div>
    </AppShell>
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

function Checkbox({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-ink-2">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 rounded border-line text-navy focus:ring-gold"
      />
      <span>{label}</span>
    </label>
  );
}

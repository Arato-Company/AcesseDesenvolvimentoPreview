"use client";

import { useState } from "react";
import { CreditCard, QrCode, Lock } from "lucide-react";

type PaymentFormProps = {
  /** "credito" (one-shot W08) ou "assinatura" (recorrente M07). */
  mode: "credito" | "assinatura";
  /** Resumo do que sera cobrado (W08: "Pacote X · 50 creditos — R$..."; M07: total). */
  resumoLabel: string;
  resumoValor: string;
  ctaLabel: string;
};

function maskCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

/**
 * Form de pagamento compartilhado entre W08 (credito) e M07 (assinatura).
 * Tabs PIX/Cartao + campos diferenciados por modo. CPF obrigatorio com mask.
 */
export function PaymentForm({
  mode,
  resumoLabel,
  resumoValor,
  ctaLabel,
}: PaymentFormProps) {
  const [metodo, setMetodo] = useState<"cartao" | "pix">(
    mode === "assinatura" ? "pix" : "cartao",
  );
  const [cpf, setCpf] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="font-display text-xl font-semibold text-navy">
          {mode === "credito" ? "Forma de pagamento" : "Pagamento"}
        </h4>

        <div className="mt-4 flex gap-2 border-b border-line">
          <button
            type="button"
            onClick={() => setMetodo("cartao")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-2xs uppercase tracking-widest transition ${
              metodo === "cartao"
                ? "border-gold text-navy"
                : "border-transparent text-ink-3 hover:text-navy"
            }`}
          >
            <CreditCard size={14} strokeWidth={1.7} />
            Cartao
          </button>
          <button
            type="button"
            onClick={() => setMetodo("pix")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-2xs uppercase tracking-widest transition ${
              metodo === "pix"
                ? "border-gold text-navy"
                : "border-transparent text-ink-3 hover:text-navy"
            }`}
          >
            <QrCode size={14} strokeWidth={1.7} />
            Pix
          </button>
        </div>
      </div>

      {metodo === "cartao" ? (
        <div className="flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="card-number">
              Numero do cartao
            </label>
            <input
              id="card-number"
              className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="card-exp">
                Validade
              </label>
              <input
                id="card-exp"
                className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
                placeholder="MM/AA"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="card-cvc">
                CVC
              </label>
              <input
                id="card-cvc"
                className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
                placeholder="000"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-paper p-6 text-center">
          <QrCode
            size={64}
            strokeWidth={1.4}
            className="mx-auto text-navy"
          />
          <p className="mt-3 text-sm text-ink-2">
            Escaneie o QR Code no app do seu banco apos confirmar.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="pay-cpf">
            CPF
          </label>
          <input
            id="pay-cpf"
            value={cpf}
            onChange={(e) => setCpf(maskCPF(e.target.value))}
            className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
            placeholder="000.000.000-00"
            inputMode="numeric"
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="pay-email">
            E-mail
          </label>
          <input
            id="pay-email"
            type="email"
            className="w-full border-b border-line bg-transparent py-3 text-base text-ink-1 outline-none transition focus:border-gold"
            placeholder="voce@empresa.com.br"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-3">
          {resumoLabel}
        </span>
        <span className="font-display text-xl font-semibold text-navy">
          {resumoValor}
        </span>
      </div>

      <button type="button" className="btn btn-primary btn-block btn-lg">
        {ctaLabel}
      </button>

      <p className="flex items-center justify-center gap-2 text-center font-mono text-2xs uppercase tracking-widest text-ink-3">
        <Lock size={11} strokeWidth={1.7} />
        Pagamento seguro processado via Stripe
      </p>
    </div>
  );
}

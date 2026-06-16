"use client";

import type { LucideIcon } from "lucide-react";

type RadioCardProps = {
  name: string;
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  checked: boolean;
  onChange: (value: string) => void;
};

/**
 * Card clicavel wrappando `<input type="radio">`.
 * Selected state: border-navy + bg-paper.
 */
export function RadioCard({
  name,
  value,
  label,
  description,
  icon: Icon,
  checked,
  onChange,
}: RadioCardProps) {
  return (
    <label
      className={`flex cursor-pointer flex-col gap-2 rounded-xl border bg-offwhite p-5 transition ${
        checked
          ? "border-navy bg-paper shadow-2"
          : "border-line hover:border-gold-light"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="flex items-center gap-2">
        {Icon ? (
          <Icon
            size={16}
            strokeWidth={1.7}
            className={checked ? "text-navy" : "text-ink-3"}
          />
        ) : null}
        <span
          className={`font-mono text-2xs uppercase tracking-widest ${
            checked ? "text-navy" : "text-ink-2"
          }`}
        >
          {label}
        </span>
      </span>
      {description ? (
        <span className="text-sm text-ink-2">{description}</span>
      ) : null}
    </label>
  );
}

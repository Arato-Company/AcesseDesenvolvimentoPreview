"use client";

import { useState } from "react";

type ToggleSettingProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
};

/**
 * Linha label + descricao + toggle switch (usa `.toggle-switch` token CSS).
 */
export function ToggleSetting({
  label,
  description,
  defaultChecked = false,
}: ToggleSettingProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">{label}</p>
        {description ? (
          <p className="text-xs text-ink-2">{description}</p>
        ) : null}
      </div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          aria-label={label}
        />
        <span className="toggle-switch-slider" />
      </label>
    </div>
  );
}

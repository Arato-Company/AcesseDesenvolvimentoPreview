"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultId?: string;
  ariaLabel?: string;
};

/**
 * Tabs simples (single-select). Usado no /login (candidato vs empresa)
 * e potencialmente em comparativos de planos. State local — sem context.
 */
export function Tabs({ tabs, defaultId, ariaLabel }: TabsProps) {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label={ariaLabel}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`tabpanel-${t.id}`}
            className={`tabs-trigger ${active === t.id ? "active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        active === t.id ? (
          <div
            key={t.id}
            id={`tabpanel-${t.id}`}
            role="tabpanel"
            className="mt-8"
          >
            {t.content}
          </div>
        ) : null,
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type PostEditorProps = {
  initialHtml: string;
};

/**
 * Editor mockado pra W13. Usa contenteditable simples sem libs.
 * Suporta blockquote stylizado via CSS inline injetado no contenteditable HTML.
 */
export function PostEditor({ initialHtml }: PostEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && !ref.current.innerHTML) {
      ref.current.innerHTML = initialHtml;
    }
  }, [initialHtml]);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="prose-editor min-h-[400px] text-lg leading-relaxed text-ink-2 outline-none"
      style={{
        fontFamily: "var(--f-body)",
        fontSize: "18px",
      }}
      aria-label="Editor de conteudo do post"
    />
  );
}

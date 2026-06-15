"use client";

import Image from "next/image";
import { useState } from "react";

type PlaceholderImageProps = {
  src: string;
  alt: string;
  /** Texto de fallback quando o asset nao existir. */
  fallbackLabel?: string;
  className?: string;
  /** Se fornecido, usa next/image com fill. Caso contrario, width/height obrigatorios. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Wrapper de imagem com fallback gracioso pra pipeline de assets Batch 4.
 * Se o asset em `src` ainda nao existe, renderiza um <div> cinza com label
 * centrado. Quando o asset for adicionado em `public/`, basta o swap.
 */
export function PlaceholderImage({
  src,
  alt,
  fallbackLabel,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: PlaceholderImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-paper text-ink-3 ${
          className ?? ""
        }`}
        role="img"
        aria-label={alt}
        style={
          fill
            ? undefined
            : { width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }
        }
      >
        <span className="px-3 text-center font-mono text-[10px] uppercase tracking-widest">
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

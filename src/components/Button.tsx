import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "gold"
  | "ghost"
  | "outline-light"
  | "premium";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & {
  as?: "button";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonAsLink = CommonProps & {
  as: "link";
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(
  variant: Variant,
  size: Size,
  block: boolean,
  extra?: string,
) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : variant === "gold"
          ? "btn-gold"
          : variant === "ghost"
            ? "btn-ghost"
            : variant === "outline-light"
              ? "btn-outline-light"
              : "btn-premium";

  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const blockClass = block ? "btn-block" : "";
  return ["btn", variantClass, sizeClass, blockClass, extra ?? ""]
    .filter(Boolean)
    .join(" ");
}

const CUSTOM_KEYS = [
  "variant",
  "size",
  "block",
  "className",
  "children",
  "as",
] as const;

function htmlAttrs(props: ButtonAsButton): ButtonHTMLAttributes<HTMLButtonElement> {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(props)) {
    if ((CUSTOM_KEYS as readonly string[]).includes(k)) continue;
    out[k] = (props as Record<string, unknown>)[k];
  }
  return out as ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Wrapper sobre as classes `.btn .btn-*` do tokens.css.
 * Suporta `as="link"` (next/link) ou `as="button"` (default).
 */
export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const block = props.block ?? false;
  const cls = classes(variant, size, block, props.className);

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={cls}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button className={cls} {...htmlAttrs(props as ButtonAsButton)}>
      {props.children}
    </button>
  );
}

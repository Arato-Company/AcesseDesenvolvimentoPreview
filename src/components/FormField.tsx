import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type BaseFieldProps = {
  label: string;
  help?: ReactNode;
  error?: ReactNode;
};

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    children: ReactNode;
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const OUR_KEYS = ["label", "help", "error", "as", "className"] as const;
const OUR_SET = new Set<string>(OUR_KEYS);

function htmlOnly<T>(p: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(p)) {
    if (OUR_SET.has(k)) continue;
    out[k] = p[k];
  }
  return out as T;
}

/**
 * Wrapper de campo (label + control + help/error) estilizado per tokens.css
 * (`.field-label`, `.field-input`, `.field-textarea`, `.field-select`).
 */
export function FormField(props: FormFieldProps) {
  const { label, help, error, id } = props;
  const fieldId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const baseClassName = props.className ?? "";

  let control: ReactNode;
  if (props.as === "textarea") {
    const attrs = htmlOnly<TextareaHTMLAttributes<HTMLTextAreaElement>>(
      props as unknown as Record<string, unknown>,
    );
    control = (
      <textarea
        id={fieldId}
        className={`field-textarea ${baseClassName}`}
        {...attrs}
      />
    );
  } else if (props.as === "select") {
    const attrs = htmlOnly<SelectHTMLAttributes<HTMLSelectElement>>(
      props as unknown as Record<string, unknown>,
    );
    control = (
      <select
        id={fieldId}
        className={`field-select ${baseClassName}`}
        {...attrs}
      >
        {props.children}
      </select>
    );
  } else {
    const attrs = htmlOnly<InputHTMLAttributes<HTMLInputElement>>(
      props as unknown as Record<string, unknown>,
    );
    control = (
      <input
        id={fieldId}
        className={`field-input ${baseClassName}`}
        {...attrs}
      />
    );
  }

  return (
    <div>
      <label htmlFor={fieldId} className="field-label">
        {label}
      </label>
      {control}
      {error ? <p className="field-error">{error}</p> : null}
      {!error && help ? <p className="field-help">{help}</p> : null}
    </div>
  );
}

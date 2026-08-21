import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, id, required, "aria-invalid": ariaInvalid, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalid} htmlFor={inputId}>
      <input
        id={inputId}
        className={cx("mds-input", className)}
        required={required}
        aria-invalid={invalid || undefined}
        {...props}
      />
    </Field>
  );
}

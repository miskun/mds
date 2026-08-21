import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, required, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${inputId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalid} htmlFor={inputId} messageId={messageId}>
      <input
        ref={ref}
        id={inputId}
        className={cx("mds-input", className)}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </Field>
  );
});

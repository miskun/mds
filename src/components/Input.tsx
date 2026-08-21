import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label associated with the input. */
  label?: string;
  /** Helper text shown below the control. */
  hint?: string;
  /** Error text shown below the control. */
  error?: string;
  /** Marks the field invalid without requiring error text. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, invalid, className, id, required, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${inputId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={inputId} messageId={messageId}>
      <input
        ref={ref}
        id={inputId}
        className={cx("mds-input", className)}
        required={required}
        aria-invalid={invalidState || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </Field>
  );
});

import type { TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, className, id, required, "aria-invalid": ariaInvalid, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalid} htmlFor={textareaId}>
      <textarea
        id={textareaId}
        className={cx("mds-textarea", className)}
        required={required}
        aria-invalid={invalid || undefined}
        {...props}
      />
    </Field>
  );
}

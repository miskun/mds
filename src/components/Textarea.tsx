import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, invalid, className, id, required, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${textareaId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={textareaId} messageId={messageId}>
      <textarea
        ref={ref}
        id={textareaId}
        className={cx("mds-textarea", className)}
        required={required}
        aria-invalid={invalidState || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </Field>
  );
});

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./field.css";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  htmlFor?: string;
  messageId?: string;
  children: ReactNode;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, hint, error, required, invalid, htmlFor, messageId, className, children, ...props },
  ref,
) {
  const hasError = invalid || Boolean(error);

  return (
    <div ref={ref} className={cx("mds-field", hasError && "mds-field--invalid", className)} data-invalid={hasError || undefined} {...props}>
      {label ? (
        <label className="mds-field__label" htmlFor={htmlFor}>
          <span>{label}</span>
          {required ? <span className="mds-field__required">Required</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <span id={messageId} className="mds-field__error">
          {error}
        </span>
      ) : hint ? (
        <span id={messageId} className="mds-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
});

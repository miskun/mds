import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./checkbox.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, className, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const messageId = error || hint ? `${generatedId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <label className={cx("mds-choice", error && "mds-choice--invalid", className)}>
      <input
        ref={ref}
        className="mds-choice__input"
        type="checkbox"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        {...props}
      />
      <span className="mds-choice__box" aria-hidden="true" />
      <span className="mds-choice__content">
        {label ? <span className="mds-choice__label">{label}</span> : null}
        {error ? (
          <span id={messageId} className="mds-choice__error">
            {error}
          </span>
        ) : hint ? (
          <span id={messageId} className="mds-choice__hint">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
});

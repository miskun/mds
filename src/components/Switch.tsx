import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./switch.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label rendered next to the switch. */
  label?: ReactNode;
  /** Helper text shown below the label. */
  hint?: string;
  /** Error text shown below the label. */
  error?: string;
  /** Marks the switch invalid without requiring error text. */
  invalid?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, hint, error, invalid, className, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${generatedId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;
  const hasContent = label || error || hint;

  return (
    <label className={cx("mds-switch", invalidState && "mds-switch--invalid", className)}>
      <input
        ref={ref}
        className="mds-switch__input"
        type="checkbox"
        aria-invalid={invalidState || undefined}
        aria-describedby={describedBy}
        {...props}
      />
      <span className="mds-switch__track" aria-hidden="true">
        <span className="mds-switch__thumb" />
      </span>
      {hasContent ? (
        <span className="mds-switch__content">
          {label ? <span className="mds-switch__label">{label}</span> : null}
          {error ? (
            <span id={messageId} className="mds-switch__error">
              {error}
            </span>
          ) : hint ? (
            <span id={messageId} className="mds-switch__hint">
              {hint}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});

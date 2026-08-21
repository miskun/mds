import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./checkbox.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, indeterminate, className, "aria-describedby": ariaDescribedBy, "aria-checked": ariaChecked, ...props },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const messageId = error || hint ? `${generatedId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className={cx("mds-choice", error && "mds-choice--invalid", className)}>
      <input
        ref={inputRef}
        className="mds-choice__input"
        type="checkbox"
        aria-invalid={Boolean(error) || undefined}
        aria-checked={ariaChecked ?? (indeterminate ? "mixed" : props.checked === undefined ? undefined : Boolean(props.checked))}
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

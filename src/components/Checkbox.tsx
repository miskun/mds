import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./checkbox.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

export function Checkbox({ label, hint, error, className, ...props }: CheckboxProps) {
  return (
    <label className={cx("mds-choice", error && "mds-choice--invalid", className)}>
      <input className="mds-choice__input" type="checkbox" aria-invalid={Boolean(error) || undefined} {...props} />
      <span className="mds-choice__box" aria-hidden="true" />
      <span className="mds-choice__content">
        {label ? <span className="mds-choice__label">{label}</span> : null}
        {error ? <span className="mds-choice__error">{error}</span> : hint ? <span className="mds-choice__hint">{hint}</span> : null}
      </span>
    </label>
  );
}

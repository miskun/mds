import type { InputHTMLAttributes, ReactNode } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./checkbox.css";
import "./radio.css";

export interface RadioGroupProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function RadioGroup({ label, hint, error, required, children }: RadioGroupProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={Boolean(error)}>
      <div className="mds-radio-group" role="radiogroup" aria-invalid={Boolean(error) || undefined}>
        {children}
      </div>
    </Field>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  hint?: string;
}

export function Radio({ label, hint, className, ...props }: RadioProps) {
  return (
    <label className={cx("mds-choice", className)}>
      <input className="mds-choice__input" type="radio" {...props} />
      <span className="mds-choice__radio" aria-hidden="true" />
      <span className="mds-choice__content">
        <span className="mds-choice__label">{label}</span>
        {hint ? <span className="mds-choice__hint">{hint}</span> : null}
      </span>
    </label>
  );
}

import { forwardRef, useId } from "react";
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./checkbox.css";
import "./radio.css";

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
  required?: boolean;
  children: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    label,
    hint,
    error,
    invalid,
    required,
    className,
    children,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const invalidState = invalid || Boolean(error);
  const labelId = label ? `${generatedId}-label` : undefined;
  const messageId = error || hint ? `${generatedId}-message` : undefined;
  const labelledBy = [ariaLabelledBy, labelId].filter(Boolean).join(" ") || undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} labelId={labelId} messageId={messageId}>
      <div
        ref={ref}
        className={cx("mds-radio-group", className)}
        role="radiogroup"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalidState || undefined}
        {...props}
      >
        {children}
      </div>
    </Field>
  );
});

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  hint?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, hint, className, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const hintId = hint ? `${generatedId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <label className={cx("mds-choice", className)}>
      <input ref={ref} className="mds-choice__input" type="radio" aria-describedby={describedBy} {...props} />
      <span className="mds-choice__radio" aria-hidden="true" />
      <span className="mds-choice__content">
        <span className="mds-choice__label">{label}</span>
        {hint ? (
          <span id={hintId} className="mds-choice__hint">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
});

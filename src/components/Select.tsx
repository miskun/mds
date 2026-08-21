import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label associated with the select. */
  label?: string;
  /** Helper text shown below the control. */
  hint?: string;
  /** Error text shown below the control. */
  error?: string;
  /** Marks the field invalid without requiring error text. */
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, invalid, className, id, required, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${selectId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={selectId} messageId={messageId}>
      <span className="mds-select-wrap">
        <select
          ref={ref}
          id={selectId}
          className={cx("mds-select", className)}
          required={required}
          aria-invalid={invalidState || undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="mds-select__icon" size={16} aria-hidden="true" />
      </span>
    </Field>
  );
});

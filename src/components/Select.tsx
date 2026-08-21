import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, className, id, required, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${selectId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalid} htmlFor={selectId} messageId={messageId}>
      <span className="mds-select-wrap">
        <select
          ref={ref}
          id={selectId}
          className={cx("mds-select", className)}
          required={required}
          aria-invalid={invalid || undefined}
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

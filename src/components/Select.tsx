import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Select({ label, hint, error, className, id, required, "aria-invalid": ariaInvalid, children, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalid} htmlFor={selectId}>
      <span className="mds-select-wrap">
        <select
          id={selectId}
          className={cx("mds-select", className)}
          required={required}
          aria-invalid={invalid || undefined}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="mds-select__icon" size={16} aria-hidden="true" />
      </span>
    </Field>
  );
}

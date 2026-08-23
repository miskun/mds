import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";
import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./checkbox.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label rendered next to the checkbox. */
  label?: ReactNode;
  /** Helper text shown below the label. */
  hint?: string;
  /** Error text shown below the label. */
  error?: string;
  /** Marks the checkbox invalid without requiring error text. */
  invalid?: boolean;
  /** Renders the native mixed checkbox state. */
  indeterminate?: boolean;
  /** Check glyph color used when the checkbox is checked or mixed. */
  checkColor?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    hint,
    error,
    invalid,
    indeterminate,
    checkColor,
    className,
    style,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    "aria-checked": ariaChecked,
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const messageId = error || hint ? `${generatedId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;
  const checkboxStyle = {
    ...style,
    ...(checkColor ? { "--mds-choice-accent": checkColor } : {}),
  } as CSSProperties;

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className={cx("mds-choice", invalidState && "mds-choice--invalid", className)} style={checkboxStyle}>
      <input
        ref={inputRef}
        className="mds-choice__input"
        type="checkbox"
        aria-invalid={invalidState || undefined}
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

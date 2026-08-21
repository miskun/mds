import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "./utils";
import "./switch.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, className, ...props }, ref) {
  return (
    <label className={cx("mds-switch", className)}>
      <input ref={ref} className="mds-switch__input" type="checkbox" {...props} />
      <span className="mds-switch__track" aria-hidden="true">
        <span className="mds-switch__thumb" />
      </span>
      {label ? <span className="mds-switch__label">{label}</span> : null}
    </label>
  );
});

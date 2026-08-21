import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./progress.css";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress({ value, label, className, ...props }, ref) {
  const normalized = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className={cx("mds-progress", className)} {...props}>
      {label ? (
        <div className="mds-progress__meta">
          <span>{label}</span>
          <span>{normalized}%</span>
        </div>
      ) : null}
      <div className="mds-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalized}>
        <span className="mds-progress__bar" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
});

import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./status-dot.css";

export type StatusTone = "neutral" | "accent" | "success" | "warning" | "danger";

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  label?: string;
}

export function StatusDot({ tone = "neutral", label, className, ...props }: StatusDotProps) {
  return (
    <span className={cx("mds-status", `mds-status--${tone}`, className)} {...props}>
      <span className="mds-status__dot" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </span>
  );
}

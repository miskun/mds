import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./spinner.css";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner({ size = "md", label = "Loading", className, ...props }, ref) {
  return (
    <span ref={ref} className={cx("mds-spinner", `mds-spinner--${size}`, className)} role="status" aria-label={label} {...props}>
      <span className="mds-spinner__ring" aria-hidden="true" />
    </span>
  );
});

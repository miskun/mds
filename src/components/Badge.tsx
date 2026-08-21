import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./badge.css";

export type BadgeTone = "neutral" | "accent" | "success" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color treatment. */
  tone?: BadgeTone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ tone = "neutral", className, ...props }, ref) {
  return <span ref={ref} className={cx("mds-badge", `mds-badge--${tone}`, className)} {...props} />;
});

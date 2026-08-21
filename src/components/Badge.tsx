import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./badge.css";

export type BadgeTone = "neutral" | "accent" | "success" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return <span className={cx("mds-badge", `mds-badge--${tone}`, className)} {...props} />;
}

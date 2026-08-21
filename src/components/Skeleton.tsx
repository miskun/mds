import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./skeleton.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "block" | "circle";
}

export function Skeleton({ variant = "block", className, ...props }: SkeletonProps) {
  return <div className={cx("mds-skeleton", `mds-skeleton--${variant}`, className)} aria-hidden="true" {...props} />;
}

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./skeleton.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "block" | "circle";
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton({ variant = "block", className, ...props }, ref) {
  return <div ref={ref} className={cx("mds-skeleton", `mds-skeleton--${variant}`, className)} aria-hidden="true" {...props} />;
});

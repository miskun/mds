import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./divider.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider({ orientation = "horizontal", className, ...props }, ref) {
  return <hr ref={ref} className={cx("mds-divider", `mds-divider--${orientation}`, className)} aria-orientation={orientation} {...props} />;
});

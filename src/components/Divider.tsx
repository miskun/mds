import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./divider.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({ orientation = "horizontal", className, ...props }: DividerProps) {
  return <hr className={cx("mds-divider", `mds-divider--${orientation}`, className)} aria-orientation={orientation} {...props} />;
}

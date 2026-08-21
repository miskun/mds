import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./kbd.css";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx("mds-kbd", className)} {...props} />;
}

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./panel.css";

export type PanelVariant = "default" | "raised" | "ghost";
export type PanelPadding = "none" | "sm" | "md" | "lg";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface treatment for the panel. */
  variant?: PanelVariant;
  /** Inner spacing from target-aware tokens. */
  padding?: PanelPadding;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { variant = "default", padding = "md", className, children, ...props },
  ref,
) {
  const surface = variant === "ghost" ? undefined : "panel";

  return (
    <div
      ref={ref}
      data-mds-surface={surface}
      className={cx("mds-panel", `mds-panel--${variant}`, `mds-panel--padding-${padding}`, className)}
      {...props}
    >
      {children}
    </div>
  );
});

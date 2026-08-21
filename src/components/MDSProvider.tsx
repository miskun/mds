import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type MDSTarget = "desktop" | "mobile" | "admin" | "editorial";

export interface MDSProviderProps extends HTMLAttributes<HTMLDivElement> {
  target?: MDSTarget;
  children: ReactNode;
}

export const MDSProvider = forwardRef<HTMLDivElement, MDSProviderProps>(function MDSProvider({ target = "desktop", className, children, ...props }, ref) {
  return (
    <div ref={ref} data-mds-target={target} className={cx("mds-provider", className)} {...props}>
      {children}
    </div>
  );
});

export const TargetProvider = MDSProvider;

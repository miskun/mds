import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type MDSTarget = "desktop" | "mobile" | "admin" | "editorial";

export interface MDSProviderProps extends HTMLAttributes<HTMLDivElement> {
  target?: MDSTarget;
  children: ReactNode;
}

export function MDSProvider({ target = "desktop", className, children, ...props }: MDSProviderProps) {
  return (
    <div data-mds-target={target} className={cx("mds-provider", className)} {...props}>
      {children}
    </div>
  );
}

export const TargetProvider = MDSProvider;

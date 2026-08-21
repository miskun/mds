import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./tabs.css";

export interface TabsProps {
  children: ReactNode;
  label?: string;
}

export function Tabs({ children, label = "Sections" }: TabsProps) {
  return (
    <div className="mds-tabs" role="tablist" aria-label={label}>
      {children}
    </div>
  );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ active, className, ...props }, ref) {
  return <button ref={ref} className={cx("mds-tab", active && "mds-tab--active", className)} role="tab" aria-selected={active} {...props} />;
});

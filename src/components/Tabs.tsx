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

export function Tab({ active, className, ...props }: TabProps) {
  return <button className={cx("mds-tab", active && "mds-tab--active", className)} role="tab" aria-selected={active} {...props} />;
}

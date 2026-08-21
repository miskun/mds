import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./segmented-control.css";

export interface SegmentedControlProps {
  children: ReactNode;
  label?: string;
}

export function SegmentedControl({ children, label = "Options" }: SegmentedControlProps) {
  return (
    <div className="mds-segmented" role="group" aria-label={label}>
      {children}
    </div>
  );
}

export interface SegmentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Segment({ active, className, ...props }: SegmentProps) {
  return <button className={cx("mds-segment", active && "mds-segment--active", className)} aria-pressed={active} {...props} />;
}

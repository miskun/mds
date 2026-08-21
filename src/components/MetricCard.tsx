import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./metric-card.css";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
}

export function MetricCard({ label, value, delta, className, ...props }: MetricCardProps) {
  return (
    <div className={cx("mds-metric", className)} {...props}>
      <span className="mds-metric__label">{label}</span>
      <strong className="mds-metric__value">{value}</strong>
      {delta ? <span className="mds-metric__delta">{delta}</span> : null}
    </div>
  );
}

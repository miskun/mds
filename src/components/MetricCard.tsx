import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./metric-card.css";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(function MetricCard({ label, value, delta, className, ...props }, ref) {
  return (
    <div ref={ref} className={cx("mds-metric", className)} {...props}>
      <span className="mds-metric__label">{label}</span>
      <strong className="mds-metric__value">{value}</strong>
      {delta ? <span className="mds-metric__delta">{delta}</span> : null}
    </div>
  );
});

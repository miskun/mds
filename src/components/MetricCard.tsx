import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./metric-card.css";

export type MetricCardSize = "sm" | "md" | "lg";
export type MetricCardSurface = "framed" | "flush";
export type MetricDeltaTone = "positive" | "negative" | "neutral" | "muted";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value?: ReactNode;
  delta?: ReactNode;
  deltaTone?: MetricDeltaTone;
  context?: ReactNode;
  missing?: boolean;
  emptyLabel?: ReactNode;
  size?: MetricCardSize;
  surface?: MetricCardSurface;
  numeric?: boolean;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(function MetricCard(
  {
    label,
    value,
    delta,
    deltaTone = "neutral",
    context,
    missing,
    emptyLabel = "—",
    size = "md",
    surface = "framed",
    numeric = true,
    className,
    ...props
  },
  ref,
) {
  const valueContent = missing ? emptyLabel : value;
  const hasDelta = delta !== undefined && delta !== null;
  const hasContext = context !== undefined && context !== null;

  return (
    <div
      ref={ref}
      className={cx(
        "mds-metric",
        `mds-metric--${surface}`,
        `mds-metric--${size}`,
        hasDelta && "mds-metric--has-delta",
        hasContext && "mds-metric--has-context",
        numeric && "mds-metric--numeric",
        className,
      )}
      {...props}
    >
      <span className="mds-metric__label">{label}</span>
      <strong className={cx("mds-metric__value", missing && "mds-metric__value--missing")}>{valueContent}</strong>
      <span className="mds-metric__support">
        {hasDelta ? <span className={cx("mds-metric__delta", `mds-metric__delta--${deltaTone}`)}>{delta}</span> : null}
        {hasContext ? <span className="mds-metric__context">{context}</span> : null}
      </span>
    </div>
  );
});

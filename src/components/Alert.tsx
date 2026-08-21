import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cx } from "./utils";
import "./alert.css";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title?: string;
  icon?: ReactNode;
}

const alertIcons: Record<AlertTone, ReactNode> = {
  info: <Info size={16} />,
  success: <CheckCircle2 size={16} />,
  warning: <TriangleAlert size={16} />,
  danger: <AlertCircle size={16} />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ tone = "info", title, icon, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx("mds-alert", `mds-alert--${tone}`, className)} role={tone === "danger" ? "alert" : "status"} {...props}>
      <span className="mds-alert__icon" aria-hidden="true">
        {icon ?? alertIcons[tone]}
      </span>
      <div className="mds-alert__content">
        {title ? <h3 className="mds-alert__title">{title}</h3> : null}
        {children ? <div className="mds-alert__body">{children}</div> : null}
      </div>
    </div>
  );
});

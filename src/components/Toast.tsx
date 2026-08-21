import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./toast.css";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: ReactNode;
  onDismiss?: () => void;
}

export function Toast({ title, action, onDismiss, className, children, ...props }: ToastProps) {
  return (
    <div className={cx("mds-toast", className)} role="status" {...props}>
      <div className="mds-toast__content">
        {title ? <h3 className="mds-toast__title">{title}</h3> : null}
        {children ? <div className="mds-toast__body">{children}</div> : null}
      </div>
      {action ? <div className="mds-toast__action">{action}</div> : null}
      {onDismiss ? <IconButton size="sm" variant="ghost" label="Dismiss" icon={<X size={14} />} onClick={onDismiss} /> : null}
    </div>
  );
}

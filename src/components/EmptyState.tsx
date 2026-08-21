import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cx } from "./utils";
import "./empty-state.css";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, icon, action, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-empty", className)} {...props}>
      <span className="mds-empty__icon" aria-hidden="true">
        {icon ?? <SearchX size={22} />}
      </span>
      <div className="mds-empty__content">
        <h3 className="mds-empty__title">{title}</h3>
        {description ? <p className="mds-empty__description">{description}</p> : null}
      </div>
      {action ? <div className="mds-empty__action">{action}</div> : null}
    </div>
  );
});

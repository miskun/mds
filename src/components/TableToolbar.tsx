import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./table-toolbar.css";

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export const TableToolbar = forwardRef<HTMLDivElement, TableToolbarProps>(function TableToolbar(
  { title, description, actions, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-table-toolbar", className)} {...props}>
      <div className="mds-table-toolbar__intro">
        {title ? <h3 className="mds-table-toolbar__title">{title}</h3> : null}
        {description ? <p className="mds-table-toolbar__description">{description}</p> : null}
      </div>
      {children ? <div className="mds-table-toolbar__filters">{children}</div> : null}
      {actions ? <div className="mds-table-toolbar__actions">{actions}</div> : null}
    </div>
  );
});

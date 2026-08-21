import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./page-header.css";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, description, metadata, actions, className, children, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cx("mds-page-header", className)} {...props}>
      <div className="mds-page-header__content">
        {eyebrow ? <p className="mds-page-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="mds-page-header__title">{title}</h1>
        {description ? <p className="mds-page-header__description">{description}</p> : null}
        {metadata ? <div className="mds-page-header__metadata">{metadata}</div> : null}
        {children ? <div className="mds-page-header__body">{children}</div> : null}
      </div>
      {actions ? <div className="mds-page-header__actions">{actions}</div> : null}
    </header>
  );
});

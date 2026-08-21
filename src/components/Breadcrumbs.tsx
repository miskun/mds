import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./utils";
import "./breadcrumbs.css";

export function Breadcrumbs({ children, label = "Breadcrumbs" }: { children: ReactNode; label?: string }) {
  return (
    <nav className="mds-breadcrumbs" aria-label={label}>
      <ol className="mds-breadcrumbs__list">{children}</ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}

export function BreadcrumbItem({ current, className, children, ...props }: BreadcrumbItemProps) {
  return (
    <li className="mds-breadcrumbs__item">
      <a className={cx("mds-breadcrumbs__link", current && "mds-breadcrumbs__link--current", className)} aria-current={current ? "page" : undefined} {...props}>
        {children}
      </a>
      {!current ? <ChevronRight className="mds-breadcrumbs__chevron" size={14} aria-hidden="true" /> : null}
    </li>
  );
}

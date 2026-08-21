import { forwardRef } from "react";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./utils";
import "./breadcrumbs.css";

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs({ children, label = "Breadcrumbs", className, ...props }, ref) {
  return (
    <nav ref={ref} className={cx("mds-breadcrumbs", className)} aria-label={label} {...props}>
      <ol className="mds-breadcrumbs__list">{children}</ol>
    </nav>
  );
});

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(function BreadcrumbItem({ current, className, children, ...props }, ref) {
  return (
    <li className="mds-breadcrumbs__item">
      <a
        ref={ref}
        className={cx("mds-breadcrumbs__link", current && "mds-breadcrumbs__link--current", className)}
        aria-current={current ? "page" : undefined}
        {...props}
      >
        {children}
      </a>
      {!current ? <ChevronRight className="mds-breadcrumbs__chevron" size={14} aria-hidden="true" /> : null}
    </li>
  );
});

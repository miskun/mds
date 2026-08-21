import { forwardRef } from "react";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./side-nav.css";

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. */
  label?: string;
  /** Optional heading or product mark above the sections. */
  header?: ReactNode;
  /** Optional content pinned after the sections. */
  footer?: ReactNode;
}

export const SideNav = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  { children, label = "Sidebar navigation", header, footer, className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cx("mds-side-nav", className)} aria-label={label} {...props}>
      {header ? <div className="mds-side-nav__header">{header}</div> : null}
      <div className="mds-side-nav__body">{children}</div>
      {footer ? <div className="mds-side-nav__footer">{footer}</div> : null}
    </nav>
  );
});

export interface SideNavSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section label shown above this group. */
  heading?: ReactNode;
}

export const SideNavSection = forwardRef<HTMLDivElement, SideNavSectionProps>(function SideNavSection(
  { heading, children, className, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cx("mds-side-nav__section", className)} {...props}>
      {heading ? <h2 className="mds-side-nav__section-title">{heading}</h2> : null}
      <ul className="mds-side-nav__list">{children}</ul>
    </section>
  );
});

export interface SideNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the item as the current page. */
  current?: boolean;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing metadata, count, or status. */
  trailing?: ReactNode;
}

export const SideNavItem = forwardRef<HTMLAnchorElement, SideNavItemProps>(function SideNavItem(
  { current, icon, trailing, className, children, ...props },
  ref,
) {
  const hasIcon = Boolean(icon);
  const hasTrailing = Boolean(trailing);

  return (
    <li className="mds-side-nav__list-item">
      <a
        ref={ref}
        className={cx(
          "mds-side-nav__item",
          hasIcon && "mds-side-nav__item--with-icon",
          hasTrailing && "mds-side-nav__item--with-trailing",
          current && "mds-side-nav__item--current",
          className,
        )}
        aria-current={current ? "page" : undefined}
        {...props}
      >
        {icon ? <span className="mds-side-nav__icon">{icon}</span> : null}
        <span className="mds-side-nav__label">{children}</span>
        {trailing ? <span className="mds-side-nav__trailing">{trailing}</span> : null}
      </a>
    </li>
  );
});

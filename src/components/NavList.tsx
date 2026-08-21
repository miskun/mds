import { forwardRef } from "react";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./nav-list.css";

export interface NavListProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const NavList = forwardRef<HTMLElement, NavListProps>(function NavList({ children, label = "Navigation", className, ...props }, ref) {
  return (
    <nav ref={ref} className={cx("mds-nav", className)} aria-label={label} {...props}>
      <ul className="mds-nav__list">{children}</ul>
    </nav>
  );
});

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  icon?: ReactNode;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem({ active, icon, className, children, ...props }, ref) {
  return (
    <li>
      <a ref={ref} className={cx("mds-nav__item", active && "mds-nav__item--active", className)} aria-current={active ? "page" : undefined} {...props}>
        {icon ? <span className="mds-nav__icon">{icon}</span> : null}
        <span>{children}</span>
      </a>
    </li>
  );
});

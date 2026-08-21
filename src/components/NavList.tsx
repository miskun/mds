import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./nav-list.css";

export function NavList({ children, label = "Navigation" }: { children: ReactNode; label?: string }) {
  return (
    <nav className="mds-nav" aria-label={label}>
      <ul className="mds-nav__list">{children}</ul>
    </nav>
  );
}

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  icon?: ReactNode;
}

export function NavItem({ active, icon, className, children, ...props }: NavItemProps) {
  return (
    <li>
      <a className={cx("mds-nav__item", active && "mds-nav__item--active", className)} aria-current={active ? "page" : undefined} {...props}>
        {icon ? <span className="mds-nav__icon">{icon}</span> : null}
        <span>{children}</span>
      </a>
    </li>
  );
}

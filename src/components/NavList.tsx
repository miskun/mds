import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cx } from "./utils";
import "./nav-list.css";

export interface NavListProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const NavList = forwardRef<HTMLElement, NavListProps>(function NavList({ children, label = "Navigation", className, onKeyDown, ...props }, ref) {
  return (
    <nav
      ref={ref}
      className={cx("mds-nav", className)}
      aria-label={label}
      onKeyDown={(event) => {
        moveNavListFocus(event);
        onKeyDown?.(event);
      }}
      {...props}
    >
      <ul className="mds-nav__list">{children}</ul>
    </nav>
  );
});

interface NavItemBaseProps {
  active?: boolean;
  icon?: ReactNode;
}

export type NavItemProps =
  | (NavItemBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: "a" })
  | (NavItemBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" });

export const NavItem = forwardRef<HTMLElement, NavItemProps>(function NavItem(
  { as = "a", active, icon, className, children, ...props },
  ref,
) {
  const itemProps = {
    ref,
    className: cx("mds-nav__item", active && "mds-nav__item--active", className),
    "aria-current": active ? "page" : undefined,
    ...props,
  };

  return (
    <li>
      {as === "button" ? (
        <button type="button" {...(itemProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
          {icon ? <span className="mds-nav__icon">{icon}</span> : null}
          <span>{children}</span>
        </button>
      ) : (
        <a {...(itemProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {icon ? <span className="mds-nav__icon">{icon}</span> : null}
          <span>{children}</span>
        </a>
      )}
    </li>
  );
});

function moveNavListFocus(event: KeyboardEvent<HTMLElement>) {
  moveNavigationFocus(event, ".mds-nav__item:is(a[href], button:not(:disabled))");
}

function moveNavigationFocus(event: KeyboardEvent<HTMLElement>, selector: string) {
  const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) return;

  const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(selector));
  if (!items.length) return;

  event.preventDefault();

  const currentIndex = items.findIndex((item) => item === document.activeElement);
  const index = currentIndex >= 0 ? currentIndex : 0;
  const nextIndex =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowUp"
          ? (index - 1 + items.length) % items.length
          : (index + 1) % items.length;

  items[nextIndex].focus();
}

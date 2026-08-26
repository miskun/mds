import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
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
  { children, label = "Sidebar navigation", header, footer, className, onKeyDown, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      className={cx("mds-side-nav", className)}
      aria-label={label}
      onKeyDown={(event) => {
        moveSideNavFocus(event);
        onKeyDown?.(event);
      }}
      {...props}
    >
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

interface SideNavItemBaseProps {
  /** Marks the item as the current page. */
  current?: boolean;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing metadata, count, or status. */
  trailing?: ReactNode;
}

export type SideNavItemProps =
  | (SideNavItemBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: "a" })
  | (SideNavItemBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" });

export const SideNavItem = forwardRef<HTMLElement, SideNavItemProps>(function SideNavItem(
  { as = "a", current, icon, trailing, className, children, ...props },
  ref,
) {
  const hasIcon = Boolean(icon);
  const hasTrailing = Boolean(trailing);
  const itemProps = {
    ref,
    className: cx(
      "mds-side-nav__item",
      hasIcon && "mds-side-nav__item--with-icon",
      hasTrailing && "mds-side-nav__item--with-trailing",
      current && "mds-side-nav__item--current",
      className,
    ),
    "aria-current": current ? "page" : undefined,
    ...props,
  };

  return (
    <li className="mds-side-nav__list-item">
      {as === "button" ? (
        <button type="button" {...(itemProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
          {icon ? <span className="mds-side-nav__icon">{icon}</span> : null}
          <span className="mds-side-nav__label">{children}</span>
          {trailing ? <span className="mds-side-nav__trailing">{trailing}</span> : null}
        </button>
      ) : (
        <a {...(itemProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {icon ? <span className="mds-side-nav__icon">{icon}</span> : null}
          <span className="mds-side-nav__label">{children}</span>
          {trailing ? <span className="mds-side-nav__trailing">{trailing}</span> : null}
        </a>
      )}
    </li>
  );
});

function moveSideNavFocus(event: KeyboardEvent<HTMLElement>) {
  moveNavigationFocus(event, ".mds-side-nav__item:is(a[href], button:not(:disabled))");
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

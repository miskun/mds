import { createElement, forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./hero.css";

export type HeroElement = "section" | "header" | "div";
export type HeroTitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Element rendered by the hero root. */
  as?: HeroElement;
  /** Small label shown above the title. */
  eyebrow?: ReactNode;
  /** Primary hero heading. */
  title: ReactNode;
  /** Supporting copy below the heading. */
  description?: ReactNode;
  /** Heading level rendered in the document outline. */
  titleLevel?: HeroTitleLevel;
  /** Actions or metadata shown after the text. */
  actions?: ReactNode;
  children?: ReactNode;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { as: Component = "section", eyebrow, title, description, titleLevel = 1, actions, className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-hero", className),
      ...props,
    },
    <>
      <div className="mds-hero__content">
        {eyebrow ? <p className="mds-hero__eyebrow">{eyebrow}</p> : null}
        {createElement(`h${titleLevel}`, { className: "mds-hero__title" }, title)}
        {description ? <p className="mds-hero__description">{description}</p> : null}
      </div>
      {actions ? <div className="mds-hero__actions">{actions}</div> : null}
      {children ? <div className="mds-hero__body">{children}</div> : null}
    </>,
  );
});

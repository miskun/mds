import { createElement, forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./prose.css";

export type ProseElement = "article" | "div" | "section";

export interface ProseProps extends HTMLAttributes<HTMLElement> {
  /** Element rendered by the prose wrapper. */
  as?: ProseElement;
}

export const Prose = forwardRef<HTMLElement, ProseProps>(function Prose(
  { as: Component = "article", className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-prose", className),
      ...props,
    },
    children,
  );
});

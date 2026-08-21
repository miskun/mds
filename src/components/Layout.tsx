import { createElement, forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./layout.css";

export type LayoutGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type LayoutAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type LayoutJustify = "start" | "center" | "end" | "between";
export type LayoutElement = "div" | "section" | "header" | "footer" | "main" | "nav" | "aside" | "ul" | "ol" | "p";

interface LayoutProps extends HTMLAttributes<HTMLElement> {
  /** Element rendered by the layout primitive. */
  as?: LayoutElement;
  /** Spacing between children within the active MDS target. */
  gap?: LayoutGap;
  /** Cross-axis alignment. */
  align?: LayoutAlign;
  /** Main-axis distribution. */
  justify?: LayoutJustify;
  children?: ReactNode;
}

export interface StackProps extends LayoutProps {}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Component = "div", gap = "md", align = "stretch", justify = "start", className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-stack", gapClass(gap), alignClass(align), justifyClass(justify), className),
      ...props,
    },
    children,
  );
});

export interface ClusterProps extends LayoutProps {
  /** Allow items to move onto additional rows. */
  wrap?: boolean;
}

export const Cluster = forwardRef<HTMLElement, ClusterProps>(function Cluster(
  { as: Component = "div", gap = "sm", align = "center", justify = "start", wrap = true, className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-cluster", gapClass(gap), alignClass(align), justifyClass(justify), !wrap && "mds-layout--nowrap", className),
      ...props,
    },
    children,
  );
});

export interface InlineProps extends LayoutProps {
  /** Allow inline content to move onto additional rows. */
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLElement, InlineProps>(function Inline(
  { as: Component = "div", gap = "xs", align = "center", justify = "start", wrap = false, className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-inline", gapClass(gap), alignClass(align), justifyClass(justify), wrap && "mds-layout--wrap", className),
      ...props,
    },
    children,
  );
});

export interface GridProps extends LayoutProps {
  /** Minimum width for responsive auto-fit columns. */
  minItemWidth?: string;
  /** Fixed column count. Auto-fit is used when omitted. */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    as: Component = "div",
    gap = "md",
    align = "stretch",
    justify = "start",
    minItemWidth = "220px",
    columns,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const gridStyle = {
    "--mds-grid-min": minItemWidth,
    "--mds-grid-columns": columns ? `repeat(${columns}, minmax(0, 1fr))` : undefined,
    ...style,
  } as CSSProperties;

  return createElement(
    Component,
    {
      ref,
      className: cx("mds-grid", columns && "mds-grid--fixed", gapClass(gap), alignClass(align), justifyClass(justify), className),
      style: gridStyle,
      ...props,
    },
    children,
  );
});

function gapClass(gap: LayoutGap) {
  return `mds-layout--gap-${gap}`;
}

function alignClass(align: LayoutAlign) {
  return `mds-layout--align-${align}`;
}

function justifyClass(justify: LayoutJustify) {
  return `mds-layout--justify-${justify}`;
}

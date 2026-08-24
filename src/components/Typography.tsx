import { createElement, forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./typography.css";

export type TextTone = "default" | "muted" | "soft" | "accent" | "danger" | "success";
export type TextSize = "xxs" | "xs" | "sm" | "md" | "lg";
export type TextWeight = "regular" | "medium" | "strong";
export type TextElement = "p" | "span" | "div";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element rendered by the text primitive. */
  as?: TextElement;
  /** Semantic text color. */
  tone?: TextTone;
  /** Semantic text size. */
  size?: TextSize;
  /** Text weight. */
  weight?: TextWeight;
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Component = "p", tone = "default", size = "md", weight = "regular", className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-text", `mds-text--${tone}`, `mds-text--${size}`, `mds-text--${weight}`, className),
      ...props,
    },
    children,
  );
});

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = "page" | "section" | "subsection" | "compact";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level rendered in the document outline. */
  level?: TitleLevel;
  /** Visual title size. */
  size?: TitleSize;
  children: ReactNode;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { level = 2, size = "section", className, children, ...props },
  ref,
) {
  return createElement(
    `h${level}`,
    {
      ref,
      className: cx("mds-title-text", `mds-title-text--${size}`, className),
      ...props,
    },
    children,
  );
});

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Render code as a block. */
  block?: boolean;
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code({ block, className, children, ...props }, ref) {
  if (block) {
    return createElement(
      "pre",
      {
        ref,
        className: cx("mds-code", "mds-code--block", className),
        ...props,
      },
      <code>{children}</code>,
    );
  }

  return createElement(
    "code",
    {
      ref,
      className: cx("mds-code", className),
      ...props,
    },
    children,
  );
});

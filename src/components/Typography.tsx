import { createElement, forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./typography.css";

export type TextTone = "default" | "muted" | "soft" | "accent" | "danger" | "success" | "warning";
export type TextSize = "xxs" | "xs" | "sm" | "md" | "lg";
export type TextWeight = "regular" | "medium" | "strong";
export type TextElement = "p" | "span" | "div";
export type EyebrowElement = "p" | "span" | "div";

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

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  /** Element rendered by the eyebrow primitive. */
  as?: EyebrowElement;
  children: ReactNode;
}

export const Eyebrow = forwardRef<HTMLElement, EyebrowProps>(function Eyebrow(
  { as: Component = "p", className, children, ...props },
  ref,
) {
  return createElement(
    Component,
    {
      ref,
      className: cx("mds-eyebrow", className),
      ...props,
    },
    children,
  );
});

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = "section" | "subsection" | "compact";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level rendered in the document outline. */
  level?: TitleLevel;
  /** Visual title size. Defaults from the heading level. */
  size?: TitleSize;
  /** Small label shown above the title. */
  eyebrow?: ReactNode;
  children: ReactNode;
}

const titleSizeByLevel: Record<TitleLevel, "page" | TitleSize> = {
  1: "page",
  2: "section",
  3: "subsection",
  4: "compact",
  5: "compact",
  6: "compact",
};

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { level = 2, size, eyebrow, className, children, ...props },
  ref,
) {
  const visualSize = size ?? titleSizeByLevel[level];
  const heading = createElement(
    `h${level}`,
    {
      ref,
      className: cx("mds-title-text", `mds-title-text--${visualSize}`, className),
      ...props,
    },
    children,
  );

  if (!eyebrow) {
    return heading;
  }

  return (
    <>
      <p className="mds-eyebrow">{eyebrow}</p>
      {heading}
    </>
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

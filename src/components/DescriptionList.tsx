import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./description-list.css";

export type DescriptionListColumns = 1 | 2 | 3;
export type DescriptionListOrientation = "stacked" | "inline";

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** Column count for wider summary layouts. */
  columns?: DescriptionListColumns;
  /** Term/value arrangement within each item. */
  orientation?: DescriptionListOrientation;
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(function DescriptionList(
  { columns = 1, orientation = "stacked", className, children, ...props },
  ref,
) {
  return (
    <dl
      ref={ref}
      className={cx("mds-description-list", `mds-description-list--cols-${columns}`, `mds-description-list--${orientation}`, className)}
      {...props}
    >
      {children}
    </dl>
  );
});

export interface DescriptionItemProps extends HTMLAttributes<HTMLDivElement> {
  term: ReactNode;
  children: ReactNode;
}

export const DescriptionItem = forwardRef<HTMLDivElement, DescriptionItemProps>(function DescriptionItem(
  { term, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-description-item", className)} {...props}>
      <dt className="mds-description-item__term">{term}</dt>
      <dd className="mds-description-item__description">{children}</dd>
    </div>
  );
});

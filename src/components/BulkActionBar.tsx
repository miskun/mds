import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./bulk-action-bar.css";

export interface BulkActionBarProps extends HTMLAttributes<HTMLDivElement> {
  selectedCount: number;
  actions: ReactNode;
}

export const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(function BulkActionBar(
  { selectedCount, actions, className, ...props },
  ref,
) {
  if (selectedCount <= 0) return null;

  return (
    <div ref={ref} className={cx("mds-bulk-bar", className)} role="status" {...props}>
      <span>{selectedCount} selected</span>
      <div className="mds-bulk-bar__actions">{actions}</div>
    </div>
  );
});

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "./utils";
import "./tag.css";

export type TagTone = "neutral" | "accent" | "success" | "warning" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  removable?: boolean;
  removeLabel?: string;
  onRemove?: () => void;
  children: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag({ tone = "neutral", removable, removeLabel = "Remove tag", onRemove, className, children, ...props }, ref) {
  return (
    <span ref={ref} className={cx("mds-tag", `mds-tag--${tone}`, className)} {...props}>
      <span>{children}</span>
      {removable ? (
        <button className="mds-tag__remove" type="button" aria-label={removeLabel} onClick={onRemove}>
          <X size={12} />
        </button>
      ) : null}
    </span>
  );
});

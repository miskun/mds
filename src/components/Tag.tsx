import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "./utils";
import "./tag.css";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

export function Tag({ removable, onRemove, className, children, ...props }: TagProps) {
  return (
    <span className={cx("mds-tag", className)} {...props}>
      <span>{children}</span>
      {removable ? (
        <button className="mds-tag__remove" type="button" aria-label={`Remove ${children}`} onClick={onRemove}>
          <X size={12} />
        </button>
      ) : null}
    </span>
  );
}

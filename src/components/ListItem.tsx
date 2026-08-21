import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./list-item.css";

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  media?: ReactNode;
  meta?: ReactNode;
  action?: ReactNode;
}

export function ListItem({ title, description, media, meta, action, className, ...props }: ListItemProps) {
  return (
    <div className={cx("mds-list-item", className)} {...props}>
      {media ? <div className="mds-list-item__media">{media}</div> : null}
      <div className="mds-list-item__content">
        <div className="mds-list-item__topline">
          <strong>{title}</strong>
          {meta ? <span>{meta}</span> : null}
        </div>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="mds-list-item__action">{action}</div> : null}
    </div>
  );
}

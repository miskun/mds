import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./activity-feed.css";

export const ActivityFeed = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(function ActivityFeed({ className, ...props }, ref) {
  return <ol ref={ref} className={cx("mds-activity", className)} {...props} />;
});

export interface ActivityItemProps extends HTMLAttributes<HTMLLIElement> {
  title: string;
  meta?: string;
  icon?: ReactNode;
}

export const ActivityItem = forwardRef<HTMLLIElement, ActivityItemProps>(function ActivityItem(
  { title, meta, icon, className, children, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx("mds-activity__item", className)} {...props}>
      <span className="mds-activity__marker" aria-hidden="true">
        {icon}
      </span>
      <div className="mds-activity__content">
        <div className="mds-activity__topline">
          <strong>{title}</strong>
          {meta ? <span>{meta}</span> : null}
        </div>
        {children ? <div className="mds-activity__body">{children}</div> : null}
      </div>
    </li>
  );
});

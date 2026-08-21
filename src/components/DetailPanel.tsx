import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./detail-panel.css";

export interface DetailPanelProps extends HTMLAttributes<HTMLElement> {
  title: string;
  meta?: ReactNode;
  actions?: ReactNode;
}

export function DetailPanel({ title, meta, actions, className, children, ...props }: DetailPanelProps) {
  return (
    <aside className={cx("mds-detail", className)} {...props}>
      <header className="mds-detail__header">
        <div>
          <h3 className="mds-detail__title">{title}</h3>
          {meta ? <div className="mds-detail__meta">{meta}</div> : null}
        </div>
        {actions ? <div className="mds-detail__actions">{actions}</div> : null}
      </header>
      <div className="mds-detail__body">{children}</div>
    </aside>
  );
}

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card({ title, eyebrow, action, className, children, ...props }, ref) {
  return (
    <section ref={ref} className={cx("mds-card", className)} {...props}>
      {(title || eyebrow || action) && (
        <header className="mds-card__header">
          <div>
            {eyebrow ? <p className="mds-card__eyebrow">{eyebrow}</p> : null}
            {title ? <h3 className="mds-card__title">{title}</h3> : null}
          </div>
          {action ? <div className="mds-card__action">{action}</div> : null}
        </header>
      )}
      <div className="mds-card__body">{children}</div>
    </section>
  );
});

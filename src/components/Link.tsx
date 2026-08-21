import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { ExternalLink } from "lucide-react";
import { cx } from "./utils";
import "./link.css";

export type LinkVariant = "default" | "subtle" | "accent";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual treatment for the link. */
  variant?: LinkVariant;
  /** Marks the link as leaving the current product surface. */
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "default", external, target, rel, className, children, ...props },
  ref,
) {
  const externalRel = external ? ["noreferrer", rel].filter(Boolean).join(" ") : rel;
  const externalTarget = external ? (target ?? "_blank") : target;

  return (
    <a
      ref={ref}
      className={cx("mds-link", `mds-link--${variant}`, className)}
      target={externalTarget}
      rel={externalRel}
      {...props}
    >
      <span>{children}</span>
      {external ? <ExternalLink className="mds-link__external" size={13} aria-hidden="true" /> : null}
    </a>
  );
});

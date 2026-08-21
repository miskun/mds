import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./avatar.css";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Accessible name and initials source. */
  name: string;
  /** Image source. Initials are used when omitted. */
  src?: string;
  /** Semantic size within the active MDS target. */
  size?: AvatarSize;
  /** Optional presence status marker. */
  status?: AvatarStatus;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, src, size = "md", status, className, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cx("mds-avatar", `mds-avatar--${size}`, status && `mds-avatar--${status}`, className)} aria-label={name} {...props}>
      {src ? <img className="mds-avatar__image" src={src} alt="" /> : <span className="mds-avatar__initials">{getInitials(name)}</span>}
      {status ? <span className="mds-avatar__status" aria-hidden="true" /> : null}
    </span>
  );
});

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
}

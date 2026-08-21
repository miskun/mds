import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the action. */
  variant?: ButtonVariant;
  /** Semantic size within the active MDS target. */
  size?: ButtonSize;
  /** Leading icon rendered before the label. */
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, className, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cx("mds-button", `mds-button--${variant}`, `mds-button--${size}`, className)} {...props}>
      {icon ? <span className="mds-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the action. */
  variant?: ButtonVariant;
  /** Semantic size within the active MDS target. */
  size?: ButtonSize;
  /** Accessible name for the icon-only button. */
  label: string;
  /** Icon rendered as the button content. */
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "secondary", size = "md", label, icon, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx("mds-button", "mds-icon-button", `mds-button--${variant}`, `mds-button--${size}`, className)}
      aria-label={label}
      {...props}
    >
      <span className="mds-button__icon">{icon}</span>
    </button>
  );
});

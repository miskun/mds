import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
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

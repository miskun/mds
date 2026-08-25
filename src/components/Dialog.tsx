import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./dialog.css";

export interface DialogProps extends Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "children" | "title"> {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  overlayClassName?: string;
}

export const Dialog = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogProps>(function Dialog(
  {
    trigger,
    title,
    description,
    children,
    footer,
    open,
    defaultOpen,
    onOpenChange,
    className,
    overlayClassName,
    ...contentProps
  },
  ref,
) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cx("mds-dialog__overlay", overlayClassName)} />
        <DialogPrimitive.Content ref={ref} className={cx("mds-dialog", className)} {...contentProps}>
          <DialogHeader title={title} description={description} />
          <div className="mds-dialog__body">{children}</div>
          {footer ? <footer className="mds-dialog__footer">{footer}</footer> : null}
          <DialogPrimitive.Close asChild>
            <IconButton className="mds-dialog__close" size="sm" variant="ghost" label="Close dialog" icon={<X size={14} />} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export interface DrawerProps extends Omit<DialogProps, "trigger"> {
  trigger: ReactNode;
  side?: "left" | "right";
}

export const Drawer = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DrawerProps>(function Drawer(
  {
    trigger,
    title,
    description,
    children,
    footer,
    side = "right",
    open,
    defaultOpen,
    onOpenChange,
    className,
    overlayClassName,
    ...contentProps
  },
  ref,
) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cx("mds-dialog__overlay", overlayClassName)} />
        <DialogPrimitive.Content ref={ref} className={cx("mds-drawer", `mds-drawer--${side}`, className)} {...contentProps}>
          <DialogHeader title={title} description={description} />
          <div className="mds-dialog__body">{children}</div>
          {footer ? <footer className="mds-dialog__footer">{footer}</footer> : null}
          <DialogPrimitive.Close asChild>
            <IconButton className="mds-dialog__close" size="sm" variant="ghost" label="Close drawer" icon={<X size={14} />} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

function DialogHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mds-dialog__header">
      <DialogPrimitive.Title className="mds-dialog__title">{title}</DialogPrimitive.Title>
      {description ? <DialogPrimitive.Description className="mds-dialog__description">{description}</DialogPrimitive.Description> : null}
    </header>
  );
}

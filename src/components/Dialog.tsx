import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./dialog.css";

export interface DialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Dialog({ trigger, title, description, children, footer }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="mds-dialog__overlay" />
        <DialogPrimitive.Content className="mds-dialog">
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
}

export interface DrawerProps extends Omit<DialogProps, "trigger"> {
  trigger: ReactNode;
  side?: "left" | "right";
}

export function Drawer({ trigger, title, description, children, footer, side = "right" }: DrawerProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="mds-dialog__overlay" />
        <DialogPrimitive.Content className={cx("mds-drawer", `mds-drawer--${side}`)}>
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
}

function DialogHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mds-dialog__header">
      <DialogPrimitive.Title className="mds-dialog__title">{title}</DialogPrimitive.Title>
      {description ? <DialogPrimitive.Description className="mds-dialog__description">{description}</DialogPrimitive.Description> : null}
    </header>
  );
}

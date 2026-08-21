import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cx } from "./utils";
import "./dropdown-menu.css";

export const DropdownMenuRoot = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: DropdownPrimitive.DropdownMenuContentProps["align"];
  side?: DropdownPrimitive.DropdownMenuContentProps["side"];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function DropdownMenu({ trigger, children, align = "start", side = "bottom", open, defaultOpen, onOpenChange, className }: DropdownMenuProps) {
  return (
    <DropdownPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content className={cx("mds-menu", className)} side={side} align={align} sideOffset={8}>
          {children}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}

export interface MenuItemProps extends DropdownPrimitive.DropdownMenuItemProps {
  icon?: ReactNode;
  inset?: boolean;
}

export function MenuItem({ icon, inset, className, children, ...props }: MenuItemProps) {
  return (
    <DropdownPrimitive.Item className={cx("mds-menu__item", inset && "mds-menu__item--inset", className)} {...props}>
      {icon ? <span className="mds-menu__icon">{icon}</span> : null}
      <span>{children}</span>
    </DropdownPrimitive.Item>
  );
}

export function MenuCheckboxItem({ className, children, ...props }: DropdownPrimitive.DropdownMenuCheckboxItemProps) {
  return (
    <DropdownPrimitive.CheckboxItem className={cx("mds-menu__item", className)} {...props}>
      <span className="mds-menu__icon">
        <DropdownPrimitive.ItemIndicator>
          <Check size={14} />
        </DropdownPrimitive.ItemIndicator>
      </span>
      <span>{children}</span>
    </DropdownPrimitive.CheckboxItem>
  );
}

export function MenuSeparator({ className, ...props }: DropdownPrimitive.DropdownMenuSeparatorProps) {
  return <DropdownPrimitive.Separator className={cx("mds-menu__separator", className)} {...props} />;
}

export function MenuLabel({ className, children, ...props }: DropdownPrimitive.DropdownMenuLabelProps) {
  return (
    <DropdownPrimitive.Label className={cx("mds-menu__label", className)} {...props}>
      {children}
    </DropdownPrimitive.Label>
  );
}

export interface MenuSubProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function MenuSub({ trigger, children, open, defaultOpen, onOpenChange, className }: MenuSubProps) {
  return (
    <DropdownPrimitive.Sub open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DropdownPrimitive.SubTrigger className="mds-menu__item">
        <span>{trigger}</span>
        <ChevronRight className="mds-menu__chevron" size={14} />
      </DropdownPrimitive.SubTrigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.SubContent className={cx("mds-menu", className)} sideOffset={8}>
          {children}
        </DropdownPrimitive.SubContent>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Sub>
  );
}

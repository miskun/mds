import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import type { ElementRef, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./utils";
import "./checkbox.css";
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

export const MenuItem = forwardRef<ElementRef<typeof DropdownPrimitive.Item>, MenuItemProps>(function MenuItem(
  { icon, inset, className, children, ...props },
  ref,
) {
  return (
    <DropdownPrimitive.Item ref={ref} className={cx("mds-menu__item", inset && "mds-menu__item--inset", className)} {...props}>
      {icon ? <span className="mds-menu__icon">{icon}</span> : null}
      <span>{children}</span>
    </DropdownPrimitive.Item>
  );
});

export const MenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownPrimitive.CheckboxItem>,
  DropdownPrimitive.DropdownMenuCheckboxItemProps
>(function MenuCheckboxItem({ className, children, ...props }, ref) {
  const checked = props.checked === true;
  const indeterminate = props.checked === "indeterminate";

  return (
    <DropdownPrimitive.CheckboxItem ref={ref} className={cx("mds-menu__item", className)} {...props}>
      <span className="mds-menu__icon">
        <span className="mds-choice__box mds-menu__checkbox-box" data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"} />
      </span>
      <span>{children}</span>
    </DropdownPrimitive.CheckboxItem>
  );
});

export const MenuSeparator = forwardRef<
  ElementRef<typeof DropdownPrimitive.Separator>,
  DropdownPrimitive.DropdownMenuSeparatorProps
>(function MenuSeparator({ className, ...props }, ref) {
  return <DropdownPrimitive.Separator ref={ref} className={cx("mds-menu__separator", className)} {...props} />;
});

export const MenuLabel = forwardRef<ElementRef<typeof DropdownPrimitive.Label>, DropdownPrimitive.DropdownMenuLabelProps>(function MenuLabel(
  { className, children, ...props },
  ref,
) {
  return (
    <DropdownPrimitive.Label ref={ref} className={cx("mds-menu__label", className)} {...props}>
      {children}
    </DropdownPrimitive.Label>
  );
});

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

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
}

export function DropdownMenu({ trigger, children, align = "start" }: DropdownMenuProps) {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content className="mds-menu" align={align} sideOffset={8}>
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

export function MenuSeparator() {
  return <DropdownPrimitive.Separator className="mds-menu__separator" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <DropdownPrimitive.Label className="mds-menu__label">{children}</DropdownPrimitive.Label>;
}

export function MenuSub({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <DropdownPrimitive.Sub>
      <DropdownPrimitive.SubTrigger className="mds-menu__item">
        <span>{trigger}</span>
        <ChevronRight className="mds-menu__chevron" size={14} />
      </DropdownPrimitive.SubTrigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.SubContent className="mds-menu" sideOffset={8}>
          {children}
        </DropdownPrimitive.SubContent>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Sub>
  );
}

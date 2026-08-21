import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./popover.css";

export interface PopoverProps {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  side?: PopoverPrimitive.PopoverContentProps["side"];
  align?: PopoverPrimitive.PopoverContentProps["align"];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({ trigger, title, children, side = "bottom", align = "start", open, defaultOpen, onOpenChange, className }: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className={cx("mds-popover", className)} side={side} align={align} sideOffset={8}>
          {title ? (
            <header className="mds-popover__header">
              <h3 className="mds-popover__title">{title}</h3>
              <PopoverPrimitive.Close asChild>
                <IconButton size="sm" variant="ghost" label="Close popover" icon={<X size={14} />} />
              </PopoverPrimitive.Close>
            </header>
          ) : null}
          <div className="mds-popover__body">{children}</div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

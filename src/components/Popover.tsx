import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./popover.css";

export interface PopoverProps extends Omit<ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "children" | "title"> {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, PopoverProps>(function Popover(
  { trigger, title, children, side = "bottom", align = "start", sideOffset = 8, open, defaultOpen, onOpenChange, className, ...contentProps },
  ref,
) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content ref={ref} className={cx("mds-popover", className)} side={side} align={align} sideOffset={sideOffset} {...contentProps}>
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
});

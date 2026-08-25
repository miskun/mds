import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cloneElement, forwardRef, isValidElement } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactElement, ReactNode } from "react";
import { cx } from "./utils";
import "./tooltip.css";

export interface TooltipProps extends Omit<ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "children" | "content"> {
  content: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export const Tooltip = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipProps>(function Tooltip(
  { content, children, side = "top", sideOffset = 8, open, defaultOpen, onOpenChange, delayDuration = 350, className, ...contentProps },
  ref,
) {
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ title?: string }>, { title: undefined })
    : children;

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content ref={ref} className={cx("mds-tooltip", className)} side={side} sideOffset={sideOffset} {...contentProps}>
            {content}
            <TooltipPrimitive.Arrow className="mds-tooltip__arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { cx } from "./utils";
import "./tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipPrimitive.TooltipContentProps["side"];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  className?: string;
}

export function Tooltip({ content, children, side = "top", open, defaultOpen, onOpenChange, delayDuration = 350, className }: TooltipProps) {
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ title?: string }>, { title: undefined })
    : children;

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className={cx("mds-tooltip", className)} side={side} sideOffset={8}>
            {content}
            <TooltipPrimitive.Arrow className="mds-tooltip__arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

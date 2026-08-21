import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import "./tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipPrimitive.TooltipContentProps["side"];
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ title?: string }>, { title: undefined })
    : children;

  return (
    <TooltipPrimitive.Provider delayDuration={350}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="mds-tooltip" side={side} sideOffset={8}>
            {content}
            <TooltipPrimitive.Arrow className="mds-tooltip__arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

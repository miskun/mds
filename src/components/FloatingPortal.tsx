import { useLayoutEffect, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

interface FloatingPortalProps {
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  className: string;
  minWidth?: number;
  open: boolean;
}

interface FloatingLayout {
  surface?: string;
  style: CSSProperties;
  target?: string;
}

type FloatingStyle = CSSProperties & {
  "--mds-floating-listbox-max-height": string;
};

export function FloatingPortal({ anchorRef, children, className, minWidth = 260, open }: FloatingPortalProps) {
  const [layout, setLayout] = useState<FloatingLayout | null>(null);

  useLayoutEffect(() => {
    if (!open || typeof document === "undefined") {
      setLayout(null);
      return;
    }

    function updateLayout() {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const controlGap = Number.parseFloat(getComputedStyle(anchor).getPropertyValue("--mds-control-gap")) || 8;
      const viewportPadding = 8;
      const below = window.innerHeight - rect.bottom - controlGap - viewportPadding;
      const above = rect.top - controlGap - viewportPadding;
      const placeAbove = below < 180 && above > below;
      const availableHeight = Math.max(120, placeAbove ? above : below);
      const width = Math.max(rect.width, minWidth);
      const maxLeft = Math.max(viewportPadding, window.innerWidth - width - viewportPadding);
      const left = Math.min(Math.max(viewportPadding, rect.left), maxLeft);
      const resolvedTarget = getComputedStyle(anchor).getPropertyValue("--mds-target").trim();
      const target = anchor.closest<HTMLElement>("[data-mds-target]")?.dataset.mdsTarget ?? resolvedTarget;
      const surface = anchor.closest<HTMLElement>("[data-mds-surface]")?.dataset.mdsSurface;

      const style: FloatingStyle = {
        left,
        minWidth,
        width: rect.width,
        ...(placeAbove ? { bottom: window.innerHeight - rect.top + controlGap } : { top: rect.bottom + controlGap }),
        "--mds-floating-listbox-max-height": `${Math.min(340, availableHeight)}px`,
      };

      setLayout({ surface, target, style });
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, true);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout, true);
    };
  }, [anchorRef, minWidth, open]);

  if (!open || !layout || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={className} style={layout.style} data-mds-target={layout.target} data-mds-surface={layout.surface}>
      {children}
    </div>,
    document.body,
  );
}

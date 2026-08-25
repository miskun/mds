import { forwardRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { cx, getControllableValue } from "./utils";
import "./detail-panel.css";

export interface DetailPanelProps extends HTMLAttributes<HTMLElement> {
  title: string;
  meta?: ReactNode;
  actions?: ReactNode;
  resizable?: boolean;
  resizeEdge?: "start" | "end";
  width?: number;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onWidthChange?: (width: number) => void;
  onWidthCommit?: (width: number) => void;
}

export const DetailPanel = forwardRef<HTMLElement, DetailPanelProps>(function DetailPanel(
  {
    title,
    meta,
    actions,
    resizable,
    resizeEdge = "start",
    width,
    defaultWidth = 320,
    minWidth = 240,
    maxWidth = 560,
    onWidthChange,
    onWidthCommit,
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const [uncontrolledWidth, setUncontrolledWidth] = useState(defaultWidth);
  const currentWidth = getControllableValue(width, uncontrolledWidth);
  const panelStyle = resizable ? ({ ...style, "--mds-detail-width": `${currentWidth}px` } as CSSProperties) : style;

  function setPanelWidth(nextWidth: number) {
    const clampedWidth = clampWidth(nextWidth, minWidth, maxWidth);
    setUncontrolledWidth(clampedWidth);
    onWidthChange?.(clampedWidth);
    return clampedWidth;
  }

  function startResize(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    const handle = event.currentTarget;
    const startX = event.clientX;
    const startWidth = currentWidth;
    let latestWidth = currentWidth;

    function resize(nextEvent: globalThis.PointerEvent) {
      const delta = nextEvent.clientX - startX;
      latestWidth = setPanelWidth(startWidth + (resizeEdge === "start" ? -delta : delta));
    }

    function stopResize(nextEvent: globalThis.PointerEvent) {
      handle.removeEventListener("pointermove", resize);
      handle.removeEventListener("pointerup", stopResize);
      handle.removeEventListener("pointercancel", stopResize);
      if (handle.hasPointerCapture?.(nextEvent.pointerId)) handle.releasePointerCapture(nextEvent.pointerId);
      onWidthCommit?.(latestWidth);
    }

    handle.setPointerCapture?.(event.pointerId);
    handle.addEventListener("pointermove", resize);
    handle.addEventListener("pointerup", stopResize, { once: true });
    handle.addEventListener("pointercancel", stopResize, { once: true });
  }

  function resizeWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const keyDirection = event.key === "ArrowRight" ? 1 : -1;
    const nextWidth = setPanelWidth(currentWidth + (resizeEdge === "start" ? -keyDirection : keyDirection) * 8);
    onWidthCommit?.(nextWidth);
  }

  return (
    <aside ref={ref} className={cx("mds-detail", resizable && "mds-detail--resizable", className)} style={panelStyle} {...props}>
      {resizable ? (
        <button
          className={cx("mds-detail__resize", `mds-detail__resize--${resizeEdge}`)}
          type="button"
          role="separator"
          aria-label={`Resize ${title} panel`}
          aria-orientation="vertical"
          aria-valuemax={maxWidth}
          aria-valuemin={minWidth}
          aria-valuenow={currentWidth}
          onPointerDown={startResize}
          onKeyDown={resizeWithKeyboard}
        />
      ) : null}
      <header className="mds-detail__header">
        <div>
          <h3 className="mds-detail__title">{title}</h3>
          {meta ? <div className="mds-detail__meta">{meta}</div> : null}
        </div>
        {actions ? <div className="mds-detail__actions">{actions}</div> : null}
      </header>
      <div className="mds-detail__body">{children}</div>
    </aside>
  );
});

function clampWidth(width: number, minWidth: number, maxWidth: number) {
  return Math.min(maxWidth, Math.max(minWidth, Math.round(width)));
}

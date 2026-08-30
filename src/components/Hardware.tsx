import { forwardRef } from "react";
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./hardware.css";

export type HardwareTone = "accent" | "neutral";

export interface HardwareWorkbenchProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const HardwareWorkbench = forwardRef<HTMLDivElement, HardwareWorkbenchProps>(function HardwareWorkbench(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-hardware-workbench", className)} {...props}>
      <div className="mds-hardware-workbench__grid" aria-hidden="true" />
      {children}
    </div>
  );
});

export interface HardwarePanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible heading rendered on the mounted panel. */
  heading?: ReactNode;
  children?: ReactNode;
}

export const HardwarePanel = forwardRef<HTMLDivElement, HardwarePanelProps>(function HardwarePanel(
  { heading, className, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cx("mds-hardware-panel", className)} data-mds-surface="panel" {...props}>
      {heading ? <div className="mds-hardware-panel__title">{heading}</div> : null}
      <div className="mds-hardware-panel__body">{children}</div>
    </section>
  );
});

export interface HardwareBayProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children?: ReactNode;
}

export const HardwareBay = forwardRef<HTMLDivElement, HardwareBayProps>(function HardwareBay(
  { label, className, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cx("mds-hardware-bay", className)} {...props}>
      <div className="mds-hardware-bay__content">{children}</div>
      {label ? <div className="mds-hardware-label">{label}</div> : null}
    </section>
  );
});

export interface HardwareListItem {
  id: string;
  eyebrow?: ReactNode;
  label: ReactNode;
  selected?: boolean;
}

export interface HardwareListProps extends HTMLAttributes<HTMLDivElement> {
  items: HardwareListItem[];
  label?: string;
}

export const HardwareList = forwardRef<HTMLDivElement, HardwareListProps>(function HardwareList(
  { items, label = "Hardware list", className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-hardware-list", className)} role="listbox" aria-label={label} {...props}>
      <div className="mds-hardware-list__viewport">
        {items.map((item) => (
          <div
            key={item.id}
            className={cx("mds-hardware-list__item", item.selected && "mds-hardware-list__item--selected")}
            role="option"
            aria-selected={item.selected || undefined}
          >
            <span className="mds-hardware-list__eyebrow">{item.eyebrow}</span>
            <span className="mds-hardware-list__label">{item.label}</span>
            <span className="mds-hardware-list__chevron" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
});

export interface HardwareDisplayProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: ReactNode;
  value?: ReactNode;
  unit?: ReactNode;
  children?: ReactNode;
}

export const HardwareDisplay = forwardRef<HTMLDivElement, HardwareDisplayProps>(function HardwareDisplay(
  { eyebrow, value, unit, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("mds-hardware-display", className)} {...props}>
      {eyebrow ? <div className="mds-hardware-display__eyebrow">{eyebrow}</div> : null}
      {value ? (
        <div className="mds-hardware-display__readout">
          <span className="mds-hardware-display__value">{value}</span>
          {unit ? <span className="mds-hardware-display__unit">{unit}</span> : null}
        </div>
      ) : null}
      {children ? <div className="mds-hardware-display__content">{children}</div> : null}
    </div>
  );
});

export interface HardwareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: HardwareTone;
  size?: "sm" | "md";
}

export const HardwareButton = forwardRef<HTMLButtonElement, HardwareButtonProps>(function HardwareButton(
  { active = false, tone = "accent", size = "md", className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx("mds-hardware-button", `mds-hardware-button--${size}`, active && "mds-hardware-button--active", className)}
      data-tone={tone}
      data-active={active || undefined}
      type="button"
      {...props}
    >
      <span>{children}</span>
    </button>
  );
});

export interface HardwarePadProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: HardwareTone;
}

export const HardwarePad = forwardRef<HTMLButtonElement, HardwarePadProps>(function HardwarePad(
  { active = false, tone = "accent", className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx("mds-hardware-pad", active && "mds-hardware-pad--active", className)}
      data-tone={tone}
      data-active={active || undefined}
      type="button"
      {...props}
    >
      {children ? <span className="mds-hardware-pad__label">{children}</span> : null}
    </button>
  );
});

export interface HardwareKnobProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: number;
  tone?: HardwareTone;
  size?: "sm" | "md" | "lg";
}

export const HardwareKnob = forwardRef<HTMLDivElement, HardwareKnobProps>(function HardwareKnob(
  { label, value = 0.62, tone = "accent", size = "md", className, style, ...props },
  ref,
) {
  const clampedValue = Math.max(0, Math.min(1, value));
  const knobStyle = {
    "--mds-hardware-knob-angle": `${-130 + clampedValue * 260}deg`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cx("mds-hardware-knob", `mds-hardware-knob--${size}`, className)}
      data-tone={tone}
      style={knobStyle}
      {...props}
    >
      <div className="mds-hardware-knob__scale" aria-hidden="true" />
      <div className="mds-hardware-knob__body" aria-hidden="true">
        <span className="mds-hardware-knob__pointer" />
      </div>
      {label ? <div className="mds-hardware-label">{label}</div> : null}
    </div>
  );
});

export interface HardwareSliderProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: number;
  orientation?: "horizontal" | "vertical";
}

export const HardwareSlider = forwardRef<HTMLDivElement, HardwareSliderProps>(function HardwareSlider(
  { label, value = 0.5, orientation = "horizontal", className, style, ...props },
  ref,
) {
  const clampedValue = Math.max(0, Math.min(1, value));
  const sliderStyle = {
    "--mds-hardware-slider-value": clampedValue,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cx("mds-hardware-slider", `mds-hardware-slider--${orientation}`, className)}
      style={sliderStyle}
      {...props}
    >
      <div className="mds-hardware-slider__scale" aria-hidden="true" />
      <div className="mds-hardware-slider__rail" aria-hidden="true">
        <span className="mds-hardware-slider__fill" />
        <span className="mds-hardware-slider__thumb" />
      </div>
      {label ? <div className="mds-hardware-label">{label}</div> : null}
    </div>
  );
});

export interface HardwareVUMeterProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: number;
}

export const HardwareVUMeter = forwardRef<HTMLDivElement, HardwareVUMeterProps>(function HardwareVUMeter(
  { label = "VU METER", value = 0.82, className, style, ...props },
  ref,
) {
  const clampedValue = Math.max(0, Math.min(1, value));
  const meterStyle = {
    "--mds-hardware-meter-angle": `${-38 + clampedValue * 76}deg`,
    ...style,
  } as CSSProperties;

  return (
    <div ref={ref} className={cx("mds-hardware-meter", className)} style={meterStyle} {...props}>
      <div className="mds-hardware-meter__glass">
        <svg className="mds-hardware-meter__face" viewBox="0 0 320 150" role="img" aria-label={typeof label === "string" ? label : "VU meter"}>
          <path d="M48 92 C98 30 222 30 272 92" fill="none" pathLength="100" />
          {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96].map((mark) => (
            <line key={mark} className="mds-hardware-meter__tick" x1="160" y1="36" x2="160" y2="48" pathLength="100" transform={`rotate(${-40 + mark * 0.833} 160 116)`} />
          ))}
          <text x="160" y="98" textAnchor="middle">
            {label}
          </text>
          <line className="mds-hardware-meter__needle" x1="160" y1="118" x2="258" y2="48" />
          <circle cx="160" cy="118" r="5" />
        </svg>
      </div>
    </div>
  );
});

import { createContext, forwardRef, useContext, useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cx, getControllableValue, moveFocusWithin } from "./utils";
import "./segmented-control.css";

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface SegmentedControlContextValue {
  value?: string;
  setValue: (value: string) => void;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { children, label = "Options", value, defaultValue, onValueChange, className, onKeyDown, ...props },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = getControllableValue(value, uncontrolledValue);

  function setValue(nextValue: string) {
    setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <SegmentedControlContext.Provider value={{ value: currentValue, setValue }}>
      <div
        ref={ref}
        className={cx("mds-segmented", className)}
        role="group"
        aria-label={label}
        onKeyDown={(event) => {
          handleSegmentedKeyDown(event);
          onKeyDown?.(event);
        }}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
});

export interface SegmentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  active?: boolean;
}

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(function Segment(
  { value, active, className, onClick, type = "button", tabIndex, ...props },
  ref,
) {
  const context = useContext(SegmentedControlContext);
  const selected = value !== undefined && context?.value !== undefined ? context.value === value : active;
  const controlledTabIndex = value !== undefined && context?.value !== undefined ? (selected ? 0 : -1) : tabIndex;

  return (
    <button
      ref={ref}
      type={type}
      className={cx("mds-segment", selected && "mds-segment--active", className)}
      aria-pressed={selected}
      tabIndex={controlledTabIndex}
      onClick={(event) => {
        if (value !== undefined) context?.setValue(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
});

function handleSegmentedKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  moveFocusWithin(event, ".mds-segment:not(:disabled)");
}

import { createContext, forwardRef, useContext, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import { getControllableValue } from "./utils";
import "./segmented-control.css";

export interface SegmentedControlProps {
  children: ReactNode;
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

export function SegmentedControl({ children, label = "Options", value, defaultValue, onValueChange }: SegmentedControlProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = getControllableValue(value, uncontrolledValue);

  function setValue(nextValue: string) {
    setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <SegmentedControlContext.Provider value={{ value: currentValue, setValue }}>
      <div className="mds-segmented" role="group" aria-label={label}>
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export interface SegmentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  active?: boolean;
}

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(function Segment(
  { value, active, className, onClick, type = "button", ...props },
  ref,
) {
  const context = useContext(SegmentedControlContext);
  const selected = value !== undefined && context?.value !== undefined ? context.value === value : active;

  return (
    <button
      ref={ref}
      type={type}
      className={cx("mds-segment", selected && "mds-segment--active", className)}
      aria-pressed={selected}
      onClick={(event) => {
        if (value !== undefined) context?.setValue(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
});

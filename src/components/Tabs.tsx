import { createContext, forwardRef, useContext, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import { getControllableValue } from "./utils";
import "./tabs.css";

export interface TabsProps {
  children: ReactNode;
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ children, label = "Sections", value, defaultValue, onValueChange }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = getControllableValue(value, uncontrolledValue);

  function setValue(nextValue: string) {
    setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className="mds-tabs" role="tablist" aria-label={label}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  active?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ value, active, className, onClick, type = "button", ...props }, ref) {
  const context = useContext(TabsContext);
  const selected = value !== undefined && context?.value !== undefined ? context.value === value : active;

  return (
    <button
      ref={ref}
      type={type}
      className={cx("mds-tab", selected && "mds-tab--active", className)}
      role="tab"
      aria-selected={selected}
      onClick={(event) => {
        if (value !== undefined) context?.setValue(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
});

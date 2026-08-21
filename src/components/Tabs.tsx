import { createContext, forwardRef, useContext, useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cx, getControllableValue, moveFocusWithin } from "./utils";
import "./tabs.css";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tab list. */
  label?: string;
  /** Controlled selected tab value. */
  value?: string;
  /** Initial selected tab value. */
  defaultValue?: string;
  /** Called when a tab with a value is selected. */
  onValueChange?: (value: string) => void;
}

interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { children, label = "Sections", value, defaultValue, onValueChange, className, onKeyDown, ...props },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = getControllableValue(value, uncontrolledValue);

  function setValue(nextValue: string) {
    setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div
        ref={ref}
        className={cx("mds-tabs", className)}
        role="tablist"
        aria-label={label}
        onKeyDown={(event) => {
          handleTabListKeyDown(event);
          onKeyDown?.(event);
        }}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value used by controlled or uncontrolled tabs. */
  value?: string;
  /** Manual active state when Tabs does not control value. */
  active?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, active, className, onClick, type = "button", tabIndex, ...props },
  ref,
) {
  const context = useContext(TabsContext);
  const selected = value !== undefined && context?.value !== undefined ? context.value === value : active;
  const controlledTabIndex = value !== undefined && context?.value !== undefined ? (selected ? 0 : -1) : tabIndex;

  return (
    <button
      ref={ref}
      type={type}
      className={cx("mds-tab", selected && "mds-tab--active", className)}
      role="tab"
      aria-selected={selected}
      tabIndex={controlledTabIndex}
      onClick={(event) => {
        if (value !== undefined) context?.setValue(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
});

function handleTabListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  moveFocusWithin(event, '[role="tab"]:not(:disabled)');
}

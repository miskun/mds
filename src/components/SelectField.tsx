import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./select-field.css";

export interface SelectFieldOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
  required?: boolean;
  options?: SelectFieldOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  controlClassName?: string;
}

export const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(function SelectField(
  {
    label,
    hint,
    error,
    invalid,
    required,
    options = [],
    value,
    defaultValue = "",
    onValueChange,
    placeholder = "Choose option",
    disabled,
    clearable = false,
    id,
    className,
    controlClassName,
    onBlur,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listboxId = `${selectId}-listbox`;
  const messageId = error || hint ? `${selectId}-message` : undefined;
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const hasSelection = Boolean(selectedOption);
  const activeOption = activeIndex >= 0 ? options[activeIndex] : undefined;

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      return;
    }

    if (!open) {
      setActiveIndex(-1);
      return;
    }

    const selectedIndex = selectedOption ? options.findIndex((option) => option.value === selectedOption.value) : -1;
    setActiveIndex((currentIndex) => {
      if (currentIndex >= 0 && options[currentIndex] && !options[currentIndex].disabled) {
        return currentIndex;
      }

      return findNextOptionIndex(options, selectedIndex, 1);
    });
  }, [disabled, open, options, selectedOption]);

  function commitValue(nextValue: string) {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function selectOption(option: SelectFieldOption | undefined) {
    if (!option || disabled || option.disabled) {
      return;
    }

    commitValue(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function clearSelection() {
    if (disabled) {
      return;
    }

    commitValue("");
    setOpen(false);
    triggerRef.current?.focus();
  }

  function optionId(index: number) {
    return `${listboxId}-option-${index}`;
  }

  return (
    <Field className={className} label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={selectId} messageId={messageId}>
      <div
        ref={ref}
        className={cx(
          "mds-select-field",
          open && "mds-select-field--open",
          invalidState && "mds-select-field--invalid",
          disabled && "mds-select-field--disabled",
          controlClassName,
        )}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        {...props}
        aria-disabled={disabled || undefined}
      >
        <div className="mds-select-field__control">
          <button
            ref={triggerRef}
            id={selectId}
            className={cx("mds-select-field__trigger", !hasSelection && "mds-select-field__trigger--placeholder")}
            type="button"
            role="combobox"
            aria-controls={listboxId}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-invalid={invalidState || undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            disabled={disabled}
            onClick={() => setOpen((nextOpen) => !nextOpen)}
            onKeyDown={(event) => {
              if (disabled) {
                return;
              }

              if (event.key === "Escape") {
                setOpen(false);
                event.preventDefault();
                return;
              }

              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                setOpen(true);
                setActiveIndex((currentIndex) => findNextOptionIndex(options, currentIndex, event.key === "ArrowDown" ? 1 : -1));
                event.preventDefault();
                return;
              }

              if (event.key === "Home" || event.key === "End") {
                setOpen(true);
                setActiveIndex(findEdgeOptionIndex(options, event.key === "Home" ? "first" : "last"));
                event.preventDefault();
                return;
              }

              if ((event.key === "Enter" || event.key === " ") && open) {
                selectOption(activeOption);
                event.preventDefault();
              }
            }}
          >
            {selectedOption?.label ?? placeholder}
          </button>
          {clearable && hasSelection ? (
            <button className="mds-select-field__clear" type="button" aria-label="Clear selection" disabled={disabled} onClick={clearSelection}>
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
          <button
            className="mds-select-field__toggle"
            type="button"
            aria-label="Toggle options"
            disabled={disabled}
            onClick={() => setOpen((nextOpen) => !nextOpen)}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
        {open ? (
          <div className="mds-select-field__popover">
            <div className="mds-select-field__listbox" id={listboxId} role="listbox">
              {options.map((option, index) => {
                const selected = option.value === currentValue;
                const active = index === activeIndex;

                return (
                  <button
                    id={optionId(index)}
                    className={cx("mds-select-field__option", active && "mds-select-field__option--active")}
                    type="button"
                    key={option.value}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    disabled={option.disabled}
                    tabIndex={-1}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => {
                      if (!option.disabled) {
                        setActiveIndex(index);
                      }
                    }}
                    onClick={() => selectOption(option)}
                  >
                    <span className="mds-select-field__check">{selected ? <Check size={14} aria-hidden="true" /> : null}</span>
                    <span className="mds-select-field__option-copy">
                      <span className="mds-select-field__option-label">{option.label}</span>
                      {option.description ? <span className="mds-select-field__option-description">{option.description}</span> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Field>
  );
});

function findNextOptionIndex(options: SelectFieldOption[], currentIndex: number, direction: 1 | -1) {
  if (!options.length) {
    return -1;
  }

  for (let step = 1; step <= options.length; step += 1) {
    const nextIndex = (currentIndex + step * direction + options.length) % options.length;
    if (!options[nextIndex].disabled) {
      return nextIndex;
    }
  }

  return -1;
}

function findEdgeOptionIndex(options: SelectFieldOption[], edge: "first" | "last") {
  const start = edge === "first" ? -1 : options.length;
  const direction = edge === "first" ? 1 : -1;
  return findNextOptionIndex(options, start, direction);
}

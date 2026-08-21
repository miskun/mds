import { forwardRef, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Field } from "./Field";
import { cx } from "./utils";
import "./combo-box.css";

export interface ComboBoxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

type ComboBoxValue = string | string[];

export interface ComboBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
  required?: boolean;
  options?: ComboBoxOption[];
  value?: ComboBoxValue;
  defaultValue?: ComboBoxValue;
  onValueChange?: (value: ComboBoxValue) => void;
  multiple?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
}

export const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(function ComboBox(
  {
    label,
    hint,
    error,
    invalid,
    required,
    options = [],
    value,
    defaultValue,
    onValueChange,
    multiple,
    placeholder = "Search options",
    emptyMessage = "No options found",
    loading,
    disabled,
    clearable = true,
    id,
    className,
    onBlur,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const comboId = id ?? generatedId;
  const listboxId = `${comboId}-listbox`;
  const messageId = error || hint ? `${comboId}-message` : undefined;
  const invalidState = invalid || Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState<ComboBoxValue>(defaultValue ?? (multiple ? [] : ""));
  const currentValue = value ?? internalValue;
  const selectedValues = multiple ? toArray(currentValue) : currentValue ? [String(currentValue)] : [];
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const selectedLabel = selectedOptions[0]?.label;
  const inputValue = multiple ? query : open ? query : selectedLabel ?? query;
  const visibleOptions = useMemo(() => filterOptions(options, query), [options, query]);
  const groupedOptions = groupOptions(visibleOptions);
  const hasSelection = selectedValues.length > 0;
  const activeOption = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined;

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      return;
    }

    if (!open) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex((currentIndex) => {
      if (currentIndex >= 0 && visibleOptions[currentIndex] && !visibleOptions[currentIndex].disabled) {
        return currentIndex;
      }

      return findNextOptionIndex(visibleOptions, -1, 1);
    });
  }, [disabled, open, visibleOptions]);

  function commitValue(nextValue: ComboBoxValue) {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function selectOption(option: ComboBoxOption) {
    if (disabled || option.disabled) {
      return;
    }

    if (multiple) {
      const nextValues = selectedValues.includes(option.value)
        ? selectedValues.filter((selectedValue) => selectedValue !== option.value)
        : [...selectedValues, option.value];
      commitValue(nextValues);
      setQuery("");
      setOpen(true);
      setActiveIndex(visibleOptions.findIndex((visibleOption) => visibleOption.value === option.value));
      return;
    }

    commitValue(option.value);
    setQuery("");
    setOpen(false);
  }

  function removeValue(valueToRemove: string) {
    if (disabled) {
      return;
    }

    commitValue(selectedValues.filter((selectedValue) => selectedValue !== valueToRemove));
  }

  function clearSelection() {
    if (disabled) {
      return;
    }

    commitValue(multiple ? [] : "");
    setQuery("");
  }

  function optionId(index: number) {
    return `${listboxId}-option-${index}`;
  }

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={comboId} messageId={messageId}>
      <div
        ref={ref}
        className={cx(
          "mds-combo",
          open && "mds-combo--open",
          invalidState && "mds-combo--invalid",
          disabled && "mds-combo--disabled",
          className,
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
        {multiple && selectedOptions.length > 0 ? (
          <div className="mds-combo__tags" aria-label="Selected options">
            {selectedOptions.map((option) => (
              <span className="mds-combo__tag" key={option.value}>
                <span>{option.label}</span>
                <button type="button" aria-label={`Remove ${option.label}`} disabled={disabled} onClick={() => removeValue(option.value)}>
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <div className="mds-combo__control">
          <Search className="mds-combo__search-icon" aria-hidden="true" />
          <input
            id={comboId}
            className="mds-combo__input"
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={open}
            aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
            aria-invalid={invalidState || undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            disabled={disabled}
            placeholder={placeholder}
            value={inputValue}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (!multiple) {
                setQuery("");
              }
              setOpen(true);
            }}
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
                setActiveIndex((currentIndex) => findNextOptionIndex(visibleOptions, currentIndex, event.key === "ArrowDown" ? 1 : -1));
                event.preventDefault();
                return;
              }

              if (event.key === "Home" || event.key === "End") {
                setOpen(true);
                setActiveIndex(findEdgeOptionIndex(visibleOptions, event.key === "Home" ? "first" : "last"));
                event.preventDefault();
                return;
              }

              if (event.key === "Enter" && open && activeOption) {
                selectOption(activeOption);
                event.preventDefault();
              }
            }}
          />
          {clearable && hasSelection ? (
            <button className="mds-combo__clear" type="button" aria-label="Clear selection" disabled={disabled} onClick={clearSelection}>
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
          <button
            className="mds-combo__toggle"
            type="button"
            aria-label="Toggle options"
            disabled={disabled}
            onClick={() => setOpen((nextOpen) => !nextOpen)}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
        {open ? (
          <div className="mds-combo__popover">
            <div className="mds-combo__listbox" id={listboxId} role="listbox" aria-multiselectable={multiple || undefined}>
              {loading ? (
                <div className="mds-combo__empty" role="status">Loading options</div>
              ) : visibleOptions.length === 0 ? (
                <div className="mds-combo__empty">{emptyMessage}</div>
              ) : (
                groupedOptions.map((group) => (
                  <div className="mds-combo__group" key={group.label}>
                    {group.label ? <div className="mds-combo__group-label">{group.label}</div> : null}
                    {group.options.map((option) => {
                      const optionIndex = visibleOptions.findIndex((visibleOption) => visibleOption.value === option.value);
                      const selected = selectedValues.includes(option.value);
                      const active = optionIndex === activeIndex;

                      return (
                        <button
                          id={optionId(optionIndex)}
                          className={cx("mds-combo__option", active && "mds-combo__option--active")}
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
                              setActiveIndex(optionIndex);
                            }
                          }}
                          onClick={() => selectOption(option)}
                        >
                          <span className="mds-combo__check">{selected ? <Check size={14} aria-hidden="true" /> : null}</span>
                          <span className="mds-combo__option-copy">
                            <span className="mds-combo__option-label">{option.label}</span>
                            {option.description ? <span className="mds-combo__option-description">{option.description}</span> : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Field>
  );
});

function toArray(value: ComboBoxValue) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function filterOptions(options: ComboBoxOption[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  return options.filter((option) => `${option.label} ${option.description ?? ""} ${option.group ?? ""}`.toLowerCase().includes(normalizedQuery));
}

function groupOptions(options: ComboBoxOption[]) {
  const groups = new Map<string, ComboBoxOption[]>();

  for (const option of options) {
    const group = option.group ?? "";
    groups.set(group, [...(groups.get(group) ?? []), option]);
  }

  return Array.from(groups, ([label, groupOptions]) => ({ label, options: groupOptions }));
}

function findNextOptionIndex(options: ComboBoxOption[], currentIndex: number, direction: 1 | -1) {
  if (!options.length) {
    return -1;
  }

  for (let offset = 1; offset <= options.length; offset += 1) {
    const nextIndex = (currentIndex + offset * direction + options.length) % options.length;
    if (!options[nextIndex].disabled) {
      return nextIndex;
    }
  }

  return -1;
}

function findEdgeOptionIndex(options: ComboBoxOption[], edge: "first" | "last") {
  const startIndex = edge === "first" ? -1 : 0;
  const direction = edge === "first" ? 1 : -1;
  return findNextOptionIndex(options, startIndex, direction);
}

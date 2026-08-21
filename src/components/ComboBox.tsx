import { useId, useMemo, useState } from "react";
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
  clearable?: boolean;
}

export function ComboBox({
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
  clearable = true,
  id,
  className,
  onBlur,
  ...props
}: ComboBoxProps) {
  const generatedId = useId();
  const comboId = id ?? generatedId;
  const listboxId = `${comboId}-listbox`;
  const messageId = error || hint ? `${comboId}-message` : undefined;
  const invalidState = invalid || Boolean(error);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState<ComboBoxValue>(defaultValue ?? (multiple ? [] : ""));
  const currentValue = value ?? internalValue;
  const selectedValues = multiple ? toArray(currentValue) : currentValue ? [String(currentValue)] : [];
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const selectedLabel = selectedOptions[0]?.label;
  const inputValue = multiple ? query : open ? query : selectedLabel ?? query;
  const visibleOptions = useMemo(() => filterOptions(options, query), [options, query]);
  const groupedOptions = groupOptions(visibleOptions);
  const hasSelection = selectedValues.length > 0;

  function commitValue(nextValue: ComboBoxValue) {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function selectOption(option: ComboBoxOption) {
    if (option.disabled) {
      return;
    }

    if (multiple) {
      const nextValues = selectedValues.includes(option.value)
        ? selectedValues.filter((selectedValue) => selectedValue !== option.value)
        : [...selectedValues, option.value];
      commitValue(nextValues);
      setQuery("");
      setOpen(true);
      return;
    }

    commitValue(option.value);
    setQuery("");
    setOpen(false);
  }

  function removeValue(valueToRemove: string) {
    commitValue(selectedValues.filter((selectedValue) => selectedValue !== valueToRemove));
  }

  function clearSelection() {
    commitValue(multiple ? [] : "");
    setQuery("");
  }

  return (
    <Field label={label} hint={hint} error={error} required={required} invalid={invalidState} htmlFor={comboId} messageId={messageId}>
      <div
        className={cx("mds-combo", open && "mds-combo--open", invalidState && "mds-combo--invalid", className)}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        {...props}
      >
        {multiple && selectedOptions.length > 0 ? (
          <div className="mds-combo__tags" aria-label="Selected options">
            {selectedOptions.map((option) => (
              <span className="mds-combo__tag" key={option.value}>
                <span>{option.label}</span>
                <button type="button" aria-label={`Remove ${option.label}`} onClick={() => removeValue(option.value)}>
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
            aria-invalid={invalidState || undefined}
            aria-describedby={messageId}
            aria-required={required || undefined}
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
              if (event.key === "Escape") {
                setOpen(false);
              }
            }}
          />
          {clearable && hasSelection ? (
            <button className="mds-combo__clear" type="button" aria-label="Clear selection" onClick={clearSelection}>
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
          <button className="mds-combo__toggle" type="button" aria-label="Toggle options" onClick={() => setOpen((nextOpen) => !nextOpen)}>
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
                      const selected = selectedValues.includes(option.value);

                      return (
                        <button
                          className="mds-combo__option"
                          type="button"
                          key={option.value}
                          role="option"
                          aria-selected={selected}
                          disabled={option.disabled}
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
}

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

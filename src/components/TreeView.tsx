import { forwardRef, useState } from "react";
import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./utils";
import "./tree-view.css";

export interface TreeViewProps extends HTMLAttributes<HTMLUListElement> {
  /** Accessible label for the tree. */
  label?: string;
}

export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(function TreeView(
  { label = "Tree navigation", className, children, onKeyDown, ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      className={cx("mds-tree", className)}
      role="tree"
      aria-label={label}
      onKeyDown={(event) => {
        handleTreeKeyDown(event);
        onKeyDown?.(event);
      }}
      {...props}
    >
      {children}
    </ul>
  );
});

export interface TreeItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visible item label. */
  label: ReactNode;
  /** Hierarchy depth, starting at 1. */
  level?: number;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Marks the item as the current page. */
  current?: boolean;
  /** Initial branch state when the item owns children. */
  defaultExpanded?: boolean;
  /** Controlled branch state when the item owns children. */
  expanded?: boolean;
  /** Called when branch state changes. */
  onExpandedChange?: (expanded: boolean) => void;
}

export const TreeItem = forwardRef<HTMLAnchorElement, TreeItemProps>(function TreeItem(
  { label, level = 1, icon, current, defaultExpanded = false, expanded, onExpandedChange, children, className, href, onClick, ...props },
  ref,
) {
  const hasChildren = Boolean(children);
  const hasIcon = Boolean(icon);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = expanded ?? uncontrolledExpanded;
  const itemStyle = { "--mds-tree-level": level } as CSSProperties;

  function toggleExpanded() {
    const nextExpanded = !isExpanded;
    setUncontrolledExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  }

  return (
    <li className="mds-tree__node" role="none">
      {hasChildren ? (
        <button
          className={cx("mds-tree__item", hasIcon && "mds-tree__item--with-icon", current && "mds-tree__item--current", className)}
          type="button"
          role="treeitem"
          aria-expanded={isExpanded}
          aria-selected={current || undefined}
          aria-level={level}
          style={itemStyle}
          onClick={toggleExpanded}
        >
          <span className="mds-tree__chevron">
            <ChevronRight size={14} aria-hidden="true" />
          </span>
          {icon ? <span className="mds-tree__icon">{icon}</span> : null}
          <span className="mds-tree__label">{label}</span>
        </button>
      ) : (
        <a
          ref={ref}
          className={cx("mds-tree__item", hasIcon && "mds-tree__item--with-icon", current && "mds-tree__item--current", className)}
          href={href}
          role="treeitem"
          aria-selected={current || undefined}
          aria-current={current ? "page" : undefined}
          aria-level={level}
          style={itemStyle}
          onClick={onClick}
          {...props}
        >
          <span className="mds-tree__spacer" />
          {icon ? <span className="mds-tree__icon">{icon}</span> : null}
          <span className="mds-tree__label">{label}</span>
        </a>
      )}
      {hasChildren && isExpanded ? (
        <ul className="mds-tree__group" role="group">
          {children}
        </ul>
      ) : null}
    </li>
  );
});

function handleTreeKeyDown(event: KeyboardEvent<HTMLUListElement>) {
  if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
    return;
  }

  const currentItem = document.activeElement instanceof HTMLElement ? document.activeElement.closest<HTMLElement>('[role="treeitem"]') : null;
  if (!currentItem || !event.currentTarget.contains(currentItem)) {
    return;
  }

  const items = getVisibleTreeItems(event.currentTarget);
  const currentIndex = items.indexOf(currentItem);
  if (currentIndex < 0) {
    return;
  }

  event.preventDefault();

  if (event.key === "Home") {
    items[0]?.focus();
    return;
  }

  if (event.key === "End") {
    items[items.length - 1]?.focus();
    return;
  }

  if (event.key === "ArrowDown") {
    items[Math.min(currentIndex + 1, items.length - 1)]?.focus();
    return;
  }

  if (event.key === "ArrowUp") {
    items[Math.max(currentIndex - 1, 0)]?.focus();
    return;
  }

  if (event.key === "ArrowRight") {
    if (currentItem.getAttribute("aria-expanded") === "false") {
      currentItem.click();
      return;
    }

    items[Math.min(currentIndex + 1, items.length - 1)]?.focus();
    return;
  }

  if (event.key === "ArrowLeft") {
    if (currentItem.getAttribute("aria-expanded") === "true") {
      currentItem.click();
      return;
    }

    findParentTreeItem(currentItem)?.focus();
  }
}

function getVisibleTreeItems(tree: HTMLElement) {
  return Array.from(tree.querySelectorAll<HTMLElement>('[role="treeitem"]')).filter((item) => item.offsetParent !== null);
}

function findParentTreeItem(item: HTMLElement) {
  const parentNode = item.closest(".mds-tree__group")?.closest(".mds-tree__node");
  return parentNode?.querySelector<HTMLElement>(':scope > [role="treeitem"]');
}

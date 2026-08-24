import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cx } from "./utils";
import "./table.css";

export type SortDirection = "asc" | "desc" | null;

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  surface?: "framed" | "flush";
  fixed?: boolean;
  stickyHeader?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ containerClassName, containerStyle, className, surface = "framed", fixed, stickyHeader, ...props }, ref) {
  return (
    <div className={cx("mds-table-wrap", `mds-table-wrap--${surface}`, containerClassName)} style={containerStyle}>
      <table ref={ref} className={cx("mds-table", fixed && "mds-table--fixed", stickyHeader && "mds-table--sticky-header", className)} {...props} />
    </div>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHead(props, ref) {
  return <thead ref={ref} {...props} />;
});

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody(props, ref) {
  return <tbody ref={ref} {...props} />;
});

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow({ className, ...props }, ref) {
  return <tr ref={ref} className={cx("mds-table__row", className)} {...props} />;
});

export const TableHeader = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHeader({ className, ...props }, ref) {
  return <th ref={ref} className={cx("mds-table__header", className)} {...props} />;
});

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell({ className, ...props }, ref) {
  return <td ref={ref} className={cx("mds-table__cell", className)} {...props} />;
});

export interface TableCellTextProps extends HTMLAttributes<HTMLDivElement> {
  secondary?: ReactNode;
  reserveSecondary?: boolean;
}

export const TableCellText = forwardRef<HTMLDivElement, TableCellTextProps>(function TableCellText(
  { secondary, reserveSecondary, className, children, ...props },
  ref,
) {
  const hasSecondary = secondary !== undefined && secondary !== null;

  return (
    <div ref={ref} className={cx("mds-table-cell-text", className)} {...props}>
      <span className="mds-table-cell-text__primary">{children}</span>
      {hasSecondary || reserveSecondary ? (
        <span className="mds-table-cell-text__secondary" aria-hidden={hasSecondary ? undefined : true}>
          {secondary}
        </span>
      ) : null}
    </div>
  );
});

export interface SortHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  active?: boolean;
  direction?: SortDirection;
  sortLabel?: string;
  onSort?: () => void;
  leading?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

export const SortHeader = forwardRef<HTMLTableCellElement, SortHeaderProps>(function SortHeader(
  { active, direction, sortLabel, onSort, leading, action, className, children, ...props },
  ref,
) {
  const Icon = active && direction === "asc" ? ArrowUp : active && direction === "desc" ? ArrowDown : ChevronsUpDown;
  const ariaSort = active ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined;
  const label = sortLabel ?? "column";
  const actionLabel =
    active && direction === "asc"
      ? `Sort ${label} descending`
      : active && direction === "desc"
        ? `Clear ${label} sorting`
        : `Sort ${label} ascending`;

  return (
    <TableHeader ref={ref} className={cx("mds-table__header--sortable", className)} aria-sort={ariaSort} {...props}>
      {leading}
      <button className="mds-table__sort" type="button" aria-label={actionLabel} onClick={onSort}>
        <span>{children}</span>
        <Icon size={14} aria-hidden="true" />
      </button>
      {action}
    </TableHeader>
  );
});

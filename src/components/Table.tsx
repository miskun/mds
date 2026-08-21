import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cx } from "./utils";
import "./table.css";

export type SortDirection = "asc" | "desc" | null;

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export function Table({ containerClassName, className, ...props }: TableProps) {
  return (
    <div className={cx("mds-table-wrap", containerClassName)}>
      <table className={cx("mds-table", className)} {...props} />
    </div>
  );
}

export function TableHead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx("mds-table__row", className)} {...props} />;
}

export function TableHeader({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cx("mds-table__header", className)} {...props} />;
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx("mds-table__cell", className)} {...props} />;
}

export interface SortHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  active?: boolean;
  direction?: SortDirection;
  onSort?: () => void;
  children: ReactNode;
}

export function SortHeader({ active, direction, onSort, className, children, ...props }: SortHeaderProps) {
  const Icon = active && direction === "asc" ? ArrowUp : active && direction === "desc" ? ArrowDown : ChevronsUpDown;
  const ariaSort = active ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined;

  return (
    <TableHeader className={cx("mds-table__header--sortable", className)} aria-sort={ariaSort} {...props}>
      <button className="mds-table__sort" type="button" onClick={onSort}>
        <span>{children}</span>
        <Icon size={14} aria-hidden="true" />
      </button>
    </TableHeader>
  );
}

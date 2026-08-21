import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "./Checkbox";
import { DropdownMenu, MenuItem } from "./DropdownMenu";
import { EmptyState } from "./EmptyState";
import { IconButton } from "./Button";
import { Skeleton } from "./Skeleton";
import { SortHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import type { SortDirection } from "./Table";
import { getControllableValue } from "./utils";
import "./data-table.css";

export interface DataTableSort {
  columnId: string;
  direction: Exclude<SortDirection, null>;
}

export interface DataColumn<T> {
  id: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => ReactNode);
  sortValue?: keyof T | ((row: T) => string | number);
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: "left" | "right";
}

export interface RowAction<T> {
  label: string;
  onSelect?: (row: T) => void;
}

export interface DataTableProps<T> {
  columns: Array<DataColumn<T>>;
  data: T[];
  getRowId: (row: T) => string;
  rowActions?: Array<RowAction<T>>;
  selectable?: boolean;
  selectedRowIds?: string[];
  defaultSelectedRowIds?: string[];
  onSelectedRowIdsChange?: (selectedRowIds: string[]) => void;
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  rowActions,
  selectable,
  selectedRowIds,
  defaultSelectedRowIds = [],
  onSelectedRowIdsChange,
  sort,
  defaultSort = null,
  onSortChange,
  loading,
  emptyTitle = "No rows found",
  emptyDescription = "Adjust filters or add new records.",
}: DataTableProps<T>) {
  const [uncontrolledSort, setUncontrolledSort] = useState<DataTableSort | null>(defaultSort);
  const [uncontrolledSelectedRowIds, setUncontrolledSelectedRowIds] = useState<string[]>(defaultSelectedRowIds);
  const currentSort = getControllableValue(sort, uncontrolledSort);
  const currentSelectedRowIds = getControllableValue(selectedRowIds, uncontrolledSelectedRowIds);
  const selectedIdSet = useMemo(() => new Set(currentSelectedRowIds), [currentSelectedRowIds]);

  const sortedData = useMemo(() => {
    if (!currentSort) return data;
    const column = columns.find((candidate) => candidate.id === currentSort.columnId);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = getSortValue(column, a);
      const bValue = getSortValue(column, b);
      const result = String(aValue).localeCompare(String(bValue), undefined, { numeric: true, sensitivity: "base" });
      return currentSort.direction === "asc" ? result : -result;
    });
  }, [columns, data, currentSort]);

  const allSelected = data.length > 0 && data.every((row) => selectedIdSet.has(getRowId(row)));

  function toggleAll() {
    setSelectedRows(allSelected ? [] : data.map(getRowId));
  }

  function toggleRow(id: string) {
    const next = new Set(selectedIdSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(Array.from(next));
  }

  function toggleSort(columnId: string) {
    const nextSort = getNextSort(currentSort, columnId);
    setUncontrolledSort(nextSort);
    onSortChange?.(nextSort);
  }

  function setSelectedRows(nextSelectedRowIds: string[]) {
    setUncontrolledSelectedRowIds(nextSelectedRowIds);
    onSelectedRowIdsChange?.(nextSelectedRowIds);
  }

  if (loading) {
    return (
      <div className="mds-data-table__loading">
        <Skeleton variant="block" />
      </div>
    );
  }

  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {selectable ? (
            <TableHeader className="mds-table__header--select">
              <Checkbox aria-label="Select all rows" checked={allSelected} onChange={toggleAll} />
            </TableHeader>
          ) : null}
          {columns.map((column) =>
            column.sortable ? (
              <SortHeader
                key={column.id}
                active={currentSort?.columnId === column.id}
                direction={currentSort?.columnId === column.id ? currentSort.direction : null}
                onSort={() => toggleSort(column.id)}
                className={column.align === "right" ? "mds-table__header--numeric" : undefined}
              >
                {column.header}
              </SortHeader>
            ) : (
              <TableHeader key={column.id} className={column.align === "right" ? "mds-table__header--numeric" : undefined}>
                {column.header}
              </TableHeader>
            ),
          )}
          {rowActions?.length ? <TableHeader className="mds-table__header--actions" /> : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row) => {
          const rowId = getRowId(row);
          return (
            <TableRow key={rowId}>
              {selectable ? (
                <TableCell className="mds-table__cell--select">
                  <Checkbox aria-label={`Select row ${rowId}`} checked={selectedIdSet.has(rowId)} onChange={() => toggleRow(rowId)} />
                </TableCell>
              ) : null}
              {columns.map((column) => (
                <TableCell key={column.id} className={column.align === "right" ? "mds-table__cell--numeric" : undefined}>
                  {renderCell(column, row)}
                </TableCell>
              ))}
              {rowActions?.length ? (
                <TableCell className="mds-table__cell--actions">
                  <DropdownMenu trigger={<IconButton label={`Actions for row ${rowId}`} size="sm" variant="ghost" icon={<MoreHorizontal size={14} />} />} align="end">
                    {rowActions.map((action) => (
                      <MenuItem key={action.label} onSelect={() => action.onSelect?.(row)}>
                        {action.label}
                      </MenuItem>
                    ))}
                  </DropdownMenu>
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function getNextSort(currentSort: DataTableSort | null, columnId: string): DataTableSort | null {
  if (!currentSort || currentSort.columnId !== columnId) return { columnId, direction: "asc" };
  if (currentSort.direction === "asc") return { columnId, direction: "desc" };
  return null;
}

function renderCell<T>(column: DataColumn<T>, row: T) {
  if (column.cell) return column.cell(row);
  if (typeof column.accessor === "function") return column.accessor(row);
  if (column.accessor) return row[column.accessor] as ReactNode;
  return null;
}

function getSortValue<T>(column: DataColumn<T>, row: T) {
  if (typeof column.sortValue === "function") return column.sortValue(row);
  if (column.sortValue) return row[column.sortValue] as string | number;
  const value = renderCell(column, row);
  return typeof value === "number" || typeof value === "string" ? value : "";
}

import { forwardRef, useMemo, useState } from "react";
import type { CSSProperties, ForwardedRef, HTMLAttributes, KeyboardEvent, MouseEvent, PointerEvent, ReactElement, ReactNode, Ref, ThHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, EyeOff, MoreHorizontal, X } from "lucide-react";
import { Checkbox } from "./Checkbox";
import { DropdownMenu, MenuCheckboxItem, MenuItem, MenuLabel, MenuSeparator } from "./DropdownMenu";
import { EmptyState } from "./EmptyState";
import { IconButton } from "./Button";
import { Skeleton } from "./Skeleton";
import { SortHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import type { SortDirection, TableProps } from "./Table";
import { cx, getControllableValue } from "./utils";
import "./data-table.css";

export interface DataTableSort {
  columnId: string;
  direction: Exclude<SortDirection, null>;
}

export interface DataColumn<T> {
  id: string;
  header: ReactNode;
  sortLabel?: string;
  accessor?: keyof T | ((row: T) => ReactNode);
  sortValue?: keyof T | ((row: T) => string | number);
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: "left" | "middle" | "right" | "center";
  numeric?: boolean;
  width?: number;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  grow?: boolean | number;
  resizable?: boolean;
  hideable?: boolean;
  defaultHidden?: boolean;
}

export interface RowAction<T> {
  label: string;
  onSelect?: (row: T) => void;
}

export type DataTableRowHeight<T> = number | string | ((row: T) => number | string | undefined);

export interface DataTableProps<T> extends Omit<TableProps, "children"> {
  columns: Array<DataColumn<T>>;
  data: T[];
  getRowId: (row: T) => string;
  getRowLabel?: (row: T) => string;
  label?: string;
  caption?: string;
  rowActions?: Array<RowAction<T>>;
  onRowClick?: (row: T, event: MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>) => void;
  getRowProps?: (row: T, rowIndex: number) => HTMLAttributes<HTMLTableRowElement>;
  selectable?: boolean;
  selectedRowIds?: string[];
  defaultSelectedRowIds?: string[];
  onSelectedRowIdsChange?: (selectedRowIds: string[]) => void;
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  columnOrder?: string[];
  defaultColumnOrder?: string[];
  onColumnOrderChange?: (columnOrder: string[]) => void;
  visibleColumnIds?: string[];
  defaultVisibleColumnIds?: string[];
  onVisibleColumnIdsChange?: (visibleColumnIds: string[]) => void;
  columnWidths?: Record<string, number>;
  defaultColumnWidths?: Record<string, number>;
  onColumnWidthsChange?: (columnWidths: Record<string, number>) => void;
  onColumnWidthsCommit?: (columnWidths: Record<string, number>) => void;
  columnControls?: boolean;
  getColumnHeaderProps?: (column: DataColumn<T>, columnIndex: number) => ThHTMLAttributes<HTMLTableCellElement>;
  rowHeight?: DataTableRowHeight<T>;
  stickyHeader?: boolean;
  surface?: "framed" | "flush";
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

function DataTableInner<T>({
  columns,
  data,
  getRowId,
  getRowLabel,
  label = "Data table",
  caption,
  rowActions,
  onRowClick,
  getRowProps,
  selectable,
  selectedRowIds,
  defaultSelectedRowIds = [],
  onSelectedRowIdsChange,
  sort,
  defaultSort = null,
  onSortChange,
  columnOrder,
  defaultColumnOrder,
  onColumnOrderChange,
  visibleColumnIds,
  defaultVisibleColumnIds,
  onVisibleColumnIdsChange,
  columnWidths,
  defaultColumnWidths,
  onColumnWidthsChange,
  onColumnWidthsCommit,
  columnControls,
  getColumnHeaderProps,
  rowHeight,
  stickyHeader,
  surface = "framed",
  loading,
  emptyTitle = "No rows found",
  emptyDescription = "Adjust filters or add new records.",
  ...tableProps
}: DataTableProps<T>, ref: ForwardedRef<HTMLTableElement>) {
  const [uncontrolledSort, setUncontrolledSort] = useState<DataTableSort | null>(defaultSort);
  const [uncontrolledSelectedRowIds, setUncontrolledSelectedRowIds] = useState<string[]>(defaultSelectedRowIds);
  const [uncontrolledColumnOrder, setUncontrolledColumnOrder] = useState<string[]>(defaultColumnOrder ?? columns.map((column) => column.id));
  const [uncontrolledVisibleColumnIds, setUncontrolledVisibleColumnIds] = useState<string[]>(
    defaultVisibleColumnIds ?? columns.filter((column) => !isColumnHiddenByDefault(column)).map((column) => column.id),
  );
  const [uncontrolledColumnWidths, setUncontrolledColumnWidths] = useState<Record<string, number>>(() =>
    ({
      ...Object.fromEntries(
        columns
          .map((column) => [column.id, getColumnInitialWidth(column)] as const)
          .filter((entry): entry is readonly [string, number] => entry[1] !== undefined),
      ),
      ...defaultColumnWidths,
    }),
  );
  const [contextMenu, setContextMenu] = useState<{ columnId: string; x: number; y: number } | null>(null);
  const currentSort = getControllableValue(sort, uncontrolledSort);
  const currentSelectedRowIds = getControllableValue(selectedRowIds, uncontrolledSelectedRowIds);
  const currentColumnOrder = getControllableValue(columnOrder, uncontrolledColumnOrder);
  const currentVisibleColumnIds = getControllableValue(visibleColumnIds, uncontrolledVisibleColumnIds);
  const currentColumnWidths = getControllableValue(columnWidths, uncontrolledColumnWidths);
  const selectedIdSet = useMemo(() => new Set(currentSelectedRowIds), [currentSelectedRowIds]);
  const visibleColumnIdSet = useMemo(() => new Set(currentVisibleColumnIds), [currentVisibleColumnIds]);
  const orderedColumns = useMemo(() => {
    const columnsById = new Map(columns.map((column) => [column.id, column]));
    const orderedIds = getCompleteColumnOrder(columns, currentColumnOrder);

    return orderedIds
      .map((columnId) => columnsById.get(columnId))
      .filter((column): column is DataColumn<T> => column !== undefined);
  }, [columns, currentColumnOrder]);
  const visibleColumns = useMemo(
    () => orderedColumns.filter((column) => !isColumnHideable(column) || visibleColumnIdSet.has(column.id)),
    [orderedColumns, visibleColumnIdSet],
  );
  const hasColumnSizing =
    columnWidths !== undefined ||
    defaultColumnWidths !== undefined ||
    visibleColumns.some((column) => currentColumnWidths[column.id] !== undefined || getColumnBaseWidth(column) !== undefined || column.grow);
  const totalGrowWeight = getTotalGrowWeight(visibleColumns);
  const hasGrowColumn = totalGrowWeight > 0;
  const hasControlColumn = columnControls || !!rowActions?.length;
  const tableContentMinWidth = getTableContentMinWidth(visibleColumns, currentColumnWidths);

  const sortedData = useMemo(() => {
    if (!currentSort) return data;
    const column = columns.find((candidate) => candidate.id === currentSort.columnId);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = getSortValue(column, a);
      const bValue = getSortValue(column, b);
      const result = compareSortValues(aValue, bValue);
      return currentSort.direction === "asc" ? result : -result;
    });
  }, [columns, data, currentSort]);

  const visibleRowIds = useMemo(() => data.map(getRowId), [data, getRowId]);
  const visibleRowIdSet = useMemo(() => new Set(visibleRowIds), [visibleRowIds]);
  const allSelected = visibleRowIds.length > 0 && visibleRowIds.every((rowId) => selectedIdSet.has(rowId));
  const someSelected = visibleRowIds.some((rowId) => selectedIdSet.has(rowId)) && !allSelected;
  const selectAllLabel = allSelected ? "Clear row selection" : someSelected ? "Select remaining rows" : "Select all rows";

  function toggleAll() {
    if (allSelected) {
      setSelectedRows(currentSelectedRowIds.filter((rowId) => !visibleRowIdSet.has(rowId)));
      return;
    }

    setSelectedRows(Array.from(new Set([...currentSelectedRowIds, ...visibleRowIds])));
  }

  function toggleRow(id: string) {
    const next = new Set(selectedIdSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(Array.from(next));
  }

  function toggleSort(columnId: string) {
    setTableSort(getNextSort(currentSort, columnId));
  }

  function setTableSort(nextSort: DataTableSort | null) {
    setUncontrolledSort(nextSort);
    onSortChange?.(nextSort);
  }

  function sortColumn(columnId: string, direction: DataTableSort["direction"] | null) {
    setTableSort(direction ? { columnId, direction } : null);
  }

  function setColumnWidth(columnId: string, width: number) {
    const column = columns.find((candidate) => candidate.id === columnId);
    const nextColumnWidths = { ...currentColumnWidths, [columnId]: column ? clampColumnWidth(column, width) : width };
    setUncontrolledColumnWidths(nextColumnWidths);
    onColumnWidthsChange?.(nextColumnWidths);
    return nextColumnWidths;
  }

  function setTableColumnOrder(nextColumnOrder: string[]) {
    setUncontrolledColumnOrder(nextColumnOrder);
    onColumnOrderChange?.(nextColumnOrder);
  }

  function setTableVisibleColumnIds(nextVisibleColumnIds: string[]) {
    setUncontrolledVisibleColumnIds(nextVisibleColumnIds);
    onVisibleColumnIdsChange?.(nextVisibleColumnIds);
  }

  function moveColumn(columnId: string, direction: -1 | 1) {
    const visibleIds = visibleColumns.map((column) => column.id);
    const visibleIndex = visibleIds.indexOf(columnId);
    const targetColumnId = visibleIds[visibleIndex + direction];
    if (!targetColumnId) return;

    const orderedIds = getCompleteColumnOrder(columns, currentColumnOrder);
    const columnIndex = orderedIds.indexOf(columnId);
    const targetIndex = orderedIds.indexOf(targetColumnId);
    if (columnIndex === -1 || targetIndex === -1) return;

    const nextColumnOrder = [...orderedIds];
    nextColumnOrder[columnIndex] = targetColumnId;
    nextColumnOrder[targetIndex] = columnId;
    setTableColumnOrder(nextColumnOrder);
  }

  function hideColumn(columnId: string) {
    if (visibleColumns.length <= 1) return;

    const column = columns.find((candidate) => candidate.id === columnId);
    if (!column || !isColumnHideable(column)) return;

    const nextVisibleColumnIds = new Set(currentVisibleColumnIds);
    nextVisibleColumnIds.delete(columnId);
    setTableVisibleColumnIds(getPersistedVisibleColumnIds(orderedColumns, nextVisibleColumnIds));
  }

  function setColumnVisibility(columnId: string, visible: boolean) {
    if (visible) {
      const nextVisibleColumnIds = new Set([...currentVisibleColumnIds, columnId]);
      setTableVisibleColumnIds(getPersistedVisibleColumnIds(orderedColumns, nextVisibleColumnIds));
      return;
    }

    hideColumn(columnId);
  }

  function showAllColumns() {
    setTableVisibleColumnIds(orderedColumns.map((column) => column.id));
  }

  function openColumnContextMenu(event: MouseEvent<HTMLTableCellElement>, column: DataColumn<T>) {
    if (!columnControls) return;

    event.preventDefault();
    openColumnContextMenuAt(column, event.clientX, event.clientY);
  }

  function openColumnContextMenuAt(column: DataColumn<T>, x: number, y: number) {
    setContextMenu({ columnId: column.id, x, y });
  }

  function startColumnResize(event: PointerEvent<HTMLButtonElement>, column: DataColumn<T>, direction: -1 | 1) {
    event.preventDefault();
    const handle = event.currentTarget;
    const startX = event.clientX;
    const startWidth = currentColumnWidths[column.id] ?? getColumnBaseWidth(column) ?? column.minWidth ?? 80;
    let latestColumnWidths = currentColumnWidths;

    function resize(nextEvent: globalThis.PointerEvent) {
      const delta = nextEvent.clientX - startX;
      latestColumnWidths = setColumnWidth(column.id, Math.round(startWidth + direction * delta));
    }

    function stopResize(nextEvent: globalThis.PointerEvent) {
      handle.removeEventListener("pointermove", resize);
      handle.removeEventListener("pointerup", stopResize);
      handle.removeEventListener("pointercancel", stopResize);
      if (handle.hasPointerCapture?.(nextEvent.pointerId)) handle.releasePointerCapture(nextEvent.pointerId);
      onColumnWidthsCommit?.(latestColumnWidths);
    }

    handle.setPointerCapture?.(event.pointerId);
    handle.addEventListener("pointermove", resize);
    handle.addEventListener("pointerup", stopResize, { once: true });
    handle.addEventListener("pointercancel", stopResize, { once: true });
  }

  function resizeColumnWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, column: DataColumn<T>, direction: -1 | 1) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const keyDirection = event.key === "ArrowRight" ? 1 : -1;
    const currentWidth = currentColumnWidths[column.id] ?? getColumnBaseWidth(column) ?? column.minWidth ?? 80;
    const nextColumnWidths = setColumnWidth(column.id, Math.round(currentWidth + direction * keyDirection * 8));
    onColumnWidthsCommit?.(nextColumnWidths);
  }

  function setSelectedRows(nextSelectedRowIds: string[]) {
    setUncontrolledSelectedRowIds(nextSelectedRowIds);
    onSelectedRowIdsChange?.(nextSelectedRowIds);
  }

  if (loading) {
    return (
      <div className="mds-data-table__loading" role="status" aria-label={`Loading ${label}`}>
        <Skeleton variant="block" />
      </div>
    );
  }

  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} role="status" aria-label={`${label}: ${emptyTitle}`} />;
  }

  const tableAriaLabel = tableProps["aria-label"] ?? (caption ? undefined : label);
  const usesFixedLayout = tableProps.fixed ?? hasColumnSizing;
  const tableClassName = cx(
    tableProps.className,
    usesFixedLayout && hasColumnSizing && (hasGrowColumn ? "mds-table--fill-widths" : "mds-table--literal-widths"),
  );
  const tableStyle = getTableStyle(tableProps.style, usesFixedLayout && hasGrowColumn ? tableContentMinWidth : undefined, hasControlColumn);
  const containerClassName = tableProps.containerClassName;

  return (
    <Table
      ref={ref}
      {...tableProps}
      className={tableClassName}
      containerClassName={containerClassName}
      surface={surface}
      fixed={usesFixedLayout}
      stickyHeader={stickyHeader}
      style={tableStyle}
      aria-label={tableAriaLabel}
    >
      {caption ? <caption className="mds-table__caption">{caption}</caption> : null}
      <colgroup>
        {visibleColumns.map((column) => (
          <col key={column.id} style={getColumnStyle(column, currentColumnWidths, totalGrowWeight)} />
        ))}
        {hasControlColumn ? <col style={{ width: "var(--mds-table-control-column-width)" }} /> : null}
      </colgroup>
      <TableHead>
        <TableRow>
          {visibleColumns.map((column, columnIndex) => {
            const headerProps = getColumnHeaderProps?.(column, columnIndex) ?? {};
            const onContextMenu = (event: MouseEvent<HTMLTableCellElement>) => {
              headerProps.onContextMenu?.(event);
              if (!event.defaultPrevented) openColumnContextMenu(event, column);
            };
            const onKeyDown = (event: KeyboardEvent<HTMLTableCellElement>) => {
              headerProps.onKeyDown?.(event);
              if (event.defaultPrevented || !columnControls) return;
              if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;

              event.preventDefault();
              const rect = event.currentTarget.getBoundingClientRect();
              openColumnContextMenuAt(column, rect.left + 12, rect.bottom - 2);
            };
            const headerClassName = cx(
              getColumnClassName("mds-table__header", column, selectable && columnIndex === 0),
              contextMenu?.columnId === column.id && "mds-table__header--menu-open",
              headerProps.className,
            );
            const headerAction = (
              <>
                {hasGrowColumn ? renderColumnBoundaryResizer(column, visibleColumns[columnIndex - 1]) : renderColumnEdgeResizer(column)}
                {renderColumnContextMenu(column, columnIndex)}
              </>
            );

            return column.sortable ? (
              <SortHeader
                key={column.id}
                {...headerProps}
                onContextMenu={onContextMenu}
                onKeyDown={onKeyDown}
                active={currentSort?.columnId === column.id}
                direction={currentSort?.columnId === column.id ? currentSort.direction : null}
                sortLabel={column.sortLabel ?? (typeof column.header === "string" ? column.header : column.id)}
                onSort={() => toggleSort(column.id)}
                className={headerClassName}
                leading={selectable && columnIndex === 0 ? renderSelectAllCheckbox() : undefined}
                action={headerAction}
              >
                {column.header}
              </SortHeader>
            ) : (
              <TableHeader key={column.id} {...headerProps} onContextMenu={onContextMenu} onKeyDown={onKeyDown} className={headerClassName}>
                {selectable && columnIndex === 0 ? renderSelectAllCheckbox() : null}
                {column.header}
                {headerAction}
              </TableHeader>
            );
          })}
          {hasControlColumn ? (
            <TableHeader className="mds-table__control-header" aria-label={columnControls ? "Table actions" : "Row actions"}>
              {columnControls ? renderTableActions() : null}
            </TableHeader>
          ) : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row, rowIndex) => {
          const rowId = getRowId(row);
          const rowLabel = getRowLabel?.(row) ?? rowId;
          const selected = selectedIdSet.has(rowId);
          const rowProps = getRowProps?.(row, rowIndex) ?? {};
          const rowInteractive = onRowClick !== undefined || rowProps.onClick !== undefined;
          const rowHeightStyle = getRowHeightStyle(rowHeight, row);
          const rowClassName = cx(
            rowHeightStyle && "mds-table__row--fixed-height",
            rowInteractive && "mds-table__row--interactive",
            rowProps.className,
          );
          const rowStyle = rowHeightStyle || rowProps.style ? { ...rowHeightStyle, ...rowProps.style } : undefined;
          const handleRowClick = (event: MouseEvent<HTMLTableRowElement>) => {
            rowProps.onClick?.(event);
            if (event.defaultPrevented || isInteractiveEventTarget(event.target, event.currentTarget)) return;
            onRowClick?.(row, event);
          };
          const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
            rowProps.onKeyDown?.(event);
            if (event.defaultPrevented || !onRowClick || isInteractiveEventTarget(event.target, event.currentTarget) || (event.key !== "Enter" && event.key !== " ")) return;

            event.preventDefault();
            onRowClick(row, event);
          };

          return (
            <TableRow
              key={rowId}
              data-row-id={rowId}
              {...rowProps}
              className={rowClassName}
              style={rowStyle}
              tabIndex={onRowClick ? (rowProps.tabIndex ?? 0) : rowProps.tabIndex}
              onClick={handleRowClick}
              onKeyDown={handleRowKeyDown}
              aria-selected={selectable ? selected : rowProps["aria-selected"]}
            >
              {visibleColumns.map((column, columnIndex) => (
                <TableCell key={column.id} className={getColumnClassName("mds-table__cell", column, selectable && columnIndex === 0)}>
                  {selectable && columnIndex === 0 ? (
                    <span className="mds-table__select-control">
                      <Checkbox aria-label={`Select ${rowLabel}`} checked={selected} onChange={() => toggleRow(rowId)} />
                    </span>
                  ) : null}
                  {renderCell(column, row)}
                </TableCell>
              ))}
              {hasControlColumn ? <TableCell className="mds-table__control-cell">{rowActions?.length ? renderRowActions(row, rowLabel) : null}</TableCell> : null}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  function renderColumnBoundaryResizer(column: DataColumn<T>, previousColumn: DataColumn<T> | undefined) {
    if (!previousColumn) return null;
    const resizeTarget = getBoundaryResizeTarget(column, previousColumn, columnWidths, defaultColumnWidths);
    if (!resizeTarget) return null;

    return renderColumnResizeHandle(resizeTarget.column, resizeTarget.direction, "start");
  }

  function renderColumnEdgeResizer(column: DataColumn<T>) {
    if (!isColumnResizable(column, columnWidths, defaultColumnWidths)) return null;

    return renderColumnResizeHandle(column, 1, "end");
  }

  function renderColumnResizeHandle(column: DataColumn<T>, direction: -1 | 1, edge: "start" | "end") {
    return (
      <button
        className={cx("mds-table__resize", edge === "end" && "mds-table__resize--end")}
        type="button"
        aria-label={`Resize ${getColumnLabel(column)} column`}
        onPointerDown={(event) => startColumnResize(event, column, direction)}
        onKeyDown={(event) => resizeColumnWithKeyboard(event, column, direction)}
      />
    );
  }

  function renderColumnContextMenu(column: DataColumn<T>, columnIndex: number) {
    if (!columnControls || contextMenu?.columnId !== column.id) return null;
    if (typeof document === "undefined") return null;

    return createPortal(
      <span className="mds-table__context-control">
        <DropdownMenu
          trigger={<button className="mds-table__context-anchor" type="button" aria-hidden="true" tabIndex={-1} style={getContextMenuAnchorStyle(contextMenu)} />}
          align="start"
          side="right"
          open={contextMenu?.columnId === column.id}
          onOpenChange={(open) => {
            if (!open) setContextMenu(null);
          }}
        >
          {renderColumnControlItems(column, columnIndex)}
        </DropdownMenu>
      </span>,
      document.body,
    );
  }

  function renderColumnControlItems(column: DataColumn<T>, columnIndex: number) {
    const canMoveLeft = columnIndex > 0;
    const canMoveRight = columnIndex < visibleColumns.length - 1;
    const canHide = isColumnHideable(column) && visibleColumns.length > 1;
    const canSort = column.sortable;
    const columnLabel = getColumnLabel(column);
    const sortedAscending = currentSort?.columnId === column.id && currentSort.direction === "asc";
    const sortedDescending = currentSort?.columnId === column.id && currentSort.direction === "desc";
    const hasLayoutActions = canMoveLeft || canMoveRight || canHide;

    return (
      <>
        {canSort ? (
          <>
            <MenuItem disabled={sortedAscending} icon={<ArrowUp size={14} />} onSelect={() => sortColumn(column.id, "asc")}>
              Sort {columnLabel} ascending
            </MenuItem>
            <MenuItem disabled={sortedDescending} icon={<ArrowDown size={14} />} onSelect={() => sortColumn(column.id, "desc")}>
              Sort {columnLabel} descending
            </MenuItem>
            <MenuItem disabled={!currentSort} icon={<X size={14} />} onSelect={() => sortColumn(column.id, null)}>
              Clear sorting
            </MenuItem>
            {hasLayoutActions ? <MenuSeparator /> : null}
          </>
        ) : null}
        <MenuItem disabled={!canMoveLeft} icon={<ArrowLeft size={14} />} onSelect={() => moveColumn(column.id, -1)}>
          Move left
        </MenuItem>
        <MenuItem disabled={!canMoveRight} icon={<ArrowRight size={14} />} onSelect={() => moveColumn(column.id, 1)}>
          Move right
        </MenuItem>
        <MenuItem disabled={!canHide} icon={<EyeOff size={14} />} onSelect={() => hideColumn(column.id)}>
          Hide column
        </MenuItem>
      </>
    );
  }

  function renderTableActions() {
    const hideableColumns = orderedColumns.filter(isColumnHideable);
    const hiddenColumnCount = hideableColumns.filter((column) => !visibleColumnIdSet.has(column.id)).length;
    const visibleColumnCount = visibleColumns.length;
    const allColumnsVisible = hiddenColumnCount === 0;

    return (
      <DropdownMenu trigger={<IconButton label="Manage columns" size="sm" variant="ghost" icon={<MoreHorizontal size={14} />} />} align="end">
        <MenuLabel>Columns</MenuLabel>
        {hideableColumns.map((column) => {
          const visible = visibleColumnIdSet.has(column.id);
          const disabled = visible && visibleColumnCount <= 1;
          return (
            <MenuCheckboxItem
              key={column.id}
              checked={visible}
              disabled={disabled}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(checked) => setColumnVisibility(column.id, checked === true)}
            >
              {getColumnLabel(column)}
            </MenuCheckboxItem>
          );
        })}
        <MenuSeparator />
        <MenuItem disabled={allColumnsVisible} onSelect={showAllColumns} inset>
          Show all columns
        </MenuItem>
      </DropdownMenu>
    );
  }

  function renderSelectAllCheckbox() {
    return (
      <span className="mds-table__select-control">
        <Checkbox aria-label={selectAllLabel} checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
      </span>
    );
  }

  function renderRowActions(row: T, rowLabel: string) {
    if (!rowActions?.length) return null;

    return (
      <DropdownMenu trigger={<IconButton label={`Actions for ${rowLabel}`} size="sm" variant="ghost" icon={<MoreHorizontal size={14} />} />} align="end">
        {rowActions.map((action) => (
          <MenuItem key={action.label} onSelect={() => action.onSelect?.(row)}>
            {action.label}
          </MenuItem>
        ))}
      </DropdownMenu>
    );
  }
}

export const DataTable = forwardRef(DataTableInner) as <T>(props: DataTableProps<T> & { ref?: Ref<HTMLTableElement> }) => ReactElement;

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
  if (typeof column.accessor === "function") {
    const value = column.accessor(row);
    return typeof value === "number" || typeof value === "string" ? value : "";
  }
  if (column.accessor) return row[column.accessor] as string | number;
  const value = renderCell(column, row);
  return typeof value === "number" || typeof value === "string" ? value : "";
}

function compareSortValues(aValue: string | number, bValue: string | number) {
  if (typeof aValue === "number" && typeof bValue === "number") {
    const aNaN = Number.isNaN(aValue);
    const bNaN = Number.isNaN(bValue);
    if (aNaN && bNaN) return 0;
    if (aNaN) return 1;
    if (bNaN) return -1;
    return aValue - bValue;
  }

  return String(aValue).localeCompare(String(bValue), undefined, { numeric: true, sensitivity: "base" });
}

function isInteractiveEventTarget(target: EventTarget | null, currentTarget: EventTarget) {
  if (!(target instanceof Element) || !(currentTarget instanceof Element)) return false;

  const interactiveTarget = target.closest("a, button, input, select, textarea, [role='button'], [role='checkbox'], [role='link'], [role='menuitem'], [role='switch']");
  return interactiveTarget !== null && interactiveTarget !== currentTarget && currentTarget.contains(interactiveTarget);
}

function getColumnClassName<T>(baseClassName: string, column: DataColumn<T>, withSelect = false, withActions = false) {
  const align = getColumnAlign(column);

  return cx(
    align === "right" && `${baseClassName}--right`,
    align === "middle" && `${baseClassName}--middle`,
    column.numeric && `${baseClassName}--numeric`,
    column.numeric && "mds-numeric",
    withSelect && `${baseClassName}--with-select`,
    withActions && `${baseClassName}--with-actions`,
  );
}

function getColumnAlign<T>(column: DataColumn<T>) {
  if (column.align === "center") return "middle";
  return column.align ?? (column.numeric ? "right" : undefined);
}

function getColumnStyle<T>(column: DataColumn<T>, columnWidths: Record<string, number>, totalGrowWeight: number) {
  const growWeight = getColumnGrowWeight(column);
  if (growWeight > 0) {
    return totalGrowWeight > growWeight ? { width: `${(growWeight / totalGrowWeight) * 100}%` } : undefined;
  }

  const width = columnWidths[column.id] ?? getColumnInitialWidth(column);
  return width ? { width: `${width}px` } : undefined;
}

function getColumnLabel<T>(column: DataColumn<T>) {
  return typeof column.header === "string" ? column.header : column.sortLabel ?? column.id;
}

function isColumnHideable<T>(column: DataColumn<T>) {
  return column.hideable !== false;
}

function isColumnHiddenByDefault<T>(column: DataColumn<T>) {
  return isColumnHideable(column) && column.defaultHidden === true;
}

function getCompleteColumnOrder<T>(columns: Array<DataColumn<T>>, columnOrder: string[]) {
  return [...columnOrder, ...columns.map((column) => column.id).filter((columnId) => !columnOrder.includes(columnId))];
}

function getPersistedVisibleColumnIds<T>(columns: Array<DataColumn<T>>, visibleColumnIds: Set<string>) {
  return columns.filter((column) => visibleColumnIds.has(column.id) || !isColumnHideable(column)).map((column) => column.id);
}

function getRowHeightStyle<T>(rowHeight: DataTableRowHeight<T> | undefined, row: T): CSSProperties | undefined {
  if (rowHeight === undefined) return undefined;
  const height = typeof rowHeight === "function" ? rowHeight(row) : rowHeight;
  if (height === undefined) return undefined;
  return { "--mds-table-row-height": typeof height === "number" ? `${height}px` : height } as CSSProperties;
}

function getColumnBaseWidth<T>(column: DataColumn<T>) {
  return column.width ?? column.defaultWidth;
}

function getColumnInitialWidth<T>(column: DataColumn<T>) {
  const width = getColumnBaseWidth(column);
  return width === undefined ? undefined : clampColumnWidth(column, width);
}

function getColumnMinWidth<T>(column: DataColumn<T>) {
  return column.minWidth ?? 48;
}

function clampColumnWidth<T>(column: DataColumn<T>, width: number) {
  const maxWidth = column.maxWidth ?? Number.MAX_SAFE_INTEGER;
  return Math.min(maxWidth, Math.max(getColumnMinWidth(column), width));
}

function isColumnResizable<T>(column: DataColumn<T>, columnWidths: Record<string, number> | undefined, defaultColumnWidths: Record<string, number> | undefined) {
  if (column.resizable === false || getColumnGrowWeight(column) > 0) return false;
  return getColumnBaseWidth(column) !== undefined || columnWidths !== undefined || defaultColumnWidths !== undefined;
}

function getBoundaryResizeTarget<T>(
  column: DataColumn<T>,
  previousColumn: DataColumn<T>,
  columnWidths: Record<string, number> | undefined,
  defaultColumnWidths: Record<string, number> | undefined,
) {
  if (isColumnResizable(column, columnWidths, defaultColumnWidths)) {
    return { column, direction: -1 as const };
  }

  if (getColumnGrowWeight(column) > 0 && isColumnResizable(previousColumn, columnWidths, defaultColumnWidths)) {
    return { column: previousColumn, direction: 1 as const };
  }

  return null;
}

function getTableContentMinWidth<T>(columns: Array<DataColumn<T>>, columnWidths: Record<string, number>) {
  return columns.reduce((total, column) => {
    if (getColumnGrowWeight(column) > 0) return total + (column.minWidth ?? 0);
    return total + (columnWidths[column.id] ?? getColumnInitialWidth(column) ?? column.minWidth ?? 0);
  }, 0);
}

function getColumnGrowWeight<T>(column: DataColumn<T>) {
  if (column.grow === true) return 1;
  if (typeof column.grow === "number") return Math.max(0, column.grow);
  return 0;
}

function getTotalGrowWeight<T>(columns: Array<DataColumn<T>>) {
  return columns.reduce((total, column) => total + getColumnGrowWeight(column), 0);
}

function getTableStyle(style: CSSProperties | undefined, contentMinWidth: number | undefined, hasControlColumn: boolean) {
  if (contentMinWidth === undefined) return style;
  return {
    ...style,
    "--mds-table-content-min-width": `${contentMinWidth}px`,
    "--mds-table-control-width-offset": hasControlColumn ? "var(--mds-table-control-column-width)" : "0px",
  } as CSSProperties;
}

function getContextMenuAnchorStyle(contextMenu: { x: number; y: number } | null): CSSProperties | undefined {
  if (!contextMenu) return undefined;
  return { insetInlineStart: contextMenu.x, insetBlockStart: contextMenu.y };
}

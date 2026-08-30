import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, DataTable, Panel, TableCellFrame, TableCellText, TableCellValue } from "../components";
import type { DataColumn, DataTableSort } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "./data-admin.css";
import { columns, rows } from "./data-admin-data";

const meta = {
  title: "MDS/Components/Data/Data table",
  component: DataTable,
  subcomponents: { TableCellText, TableCellValue, TableCellFrame },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "DataTable is the MDS record table for product surfaces that need selection, sorting, row actions, loading states, empty states, and controlled column layout.",
          "",
          "### Column sizing",
          "",
          "Use `defaultWidth` for the starting width of a fixed column. Use controlled `columnWidths` when a product owns layout state.",
          "",
          "`minWidth` and `maxWidth` constrain resizable columns. When the table cannot fit the declared widths and minimums, the table wrapper scrolls horizontally instead of collapsing content past its floor.",
          "",
          "`grow` marks a column as flexible. `grow: true` equals `grow: 1`; numeric values act as weights when multiple columns share remaining width. Keep at least one grow column when the table should absorb container width changes.",
          "",
          "`resizable: false` removes the resize handle for a column. Boundary handles resize the column on the right; when that column is a grow column, the adjacent fixed column owns the width change and the grow column absorbs the remainder.",
          "",
          "`align` sets header and cell alignment for the whole column. Use `left`, `middle`, or `right`; numeric columns align right by default.",
          "",
          "Use `rowHeight=\"compact\"` or `rowHeight=\"twoLine\"` for semantic fixed-height rhythms, or pass a number when a product needs an exact row height.",
          "",
          "Set `headerVisible: false` when a narrow icon column needs a column name for sorting, accessibility, and column menus without printing header text.",
          "",
          "Use `TableCellText` for primary and secondary text, `TableCellValue` for numeric fragments with semantic tone, and `TableCellFrame` for custom visuals that should align to the same cell rhythm.",
          "",
          "### Controlled layout",
          "",
          "`columnOrder`, `visibleColumnIds`, `columnWidths`, `sort`, and `selectedRowIds` support controlled and uncontrolled usage. Use `onColumnWidthsChange` for live rendering during resize and `onColumnWidthsCommit` for persistence after a pointer resize ends or a keyboard resize step completes.",
          "",
          "Enable `columnControls` when MDS should provide column header menus plus the table-level column visibility menu.",
          "",
          "Use `onRowClick` for clickable detail rows and `getRowProps` for row-level DOM attributes or custom event handling.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

const literalColumnWidths: Record<string, number> = {
  name: 220,
  stories: 96,
  status: 140,
  target: 140,
  owner: 150,
};

interface HoldingRow {
  id: string;
  phase: "closed" | "partial" | "open";
  symbol: string;
  name: string;
  gain: number;
  today: number;
  price: number;
  sparkline: number[];
}

const holdingRows: HoldingRow[] = [
  { id: "holding-001", phase: "open", symbol: "MSK", name: "Miskun Labs", gain: 100, today: 12, price: 40.2, sparkline: [18, 24, 20, 28, 31, 29, 36] },
  { id: "holding-002", phase: "closed", symbol: "HLX", name: "Helix Works", gain: -5, today: -1.8, price: 709.7, sparkline: [34, 31, 30, 25, 28, 23, 20] },
  { id: "holding-003", phase: "partial", symbol: "NRV", name: "Nerve Systems", gain: 3, today: 0.4, price: 166.66, sparkline: [21, 22, 24, 23, 28, 29, 30] },
  { id: "holding-004", phase: "closed", symbol: "ORB", name: "Orbital Studio", gain: -20, today: -4.1, price: 260.27, sparkline: [37, 34, 29, 25, 23, 19, 16] },
  { id: "holding-005", phase: "closed", symbol: "ZRO", name: "Zero Point", gain: 0, today: 0, price: 495.03, sparkline: [20, 22, 21, 23, 22, 24, 23] },
  { id: "holding-006", phase: "partial", symbol: "ARC", name: "Arc Supply", gain: 12, today: 2.3, price: 343.08, sparkline: [22, 24, 27, 26, 30, 33, 35] },
  { id: "holding-007", phase: "partial", symbol: "INF", name: "Infinity Fund", gain: Number.NEGATIVE_INFINITY, today: -9.7, price: 16.65, sparkline: [35, 33, 28, 24, 18, 13, 8] },
];

const holdingColumns: Array<DataColumn<HoldingRow>> = [
  {
    id: "phase",
    header: "Market phase",
    headerVisible: false,
    sortable: true,
    align: "middle",
    defaultWidth: 56,
    minWidth: 48,
    maxWidth: 64,
    sortValue: (row: HoldingRow) => (row.phase === "open" ? 2 : row.phase === "partial" ? 1 : 0),
    cell: (row: HoldingRow) => <span className={`data-phase data-phase--${row.phase}`} aria-label={row.phase} />,
  },
  {
    id: "symbol",
    header: "Symbol",
    sortable: true,
    grow: true,
    minWidth: 160,
    cell: (row: HoldingRow) => <TableCellText secondary={row.name}>{row.symbol}</TableCellText>,
    sortValue: (row: HoldingRow) => row.symbol,
  },
  {
    id: "sparkline",
    header: "Sparkline",
    align: "middle",
    defaultWidth: 130,
    minWidth: 110,
    cell: (row: HoldingRow) => (
      <TableCellFrame>
        <MiniSparkline values={row.sparkline} tone={row.today < 0 ? "negative" : "positive"} />
      </TableCellFrame>
    ),
  },
  {
    id: "price",
    header: "Price",
    sortable: true,
    numeric: true,
    defaultWidth: 120,
    minWidth: 100,
    sortValue: (row: HoldingRow) => row.price,
    cell: (row: HoldingRow) => (
      <TableCellText
        secondary={
          <TableCellValue className="data-value-delta" tone={row.today < 0 ? "negative" : row.today > 0 ? "positive" : "muted"}>
            {row.today > 0 ? "+" : ""}
            {row.today.toFixed(1)}%
          </TableCellValue>
        }
      >
        <TableCellValue tone="neutral">€{row.price.toFixed(2)}</TableCellValue>
      </TableCellText>
    ),
  },
  {
    id: "gain",
    header: "Total gain",
    sortable: true,
    numeric: true,
    align: "right",
    defaultWidth: 140,
    minWidth: 110,
    sortValue: (row: HoldingRow) => row.gain,
    cell: (row: HoldingRow) => (
      <TableCellValue tone={row.gain < 0 ? "negative" : row.gain > 0 ? "positive" : "muted"}>
        {row.gain === Number.NEGATIVE_INFINITY ? "-Infinity" : row.gain.toLocaleString()}
      </TableCellValue>
    ),
  },
  {
    id: "today",
    header: "Today",
    sortable: true,
    numeric: true,
    align: "middle",
    defaultWidth: 120,
    minWidth: 100,
    sortValue: (row: HoldingRow) => row.today,
    cell: (row: HoldingRow) => (
      <TableCellValue tone={row.today < 0 ? "negative" : row.today > 0 ? "positive" : "muted"}>
        {row.today.toFixed(1)}
      </TableCellValue>
    ),
  },
];

export const SortAndSelect: Story = {
  parameters: storyDescription("Use controlled state when selection and sorting drive other surfaces such as bulk actions or detail panels."),
  render: () => {
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>(["cmp-001"]);
    const [sort, setSort] = useState<DataTableSort | null>({ columnId: "name", direction: "asc" });

    return (
      <DataTable
        caption="Component inventory with sortable columns, row selection, and row actions."
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectable
        selectedRowIds={selectedRowIds}
        onSelectedRowIdsChange={setSelectedRowIds}
        sort={sort}
        onSortChange={setSort}
        rowActions={[
          { label: "Open" },
          { label: "Duplicate" },
          { label: "Archive" },
        ]}
      />
    );
  },
};

export const NumericRows: Story = {
  parameters: storyDescription("Numeric sort values use numeric comparison so negative values, zero, and Infinity order correctly."),
  render: () => {
    const [sort, setSort] = useState<DataTableSort | null>({ columnId: "gain", direction: "asc" });
    const [activeRow, setActiveRow] = useState<HoldingRow | null>(holdingRows[0]);

    return (
      <div className="data-page data-page--plain">
        <DataTable
          label="Holdings"
          caption="Holdings with negative numeric sort values and clickable rows."
          columns={holdingColumns}
          data={holdingRows}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.symbol}
          sort={sort}
          onSortChange={setSort}
          onRowClick={setActiveRow}
          rowHeight="twoLine"
          columnControls
          getRowProps={(row) => ({
            "aria-label": `Open ${row.symbol} details`,
          })}
        />
        <p className="mds-text mds-text--muted">Selected row: {activeRow ? `${activeRow.symbol} - ${activeRow.name}` : "None"}</p>
      </div>
    );
  },
};

function MiniSparkline({ values, tone }: { values: number[]; tone: "positive" | "negative" }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 100;
      const y = 30 - ((value - min) / range) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className={`data-sparkline data-sparkline--${tone}`} viewBox="0 0 100 32" role="img" aria-label={`${tone} trend`}>
      <polyline points={points} />
    </svg>
  );
}

export const ColumnLayout: Story = {
  parameters: storyDescription(
    "Column order, visibility, widths, selection, and sorting can be controlled by the consumer. Use live width changes for rendering and committed width changes for persistence.",
  ),
  render: () => {
    const layoutColumns = columns.map((column) => ({
      ...column,
      maxWidth: undefined,
      numeric: column.id === "stories" ? false : column.numeric,
      resizable: column.id === "name" ? column.resizable : true,
    }));
    const [columnOrder, setColumnOrder] = useState(["name", "stories", "status", "target", "owner"]);
    const [visibleColumnIds, setVisibleColumnIds] = useState(["name", "stories", "status", "target"]);
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
      stories: 96,
      status: 140,
      target: 140,
      owner: 150,
    });
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>(["cmp-001-1", "cmp-003-1"]);
    const [sort, setSort] = useState<DataTableSort | null>({ columnId: "name", direction: "asc" });
    const repeatedRows = Array.from({ length: 4 }, (_, index) => rows.map((row) => ({ ...row, id: `${row.id}-${index + 1}` }))).flat();
    return (
      <div className="data-page data-page--plain">
        <div className="mds-cluster">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setColumnOrder(columnOrder[0] === "name" ? ["stories", "name", "status", "target", "owner"] : ["name", "stories", "status", "target", "owner"])
            }
          >
            Swap first columns
          </Button>
        </div>
        <DataTable
          label="Controlled component inventory"
          caption="Component inventory with controlled column order, visibility, widths, and a sticky header."
          columns={layoutColumns}
          data={repeatedRows}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.name}
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          visibleColumnIds={visibleColumnIds}
          onVisibleColumnIdsChange={setVisibleColumnIds}
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          onColumnWidthsCommit={setColumnWidths}
          columnControls
          selectable
          selectedRowIds={selectedRowIds}
          onSelectedRowIdsChange={setSelectedRowIds}
          sort={sort}
          onSortChange={setSort}
          rowActions={[
            { label: "Open" },
            { label: "Duplicate" },
            { label: "Archive" },
          ]}
          containerStyle={{ maxHeight: 320 }}
          stickyHeader
        />
      </div>
    );
  },
};

export const WeightedGrowColumns: Story = {
  parameters: storyDescription("Use weighted grow columns when one or more columns should absorb available table width after fixed columns keep their declared size."),
  render: () => {
    const sizingColumns = columns.map((column) => {
      if (column.id === "name") return { ...column, grow: 2 };
      if (column.id === "owner") return { ...column, grow: 1, defaultWidth: undefined, minWidth: 130 };
      if (column.id === "stories") return { ...column, numeric: false, maxWidth: undefined };
      return { ...column, resizable: true };
    });

    return (
      <DataTable
        label="Component inventory with weighted grow columns"
        caption="Component inventory with fixed columns and weighted grow columns."
        columns={sizingColumns}
        data={rows}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        defaultColumnWidths={{
          stories: 96,
          status: 130,
          target: 140,
        }}
        columnControls
      />
    );
  },
};

export const LiteralWidthColumns: Story = {
  parameters: storyDescription(
    "Use literal-width columns when every column should keep its declared pixel width and the wrapper should scroll when the table no longer fits.",
  ),
  render: () => {
    const literalColumns = columns.map((column) => ({
      ...column,
      grow: undefined,
      maxWidth: undefined,
      numeric: column.id === "stories" ? false : column.numeric,
      resizable: true,
      defaultWidth: literalColumnWidths[column.id],
    }));
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => ({ ...literalColumnWidths }));

    return (
      <DataTable
        label="Component inventory with literal column widths"
        caption="Component inventory with literal-width columns and no grow column."
        columns={literalColumns}
        data={rows}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        columnWidths={columnWidths}
        onColumnWidthsChange={setColumnWidths}
        onColumnWidthsCommit={setColumnWidths}
        columnControls
        rowActions={[
          { label: "Open" },
          { label: "Duplicate" },
          { label: "Archive" },
        ]}
      />
    );
  },
};

export const FlushActionsInPanel: Story = {
  parameters: storyDescription("Flush tables can sit inside raised surfaces without forcing the sticky control column to a black body stripe."),
  render: () => {
    const panelColumns = columns.map((column) => {
      if (column.id === "name") return { ...column, grow: true, minWidth: 180 };
      if (column.id === "stories") return { ...column, numeric: false, defaultWidth: 96 };
      return { ...column, defaultWidth: literalColumnWidths[column.id] };
    });

    return (
      <Panel variant="raised" style={{ maxWidth: 560 }}>
        <DataTable
          label="Flush component inventory"
          caption="Flush component inventory inside a raised panel."
          columns={panelColumns}
          data={rows}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.name}
          columnControls
          rowActions={[
            { label: "Open" },
            { label: "Duplicate" },
            { label: "Archive" },
          ]}
          surface="flush"
        />
      </Panel>
    );
  },
};

export const LoadingAndEmpty: Story = {
  parameters: storyDescription("Data states should preserve intent while clearly communicating loading or empty results."),
  render: () => (
    <div className="data-page data-page--plain">
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} loading />
      <DataTable
        label="Filtered component inventory"
        columns={columns}
        data={[]}
        getRowId={(row) => row.id}
        emptyTitle="No matching components"
        emptyDescription="Clear filters or create a new component."
      />
    </div>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("DataTable can be compared on canvas and inside a raised panel."),
  render: () => (
    <SurfaceComparison
      maxWidth={1280}
      canvas={
        <DataTable
          label="Canvas table"
          columns={columns}
          data={rows.slice(0, 4)}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.name}
          selectable
          rowActions={[{ label: "Open" }, { label: "Archive" }]}
        />
      }
      panel={
        <DataTable
          label="Panel table"
          columns={columns}
          data={rows.slice(0, 4)}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.name}
          selectable
          rowActions={[{ label: "Open" }, { label: "Archive" }]}
        />
      }
    />
  ),
};

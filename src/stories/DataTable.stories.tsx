import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, DataTable, DataTableSort } from "../components";
import "./data-admin.css";
import { columns, rows } from "./data-admin-data";

const meta = {
  title: "MDS/Components/Data/Data table",
  component: DataTable,
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
          "### Controlled layout",
          "",
          "`columnOrder`, `visibleColumnIds`, `columnWidths`, `sort`, and `selectedRowIds` support controlled and uncontrolled usage. Use `onColumnWidthsChange` for live rendering during resize and `onColumnWidthsCommit` for persistence after a pointer resize ends or a keyboard resize step completes.",
          "",
          "Enable `columnControls` when MDS should provide the header context menu for sorting, moving, and hiding columns.",
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
    const ownerVisible = visibleColumnIds.includes("owner");

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
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setVisibleColumnIds(ownerVisible ? visibleColumnIds.filter((columnId) => columnId !== "owner") : [...visibleColumnIds, "owner"])
            }
          >
            {ownerVisible ? "Hide owner" : "Show owner"}
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

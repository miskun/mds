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
        component:
          "DataTable adds controlled selection, sorting, row actions, column layout, loading, and empty states to table data.",
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
    "Column order, visibility, widths, selection, and sorting can be controlled by the consumer. Enable column controls when MDS should provide the header menu interaction.",
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

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DataTable, DataTableSort } from "../components";
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
          "DataTable adds controlled selection, sorting, row actions, loading, and empty states to table data.",
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

export const LoadingAndEmpty: Story = {
  parameters: storyDescription("Data states should preserve intent while clearly communicating loading or empty results."),
  render: () => (
    <div className="data-page data-page--plain">
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} loading />
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} emptyTitle="No matching components" emptyDescription="Clear filters or create a new component." />
    </div>
  ),
};

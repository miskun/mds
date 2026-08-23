import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Clock, FileText, Plus, Settings } from "lucide-react";
import {
  ActivityFeed,
  ActivityItem,
  Badge,
  BulkActionBar,
  Button,
  Card,
  ComboBox,
  DataTableSort,
  DataTable,
  DetailPanel,
  IconButton,
  Input,
  ListItem,
  MetricCard,
  Pagination,
  StatusDot,
  TableToolbar,
} from "../components";
import "./data-admin.css";
import { columns, rows } from "./data-admin-data";

const meta = {
  title: "MDS/Components/Data/Overview",
  component: DataTable,
  subcomponents: { TableToolbar, BulkActionBar, Pagination, MetricCard, ListItem, DetailPanel, ActivityFeed, ActivityItem },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Data and admin primitives cover sortable tables, controlled selection, toolbar filters, metrics, bulk actions, pagination, and detail surfaces.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const AdminTable: Story = {
  parameters: storyDescription("Admin tables cover controlled sorting, controlled selection, row actions, filtering controls, metrics, bulk actions, and pagination."),
  render: () => {
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>(["cmp-001", "cmp-002"]);
    const [sort, setSort] = useState<DataTableSort | null>({ columnId: "name", direction: "asc" });

    return (
      <div className="data-page">
        <div className="data-metrics">
          <MetricCard label="Components" value="42" delta="+8 this week" />
          <MetricCard label="Stable" value="26" delta="+4 shipped" />
          <MetricCard label="Coverage" value="78%" delta="+12%" />
        </div>
        <Card>
          <div className="mds-stack">
            <TableToolbar
              title="Component inventory"
              description="Sortable, selectable records for admin surfaces."
              actions={<Button icon={<Plus size={14} />}>New component</Button>}
            >
              <Input aria-label="Search components" placeholder="Search" />
              <ComboBox
                aria-label="Target filter"
                defaultValue="all"
                options={[
                  { value: "all", label: "All targets" },
                  { value: "admin", label: "Admin" },
                  { value: "desktop", label: "Desktop" },
                ]}
              />
            </TableToolbar>
            <BulkActionBar selectedCount={selectedRowIds.length} actions={<Button size="sm" variant="secondary">Archive</Button>} />
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
            <div className="data-footer">
              <span>Showing 1-5 of 42</span>
              <Pagination page={2} pageCount={8} />
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const LoadingAndEmpty: Story = {
  parameters: storyDescription("Data states should preserve column structure while clearly communicating loading or empty results."),
  render: () => (
    <div className="data-page">
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} loading />
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} emptyTitle="No matching components" emptyDescription="Clear filters or create a new component." />
    </div>
  ),
};

export const ListAndDetail: Story = {
  parameters: storyDescription("List and detail patterns combine compact records, status metadata, contextual actions, and activity history."),
  render: () => (
    <div className="data-page">
      <div className="data-split">
        <div className="mds-stack">
          {rows.slice(0, 3).map((row) => (
            <ListItem
              key={row.id}
              title={row.name}
              description={`${row.target} target maintained by ${row.owner}`}
              meta={<StatusDot tone={row.status === "stable" ? "success" : "warning"} label={row.status} />}
              media={<Badge tone="accent">{row.stories}</Badge>}
              action={<IconButton label={`Configure ${row.name}`} icon={<Settings size={14} />} />}
            />
          ))}
        </div>
        <DetailPanel title="DataTable" meta="Admin target · review" actions={<Button size="sm">Open</Button>}>
          <ActivityFeed>
            <ActivityItem title="Story added" meta="2h" icon={<FileText size={13} />}>
              Added selectable rows and row actions.
            </ActivityItem>
            <ActivityItem title="Review requested" meta="1d" icon={<Clock size={13} />}>
              Waiting for target pass on mobile.
            </ActivityItem>
          </ActivityFeed>
        </DetailPanel>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CheckCircle2, FileText, Layers3, PanelRight, Search, Settings } from "lucide-react";
import {
  Alert,
  Badge,
  BulkActionBar,
  Button,
  Card,
  Checkbox,
  DataColumn,
  DataTable,
  DataTableSort,
  DetailPanel,
  Dialog,
  Drawer,
  Eyebrow,
  EmptyState,
  ComboBox,
  IconButton,
  Input,
  ListItem,
  Pagination,
  Prose,
  Radio,
  RadioGroup,
  StatusDot,
  Switch,
  TableToolbar,
} from "../components";
import "../showcase.css";
import "./data-admin.css";

const meta = {
  title: "MDS/Patterns/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

interface ComponentRow {
  id: string;
  name: string;
  target: "desktop" | "mobile" | "admin" | "editorial";
  status: "stable" | "review" | "draft";
  stories: number;
}

const rows: ComponentRow[] = [
  { id: "cmp-001", name: "Button", target: "admin", status: "stable", stories: 8 },
  { id: "cmp-002", name: "DataTable", target: "admin", status: "review", stories: 4 },
  { id: "cmp-003", name: "Hero", target: "editorial", status: "draft", stories: 2 },
  { id: "cmp-004", name: "CommandPalette", target: "desktop", status: "review", stories: 5 },
];

const columns: Array<DataColumn<ComponentRow>> = [
  {
    id: "name",
    header: "Component",
    accessor: "name",
    sortable: true,
    cell: (row) => (
      <div className="data-name">
        <strong>{row.name}</strong>
        <span>{row.id}</span>
      </div>
    ),
  },
  {
    id: "target",
    header: "Target",
    accessor: "target",
    sortable: true,
    cell: (row) => <Badge tone={row.target === "admin" ? "accent" : "neutral"}>{row.target}</Badge>,
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    sortable: true,
    cell: (row) => <StatusDot tone={row.status === "stable" ? "success" : row.status === "review" ? "warning" : "neutral"} label={row.status} />,
  },
  { id: "stories", header: "Stories", accessor: "stories", sortValue: "stories", sortable: true, align: "right" },
];

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Overview: Story = {
  name: "Introduction",
  parameters: storyDescription("Patterns document repeatable workflows that combine multiple components into product behavior."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <Prose as="header">
        <Eyebrow>Patterns</Eyebrow>
        <h1>Reusable solutions that combine components.</h1>
        <p>
          Components document individual primitives. Patterns document workflows, layout decisions, interaction behavior, and recovery paths.
        </p>
      </Prose>

      <div className="mds-cluster">
        <StatusDot tone="success" label="Repeatable" />
        <StatusDot tone="accent" label="Workflow-driven" />
        <StatusDot label="Component-composed" />
      </div>

      <div className="mds-stack">
        <Card eyebrow="Pattern" title="Validate before publishing" action={<CheckCircle2 size={16} aria-hidden="true" />}>
          <div className="mds-stack">
            <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
            <Checkbox label="Include in public docs" defaultChecked />
            <Alert tone="danger" title="Publish blocked">
              Resolve invalid fields before publishing.
            </Alert>
          </div>
        </Card>

        <Card eyebrow="Pattern" title="Choose a product target" action={<Layers3 size={16} aria-hidden="true" />}>
          <RadioGroup label="Default target" hint="Target changes spacing, typography, and control scale.">
            <Radio name="pattern-target" value="desktop" label="Desktop" />
            <Radio name="pattern-target" value="mobile" label="Mobile" />
            <Radio name="pattern-target" value="admin" label="Admin portal" defaultChecked />
            <Radio name="pattern-target" value="editorial" label="Editorial" />
          </RadioGroup>
        </Card>

        <Card eyebrow="Pattern" title="Filter a component inventory" action={<FileText size={16} aria-hidden="true" />}>
          <div className="mds-cluster">
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
            <Switch label="Stable only" defaultChecked />
            <Button>Apply</Button>
          </div>
        </Card>
      </div>
    </div>
  ),
};

export const ValidationAndPublishing: Story = {
  parameters: storyDescription("Validation patterns keep the error next to the field, summarize the blocking state, and keep the primary action visible."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 640 }}>
      <Card eyebrow="Publishing" title="Validate before publishing">
        <div className="mds-stack">
          <Input label="Component name" defaultValue="DataTable" required />
          <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
          <ComboBox
            label="Default target"
            defaultValue="admin"
            options={[
              { value: "desktop", label: "Desktop" },
              { value: "mobile", label: "Mobile" },
              { value: "admin", label: "Admin portal" },
              { value: "editorial", label: "Editorial" },
            ]}
          />
          <Checkbox label="Include in public docs" defaultChecked />
          <Alert tone="danger" title="Publish blocked">
            Resolve invalid fields before publishing this component.
          </Alert>
          <div className="mds-cluster">
            <Button disabled>Publish</Button>
            <Button variant="secondary">Save draft</Button>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const FilteringAndBulkActions: Story = {
  parameters: storyDescription("Filtering patterns keep search, filters, result controls, selection, and bulk actions in the same operational surface."),
  render: () => {
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>(["cmp-001", "cmp-002"]);
    const [sort, setSort] = useState<DataTableSort | null>({ columnId: "name", direction: "asc" });

    return (
      <div className="data-page" style={{ minHeight: "auto" }}>
        <Card>
          <div className="mds-stack">
            <TableToolbar
              title="Component inventory"
              description="Search, filter, select, and act on visible records."
              actions={<Button>New component</Button>}
            >
              <Input aria-label="Search components" placeholder="Search" />
              <ComboBox
                aria-label="Target filter"
                defaultValue="all"
                options={[
                  { value: "all", label: "All targets" },
                  { value: "admin", label: "Admin" },
                  { value: "desktop", label: "Desktop" },
                  { value: "editorial", label: "Editorial" },
                ]}
              />
              <Switch label="Stable only" />
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
              rowActions={[{ label: "Open" }, { label: "Duplicate" }, { label: "Archive" }]}
            />
            <div className="data-footer">
              <span>Showing 1-4 of 42</span>
              <Pagination page={1} pageCount={8} />
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const EmptyLoadingRecovery: Story = {
  parameters: storyDescription("Recovery patterns show the current state, preserve context, and offer a clear next action."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 760 }}>
      <Alert tone="warning" title="No results after filtering">
        Clear filters before creating a new component.
      </Alert>
      <EmptyState
        title="No matching components"
        description="Clear active filters or create a new component."
        icon={<Search size={22} />}
        action={<Button>Create component</Button>}
      />
      <DataTable columns={columns} data={[]} getRowId={(row) => row.id} loading />
    </div>
  ),
};

export const SettingsSurfaces: Story = {
  parameters: storyDescription("Settings patterns use drawers for contextual edits and dialogs for confirmable decisions."),
  render: () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
      <div className="data-split" style={{ maxWidth: 920 }}>
        <div className="mds-stack">
          {rows.slice(0, 3).map((row) => (
            <ListItem
              key={row.id}
              title={row.name}
              description={`${row.target} target component`}
              meta={<StatusDot tone={row.status === "stable" ? "success" : "warning"} label={row.status} />}
              media={<Badge tone="accent">{row.stories}</Badge>}
              action={<IconButton label={`Configure ${row.name}`} icon={<Settings size={14} />} onClick={() => setDrawerOpen(true)} />}
            />
          ))}
        </div>

        <DetailPanel title="DataTable" meta="Admin target · review">
          <Alert tone="info" title="Review in progress">
            Use the settings drawer for secondary details.
          </Alert>
        </DetailPanel>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          trigger={
            <Button size="sm" variant="secondary" icon={<PanelRight size={14} />}>
              Settings
            </Button>
          }
          title="Component settings"
          description="Drawers keep the selected record in context."
          footer={<Button onClick={() => setDrawerOpen(false)}>Save changes</Button>}
        >
          <div className="mds-stack">
            <Input label="Owner" defaultValue="Miskun" />
            <ComboBox
              label="Target"
              defaultValue="admin"
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "mobile", label: "Mobile" },
                { value: "admin", label: "Admin" },
                { value: "editorial", label: "Editorial" },
              ]}
            />
            <Switch label="Visible in docs" defaultChecked />
          </div>
        </Drawer>

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          trigger={<Button variant="secondary">Archive component</Button>}
          title="Archive component"
          description="Archived components are hidden from public documentation."
          footer={
            <>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setDialogOpen(false)}>
                Archive
              </Button>
            </>
          }
        >
          <Alert tone="warning" title="Confirm archive">
            This removes the component from public documentation until it is restored.
          </Alert>
        </Dialog>
      </div>
    );
  },
};

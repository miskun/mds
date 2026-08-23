import type { Meta, StoryObj } from "@storybook/react-vite";
import { Archive, Plus } from "lucide-react";
import { BulkActionBar, Button, Card, Cluster, ComboBox, Input, Stack, TableToolbar } from "../components";
import "./data-admin.css";

const meta = {
  title: "MDS/Components/Data/Toolbars and bulk actions",
  component: TableToolbar,
  subcomponents: { BulkActionBar },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "TableToolbar and BulkActionBar organize data controls, filters, primary actions, and selected-row actions.",
      },
    },
  },
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const TableControls: Story = {
  parameters: storyDescription("Table toolbars keep title, description, filters, and table actions visually connected."),
  render: () => (
    <Card>
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
    </Card>
  ),
};

export const BulkActions: Story = {
  parameters: storyDescription("Bulk action bars appear only when selected rows can receive the same action."),
  render: () => (
    <Stack style={{ maxWidth: 760 }}>
      <BulkActionBar
        selectedCount={3}
        actions={
          <Cluster gap="xs">
            <Button size="sm" variant="secondary" icon={<Archive size={14} />}>
              Archive
            </Button>
            <Button size="sm" variant="ghost">Clear</Button>
          </Cluster>
        }
      />
      <BulkActionBar selectedCount={0} actions={<Button size="sm">Hidden</Button>} />
    </Stack>
  ),
};

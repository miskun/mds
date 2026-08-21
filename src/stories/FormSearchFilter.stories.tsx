import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Badge, Button, Card, Cluster, Input, Panel, Select, Stack, Tag } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Forms/Search and filter controls",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Search and filter controls combine text fields, selects, tags, and actions into repeatable query interfaces.",
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const SearchField: Story = {
  parameters: storyDescription("Use native search inputs for query fields and pair them with explicit filter controls when needed."),
  render: () => (
    <Stack style={{ maxWidth: 680 }}>
      <Input type="search" label="Search components" placeholder="Search by name, group, or status" />
      <Cluster>
        <Button icon={<Search size={16} />}>Search</Button>
        <Button variant="secondary">Clear</Button>
      </Cluster>
    </Stack>
  ),
};

export const FilterBar: Story = {
  parameters: storyDescription("Filter bars should keep query, facets, active filters, and reset actions visually connected."),
  render: () => (
    <Card eyebrow="Filters" title="Component library">
      <Stack>
        <Cluster align="end">
          <Input type="search" label="Query" placeholder="Search components" />
          <Select label="Group" defaultValue="all">
            <option value="all">All groups</option>
            <option value="forms">Forms</option>
            <option value="layout">Layout</option>
            <option value="containers">Containers</option>
          </Select>
          <Select label="Status" defaultValue="stable">
            <option value="stable">Stable</option>
            <option value="review">In review</option>
            <option value="draft">Draft</option>
          </Select>
          <Button>Apply</Button>
        </Cluster>
        <Panel variant="ghost" padding="sm">
          <Cluster gap="xs">
            <Badge tone="accent">3 filters</Badge>
            <Tag removable onRemove={() => undefined}>Forms</Tag>
            <Tag removable onRemove={() => undefined}>Stable</Tag>
            <Button size="sm" variant="ghost">Reset</Button>
          </Cluster>
        </Panel>
      </Stack>
    </Card>
  ),
};

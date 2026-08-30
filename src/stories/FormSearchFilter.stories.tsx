import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Badge, Button, Card, Cluster, ComboBox, Input, Panel, Stack, Tag } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Patterns/Search and filter",
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
          <ComboBox
            label="Group"
            defaultValue="all"
            options={[
              { value: "all", label: "All groups" },
              { value: "forms", label: "Forms" },
              { value: "layout", label: "Layout" },
              { value: "containers", label: "Containers" },
            ]}
          />
          <ComboBox
            label="Status"
            defaultValue="stable"
            options={[
              { value: "stable", label: "Stable" },
              { value: "review", label: "In review" },
              { value: "draft", label: "Draft" },
            ]}
          />
          <Button>Apply</Button>
        </Cluster>
        <Panel variant="ghost" padding="sm">
          <Cluster gap="xs">
            <Badge tone="accent">3 filters</Badge>
            <Tag removable removeLabel="Remove Forms filter" onRemove={() => undefined}>Forms</Tag>
            <Tag removable removeLabel="Remove Stable filter" onRemove={() => undefined}>Stable</Tag>
            <Button size="sm" variant="ghost">Reset</Button>
          </Cluster>
        </Panel>
      </Stack>
    </Card>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Search and filter controls can be compared directly on canvas and inside raised panels."),
  render: () => (
    <SurfaceComparison
      maxWidth={1120}
      canvas={
        <>
          <Input type="search" label="Query" placeholder="Search components" />
          <ComboBox
            label="Status"
            defaultValue="stable"
            options={[
              { value: "stable", label: "Stable" },
              { value: "review", label: "In review" },
              { value: "draft", label: "Draft" },
            ]}
          />
          <Cluster gap="xs">
            <Button icon={<Search size={16} />}>Apply</Button>
            <Button variant="secondary">Reset</Button>
          </Cluster>
        </>
      }
      panel={
        <>
          <Input type="search" label="Query" placeholder="Search components" />
          <ComboBox
            label="Status"
            defaultValue="stable"
            options={[
              { value: "stable", label: "Stable" },
              { value: "review", label: "In review" },
              { value: "draft", label: "Draft" },
            ]}
          />
          <Cluster gap="xs">
            <Button icon={<Search size={16} />}>Apply</Button>
            <Button variant="secondary">Reset</Button>
          </Cluster>
        </>
      }
    />
  ),
};

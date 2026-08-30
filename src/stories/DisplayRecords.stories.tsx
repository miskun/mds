import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings } from "lucide-react";
import { Avatar, Badge, IconButton, ListItem, Stack, StatusDot } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Records",
  component: ListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Record primitives present compact objects with title, description, metadata, media, and optional actions.",
      },
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ComponentRecords: Story = {
  parameters: storyDescription("List items combine a primary label with secondary context and compact row actions."),
  render: () => (
    <Stack style={{ maxWidth: 640 }}>
      <ListItem
        title="DataTable"
        description="Admin target maintained by Miskun"
        meta={<StatusDot tone="warning" label="review" />}
        media={<Avatar name="Miskun" status="online" />}
        action={<IconButton label="Configure DataTable" icon={<Settings size={14} />} />}
      />
      <ListItem
        title="Button"
        description="Shared action primitive"
        meta={<StatusDot tone="success" label="stable" />}
        media={<Badge tone="success">8</Badge>}
      />
      <ListItem title="Tooltip" description="Overlay guidance primitive" meta={<StatusDot label="draft" />} />
    </Stack>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Record rows can be compared on canvas and inside raised panels."),
  render: () => (
    <SurfaceComparison
      maxWidth={1080}
      canvas={
        <>
          <ListItem
            title="DataTable"
            description="Admin target maintained by Miskun"
            meta={<StatusDot tone="warning" label="review" />}
            media={<Avatar name="Miskun" status="online" />}
            action={<IconButton label="Configure DataTable" icon={<Settings size={14} />} />}
          />
          <ListItem title="Button" description="Shared action primitive" meta={<StatusDot tone="success" label="stable" />} media={<Badge tone="success">8</Badge>} />
        </>
      }
      panel={
        <>
          <ListItem
            title="DataTable"
            description="Admin target maintained by Miskun"
            meta={<StatusDot tone="warning" label="review" />}
            media={<Avatar name="Miskun" status="online" />}
            action={<IconButton label="Configure DataTable" icon={<Settings size={14} />} />}
          />
          <ListItem title="Button" description="Shared action primitive" meta={<StatusDot tone="success" label="stable" />} media={<Badge tone="success">8</Badge>} />
        </>
      }
    />
  ),
};

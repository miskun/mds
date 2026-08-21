import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings } from "lucide-react";
import { Badge, Card, Divider, IconButton, Kbd, ListItem, StatusDot, Tag } from "../components";
import "../showcase.css";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Display",
  component: Badge,
  subcomponents: { Tag, StatusDot, Kbd, Divider, Card, ListItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Display primitives present status, metadata, keyboard hints, separations, cards, and compact records.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const StatusMetadata: Story = {
  parameters: storyDescription("Badges, tags, status dots, and keyboard hints keep metadata compact and readable across targets."),
  render: () => (
    <Card eyebrow="Inline" title="Status and metadata">
      <div className="mds-stack">
        <div className="mds-cluster">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="danger">Danger</Badge>
        </div>
        <Divider />
        <div className="mds-cluster">
          <StatusDot tone="success" label="Online" />
          <StatusDot tone="warning" label="Review" />
          <StatusDot tone="danger" label="Blocked" />
          <StatusDot label="Draft" />
        </div>
        <Divider />
        <div className="mds-cluster">
          <Tag>admin</Tag>
          <Tag removable onRemove={() => undefined}>desktop</Tag>
          <Tag>editorial</Tag>
        </div>
        <Divider />
        <div className="mds-cluster">
          <span className="feedback-copy">Open command menu</span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>
    </Card>
  ),
};

export const Records: Story = {
  parameters: storyDescription("List items combine title, description, metadata, media, and compact actions."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 640 }}>
      <ListItem
        title="DataTable"
        description="Admin target maintained by Miskun"
        meta={<StatusDot tone="warning" label="review" />}
        media={<Badge tone="accent">4</Badge>}
        action={<IconButton label="Configure DataTable" icon={<Settings size={14} />} />}
      />
      <ListItem
        title="Button"
        description="Shared action primitive"
        meta={<StatusDot tone="success" label="stable" />}
        media={<Badge tone="success">8</Badge>}
      />
    </div>
  ),
};

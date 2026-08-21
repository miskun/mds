import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Card, Cluster, Divider, Stack, StatusDot, Tag } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Metadata",
  component: Badge,
  subcomponents: { Tag, StatusDot },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Metadata primitives present compact status, labels, and categorization without taking over the surface.",
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
  parameters: storyDescription("Badges, tags, and status dots keep metadata compact and readable across targets."),
  render: () => (
    <Card eyebrow="Metadata" title="Status and labels">
      <Stack>
        <Cluster>
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="danger">Danger</Badge>
        </Cluster>
        <Divider />
        <Cluster>
          <StatusDot tone="success" label="Online" />
          <StatusDot tone="warning" label="Review" />
          <StatusDot tone="danger" label="Blocked" />
          <StatusDot label="Draft" />
        </Cluster>
        <Divider />
        <Cluster>
          <Tag>admin</Tag>
          <Tag removable onRemove={() => undefined}>desktop</Tag>
          <Tag>editorial</Tag>
        </Cluster>
      </Stack>
    </Card>
  ),
};

export const SemanticBadges: Story = {
  parameters: storyDescription("Use semantic badge tones only when the label carries meaning, not for arbitrary decoration."),
  render: () => (
    <Cluster>
      <Badge>Draft</Badge>
      <Badge tone="accent">Featured</Badge>
      <Badge tone="success">Stable</Badge>
      <Badge tone="danger">Deprecated</Badge>
    </Cluster>
  ),
};

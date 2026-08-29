import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, Card, Cluster, Inline, Stack, StatusDot, Tag, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout/Flex",
  component: Stack,
  subcomponents: { Cluster, Inline },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Flex layout primitives arrange children with target-aware spacing. Use them before adding local layout CSS.",
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const StackSpacing: Story = {
  parameters: storyDescription("Stack arranges content vertically with semantic spacing from the active MDS target."),
  render: () => (
    <Stack style={{ maxWidth: 680 }}>
      <Card eyebrow="Stack" title="Vertical rhythm">
        <Stack gap="sm">
          <Text tone="muted" size="md">
            Use Stack for form sections, settings panels, docs pages, and any vertical composition.
          </Text>
          <Inline gap="xs" wrap>
            <Badge tone="accent">gap sm</Badge>
            <StatusDot tone="success" label="Target-aware" />
          </Inline>
        </Stack>
      </Card>
      <Stack gap="lg">
        <Card title="xs">
          <Stack gap="xs">
            <Tag>Label</Tag>
            <Tag>Hint</Tag>
            <Tag>Value</Tag>
          </Stack>
        </Card>
        <Card title="md">
          <Stack gap="md">
            <Tag>Section</Tag>
            <Tag>Content</Tag>
            <Tag>Action</Tag>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  ),
};

export const ClusterActions: Story = {
  parameters: storyDescription("Cluster arranges related controls in rows that wrap when space gets tight."),
  render: () => (
    <Card eyebrow="Cluster" title="Toolbar composition" style={{ maxWidth: 760 }}>
      <Cluster justify="between" align="center">
        <Cluster gap="xs">
          <Button>Save</Button>
          <Button variant="secondary">Preview</Button>
          <Button variant="ghost">Cancel</Button>
        </Cluster>
        <Inline gap="xs">
          <StatusDot tone="success" label="Synced" />
          <Badge>Draft</Badge>
        </Inline>
      </Cluster>
    </Card>
  ),
};

export const InlineText: Story = {
  parameters: storyDescription("Inline keeps metadata, text fragments, and small controls aligned without creating a full toolbar."),
  render: () => (
    <Stack style={{ maxWidth: 680 }}>
      <Inline as="p" wrap>
        <StatusDot tone="warning" label="Review needed" />
        <Text as="span" tone="muted" size="md">
          Last updated by Design Systems
        </Text>
        <Tag>components</Tag>
      </Inline>
      <Card title="Inline with actions">
        <Inline wrap gap="sm">
          <Text as="span" tone="muted" size="md">
            Invite reviewers before publishing.
          </Text>
          <Button size="sm" variant="secondary">Invite</Button>
        </Inline>
      </Card>
    </Stack>
  ),
};

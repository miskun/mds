import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, Card, Cluster, Grid, Inline, MetricCard, Stack, StatusDot, Tag } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout",
  component: Stack,
  subcomponents: { Cluster, Inline, Grid },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Layout primitives arrange children with target-aware spacing. Use them before adding local layout CSS.",
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
          <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            Use Stack for form sections, settings panels, docs pages, and any vertical composition.
          </p>
          <Inline gap="xs" wrap>
            <Badge tone="accent">gap sm</Badge>
            <StatusDot tone="success" label="Target-aware" />
          </Inline>
        </Stack>
      </Card>

      <Grid columns={3}>
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
        <Card title="lg">
          <Stack gap="lg">
            <Tag>Block</Tag>
            <Tag>Group</Tag>
            <Tag>Footer</Tag>
          </Stack>
        </Card>
      </Grid>
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

export const ResponsiveGrid: Story = {
  parameters: storyDescription("Grid uses auto-fit columns by default and keeps gaps aligned with the target scale."),
  render: () => (
    <Stack>
      <Grid minItemWidth="180px">
        <MetricCard label="Revenue" value="$128k" delta="+18%" />
        <MetricCard label="Activation" value="42%" delta="+7%" />
        <MetricCard label="Incidents" value="3" delta="-2" />
        <MetricCard label="Latency" value="84ms" delta="-11%" />
      </Grid>

      <Grid minItemWidth="260px">
        <Card title="Admin portals">
          <Stack gap="sm">
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Favor scannable rows, filters, tables, and compact summaries.
            </p>
            <Button variant="secondary">Open example</Button>
          </Stack>
        </Card>
        <Card title="Editorial">
          <Stack gap="sm">
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Use wider rhythm, readable text measure, and clear calls to action.
            </p>
            <Button variant="secondary">Open example</Button>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  ),
};

export const InlineText: Story = {
  parameters: storyDescription("Inline keeps metadata, text fragments, and small controls aligned without creating a full toolbar."),
  render: () => (
    <Stack style={{ maxWidth: 680 }}>
      <Inline as="p" wrap>
        <StatusDot tone="warning" label="Review needed" />
        <span className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Last updated by Design Systems
        </span>
        <Tag>components</Tag>
      </Inline>
      <Card title="Inline with actions">
        <Inline wrap gap="sm">
          <span className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            Invite reviewers before publishing.
          </span>
          <Button size="sm" variant="secondary">Invite</Button>
        </Inline>
      </Card>
    </Stack>
  ),
};

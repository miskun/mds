import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Card, Cluster, Grid, ListItem, Stack, StatusDot, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Avatars represent people, teams, and ownership metadata with image or initials fallback and optional presence state.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Initials: Story = {
  args: {
    name: "Miskun Design",
  },
};

export const Sizes: Story = {
  parameters: storyDescription("Avatar sizes are semantic and scale from the active MDS target."),
  render: () => (
    <Cluster>
      <Avatar name="Miskun Design" size="sm" />
      <Avatar name="Miskun Design" />
      <Avatar name="Miskun Design" size="lg" />
    </Cluster>
  ),
};

export const Presence: Story = {
  parameters: storyDescription("Status markers are visual metadata. Pair status meaning with visible text when it matters."),
  render: () => (
    <Grid minItemWidth="180px">
      <Card title="Online">
        <Cluster>
          <Avatar name="Miskun Design" status="online" />
          <StatusDot tone="success" label="Online" />
        </Cluster>
      </Card>
      <Card title="Away">
        <Cluster>
          <Avatar name="Brand Team" status="away" />
          <StatusDot tone="warning" label="Away" />
        </Cluster>
      </Card>
      <Card title="Busy">
        <Cluster>
          <Avatar name="Mobile Team" status="busy" />
          <StatusDot tone="danger" label="Busy" />
        </Cluster>
      </Card>
    </Grid>
  ),
};

export const InRecords: Story = {
  parameters: storyDescription("Avatars pair well with records, activity feeds, owners, and team metadata."),
  render: () => (
    <Stack style={{ maxWidth: 640 }}>
      <ListItem
        title="Miskun"
        description="Maintains admin and data components"
        media={<Avatar name="Miskun" status="online" />}
        meta={<Text as="span" size="xs" tone="soft" weight="strong">Owner</Text>}
      />
      <ListItem
        title="Brand"
        description="Maintains editorial surfaces"
        media={<Avatar name="Brand Team" />}
        meta={<Text as="span" size="xs" tone="soft" weight="strong">Team</Text>}
      />
    </Stack>
  ),
};

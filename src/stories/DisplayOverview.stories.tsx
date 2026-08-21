import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Badge, Card, DescriptionItem, DescriptionList, Grid, Stack, StatusDot, Text, Title } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  render: () => (
    <Stack>
      <header className="mds-stack">
        <p className="mds-kicker">Display</p>
        <h1 className="mds-title">Passive information, metadata, records, and prose.</h1>
        <p className="mds-subtitle">
          Display components describe objects and state without asking for immediate action.
        </p>
      </header>
      <Grid minItemWidth="280px">
        <Card title="Metadata" eyebrow="Status">
          <Stack gap="sm">
            <Badge tone="accent">admin</Badge>
            <StatusDot tone="success" label="Stable" />
          </Stack>
        </Card>
        <Card title="Records" eyebrow="Identity">
          <Stack gap="sm">
            <Avatar name="Miskun Design System" status="online" />
            <Title size="compact">Component owner</Title>
            <Text tone="soft" size="sm">Design systems team</Text>
          </Stack>
        </Card>
        <Card title="Details" eyebrow="Description list">
          <DescriptionList>
            <DescriptionItem term="Version">0.1.0</DescriptionItem>
            <DescriptionItem term="Target">admin</DescriptionItem>
          </DescriptionList>
        </Card>
      </Grid>
    </Stack>
  ),
};

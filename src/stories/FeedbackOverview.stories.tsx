import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, Card, EmptyState, Grid, Progress, Stack, Toast } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Feedback/Overview",
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
        <p className="mds-kicker">Feedback</p>
        <h1 className="mds-title">System state, recovery, loading, and confirmation.</h1>
        <p className="mds-subtitle">
          Feedback components explain what happened, what is happening, or what users can do next.
        </p>
      </header>
      <Grid minItemWidth="280px">
        <Card title="Alerts" eyebrow="Recovery">
          <Alert tone="warning" title="Review required">Resolve validation issues before publishing.</Alert>
        </Card>
        <Card title="Empty states" eyebrow="No content">
          <EmptyState title="No matching components" description="Clear filters or create a new component." />
        </Card>
        <Card title="Progress" eyebrow="Loading">
          <Stack gap="sm">
            <Progress value={64} label="Publishing progress" />
            <Toast title="Draft saved">Changes are ready for review.</Toast>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Grid, MetricCard, Stack, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Metrics",
  component: MetricCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Metric cards display compact quantitative summaries. Pair them with charts, tables, or detail views when users need evidence.",
      },
    },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const SummaryMetrics: Story = {
  parameters: storyDescription("Use metrics for scannable summaries, not as the only source for exact records."),
  render: () => (
    <Grid minItemWidth="180px">
      <MetricCard label="Active users" value="18.4k" delta="+12%" deltaTone="positive" />
      <MetricCard label="Sessions" value="52.1k" delta="+8%" deltaTone="positive" />
      <MetricCard label="Errors" value="42" delta="-6%" deltaTone="negative" />
      <MetricCard label="Latency" value="84ms" delta="-11%" deltaTone="negative" />
    </Grid>
  ),
};

export const ContextAndMissingValues: Story = {
  parameters: storyDescription("Use context for figure-level details and missing for absent data that should not read as zero."),
  render: () => (
    <Grid minItemWidth="220px">
      <MetricCard
        label="Resolved"
        value="1,248"
        delta="-6% from last week"
        deltaTone="negative"
        context="Includes email, chat, and escalated tickets."
      />
      <MetricCard label="Satisfaction" missing delta="Unavailable" deltaTone="muted" context="Survey results have not closed yet." />
      <MetricCard label="First response" value="12m" delta="-18%" deltaTone="positive" context="Measured from business-hours conversations." />
      <MetricCard label="Open requests" value="384" context="Queued across three support teams." />
    </Grid>
  ),
};

export const MetricGroup: Story = {
  parameters: storyDescription("Metric groups can sit inside cards or dashboard sections when they need a title and surrounding context."),
  render: () => (
    <Card eyebrow="Dashboard" title="System health">
      <Stack>
        <StatusDot tone="success" label="All services operational" />
        <Grid minItemWidth="180px">
          <MetricCard label="Requests" value="1.2m" delta="+4%" deltaTone="positive" />
          <MetricCard label="Failure rate" value="0.04%" delta="-0.01%" deltaTone="negative" />
          <MetricCard label="P95" value="184ms" delta="+9ms" deltaTone="negative" />
        </Grid>
      </Stack>
    </Card>
  ),
};

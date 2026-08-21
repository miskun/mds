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
      <MetricCard label="Active users" value="18.4k" delta="+12%" />
      <MetricCard label="Sessions" value="52.1k" delta="+8%" />
      <MetricCard label="Errors" value="42" delta="-6%" />
      <MetricCard label="Latency" value="84ms" delta="-11%" />
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
          <MetricCard label="Requests" value="1.2m" delta="+4%" />
          <MetricCard label="Failure rate" value="0.04%" delta="-0.01%" />
          <MetricCard label="P95" value="184ms" delta="+9ms" />
        </Grid>
      </Stack>
    </Card>
  ),
};

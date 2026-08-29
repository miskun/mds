import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Card, Cluster, Eyebrow, Grid, Prose, Stack, StatusDot, Text } from "../components";
import "../showcase.css";
import "./data-visualization.css";

const meta = {
  title: "MDS/Data Visualization",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data visualization docs collect chart families, chart tokens, and composition patterns for black-first product surfaces.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const groups = [
  ["Time Series", "Trends, rates, thresholds, and live operational metrics over time.", "Available now"],
  ["Sparklines", "Tiny trend marks inside records, tables, and metric summaries.", "Planned"],
  ["Distribution", "Histograms, bars, and category comparisons for grouped values.", "Planned"],
  ["Topology", "Maps, node graphs, and infrastructure relationship views.", "Planned"],
];

const foundations = [
  ["Engine", "uPlot handles the data canvas. MDS owns wrappers, states, legends, tokens, and accessibility."],
  ["Color", "Use categorical chart tokens for series. Reserve semantic colors for status, thresholds, and errors."],
  ["Layout", "Pair charts with filters, metrics, tables, or exports when users need exact values."],
];

export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use this page as the entry point for visualization families and chart-level design rules.",
      },
    },
  },
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Data Visualization</Eyebrow>
        <h1>Charts for dense, black-first product surfaces.</h1>
        <p>
          Start from the visualization family that matches the data shape, then compose it with MDS controls, metrics, legends, and recovery states.
        </p>
      </Prose>

      <Cluster>
        <Badge tone="accent">uPlot engine</Badge>
        <StatusDot tone="success" label="Target-aware" />
        <StatusDot label="Canvas-ready tokens" />
      </Cluster>

      <Grid minItemWidth="260px">
        {groups.map(([name, description, status]) => (
          <Card key={name} eyebrow="Visualization" title={name}>
            <Stack gap="sm">
              <Text tone="muted" size="md">
                {description}
              </Text>
              <Cluster gap="xs">
                <StatusDot tone={status === "Available now" ? "success" : "neutral"} label={status} />
              </Cluster>
            </Stack>
          </Card>
        ))}
      </Grid>

      <Card eyebrow="Foundation" title="Chart rules that apply everywhere">
        <div className="token-doc__rows">
          {foundations.map(([name, rule]) => (
            <div className="token-doc__row" key={name}>
              <strong>{name}</strong>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </Stack>
  ),
};

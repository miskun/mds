import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Alert, Badge, Button, Card, Cluster, ComboBox, EmptyState, Eyebrow, Grid, MetricCard, Prose, Stack, TimeSeriesChart } from "../components";
import "../showcase.css";
import "./data-visualization.css";

const meta = {
  title: "MDS/Data Visualization/Time Series",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Time series charts show change over time with uPlot rendering and MDS-owned composition, tokens, states, and accessible fallback data.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const start = Date.UTC(2026, 7, 21);
const day = 24 * 60 * 60 * 1000;

const usageSeries = [
  {
    id: "active-users",
    label: "Active users",
    area: true,
    data: [9600, 10400, 11200, 11800, 12300, 13100, 13900].map((value, index) => ({
      timestamp: start + index * day,
      value,
    })),
  },
  {
    id: "sessions",
    label: "Sessions",
    data: [18400, 20100, 19600, 22400, 23800, 24600, 26100].map((value, index) => ({
      timestamp: start + index * day,
      value,
    })),
  },
  {
    id: "errors",
    label: "Errors",
    color: "var(--mds-danger)",
    data: [38, 42, 35, 47, 31, 28, 24].map((value, index) => ({
      timestamp: start + index * day,
      value: value * 100,
    })),
  },
];

const latencySeries = [
  {
    id: "p50",
    label: "p50",
    color: "var(--mds-chart-series-4)",
    data: [42, 39, 44, 46, 43, 41, 40].map((value, index) => ({
      timestamp: start + index * day,
      value,
    })),
  },
  {
    id: "p95",
    label: "p95",
    color: "var(--mds-chart-series-3)",
    area: true,
    data: [138, 132, 149, 156, 144, 136, 128].map((value, index) => ({
      timestamp: start + index * day,
      value,
    })),
  },
];

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Overview: Story = {
  parameters: storyDescription("Use TimeSeriesChart for operational metrics, usage trends, and other timestamped quantitative series."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Time Series</Eyebrow>
        <h1>Edge-to-edge charts with labels inside the plot.</h1>
        <p>
          The chart canvas owns the data region from edge to edge. Y-axis labels are painted inside the plot so dense dashboards do not lose space to gutters.
        </p>
      </Prose>

      <ChartCard />
    </Stack>
  ),
};

export const MultipleSeries: Story = {
  parameters: storyDescription("Use categorical chart tokens for comparable series and semantic colors only when the series itself carries status meaning."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Series</Eyebrow>
        <h1>Compare related signals without changing the surface.</h1>
      </Prose>

      <Grid minItemWidth="320px">
        <ChartCard />
        <Card className="viz-chart-card" eyebrow="Chart" title="Latency percentiles" action={<Badge tone="accent">ms</Badge>}>
          <TimeSeriesChart
            series={latencySeries}
            title="Latency percentiles"
            summary="p50 latency stays near forty milliseconds while p95 declines after a midweek spike."
            formatValue={(value) => `${Math.round(value)} ms`}
            includeZero={false}
          />
        </Card>
      </Grid>
    </Stack>
  ),
};

export const LegendPlacement: Story = {
  parameters: storyDescription("Use the bottom legend by default, move it above the plot when needed, or hide it when nearby copy already names the series."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Legend</Eyebrow>
        <h1>Keep legends close to the plot without adding side gutters.</h1>
      </Prose>

      <Grid minItemWidth="360px" align="start">
        <Card className="viz-chart-card" eyebrow="Bottom" title="Default placement">
          <TimeSeriesChart series={usageSeries} title="Usage over time with default legend" />
        </Card>
        <Card className="viz-chart-card" eyebrow="Top" title="Above the plot">
          <TimeSeriesChart series={usageSeries} title="Usage over time with top legend" legendPosition="top" />
        </Card>
        <Card className="viz-chart-card" eyebrow="Hidden" title="No legend">
          <TimeSeriesChart series={usageSeries} title="Usage over time without legend" showLegend={false} />
        </Card>
      </Grid>
    </Stack>
  ),
};

export const States: Story = {
  parameters: storyDescription("Chart states should keep the chart title visible and use MDS feedback language for recovery."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>States</Eyebrow>
        <h1>Keep time-series states explicit.</h1>
      </Prose>

      <Grid minItemWidth="260px" align="start">
        <Card className="viz-chart-card" eyebrow="Loading" title="Usage over time">
          <ChartStateFrame ariaHidden fillPlot>
            <div className="viz-chart-loading" />
          </ChartStateFrame>
        </Card>
        <Card className="viz-chart-card" eyebrow="Empty" title="Usage over time">
          <ChartStateFrame>
            <EmptyState title="No chart data" description="Change the time range or clear filters to see usage." action={<Button>Clear filters</Button>} />
          </ChartStateFrame>
        </Card>
        <Card className="viz-chart-card" eyebrow="Error" title="Usage over time">
          <ChartStateFrame>
            <Alert tone="danger" title="Chart failed to load">
              Refresh the data or try a shorter time range.
            </Alert>
          </ChartStateFrame>
        </Card>
      </Grid>
    </Stack>
  ),
};

export const DashboardComposition: Story = {
  parameters: storyDescription("Compose time series with filters, metrics, and exact-value paths when a dashboard needs more than visual shape."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Dashboard composition</Eyebrow>
        <h1>Use charts for shape and metrics for the current read.</h1>
      </Prose>

      <Cluster>
        <ComboBox
          aria-label="Time range"
          defaultValue="7d"
          options={[
            { value: "24h", label: "Last 24 hours" },
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last 30 days" },
          ]}
        />
        <ComboBox
          aria-label="Target"
          defaultValue="all"
          options={[
            { value: "all", label: "All targets" },
            { value: "admin", label: "Admin" },
            { value: "desktop", label: "Desktop" },
            { value: "mobile", label: "Mobile" },
          ]}
        />
        <Button variant="secondary">Export</Button>
      </Cluster>

      <div className="viz-metrics">
        <MetricCard label="Active users" value="18.4k" delta="+12%" deltaTone="positive" />
        <MetricCard label="Sessions" value="52.1k" delta="+8%" deltaTone="positive" />
        <MetricCard label="Errors" value="42" delta="-6%" deltaTone="negative" />
      </div>

      <ChartCard />
    </Stack>
  ),
};

function ChartCard() {
  return (
    <Card className="viz-chart-card" eyebrow="Chart" title="Usage over time" action={<Badge tone="accent">uPlot</Badge>}>
      <TimeSeriesChart
        series={usageSeries}
        title="Usage over time"
        summary="Active users and sessions trend upward over seven days while errors decline."
      />
    </Card>
  );
}

function ChartStateFrame({ ariaHidden, children, fillPlot }: { ariaHidden?: boolean; children: ReactNode; fillPlot?: boolean }) {
  return (
    <div className="mds-time-series-chart mds-time-series-chart--md mds-time-series-chart--legend-bottom" aria-hidden={ariaHidden ? true : undefined}>
      <div className="mds-time-series-chart__plot">
        <div className={fillPlot ? "mds-time-series-chart__plot-mount" : "mds-time-series-chart__plot-mount viz-chart-state"}>{children}</div>
      </div>
      <SeriesLegendSlot />
    </div>
  );
}

function SeriesLegendSlot() {
  return (
    <div className="mds-time-series-chart__legend mds-time-series-chart__legend--bottom" aria-hidden="true">
      {usageSeries.map((item, index) => (
        <span key={item.id} className="mds-time-series-chart__legend-item">
          <i className="mds-time-series-chart__legend-swatch" style={{ background: item.color ?? `var(--mds-chart-series-${index + 1})` }} />
          <span className="mds-time-series-chart__legend-label">{item.label}</span>
        </span>
      ))}
    </div>
  );
}

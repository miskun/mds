import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, Badge, Button, Card, ComboBox, EmptyState, MetricCard, StatusDot } from "../components";
import "../showcase.css";
import "./data-visualization.css";

const meta = {
  title: "MDS/Data Visualization/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const series = [
  ["Active users", "--mds-viz-series-1", "Primary quantitative series."],
  ["Sessions", "--mds-viz-series-2", "Secondary comparable series."],
  ["Errors", "--mds-viz-danger", "Exception, failure, or threshold breach."],
  ["Deploys", "--mds-viz-event", "Annotation, marker, or event line."],
];

const anatomy = [
  ["Canvas", "uPlot renders the data region. MDS owns the surrounding card, title, legend, and state copy."],
  ["Axes", "Use muted labels and low-contrast gridlines so data remains the brightest element."],
  ["Legend", "Keep labels short, align series colors with swatches, and include units when values need them."],
  ["Tooltip", "Prefer uPlot cursor behavior for values; keep extra actions outside the plotting region."],
];

const accessibility = [
  ["Name the chart", "Every chart needs a visible title and a concise accessible summary."],
  ["Do not rely on color alone", "Use labels, line style, markers, or status text for semantic meaning."],
  ["Preserve contrast", "Series colors must stay legible on black and panel surfaces."],
  ["Offer data access", "Pair complex charts with tables or export paths when exact values matter."],
];

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Overview: Story = {
  name: "Introduction",
  parameters: storyDescription("Data visualization guidance defines chart scope, uPlot usage, palettes, states, and dashboard composition before chart components are added."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Data Visualization</p>
        <h1 className="mds-title">Fast charts on black surfaces, powered by uPlot.</h1>
        <p className="mds-subtitle">
          Tables belong in components. Charts, palettes, legends, axes, thresholds, and dashboard composition belong here.
        </p>
      </header>

      <div className="mds-cluster">
        <Badge tone="accent">uPlot engine</Badge>
        <StatusDot tone="success" label="Contrast-aware" />
        <StatusDot label="Black-first" />
      </div>

      <Card eyebrow="Scope" title="What belongs here">
        <div className="token-doc__rows">
          <div className="token-doc__row">
            <strong>Charts</strong>
            <span>Time series, line charts, sparklines, thresholds, annotations, and chart states.</span>
          </div>
          <div className="token-doc__row">
            <strong>Tables</strong>
            <span>Tables stay in Components/Data. Pair them with charts when users need exact values.</span>
          </div>
          <div className="token-doc__row">
            <strong>Dashboards</strong>
            <span>Metrics, filters, charts, states, and tables composed into repeatable layouts.</span>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const EngineChoice: Story = {
  parameters: storyDescription("MDS should use uPlot as the low-level chart engine and wrap it with MDS-owned React components and tokens."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Engine</p>
        <h1 className="mds-title">uPlot handles plotting. MDS handles product fit.</h1>
        <p className="mds-subtitle">
          Keep uPlot close to the rendering layer. MDS chart components should define sizing, palette, legends, loading states, empty states, and accessibility contracts.
        </p>
      </header>

      <Card eyebrow="Boundary" title="Responsibilities">
        <div className="token-doc__rows">
          <div className="token-doc__row">
            <strong>uPlot</strong>
            <span>Canvas rendering, scales, cursor, series drawing, and high-volume time-series performance.</span>
          </div>
          <div className="token-doc__row">
            <strong>MDS</strong>
            <span>React API, target-aware layout, black-surface palette, legends, states, labels, and docs examples.</span>
          </div>
          <div className="token-doc__row">
            <strong>Consumers</strong>
            <span>Data shape, units, time range, business thresholds, and event annotations.</span>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const Palette: Story = {
  parameters: storyDescription("Categorical chart colors should be distinct on black surfaces. Semantic colors are reserved for meaning such as success, warning, and danger."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Palette</p>
        <h1 className="mds-title">Separate categorical color from semantic meaning.</h1>
        <p className="mds-subtitle">
          Do not use danger or success colors as arbitrary series colors. Reserve semantic colors for status, thresholds, and errors.
        </p>
      </header>

      <div className="viz-palette">
        {series.map(([name, token, usage]) => (
          <div className="viz-swatch" key={token}>
            <span className="viz-swatch__color" style={{ background: `var(${token})` }} />
            <strong>{name}</strong>
            <code>{token}</code>
            <span>{usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ChartAnatomy: Story = {
  parameters: storyDescription("Chart anatomy keeps uPlot's canvas focused on data while MDS provides consistent surrounding structure."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Chart anatomy</p>
        <h1 className="mds-title">Title, legend, chart, state, and action live as one surface.</h1>
        <p className="mds-subtitle">
          The plotting region should not carry all context. Use MDS text, legend, and layout around the uPlot canvas.
        </p>
      </header>

      <ChartCard />

      <Card eyebrow="Anatomy" title="Rules">
        <div className="token-doc__rows">
          {anatomy.map(([name, rule]) => (
            <div className="token-doc__row" key={name}>
              <strong>{name}</strong>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
};

export const ChartStates: Story = {
  parameters: storyDescription("Chart states should use the same recovery language as other MDS feedback surfaces."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">States</p>
        <h1 className="mds-title">Make chart states explicit and recoverable.</h1>
        <p className="mds-subtitle">
          Loading, empty, and error states should preserve the chart title and explain what is happening.
        </p>
      </header>

      <div className="viz-state-grid">
        <Card eyebrow="Loading" title="Usage over time">
          <div className="viz-chart viz-chart--loading" aria-hidden="true" />
        </Card>
        <EmptyState title="No chart data" description="Change the time range or clear filters to see usage." action={<Button>Clear filters</Button>} />
        <Alert tone="danger" title="Chart failed to load">
          Refresh the data or try a shorter time range.
        </Alert>
      </div>
    </div>
  ),
};

export const DashboardComposition: Story = {
  parameters: storyDescription("Dashboards combine filters, metrics, charts, legends, and data tables without making charts carry every task."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 1040 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Dashboard composition</p>
        <h1 className="mds-title">Pair charts with controls and exact values.</h1>
        <p className="mds-subtitle">
          Use metrics for summary, charts for shape over time, and tables for exact records.
        </p>
      </header>

      <div className="mds-cluster">
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
      </div>

      <div className="viz-metrics">
        <MetricCard label="Active users" value="18.4k" delta="+12%" />
        <MetricCard label="Sessions" value="52.1k" delta="+8%" />
        <MetricCard label="Errors" value="42" delta="-6%" />
      </div>

      <ChartCard />
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: storyDescription("Chart accessibility requires names, summaries, non-color cues, contrast, and access to exact values when needed."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 880 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Accessibility</p>
        <h1 className="mds-title">Charts need text, contrast, and backup paths.</h1>
        <p className="mds-subtitle">
          uPlot handles rendering. MDS chart wrappers should make chart purpose and data access clear.
        </p>
      </header>

      <Card eyebrow="Checklist" title="Minimum chart accessibility">
        <div className="token-doc__rows">
          {accessibility.map(([name, rule]) => (
            <div className="token-doc__row" key={name}>
              <strong>{name}</strong>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
};

function ChartCard() {
  return (
    <Card eyebrow="Chart" title="Usage over time" action={<Badge tone="accent">uPlot</Badge>}>
      <div className="viz-legend">
        <span><i style={{ background: "var(--mds-viz-series-1)" }} /> Active users</span>
        <span><i style={{ background: "var(--mds-viz-series-2)" }} /> Sessions</span>
        <span><i style={{ background: "var(--mds-viz-danger)" }} /> Errors</span>
      </div>
      <div className="viz-chart" role="img" aria-label="Usage over time preview with active users, sessions, and errors">
        <span className="viz-line viz-line--one" />
        <span className="viz-line viz-line--two" />
        <span className="viz-threshold" />
      </div>
    </Card>
  );
}

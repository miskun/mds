import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Card, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Data Visualization/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Data Visualization</p>
        <h1 className="mds-title">Visualization guidance will live separately from data tables.</h1>
        <p className="mds-subtitle">
          Tables belong in components. Charts, palettes, legends, axes, thresholds, and dashboard composition belong here.
        </p>
      </header>

      <div className="mds-cluster">
        <Badge tone="accent">Planned</Badge>
        <StatusDot tone="success" label="Contrast-aware" />
        <StatusDot label="Black-first" />
      </div>

      <Card eyebrow="Scope" title="Initial topics">
        <div className="token-doc__rows">
          <div className="token-doc__row">
            <strong>Color palettes</strong>
            <span>Accessible series colors for black surfaces.</span>
          </div>
          <div className="token-doc__row">
            <strong>Legends</strong>
            <span>Compact labels, status mapping, and overflow behavior.</span>
          </div>
          <div className="token-doc__row">
            <strong>Dashboard composition</strong>
            <span>How charts, metrics, filters, and tables work together.</span>
          </div>
        </div>
      </Card>
    </div>
  ),
};

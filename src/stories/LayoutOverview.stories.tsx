import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Cluster, Grid, PageHeader, Stack } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout/Overview",
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
        <p className="mds-kicker">Layout</p>
        <h1 className="mds-title">Spatial primitives and page-level arrangement.</h1>
        <p className="mds-subtitle">
          Layout components provide target-aware gaps and structure while leaving visual treatment to composed surfaces.
        </p>
      </header>
      <PageHeader title="Component inventory" description="Page headers align titles, descriptions, and actions." />
      <Grid minItemWidth="220px">
        <Card title="Stack" eyebrow="Vertical rhythm">
          <Stack gap="sm">
            <span>Label</span>
            <span>Control</span>
          </Stack>
        </Card>
        <Card title="Cluster" eyebrow="Inline groups">
          <Cluster gap="sm">
            <span>Primary</span>
            <span>Secondary</span>
          </Cluster>
        </Card>
      </Grid>
    </Stack>
  ),
};

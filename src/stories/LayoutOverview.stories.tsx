import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Cluster, Eyebrow, Grid, Prose, Stack } from "../components";
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
      <Prose as="header">
        <Eyebrow>Layout</Eyebrow>
        <h1>Spatial primitives and page-level arrangement.</h1>
        <p>
          Layout components provide target-aware gaps and structure while leaving visual treatment to composed surfaces.
        </p>
      </Prose>
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

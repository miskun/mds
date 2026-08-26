import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Grid, MetricCard, Stack } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid creates responsive or fixed column layouts with target-aware gaps.",
      },
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ResponsiveGrid: Story = {
  parameters: storyDescription("Grid uses auto-fit columns by default and keeps gaps aligned with the target scale."),
  render: () => (
    <Stack>
      <Grid minItemWidth="180px">
        <MetricCard label="Revenue" value="$128k" delta="+18%" deltaTone="positive" />
        <MetricCard label="Activation" value="42%" delta="+7%" deltaTone="positive" />
        <MetricCard label="Incidents" value="3" delta="-2" deltaTone="negative" />
        <MetricCard label="Latency" value="84ms" delta="-11%" deltaTone="negative" />
      </Grid>

      <Grid minItemWidth="260px">
        <Card title="Admin portals">
          <Stack gap="sm">
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Favor scannable rows, filters, tables, and compact summaries.
            </p>
            <Button variant="secondary">Open example</Button>
          </Stack>
        </Card>
        <Card title="Editorial">
          <Stack gap="sm">
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Use wider rhythm, readable text measure, and clear calls to action.
            </p>
            <Button variant="secondary">Open example</Button>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  ),
};

export const FixedColumns: Story = {
  parameters: storyDescription("Fixed columns are useful when the layout contract matters more than automatic wrapping."),
  render: () => (
    <Grid columns={3}>
      <Card title="Plan">
        <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Define the page structure.
        </p>
      </Card>
      <Card title="Build">
        <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Compose primitives and components.
        </p>
      </Card>
      <Card title="Review">
        <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Check target behavior and accessibility.
        </p>
      </Card>
    </Grid>
  ),
};

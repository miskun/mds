import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Cluster, Grid, Stack, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Component docs are grouped by the job each primitive performs: action, layout, container, navigation, display, feedback, forms, and data.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

const groups = [
  ["Actions", "Buttons and action triggers.", "Buttons"],
  ["Layout", "Spatial primitives and page-level arrangement.", "Flex, Grid, PageHeader"],
  ["Containers", "Bounded and disclosure surfaces.", "Panel, Card, Popover, Dialog, Drawer"],
  ["Overlays", "Floating layers and modal surfaces.", "Tooltip, Popover, DropdownMenu, Dialog, Drawer"],
  ["Navigation", "Wayfinding and movement through structure.", "Breadcrumbs, Link, Tabs, Pagination, NavList"],
  ["Display", "Passive information and metadata.", "Avatar, Description list, Metadata, Records, Metrics, Text, Utilities"],
  ["Feedback", "System state, recovery, loading, and confirmations.", "Alerts, Empty states, Loading, Toasts"],
  ["Forms", "Field layouts and input controls.", "Layouts, Text, Selection, Search and filter"],
  ["Data", "Tables and record workflows.", "Tables, Data table, Toolbars, Detail and activity"],
];

export const Overview: Story = {
  parameters: storyDescription("Use this page as the entry point for the MDS component taxonomy."),
  render: () => (
    <Stack>
      <header className="mds-stack">
        <p className="mds-kicker">Components</p>
        <h1 className="mds-title">Composable primitives for black-first product surfaces.</h1>
        <p className="mds-subtitle">
          Browse by purpose rather than implementation detail. Each group keeps examples, usage guidance, and API docs close to the component contract.
        </p>
      </header>

      <Grid minItemWidth="260px">
        {groups.map(([name, description, examples]) => (
          <Card key={name} title={name} eyebrow="Group">
            <Stack gap="sm">
              <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
                {description}
              </p>
              <Cluster gap="xs">
                <span className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-sm)" }}>
                  {examples}
                </span>
                <StatusDot label="Docs" />
              </Cluster>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  ),
};

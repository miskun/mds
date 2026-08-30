import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Cluster, Eyebrow, Grid, Prose, Stack, StatusDot, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Component docs are grouped by what each primitive is and how it behaves: controls, forms, patterns, navigation, display, feedback, data, layout, and containers.",
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
  ["Controls", "Interactive primitives organized by mechanism.", "Buttons, Inputs, Dropdowns, Checkboxes, Radios, Switches"],
  ["Forms", "Composition patterns for collecting and validating values.", "Layouts, field groups, validation sections, action rows"],
  ["Patterns", "Reusable workflows built from multiple primitives.", "Search and filter"],
  ["Navigation", "Wayfinding and movement through structure.", "Breadcrumbs, links, tabs, pagination, nav list, side nav, tree view"],
  ["Overlays", "Floating layers and modal surfaces.", "Tooltips, popovers, dropdown menus, dialogs, drawers"],
  ["Display", "Passive information and metadata.", "Avatars, description lists, metadata, prose, records, metrics, text, utilities"],
  ["Feedback", "System state, recovery, loading, and confirmations.", "Alerts, Empty states, Loading, Toasts"],
  ["Data", "Tables and record workflows.", "Tables, Data table, Toolbars, Detail and activity"],
  ["Layout", "Spatial primitives and page-level arrangement.", "Flex, grid, page header"],
  ["Containers", "Bounded and disclosure surfaces.", "Panels, cards, popovers, dialogs, drawers"],
];

export const Overview: Story = {
  parameters: storyDescription("Use this page as the entry point for the MDS component taxonomy."),
  render: () => (
    <Stack>
      <Prose as="header">
        <Eyebrow>Components</Eyebrow>
        <h1>Composable primitives for black-first product surfaces.</h1>
        <p>
          Browse by primitive identity first, then by composition pattern. Controls are reusable mechanisms that can live in many places; forms document how controls are arranged, labeled, validated, and submitted.
        </p>
      </Prose>

      <Grid minItemWidth="260px">
        {groups.map(([name, description, examples]) => (
          <Card key={name} title={name} eyebrow="Group">
            <Stack gap="sm">
              <Text tone="muted" size="md">
                {description}
              </Text>
              <Cluster gap="xs">
                <Text as="span" tone="muted" size="sm">
                  {examples}
                </Text>
                <StatusDot label="Docs" />
              </Cluster>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  ),
};

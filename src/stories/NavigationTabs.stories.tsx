import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Card, Segment, SegmentedControl, Stack, Tab, Tabs } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/Tabs",
  component: Tabs,
  subcomponents: { Tab, SegmentedControl, Segment },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tabs move between peer sections. Segmented controls switch compact views or modes within a local surface.",
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const SectionTabs: Story = {
  parameters: storyDescription("Tabs support controlled and uncontrolled selected state with arrow-key movement."),
  render: () => (
    <Stack style={{ maxWidth: 760 }}>
      <Tabs label="Component sections" defaultValue="usage">
        <Tab value="usage">Usage</Tab>
        <Tab value="api">API</Tab>
        <Tab value="examples">Examples</Tab>
        <Tab value="deprecated" disabled>
          Deprecated
        </Tab>
      </Tabs>
      <Card title="Usage">
        <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Use tabs when sections are peers and the selected section remains in the same context.
        </p>
      </Card>
    </Stack>
  ),
};

export const SegmentedViews: Story = {
  parameters: storyDescription("Segmented controls are compact switches for view modes, filters, or local target choices."),
  render: () => {
    const [view, setView] = useState("table");

    return (
      <Stack style={{ maxWidth: 760 }}>
        <SegmentedControl label="View mode" value={view} onValueChange={setView}>
          <Segment value="table">Table</Segment>
          <Segment value="cards">Cards</Segment>
          <Segment value="timeline">Timeline</Segment>
          <Segment value="map" disabled>
            Map
          </Segment>
        </SegmentedControl>
        <Card title="Selected view">
          <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            {view}
          </p>
        </Card>
      </Stack>
    );
  },
};

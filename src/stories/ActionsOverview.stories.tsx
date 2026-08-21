import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Grid, IconButton, Stack } from "../components";
import { Plus } from "lucide-react";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Actions/Overview",
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
        <p className="mds-kicker">Actions</p>
        <h1 className="mds-title">Controls that commit, navigate, or reveal choices.</h1>
        <p className="mds-subtitle">
          Use action components when users need to do something explicit. Keep links for navigation and buttons for state-changing commands.
        </p>
      </header>
      <Grid minItemWidth="260px">
        <Card title="Buttons" eyebrow="Primary surface">
          <Stack gap="sm">
            <Button>Create component</Button>
            <Button variant="secondary">Save draft</Button>
          </Stack>
        </Card>
        <Card title="Icon buttons" eyebrow="Compact tools">
          <IconButton label="Add component" icon={<Plus size={16} />} />
        </Card>
      </Grid>
    </Stack>
  ),
};

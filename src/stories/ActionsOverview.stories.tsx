import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Eyebrow, Grid, IconButton, Prose, Stack } from "../components";
import { Plus } from "lucide-react";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Controls/Overview",
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
        <Eyebrow>Controls</Eyebrow>
        <h1>Interactive primitives that can live on canvas, in forms, or on panels.</h1>
        <p>
          Controls are organized by mechanism: buttons, inputs, dropdowns, checkboxes, radios, switches, and compact mode controls. Each control can appear in many contexts and inherits the surface it is placed on.
        </p>
      </Prose>
      <Grid minItemWidth="260px">
        <Card title="Buttons" eyebrow="Commands">
          <Stack gap="sm">
            <Button>Create component</Button>
            <Button variant="secondary">Save draft</Button>
          </Stack>
        </Card>
        <Card title="Icon buttons" eyebrow="Tools">
          <IconButton label="Add component" icon={<Plus size={16} />} />
        </Card>
      </Grid>
    </Stack>
  ),
};

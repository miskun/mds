import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Grid, Input, Select, Stack, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Forms/Overview",
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
        <p className="mds-kicker">Forms</p>
        <h1 className="mds-title">Field structure, controls, validation, and choice.</h1>
        <p className="mds-subtitle">
          Forms keep labels, hints, errors, required state, disabled state, and native semantics consistent across input workflows.
        </p>
      </header>
      <Grid minItemWidth="280px">
        <Card title="Field controls" eyebrow="Text and select">
          <Stack gap="sm">
            <Input label="Name" placeholder="Button" hint="Use concise component names." />
            <Select label="Target" defaultValue="admin">
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="admin">Admin portal</option>
              <option value="editorial">Editorial</option>
            </Select>
          </Stack>
        </Card>
        <Card title="Selection" eyebrow="Choices">
          <Switch label="Public component" hint="Show this component in release docs." defaultChecked />
        </Card>
      </Grid>
    </Stack>
  ),
};

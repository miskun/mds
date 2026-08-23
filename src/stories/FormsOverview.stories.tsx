import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, ComboBox, Grid, Input, Stack, Switch } from "../components";
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
            <ComboBox
              label="Target"
              defaultValue="admin"
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "mobile", label: "Mobile" },
                { value: "admin", label: "Admin portal" },
                { value: "editorial", label: "Editorial" },
              ]}
            />
          </Stack>
        </Card>
        <Card title="Selection" eyebrow="Choices">
          <Switch label="Public component" hint="Show this component in release docs." defaultChecked />
        </Card>
      </Grid>
    </Stack>
  ),
};

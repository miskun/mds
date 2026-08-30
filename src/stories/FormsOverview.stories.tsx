import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Checkbox, Cluster, ComboBox, Eyebrow, Grid, Input, Prose, Stack, Textarea } from "../components";
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
      <Prose as="header">
        <Eyebrow>Forms</Eyebrow>
        <h1>Layouts for collecting and validating values.</h1>
        <p>
          Forms are compositions of controls. Inputs, dropdowns, checkboxes, radios, switches, and buttons live under Controls; Forms documents field grouping, validation, helper text, and action layout.
        </p>
      </Prose>
      <Grid minItemWidth="280px">
        <Card title="Field Group" eyebrow="Layout">
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
            <Textarea label="Notes" placeholder="Document form-specific behavior" />
          </Stack>
        </Card>
        <Card title="Validation Flow" eyebrow="Recovery">
          <Stack gap="sm">
            <Input label="Package name" defaultValue="@miskun/mds" error="This package name is already in use." />
            <Checkbox label="I reviewed the release notes" error="Confirm review before publishing." />
            <Cluster justify="end">
              <Button variant="secondary">Cancel</Button>
              <Button>Create</Button>
            </Cluster>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  ),
};

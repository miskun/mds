import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Checkbox, Cluster, ComboBox, Field, Grid, Input, Panel, Stack, Text, Textarea } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";
import "./form-layouts.css";

const meta = {
  title: "MDS/Components/Forms/Layouts",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Form layouts compose controls, helper text, grouped fields, validation sections, and actions with target-aware spacing.",
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const BasicForm: Story = {
  parameters: storyDescription("Use Stack for vertical rhythm and Cluster for action rows."),
  render: () => (
    <Card eyebrow="Form layout" title="Create component" style={{ maxWidth: 640 }}>
      <Stack>
        <Grid minItemWidth="220px">
          <Input label="Name" placeholder="Component name" required />
          <ComboBox
            label="Group"
            defaultValue="forms"
            options={[
              { value: "actions", label: "Actions" },
              { value: "forms", label: "Forms" },
              { value: "layout", label: "Layout" },
            ]}
          />
        </Grid>
        <Textarea label="Description" hint="Keep descriptions useful in docs and generated prop tables." />
        <Checkbox label="Include in public docs" defaultChecked />
        <Cluster justify="end">
          <Button variant="secondary">Cancel</Button>
          <Button>Create</Button>
        </Cluster>
      </Stack>
    </Card>
  ),
};

export const ValidationSection: Story = {
  parameters: storyDescription("Validation should keep the field label visible and place recovery text close to the affected control."),
  render: () => (
    <Panel style={{ maxWidth: 640 }}>
      <Stack>
        <Input label="Package name" defaultValue="@miskun/mds" error="This package name is already in use." />
        <ComboBox
          label="Release target"
          defaultValue=""
          error="Select a target before continuing."
          placeholder="Choose target"
          options={[
            { value: "desktop", label: "Desktop" },
            { value: "mobile", label: "Mobile" },
            { value: "admin", label: "Admin portal" },
            { value: "editorial", label: "Editorial" },
          ]}
        />
        <Checkbox label="I reviewed the release notes" error="Confirm review before publishing." />
      </Stack>
    </Panel>
  ),
};

export const GridSpanningFields: Story = {
  parameters: storyDescription("Field-wrapped controls apply className to the Field root, so layout classes can span grid columns while controlClassName targets the control surface."),
  render: () => (
    <Card eyebrow="Form layout" title="Grid placement" style={{ maxWidth: 720 }}>
      <Grid minItemWidth="240px">
        <Input label="First name" placeholder="Alex" />
        <Input label="Last name" placeholder="Morgan" />
        <ComboBox
          className="form-layouts__span-all"
          label="Primary workspace"
          placeholder="Choose workspace"
          options={[
            { value: "product", label: "Product" },
            { value: "design", label: "Design" },
            { value: "engineering", label: "Engineering" },
          ]}
        />
        <Textarea className="form-layouts__span-all" label="Notes" placeholder="Add migration notes" />
      </Grid>
    </Card>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Form layouts can be compared on canvas and inside a raised panel."),
  render: () => (
    <SurfaceComparison
      maxWidth={1180}
      canvas={
        <>
          <Grid minItemWidth="220px">
            <Input label="Name" placeholder="Component name" />
            <ComboBox
              label="Group"
              defaultValue="forms"
              options={[
                { value: "actions", label: "Actions" },
                { value: "forms", label: "Forms" },
                { value: "layout", label: "Layout" },
              ]}
            />
          </Grid>
          <Textarea label="Description" placeholder="Add notes" />
          <Checkbox label="Include in public docs" defaultChecked />
          <Cluster justify="end">
            <Button variant="secondary">Cancel</Button>
            <Button>Create</Button>
          </Cluster>
        </>
      }
      panel={
        <>
          <Grid minItemWidth="220px">
            <Input label="Name" placeholder="Component name" />
            <ComboBox
              label="Group"
              defaultValue="forms"
              options={[
                { value: "actions", label: "Actions" },
                { value: "forms", label: "Forms" },
                { value: "layout", label: "Layout" },
              ]}
            />
          </Grid>
          <Textarea label="Description" placeholder="Add notes" />
          <Checkbox label="Include in public docs" defaultChecked />
          <Cluster justify="end">
            <Button variant="secondary">Cancel</Button>
            <Button>Create</Button>
          </Cluster>
        </>
      }
    />
  ),
};

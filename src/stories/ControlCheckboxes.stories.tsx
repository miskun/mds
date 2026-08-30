import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Stack } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Controls/Checkboxes",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Checkboxes are square binary controls. On raised panels they read as tactile hardware buttons with square LED state lenses.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Overview: Story = {
  parameters: storyDescription("Checkboxes support checked, unchecked, indeterminate, disabled, and validation states."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Checkbox label="Enable command menu" hint="Use keyboard-first navigation for complex surfaces." defaultChecked />
      <Checkbox label="Run diagnostics" hint="Custom LED colors can match the setting domain." checkColor="#8cff5f" defaultChecked />
      <Checkbox label="I reviewed the release notes" error="Confirm review before publishing." />
      <Checkbox label="Include beta API" error="Stable releases cannot include beta APIs." defaultChecked />
      <Checkbox label="Select all components" indeterminate hint="Some components are selected." />
      <Checkbox label="Legacy export path" disabled hint="Unavailable for new packages." />
    </Stack>
  ),
};

export const States: Story = {
  parameters: storyDescription("Use states to inspect the square LED lens across checked, unchecked, mixed, invalid, and disabled conditions."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Mixed" indeterminate />
      <Checkbox label="Custom LED color" checkColor="#8cff5f" defaultChecked />
      <Checkbox label="Invalid" error="This option must be confirmed." />
      <Checkbox label="Disabled" disabled />
    </Stack>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Checkboxes inherit canvas or panel surface context for direct comparison."),
  render: () => (
    <SurfaceComparison
      canvas={
        <>
          <Checkbox label="Include forms" defaultChecked />
          <Checkbox label="Run review" />
          <Checkbox label="Select all components" indeterminate />
        </>
      }
      panel={
        <>
          <Checkbox label="Include forms" defaultChecked />
          <Checkbox label="Run review" />
          <Checkbox label="Select all components" indeterminate />
        </>
      }
    />
  ),
};

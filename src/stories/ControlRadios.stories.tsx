import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup, Stack } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Controls/Radios",
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Radios are mutually exclusive round controls. On raised panels they read as tactile hardware buttons with round LED state lenses.",
      },
    },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof RadioGroup>;

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
  parameters: storyDescription("Radio groups collect mutually exclusive choices and expose group-level helper or error text."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <RadioGroup label="Default target" hint="This changes component spacing and control ergonomics.">
        <Radio name="target" value="desktop" label="Desktop" hint="Native desktop applications" />
        <Radio name="target" value="mobile" label="Mobile" hint="Native mobile applications" />
        <Radio name="target" value="admin" label="Admin portal" hint="High-volume web operations" defaultChecked />
        <Radio name="target" value="editorial" label="Editorial" hint="Marketing, portfolios, blogs" />
        <Radio name="target" value="legacy" label="Legacy target" hint="Unavailable for new surfaces." disabled />
      </RadioGroup>
      <RadioGroup label="Diagnostics channel" hint="Custom selection colors can match the choice domain.">
        <Radio name="diagnostics-channel" value="system" label="System monitor" dotColor="#8cff5f" defaultChecked />
        <Radio name="diagnostics-channel" value="release" label="Release monitor" />
      </RadioGroup>
    </Stack>
  ),
};

export const States: Story = {
  parameters: storyDescription("Use states to inspect selected, unselected, custom LED color, disabled, and invalid groups."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <RadioGroup label="Mode">
        <Radio name="mode-states" value="ship" label="Selected" defaultChecked />
        <Radio name="mode-states" value="hold" label="Unselected" />
        <Radio name="mode-states" value="custom" label="Custom LED color" dotColor="#8cff5f" />
        <Radio name="mode-states" value="disabled" label="Disabled" disabled />
      </RadioGroup>
      <RadioGroup label="Release channel" error="Choose a release channel before publishing.">
        <Radio name="release-channel" value="alpha" label="Alpha" />
        <Radio name="release-channel" value="stable" label="Stable" />
      </RadioGroup>
    </Stack>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Radios inherit canvas or panel surface context for direct comparison."),
  render: () => (
    <SurfaceComparison
      canvas={
        <RadioGroup label="Mode">
          <Radio name="canvas-mode" value="ship" label="Ship" defaultChecked />
          <Radio name="canvas-mode" value="hold" label="Hold" />
        </RadioGroup>
      }
      panel={
        <RadioGroup label="Mode">
          <Radio name="panel-mode" value="ship" label="Ship" defaultChecked />
          <Radio name="panel-mode" value="hold" label="Hold" />
        </RadioGroup>
      }
    />
  ),
};

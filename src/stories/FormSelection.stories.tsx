import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Radio, RadioGroup, Stack, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Forms/Selection controls",
  component: Checkbox,
  subcomponents: { RadioGroup, Radio, Switch },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Selection controls preserve native semantics while sharing label, hint, error, disabled, and invalid behavior.",
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

export const Checkboxes: Story = {
  parameters: storyDescription("Checkboxes support checked, unchecked, indeterminate, disabled, and validation states."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Checkbox label="Enable command menu" hint="Use keyboard-first navigation for complex surfaces." defaultChecked />
      <Checkbox label="Run diagnostics" hint="Custom check colors can match the setting domain." checkColor="#8cff5f" defaultChecked />
      <Checkbox label="I reviewed the release notes" error="Confirm review before publishing." />
      <Checkbox label="Include beta API" error="Stable releases cannot include beta APIs." defaultChecked />
      <Checkbox label="Select all components" indeterminate hint="Some components are selected." />
      <Checkbox label="Legacy export path" disabled hint="Unavailable for new packages." />
    </Stack>
  ),
};

export const RadioChoices: Story = {
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
      <RadioGroup label="Release channel" error="Choose a release channel before publishing.">
        <Radio name="release-channel" value="alpha" label="Alpha" />
        <Radio name="release-channel" value="stable" label="Stable" />
      </RadioGroup>
    </Stack>
  ),
};

export const Switches: Story = {
  parameters: storyDescription("Switches represent binary settings and should read as on/off controls, not one-time actions."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
      <Switch label="System monitor" hint="Custom LED colors can match the setting domain." ledColor="#8cff5f" defaultChecked />
      <Switch label="Publish changes" error="Publishing is disabled until validation passes." />
      <Switch label="Deprecated package" disabled hint="Disabled switches keep the label and track visually muted." />
    </Stack>
  ),
};

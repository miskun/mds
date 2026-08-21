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
  parameters: storyDescription("Checkboxes support checked, unchecked, indeterminate, disabled, hint, and error states."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Checkbox label="Enable command menu" hint="Use keyboard-first navigation for complex surfaces." defaultChecked />
      <Checkbox label="Publish component" error="Publishing requires at least one stable story." />
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
      <Switch label="Publish changes" error="Publishing is disabled until validation passes." />
      <Switch label="Deprecated package" disabled hint="Disabled switches keep the label and track visually muted." />
    </Stack>
  ),
};

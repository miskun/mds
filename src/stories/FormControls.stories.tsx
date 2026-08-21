import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Input, Radio, RadioGroup, Select, Switch, Textarea } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Form Controls",
  component: Input,
  subcomponents: { Textarea, Select, Checkbox, RadioGroup, Radio, Switch },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Form controls share label, hint, error, invalid, disabled, and native prop passthrough patterns. Text and grouped controls wire helper text through ARIA relationships.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label associated with the control.",
    },
    hint: {
      control: "text",
      description: "Helper text shown below the control.",
    },
    error: {
      control: "text",
      description: "Error text shown below the control.",
    },
    invalid: {
      control: "boolean",
      description: "Marks the control invalid without requiring error text.",
    },
    required: {
      control: "boolean",
      description: "Passes the native required prop and shows the required marker where supported.",
    },
    disabled: {
      control: "boolean",
      description: "Passes the native disabled prop.",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Playground: Story = {
  args: {
    label: "Name",
    hint: "Use concise labels and direct hints.",
    placeholder: "Miskun Design System",
    required: true,
  },
};

export const TextFields: Story = {
  parameters: storyDescription("Text controls expose the same label, hint, error, required, invalid, disabled, and native prop passthrough patterns."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 520 }}>
      <Input label="Name" placeholder="Miskun Design System" hint="Use concise labels and direct hints." required />
      <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
      <Input label="Repository" defaultValue="miskun/mds" invalid hint="Review ownership before publishing." />
      <Input label="Version" defaultValue="0.1.0" readOnly hint="Read-only values keep the native input contract." />
      <Input label="Package scope" defaultValue="@miskun" disabled />
      <Textarea label="Description" placeholder="Describe this component set" hint="Textarea follows the same field wrapper as input." />
      <Select label="Target" defaultValue="admin">
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
        <option value="admin">Admin portal</option>
        <option value="editorial">Editorial</option>
      </Select>
      <Select label="Release target" defaultValue="" error="Select a target before publishing.">
        <option value="">Choose target</option>
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
        <option value="admin">Admin portal</option>
        <option value="editorial">Editorial</option>
      </Select>
    </div>
  ),
};

export const Choices: Story = {
  parameters: storyDescription("Choice controls share helper/error text behavior while preserving native checkbox and radio semantics."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 520 }}>
      <Checkbox label="Enable command menu" hint="Use keyboard-first navigation for complex surfaces." defaultChecked />
      <Checkbox label="Publish component" error="Publishing requires at least one stable story." />
      <Checkbox label="Legacy export path" disabled hint="Unavailable for new packages." />
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
      <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
      <Switch label="Publish changes" error="Publishing is disabled until validation passes." />
      <Switch label="Deprecated package" disabled hint="Disabled switches keep the label and track visually muted." />
    </div>
  ),
};

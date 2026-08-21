import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Input, Radio, RadioGroup, Select, Switch, Textarea } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/API/Form Controls",
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

export const InputProps: Story = {
  args: {
    label: "Name",
    hint: "Use concise labels and direct hints.",
    placeholder: "Miskun Design System",
    required: true,
  },
};

export const TextFields: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 520 }}>
      <Input label="Name" placeholder="Miskun Design System" hint="Use concise labels and direct hints." required />
      <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
      <Textarea label="Description" placeholder="Describe this component set" />
      <Select label="Target" defaultValue="admin">
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
        <option value="admin">Admin portal</option>
        <option value="editorial">Editorial</option>
      </Select>
    </div>
  ),
};

export const Choices: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 520 }}>
      <Checkbox label="Publish component" hint="Include this component in the public docs." defaultChecked />
      <Checkbox label="Legacy export path" disabled hint="Unavailable for new packages." />
      <RadioGroup label="Default target" hint="This changes component spacing and control ergonomics.">
        <Radio name="api-target" value="desktop" label="Desktop" />
        <Radio name="api-target" value="mobile" label="Mobile" />
        <Radio name="api-target" value="admin" label="Admin portal" defaultChecked />
        <Radio name="api-target" value="editorial" label="Editorial" />
      </RadioGroup>
      <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
      <Switch label="Publish changes" error="Publishing is disabled until validation passes." />
    </div>
  ),
};

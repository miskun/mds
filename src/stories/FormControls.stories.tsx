import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComboBox, Input, SelectField, Stack, Text, Textarea } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Forms/Text controls",
  component: Input,
  subcomponents: { Textarea },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Text controls share label, hint, error, invalid, disabled, and native prop passthrough patterns. Helper text is wired through ARIA relationships.",
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
    <Stack style={{ maxWidth: 520 }}>
      <Input label="Name" placeholder="Miskun Design System" hint="Use concise labels and direct hints." required />
      <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
      <Input label="Repository" defaultValue="miskun/mds" invalid hint="Review ownership before publishing." />
      <Input label="Version" defaultValue="0.1.0" readOnly hint="Read-only values keep the native input contract." />
      <Input label="Package scope" defaultValue="@miskun" disabled />
      <Textarea label="Description" placeholder="Describe this component set" hint="Textarea follows the same field wrapper as input." />
    </Stack>
  ),
};

export const TextWithNativeTypes: Story = {
  parameters: storyDescription("Input keeps native input types available while preserving MDS field structure."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Input type="email" label="Email" placeholder="team@miskun.dev" autoComplete="email" />
      <Input type="url" label="Website" placeholder="https://miskun.dev" />
      <Input type="password" label="Token" hint="Use native password behavior for sensitive values." />
    </Stack>
  ),
};

export const DropdownFields: Story = {
  parameters: storyDescription("Use SelectField for regular MDS-rendered dropdown fields. Use ComboBox when searching or filtering options matters."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <SelectField
        label="Target"
        defaultValue="admin"
        options={[
          { value: "desktop", label: "Desktop" },
          { value: "mobile", label: "Mobile" },
          { value: "admin", label: "Admin portal" },
          { value: "editorial", label: "Editorial" },
        ]}
      />
      <SelectField
        label="Release target"
        defaultValue=""
        error="Select a target before publishing."
        placeholder="Choose target"
        options={[
          { value: "desktop", label: "Desktop" },
          { value: "mobile", label: "Mobile" },
          { value: "admin", label: "Admin portal" },
          { value: "editorial", label: "Editorial" },
        ]}
      />
      <ComboBox
        label="Component"
        hint="Use ComboBox when option discovery matters."
        options={[
          { value: "button", label: "Button", description: "Primary action trigger" },
          { value: "input", label: "Input", description: "Single-line text field" },
          { value: "combo-box", label: "Combo box", description: "Searchable selection control" },
        ]}
      />
    </Stack>
  ),
};

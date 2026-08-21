import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Copy } from "lucide-react";
import { Button, IconButton } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/API/Actions",
  component: Button,
  subcomponents: { IconButton },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Action components use semantic variants and sizes that adapt to the active MDS target. Native button props pass through to the underlying button element.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "Visual treatment for the action.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Semantic size within the active MDS target.",
    },
    icon: {
      control: false,
      description: "Leading icon rendered before the label.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the native button.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonProps: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
    icon: <ArrowRight size={16} />,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="mds-cluster">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => <IconButton label="Copy" icon={<Copy size={16} />} />,
};

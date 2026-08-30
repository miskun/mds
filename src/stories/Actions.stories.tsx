import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Copy, Settings } from "lucide-react";
import { Button, Card, IconButton } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Controls/Buttons",
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

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Playground: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
    icon: <ArrowRight size={16} />,
  },
};

export const Variants: Story = {
  parameters: storyDescription("Button variants share the same target-aware height, padding, font, and focus behavior."),
  render: () => (
    <div className="mds-cluster">
      <Button icon={<ArrowRight size={16} />}>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button disabled>Disabled</Button>
      <IconButton label="Copy" icon={<Copy size={16} />} />
      <IconButton label="Settings" variant="ghost" icon={<Settings size={16} />} />
    </div>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Buttons and icon buttons can be compared directly on the canvas and inside a raised panel."),
  render: () => (
    <SurfaceComparison
      canvas={
        <div className="mds-cluster">
          <Button icon={<ArrowRight size={16} />}>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <IconButton label="Copy" icon={<Copy size={16} />} />
        </div>
      }
      panel={
        <div className="mds-cluster">
          <Button icon={<ArrowRight size={16} />}>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <IconButton label="Copy" icon={<Copy size={16} />} />
        </div>
      }
    />
  ),
};

export const Sizes: Story = {
  parameters: storyDescription("Semantic sizes stay relative to the active MDS target selected in the toolbar."),
  render: () => (
    <Card eyebrow="Semantic size" title="sm / md / lg adapt to the selected MDS target">
      <div className="mds-cluster">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="sm" variant="secondary" icon={<ArrowRight size={14} />}>
          Small icon
        </Button>
        <Button size="md" variant="secondary" icon={<ArrowRight size={16} />}>
          Medium icon
        </Button>
        <Button size="lg" variant="secondary" icon={<ArrowRight size={18} />}>
          Large icon
        </Button>
      </div>
    </Card>
  ),
};

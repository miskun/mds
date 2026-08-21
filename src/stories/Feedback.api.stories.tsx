import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { Alert, Badge, Button, Spinner, StatusDot, Tag, Toast } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/API/Feedback",
  component: Alert,
  subcomponents: { Badge, StatusDot, Tag, Toast, Spinner },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feedback primitives communicate state, progress, and compact metadata while keeping spacing and typography aligned with the active MDS target.",
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
      description: "Semantic alert tone.",
    },
    title: {
      control: "text",
      description: "Optional heading for the alert.",
    },
    icon: {
      control: false,
      description: "Custom icon. Defaults to the tone icon.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertProps: Story = {
  args: {
    tone: "info",
    title: "Documentation ready",
    children: "Component examples are available for the selected target.",
  },
};

export const StatusPrimitives: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 720 }}>
      <div className="mds-cluster">
        <Badge>Neutral</Badge>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="danger">Danger</Badge>
        <Tag removable>Storybook</Tag>
        <StatusDot tone="success" label="Stable" />
        <StatusDot tone="warning" label="Review" />
      </div>
      <Toast title="Component saved" action={<Button size="sm" variant="secondary" icon={<Check size={14} />}>View</Button>}>
        Button stories were updated.
      </Toast>
      <Spinner label="Loading components" />
    </div>
  ),
};

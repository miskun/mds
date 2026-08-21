import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Badge, Button, Card, Input, Tab, Tabs } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Target",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CurrentTarget: Story = {
  render: () => (
    <div className="showcase" style={{ minHeight: "100vh" }}>
      <Card
        eyebrow="Use the MDS Target toolbar"
        title="Current target preview"
        action={
          <Button size="sm" variant="secondary" icon={<Search size={14} />}>
            Find
          </Button>
        }
      >
        <div className="mds-stack">
          <Tabs>
            <Tab active>Index</Tab>
            <Tab>Usage</Tab>
            <Tab>Specs</Tab>
          </Tabs>
          <Input label="Component" placeholder="Search MDS" />
          <div className="mds-cluster">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Badge tone="accent">target</Badge>
          </div>
        </div>
      </Card>
    </div>
  ),
};

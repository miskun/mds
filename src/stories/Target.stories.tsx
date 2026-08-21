import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Badge, Button, Card, Input, Tab, Tabs } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Getting Started/Targets",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const targetRows = [
  ["desktop", "Native desktop apps", "Pointer-first, compact controls"],
  ["mobile", "Native mobile apps", "Touch-first, larger controls"],
  ["admin", "Web admin portals", "Operational control scale"],
  ["editorial", "Marketing and publishing", "Spacious reading rhythm"],
];

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
      <Card eyebrow="Reference" title="Target intent">
        <div className="token-doc__rows">
          {targetRows.map(([target, use, intent]) => (
            <div className="token-doc__row" key={target}>
              <strong>{target}</strong>
              <span>{use}</span>
              <code>{intent}</code>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
};

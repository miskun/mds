import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2, FileText, Layers3 } from "lucide-react";
import { Alert, Button, Card, Checkbox, Input, Radio, RadioGroup, Select, StatusDot, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Patterns/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Patterns</p>
        <h1 className="mds-title">Reusable solutions that combine components.</h1>
        <p className="mds-subtitle">
          Components document individual primitives. Patterns document repeatable workflows, layout decisions, and multi-component behavior.
        </p>
      </header>

      <div className="mds-cluster">
        <StatusDot tone="success" label="Repeatable" />
        <StatusDot tone="accent" label="Workflow-driven" />
        <StatusDot label="Component-composed" />
      </div>

      <div className="mds-stack">
        <Card eyebrow="Pattern" title="Validate before publishing" action={<CheckCircle2 size={16} aria-hidden="true" />}>
          <div className="mds-stack">
            <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
            <Checkbox label="Include in public docs" defaultChecked />
            <Alert tone="danger" title="Publish blocked">
              Resolve invalid fields before publishing.
            </Alert>
          </div>
        </Card>

        <Card eyebrow="Pattern" title="Choose a product target" action={<Layers3 size={16} aria-hidden="true" />}>
          <RadioGroup label="Default target" hint="Target changes spacing, typography, and control scale.">
            <Radio name="pattern-target" value="desktop" label="Desktop" />
            <Radio name="pattern-target" value="mobile" label="Mobile" />
            <Radio name="pattern-target" value="admin" label="Admin portal" defaultChecked />
            <Radio name="pattern-target" value="editorial" label="Editorial" />
          </RadioGroup>
        </Card>

        <Card eyebrow="Pattern" title="Filter a component inventory" action={<FileText size={16} aria-hidden="true" />}>
          <div className="mds-cluster">
            <Input aria-label="Search components" placeholder="Search" />
            <Select aria-label="Target filter" defaultValue="all">
              <option value="all">All targets</option>
              <option value="admin">Admin</option>
              <option value="desktop">Desktop</option>
            </Select>
            <Switch label="Stable only" defaultChecked />
            <Button>Apply</Button>
          </div>
        </Card>
      </div>
    </div>
  ),
};

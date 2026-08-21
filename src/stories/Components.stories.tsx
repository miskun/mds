import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ArrowRight, Copy, Download, Search, Settings } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tab,
  Tabs,
  Textarea,
} from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Buttons: Story = {
  render: () => (
    <div className="mds-cluster">
      <Button icon={<ArrowRight size={16} />}>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <IconButton label="Copy" icon={<Copy size={16} />} />
      <IconButton label="Settings" variant="ghost" icon={<Settings size={16} />} />
    </div>
  ),
};

export const ButtonSizes: Story = {
  render: () => (
    <Card eyebrow="Semantic size" title="sm / md / lg adapt to the selected MDS target">
      <div className="mds-cluster">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="sm" variant="secondary" icon={<ArrowRight />}>Small icon</Button>
        <Button size="md" variant="secondary" icon={<ArrowRight />}>Medium icon</Button>
        <Button size="lg" variant="secondary" icon={<ArrowRight />}>Large icon</Button>
      </div>
    </Card>
  ),
};

export const FormControls: Story = {
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
      <Checkbox label="Enable command menu" hint="Use keyboard-first navigation for dense surfaces." defaultChecked />
      <Checkbox label="Publish component" error="Publishing requires at least one stable story." />
      <RadioGroup label="Default target" hint="This changes component spacing and control ergonomics.">
        <Radio name="target" value="desktop" label="Desktop" hint="Native desktop applications" />
        <Radio name="target" value="mobile" label="Mobile" hint="Native mobile applications" />
        <Radio name="target" value="admin" label="Admin portal" hint="Dense web operations" defaultChecked />
        <Radio name="target" value="editorial" label="Editorial" hint="Marketing, portfolios, blogs" />
      </RadioGroup>
      <Switch label="Enable dense mode" defaultChecked />
    </div>
  ),
};

export const TargetModes: Story = {
  render: () => (
    <Card eyebrow="Target" title="Toolbar-controlled component row">
      <div className="mds-cluster">
        <Input aria-label="Search components" placeholder="Find components" />
        <Button icon={<Download size={16} />}>Export</Button>
        <IconButton label="Search" icon={<Search size={16} />} />
        <Checkbox label="Selected" defaultChecked />
      </div>
    </Card>
  ),
};

export const Status: Story = {
  render: () => (
    <div className="mds-cluster">
      <Badge>Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="danger">Danger</Badge>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => {
    const [tab, setTab] = useState("overview");

    return (
      <Tabs value={tab} onValueChange={setTab}>
        <Tab value="overview">Overview</Tab>
        <Tab value="components">Components</Tab>
        <Tab value="changelog" disabled>
          Changelog
        </Tab>
        <Tab value="tokens">Tokens</Tab>
      </Tabs>
    );
  },
};

export const Panel: Story = {
  render: () => (
    <Card eyebrow="MDS" title="Component Panel" action={<Button size="sm" variant="secondary" icon={<Search size={14} />}>Search</Button>}>
      <div className="mds-stack">
        <Input label="Name" defaultValue="Miskun Design System" />
        <Select label="Target" defaultValue="admin">
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="admin">Admin</option>
          <option value="editorial">Editorial</option>
        </Select>
        <Switch label="Published" defaultChecked />
      </div>
    </Card>
  ),
};

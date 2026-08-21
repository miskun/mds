import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ArrowRight, Check, Copy, Download, Search, Settings } from "lucide-react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  StatusDot,
  Switch,
  Tab,
  Tabs,
  Tag,
  Textarea,
  Toast,
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

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ButtonVariants: Story = {
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

export const ButtonSizes: Story = {
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

export const FormControls: Story = {
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

export const TargetModes: Story = {
  parameters: storyDescription("Use the global MDS Target toolbar to preview the same composition across desktop, mobile, admin, and editorial targets."),
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

export const StatusAndFeedback: Story = {
  parameters: storyDescription("Status primitives communicate state without changing the target-aware rhythm of surrounding controls."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 720 }}>
      <div className="mds-cluster">
        <Badge>Neutral</Badge>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="danger">Danger</Badge>
        <Tag>React</Tag>
        <Tag removable>Storybook</Tag>
        <StatusDot tone="success" label="Stable" />
        <StatusDot tone="warning" label="Review" />
      </div>
      <Alert tone="info" title="Documentation ready">
        Component examples are available for the selected target.
      </Alert>
      <Alert tone="danger" title="Publish blocked">
        Resolve invalid form fields before publishing this package.
      </Alert>
      <Toast title="Component saved" action={<Button size="sm" variant="secondary" icon={<Check size={14} />}>View</Button>}>
        Button stories were updated.
      </Toast>
      <div className="mds-cluster">
        <Spinner label="Loading components" />
        <Button variant="secondary" icon={<Download size={16} />}>
          Export
        </Button>
      </div>
    </div>
  ),
};

export const Navigation: Story = {
  parameters: storyDescription("Tabs support controlled selection, roving focus, disabled items, and the active target scale."),
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
  parameters: storyDescription("Cards compose controls without changing their public API or target-aware sizing."),
  render: () => (
    <Card
      eyebrow="MDS"
      title="Component Panel"
      action={
        <Button size="sm" variant="secondary" icon={<Search size={14} />}>
          Search
        </Button>
      }
    >
      <div className="mds-stack">
        <Input label="Name" defaultValue="Miskun Design System" />
        <Select label="Target" defaultValue="admin">
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="admin">Admin</option>
          <option value="editorial">Editorial</option>
        </Select>
        <Switch label="Published" hint="Visible in component documentation." defaultChecked />
      </div>
    </Card>
  ),
};

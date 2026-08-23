import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Monitor, PanelTop, Smartphone } from "lucide-react";
import { Badge, Button, Card, Checkbox, ComboBox, Input, MDSProvider, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Getting Started/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const targets = [
  ["desktop", "Native desktop applications", "32px md controls, pointer-first rhythm"],
  ["mobile", "Native mobile applications", "48px md controls, touch-first rhythm"],
  ["admin", "High-volume web portals", "40px md controls, compact operational rhythm"],
  ["editorial", "Marketing, portfolio, and publishing surfaces", "48px md controls, spacious reading rhythm"],
];

export const Overview: Story = {
  name: "Introduction",
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 880 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Miskun Design System</p>
        <h1 className="mds-title">Build black-first React interfaces with target-aware ergonomics.</h1>
        <p className="mds-subtitle">
          Start with the provider and stylesheet, choose the product target, then compose components from the topical sections.
        </p>
      </header>

      <div className="mds-cluster">
        <Badge tone="accent">React</Badge>
        <Badge>Inter</Badge>
        <Badge>Black-first</Badge>
        <Badge tone="success">Target-aware</Badge>
      </div>

      <Card eyebrow="Install" title="Package entrypoints">
        <pre>{`import { MDSProvider, Button, Input } from "@miskun/design-system";
import "@miskun/design-system/styles.css";`}</pre>
      </Card>

      <Card eyebrow="Root" title="Set the product target">
        <pre>{`<MDSProvider target="admin">
  <App />
</MDSProvider>`}</pre>
      </Card>

      <MDSProvider target="admin">
        <Card
          eyebrow="Preview"
          title="Admin target"
          action={
            <Button size="sm" variant="secondary" icon={<ArrowRight size={14} />}>
              Open docs
            </Button>
          }
        >
          <div className="mds-stack">
            <Input label="Component" placeholder="Search components" />
            <div className="mds-cluster">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </div>
        </Card>
      </MDSProvider>
    </div>
  ),
};

export const Installation: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Installation</p>
        <h1 className="mds-title">Import the package and the stylesheet once.</h1>
        <p className="mds-subtitle">
          MDS ships React components and a stable CSS entrypoint. React and React DOM are peer dependencies.
        </p>
      </header>

      <Card eyebrow="Package" title="Install">
        <pre>{`npm install @miskun/design-system react react-dom`}</pre>
      </Card>

      <Card eyebrow="Styles" title="Application entrypoint">
        <pre>{`import "@miskun/design-system/styles.css";`}</pre>
      </Card>

      <Card eyebrow="Components" title="Use named exports">
        <pre>{`import { Button, Card, Input, MDSProvider } from "@miskun/design-system";`}</pre>
      </Card>
    </div>
  ),
};

export const CoreConcepts: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Core concepts</p>
        <h1 className="mds-title">Target describes product intent.</h1>
        <p className="mds-subtitle">
          Viewport is screen size. Target is component ergonomics: typography, spacing, control scale, and interaction comfort.
        </p>
      </header>

      <div className="token-doc__rows">
        {targets.map(([target, use, scale]) => (
          <div className="token-doc__row" key={target}>
            <strong>{target}</strong>
            <span>{use}</span>
            <code>{scale}</code>
          </div>
        ))}
      </div>

      <Card eyebrow="Semantic sizing" title="sm / md / lg resolve through target">
        <div className="mds-cluster">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Card>
    </div>
  ),
};

export const UsingComponents: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Using components</p>
        <h1 className="mds-title">Compose primitives from the component sections.</h1>
        <p className="mds-subtitle">
          Components pass native props through where possible and use shared target-aware spacing and sizing tokens.
        </p>
      </header>

      <Card eyebrow="Example" title="Component form">
        <div className="mds-stack">
          <Input label="Name" placeholder="Miskun Design System" hint="Use concise labels and direct hints." required />
          <ComboBox
            label="Target"
            defaultValue="admin"
            options={[
              { value: "desktop", label: "Desktop" },
              { value: "mobile", label: "Mobile" },
              { value: "admin", label: "Admin portal" },
              { value: "editorial", label: "Editorial" },
            ]}
          />
          <Checkbox label="Include in public docs" defaultChecked />
          <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
          <div className="mds-cluster">
            <Button>Save</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      </Card>

      <Card eyebrow="Code" title="Same composition">
        <pre>{`const targetOptions = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
  { value: "admin", label: "Admin portal" },
  { value: "editorial", label: "Editorial" },
];

<Card title="Component form">
  <Input label="Name" required />
  <ComboBox label="Target" defaultValue="admin" options={targetOptions} />
  <Checkbox label="Include in public docs" defaultChecked />
  <Switch label="Show command hints" defaultChecked />
  <Button>Save</Button>
</Card>`}</pre>
      </Card>
    </div>
  ),
};

export const StorybookToolbar: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 920 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Storybook toolbar</p>
        <h1 className="mds-title">Use target and viewport for different questions.</h1>
        <p className="mds-subtitle">
          The MDS Target toolbar changes component ergonomics. Storybook viewport changes the canvas dimensions.
        </p>
      </header>

      <div className="mds-cluster">
        <Card eyebrow="MDS Target" title="Product surface">
          <div className="mds-stack">
            <Monitor size={20} aria-hidden="true" />
            <p>Desktop, mobile, admin, or editorial component scale.</p>
          </div>
        </Card>
        <Card eyebrow="Viewport" title="Screen size">
          <div className="mds-stack">
            <Smartphone size={20} aria-hidden="true" />
            <p>Canvas width and height for responsive layout checks.</p>
          </div>
        </Card>
        <Card eyebrow="Together" title="Preview intent">
          <div className="mds-stack">
            <PanelTop size={20} aria-hidden="true" />
            <p>Use both when checking how a product target behaves at a specific screen size.</p>
          </div>
        </Card>
      </div>
    </div>
  ),
};

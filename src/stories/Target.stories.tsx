import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Badge, Button, Card, ComboBox, Eyebrow, Input, MDSProvider, Tab, Tabs } from "../components";
import "../showcase.css";
import "./provider.css";

const meta = {
  title: "MDS/Foundations/Targets",
} satisfies Meta;

export default meta;
type Story = StoryObj;

const targetRows = [
  ["desktop", "Native desktop apps", "Pointer-first, compact controls"],
  ["mobile", "Native mobile apps", "Touch-first, larger controls"],
  ["admin", "Web admin portals", "Operational control scale"],
  ["editorial", "Marketing and publishing", "Spacious reading rhythm"],
];

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
  },
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

export const ProviderUsage: Story = {
  name: "Provider Usage",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="provider-doc">
      <header className="provider-doc__header">
        <Eyebrow>MDS Provider</Eyebrow>
        <h1>Wrap an app or subtree with the selected target.</h1>
        <p>
          MDSProvider writes <code>data-mds-target</code> so component tokens resolve for desktop, mobile, admin, or editorial surfaces.
        </p>
      </header>
      <Card eyebrow="Provider" title="Application root">
        <pre>{`import { MDSProvider } from "@miskun/design-system";
import "@miskun/design-system/styles.css";

<MDSProvider target="admin">
  <App />
</MDSProvider>`}</pre>
      </Card>
      <Card eyebrow="Default" title="Admin is the fallback target">
        <p>
          If <code>target</code> is omitted, MDSProvider uses <code>admin</code>. If an app imports the stylesheet without wrapping a subtree in MDSProvider, root tokens also resolve to admin values.
        </p>
        <pre>{`<MDSProvider>
  <App />
</MDSProvider>`}</pre>
      </Card>
      <Card eyebrow="Subtree" title="Scoped target">
        <pre>{`<MDSProvider target="editorial">
  <MarketingPreview />
</MDSProvider>`}</pre>
      </Card>
    </div>
  ),
};

export const NestedTargets: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="provider-grid">
      {(["desktop", "mobile", "admin", "editorial"] as const).map((target) => (
        <MDSProvider target={target} key={target}>
          <Card eyebrow="Target" title={target}>
            <div className="mds-stack">
              <Tabs>
                <Tab active>Preview</Tab>
                <Tab>Specs</Tab>
              </Tabs>
              <Input label="Name" defaultValue="Miskun Design System" />
              <ComboBox
                label="Mode"
                defaultValue={target}
                options={[
                  { value: "desktop", label: "Desktop" },
                  { value: "mobile", label: "Mobile" },
                  { value: "admin", label: "Admin" },
                  { value: "editorial", label: "Editorial" },
                ]}
              />
              <div className="mds-cluster">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </div>
          </Card>
        </MDSProvider>
      ))}
    </div>
  ),
};

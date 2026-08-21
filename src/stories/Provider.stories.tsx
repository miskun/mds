import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Input, MDSProvider, Select, Tab, Tabs } from "../components";
import "./provider.css";

const meta = {
  title: "MDS/Provider",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Usage: Story = {
  render: () => (
    <div className="provider-doc">
      <header className="provider-doc__header">
        <p className="mds-kicker">MDS Provider</p>
        <h1>Use target for product intent, viewport for screen size.</h1>
        <p>
          Storybook's viewport menu changes the canvas dimensions. The MDS Target toolbar maps to
          <code> data-mds-target</code> and changes component ergonomics.
        </p>
      </header>
      <Card eyebrow="Provider" title="Application root">
        <pre>{`import { MDSProvider } from "@miskun/design-system";
import "@miskun/design-system/styles.css";

<MDSProvider target="admin">
  <App />
</MDSProvider>`}</pre>
      </Card>
    </div>
  ),
};

export const NestedTargets: Story = {
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
              <Select label="Mode" defaultValue={target}>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="admin">Admin</option>
                <option value="editorial">Editorial</option>
              </Select>
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

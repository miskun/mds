import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, ComboBox, Input, MDSProvider, Tab, Tabs } from "../components";
import "./provider.css";

const meta = {
  title: "MDS/Getting Started/Provider",
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
      <Card eyebrow="Subtree" title="Scoped target">
        <pre>{`<MDSProvider target="editorial">
  <MarketingPreview />
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

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Checkbox, ComboBox, Eyebrow, Input, Prose, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Getting Started/Using Components",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const UsingComponents: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <Prose as="header">
        <Eyebrow>Using components</Eyebrow>
        <h1>Compose primitives from the component sections.</h1>
        <p>
          Components pass native props through where possible and use shared target-aware spacing and sizing tokens.
        </p>
      </Prose>

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

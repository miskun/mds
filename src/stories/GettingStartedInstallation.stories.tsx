import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Getting Started/Installation",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

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

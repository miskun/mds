import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Eyebrow, Prose } from "../components";
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
      <Prose as="header">
        <Eyebrow>Installation</Eyebrow>
        <h1>Import the package and the stylesheet once.</h1>
        <p>
          MDS ships React components and a stable CSS entrypoint. React and React DOM are peer dependencies.
        </p>
      </Prose>

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

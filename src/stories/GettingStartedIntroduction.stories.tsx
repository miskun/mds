import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
import { Badge, Button, Card, Hero, Input, MDSProvider } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Getting Started/Introduction",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 880 }}>
      <Hero
        as="header"
        eyebrow="Miskun Design System"
        title="Build black-first React interfaces with target-aware ergonomics."
        description="Start with the provider and stylesheet, choose the product target, then compose components from the topical sections."
      />

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

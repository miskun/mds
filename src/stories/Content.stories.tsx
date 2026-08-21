import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, Card, Tag } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Content/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const guidance = [
  ["Labels", "Use direct noun phrases: Name, Target, Release channel."],
  ["Hints", "Explain what changes or why the field matters."],
  ["Errors", "Say what happened and what the user can do next."],
  ["Actions", "Use verbs that match the result: Save, Publish, Export."],
];

export const Overview: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 820 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Content</p>
        <h1 className="mds-title">Clear interface copy for focused tools.</h1>
        <p className="mds-subtitle">
          MDS copy should be concise, specific, and useful in context. Avoid explaining the UI when the component already communicates state.
        </p>
      </header>

      <Card eyebrow="Guidelines" title="Common copy surfaces">
        <div className="token-doc__rows">
          {guidance.map(([name, description]) => (
            <div className="token-doc__row" key={name}>
              <strong>{name}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </Card>

      <Alert tone="info" title="Write for the next action">
        Prefer actionable copy over generic status text.
      </Alert>

      <div className="mds-cluster">
        <Tag>concise</Tag>
        <Tag>specific</Tag>
        <Tag>actionable</Tag>
      </div>
    </div>
  ),
};

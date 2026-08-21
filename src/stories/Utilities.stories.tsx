import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Kbd, Tag } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Utilities/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const utilities = [
  ["Stack", "mds-stack", "Vertical rhythm that follows target spacing."],
  ["Cluster", "mds-cluster", "Inline wrapping layout for toolbars and compact groups."],
  ["Kicker", "mds-kicker", "Small uppercase section label."],
  ["Title", "mds-title", "Large page or section heading."],
  ["Subtitle", "mds-subtitle", "Supporting copy for headings."],
];

export const Overview: Story = {
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Utilities</p>
        <h1 className="mds-title">Small layout and text helpers for documentation and composition.</h1>
        <p className="mds-subtitle">
          Utilities stay minimal. Components and target tokens should do most of the interface work.
        </p>
      </header>

      <Card eyebrow="CSS utilities" title="Available helpers">
        <div className="token-doc__rows">
          {utilities.map(([name, className, description]) => (
            <div className="token-doc__row" key={className}>
              <strong>{name}</strong>
              <code>.{className}</code>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mds-cluster">
        <Tag>mds-stack</Tag>
        <Tag>mds-cluster</Tag>
        <Kbd>Tab</Kbd>
        <Kbd>Enter</Kbd>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Eyebrow, Kbd, Prose, Tag } from "../components";
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
  ["Numeric", "mds-numeric", "Tabular figures for aligned numeric values."],
];

export const Overview: Story = {
  name: "Available helpers",
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <Prose as="header">
        <Eyebrow>Utilities</Eyebrow>
        <h1>Small layout and text helpers for documentation and composition.</h1>
        <p>
          Utilities stay minimal. Components and target tokens should do most of the interface work.
        </p>
      </Prose>

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

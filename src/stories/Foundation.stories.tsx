import type { Meta, StoryObj } from "@storybook/react-vite";
import "../showcase.css";

const meta = {
  title: "MDS/Foundations",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Tokens: Story = {
  render: () => (
    <div className="mds-stack">
      <p className="mds-kicker">MDS Tokens</p>
      <h1 className="mds-title">Black, Inter, sharp signal.</h1>
      <p className="mds-subtitle">The system begins with dark surfaces, tight radii, crisp borders, and a bright accent.</p>
      <div className="mds-cluster">
        {[
          ["Black", "var(--mds-black)"],
          ["Panel", "var(--mds-panel)"],
          ["Line", "var(--mds-line)"],
          ["Text", "var(--mds-text)"],
          ["Accent", "var(--mds-accent)"],
        ].map(([name, value]) => (
          <div className="token" style={{ minWidth: 160 }} key={name}>
            <span className="token__swatch" style={{ background: value }} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TargetTokens: Story = {
  render: () => (
    <div className="mds-stack">
      <p className="mds-kicker">MDS Target</p>
      <h1 className="mds-title">One component set, four ergonomic modes.</h1>
      <p className="mds-subtitle">
        Apply target with MDSProvider or a subtree attribute: desktop, mobile, admin, or editorial.
      </p>
      <pre
        style={{
          margin: 0,
          border: "1px solid var(--mds-line)",
          borderRadius: "var(--mds-radius-md)",
          background: "var(--mds-panel)",
          color: "var(--mds-text-muted)",
          padding: "var(--mds-panel-padding)",
          overflow: "auto",
        }}
      >
        {`<MDSProvider target="admin">
  <Button>Save</Button>
  <Input label="Name" />
</MDSProvider>`}
      </pre>
    </div>
  ),
};

export const TargetScale: Story = {
  render: () => (
    <div className="mds-stack">
      <p className="mds-kicker">MDS Target Scale</p>
      <h1 className="mds-title">Semantic sizes resolve through the selected target.</h1>
      <p className="mds-subtitle">
        Use the MDS Target toolbar to inspect how md, sm, lg, spacing, choice controls, tags, keyboard hints, and loading indicators scale.
      </p>
      <div className="token-grid" style={{ maxWidth: 720 }}>
        {[
          ["Control sm", "var(--mds-control-height-sm)"],
          ["Control md", "var(--mds-control-height-md)"],
          ["Control lg", "var(--mds-control-height-lg)"],
          ["Stack gap", "var(--mds-stack-gap)"],
          ["Inline gap", "var(--mds-inline-gap)"],
          ["Panel padding", "var(--mds-panel-padding)"],
          ["Section padding", "var(--mds-section-padding)"],
          ["Table cell", "var(--mds-table-cell-padding-y) x var(--mds-table-cell-padding-x)"],
          ["Choice", "var(--mds-choice-size)"],
          ["Switch", "var(--mds-switch-width) x var(--mds-switch-height)"],
          ["Badge", "var(--mds-badge-height)"],
          ["Tag", "var(--mds-tag-height)"],
          ["Avatar", "var(--mds-avatar-size)"],
        ].map(([name, value]) => (
          <div className="token" key={name}>
            <span>{name}</span>
            <code>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

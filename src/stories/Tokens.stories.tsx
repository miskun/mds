import type { Meta, StoryObj } from "@storybook/react-vite";
import "./tokens.css";

const meta = {
  title: "MDS/Foundations/Tokens",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const colors = [
  ["Black", "--mds-black", "App background and deepest surfaces."],
  ["Ink", "--mds-ink", "Inputs, choices, and inset controls."],
  ["Panel", "--mds-panel", "Cards, panels, menus, and table surfaces."],
  ["Raised", "--mds-panel-raised", "Elevated controls and selected surfaces."],
  ["Line", "--mds-line", "Default borders and dividers."],
  ["Strong line", "--mds-line-strong", "Control borders and stronger separation."],
  ["Text", "--mds-text", "Primary readable text."],
  ["Muted", "--mds-text-muted", "Secondary text and supporting metadata."],
  ["Soft text", "--mds-text-soft", "Subtle labels, hints, and low-emphasis copy."],
  ["Accent", "--mds-accent", "Primary action emphasis and focus signal."],
  ["Danger", "--mds-danger", "Errors and destructive state."],
  ["Success", "--mds-success", "Positive status and completion state."],
];

const targetRows = [
  ["desktop", "24 / 32 / 40", "13", "12", "Native desktop, pointer-first"],
  ["mobile", "40 / 48 / 56", "16", "16", "Native mobile, touch-first"],
  ["admin", "32 / 40 / 48", "14", "12", "Web admin, high-volume workflows"],
  ["editorial", "40 / 48 / 56", "15", "24", "Marketing, portfolio, publishing"],
];

const spacing = [
  ["Stack gap", "--mds-stack-gap", "Vertical rhythm inside forms, panels, and page sections."],
  ["Inline gap", "--mds-inline-gap", "Horizontal spacing for button rows, badges, and compact groups."],
  ["Field gap", "--mds-field-gap", "Label, control, hint, and error spacing."],
  ["Control gap", "--mds-control-gap", "Internal control spacing between text and icons."],
  ["Toolbar gap", "--mds-toolbar-gap", "Search, filters, actions, and toolbar clusters."],
  ["Panel padding", "--mds-panel-padding", "Card, panel, and contained surface padding."],
  ["Section padding", "--mds-section-padding", "Page section padding and editorial breathing room."],
  ["Table cell Y", "--mds-table-cell-padding-y", "Vertical table cell padding."],
  ["Table cell X", "--mds-table-cell-padding-x", "Horizontal table cell padding."],
];

const typography = [
  ["Extra small", "--mds-font-size-xs", "12px", "Badges, hints, compact metadata."],
  ["Small", "--mds-font-size-sm", "14px", "Labels, compact controls, secondary copy."],
  ["Medium", "--mds-font-size-md", "16px", "Default body and mobile control text."],
  ["Large", "--mds-font-size-lg", "20px", "Section leads and prominent copy."],
  ["XL", "--mds-font-size-xl", "28px", "Compact page headings."],
  ["2XL", "--mds-font-size-2xl", "40px", "Hero and editorial headings."],
];

const radii = [
  ["XS", "--mds-radius-xs", "Checkboxes, tags, tight details."],
  ["SM", "--mds-radius-sm", "Inputs and compact controls."],
  ["MD", "--mds-radius-md", "Cards, panels, menus, and modals."],
  ["LG", "--mds-radius-lg", "Large surfaces that need a softer edge."],
];

const namingRules = [
  ["Base tokens", "--mds-space-4, --mds-font-size-sm", "Raw scale values. Use directly only for low-level token definitions."],
  ["Semantic aliases", "--mds-stack-gap, --mds-panel-padding", "Preferred for components and layout. These adapt by target."],
  ["Component tokens", "--mds-switch-height, --mds-badge-height", "Shared dimensions for repeated component families."],
  ["State tokens", "--mds-danger, --mds-success, --mds-focus", "Use for consistent status, validation, and focus treatment."],
];

export const Color: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Color" description="Black-first surfaces with restrained semantic accents." />
      <div className="token-doc__swatches">
        {colors.map(([name, token, usage]) => (
          <div className="token-doc__swatch" key={token}>
            <span className="token-doc__color" style={{ background: `var(${token})` }} />
            <strong>{name}</strong>
            <code>{token}</code>
            <span>{usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TargetScale: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Target Scale" description="Use the Storybook MDS Target toolbar to preview actual token values." />
      <table className="token-doc__table">
        <thead>
          <tr>
            <th>Target</th>
            <th>Control sm / md / lg</th>
            <th>md font</th>
            <th>stack gap</th>
            <th>Intent</th>
          </tr>
        </thead>
        <tbody>
          {targetRows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Spacing" description="Semantic spacing aliases make layout rhythm adapt to the selected target." />
      <div className="token-doc__rows">
        {spacing.map(([name, token, usage]) => (
          <div className="token-doc__row" key={token}>
            <strong>{name}</strong>
            <code>{token}</code>
            <span>{usage}</span>
            <span className="token-doc__measure" style={{ width: `var(${token})` }} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TypographyAndRadii: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Typography + Radii" description="Inter-first type scale, compact radii, and consistent focus treatment." />
      <table className="token-doc__table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Token</th>
            <th>Reference</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {typography.map(([name, token, value, usage]) => (
            <tr key={token}>
              <td style={{ fontSize: `var(${token})`, color: "var(--mds-text)" }}>{name}</td>
              <td>{token}</td>
              <td>{value}</td>
              <td>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="token-doc__radii">
        {radii.map(([name, token, usage]) => (
          <span style={{ borderRadius: `var(${token})` }} key={token}>
            <strong>{name}</strong>
            <code>{token}</code>
            <small>{usage}</small>
          </span>
        ))}
      </div>
    </div>
  ),
};

export const Focus: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Focus" description="MDS uses a visible accent focus ring that does not move layout or trigger geometry." />
      <div className="token-doc__focus-grid">
        <button className="token-doc__focus-sample">Focusable button</button>
        <a className="token-doc__focus-sample" href="#">
          Focusable link
        </a>
        <span className="token-doc__focus-ring">--mds-focus</span>
      </div>
    </div>
  ),
};

export const NamingRules: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Token Naming Rules" description="Use semantic target-aware aliases in components; keep raw scale tokens close to token definitions." />
      <div className="token-doc__rows">
        {namingRules.map(([name, example, rule]) => (
          <div className="token-doc__row" key={name}>
            <strong>{name}</strong>
            <code>{example}</code>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

function Header({ title, description }: { title: string; description: string }) {
  return (
    <header className="token-doc__header">
      <p className="mds-kicker">MDS Tokens</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

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
  ["Black", "--mds-black"],
  ["Ink", "--mds-ink"],
  ["Panel", "--mds-panel"],
  ["Raised", "--mds-panel-raised"],
  ["Line", "--mds-line"],
  ["Text", "--mds-text"],
  ["Muted", "--mds-text-muted"],
  ["Accent", "--mds-accent"],
  ["Danger", "--mds-danger"],
  ["Success", "--mds-success"],
];

const targetRows = [
  ["desktop", "24 / 32 / 40", "13", "12", "Native desktop, pointer-first"],
  ["mobile", "40 / 48 / 56", "16", "16", "Native mobile, touch-first"],
  ["admin", "32 / 40 / 48", "14", "12", "Web admin, high-volume workflows"],
  ["editorial", "40 / 48 / 56", "15", "24", "Marketing, portfolio, publishing"],
];

const spacing = [
  ["Stack gap", "--mds-stack-gap"],
  ["Inline gap", "--mds-inline-gap"],
  ["Field gap", "--mds-field-gap"],
  ["Control gap", "--mds-control-gap"],
  ["Toolbar gap", "--mds-toolbar-gap"],
  ["Panel padding", "--mds-panel-padding"],
  ["Section padding", "--mds-section-padding"],
  ["Table cell Y", "--mds-table-cell-padding-y"],
  ["Table cell X", "--mds-table-cell-padding-x"],
];

export const Color: Story = {
  render: () => (
    <div className="token-doc">
      <Header title="Color" description="Black-first surfaces with restrained semantic accents." />
      <div className="token-doc__swatches">
        {colors.map(([name, token]) => (
          <div className="token-doc__swatch" key={token}>
            <span className="token-doc__color" style={{ background: `var(${token})` }} />
            <strong>{name}</strong>
            <code>{token}</code>
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
        {spacing.map(([name, token]) => (
          <div className="token-doc__row" key={token}>
            <strong>{name}</strong>
            <code>{token}</code>
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
      <div className="token-doc__type">
        <p style={{ fontSize: "var(--mds-font-size-xs)" }}>Extra small / --mds-font-size-xs</p>
        <p style={{ fontSize: "var(--mds-font-size-sm)" }}>Small / --mds-font-size-sm</p>
        <p style={{ fontSize: "var(--mds-font-size-md)" }}>Medium / --mds-font-size-md</p>
        <p style={{ fontSize: "var(--mds-font-size-lg)" }}>Large / --mds-font-size-lg</p>
        <p style={{ fontSize: "var(--mds-font-size-xl)" }}>XL / --mds-font-size-xl</p>
      </div>
      <div className="token-doc__radii">
        {["xs", "sm", "md", "lg"].map((radius) => (
          <span style={{ borderRadius: `var(--mds-radius-${radius})` }} key={radius}>
            {radius}
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

function Header({ title, description }: { title: string; description: string }) {
  return (
    <header className="token-doc__header">
      <p className="mds-kicker">MDS Tokens</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

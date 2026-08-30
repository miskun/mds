import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HardwareBay,
  HardwareButton,
  HardwareDisplay,
  HardwareKnob,
  HardwareList,
  HardwarePad,
  HardwarePanel,
  HardwareSlider,
  HardwareVUMeter,
  HardwareWorkbench,
  Stack,
} from "../components";
import "./hardware.css";

const meta = {
  title: "MDS/Explorations/Hardware",
  component: HardwarePanel,
  subcomponents: { HardwareBay, HardwareButton, HardwareDisplay, HardwareKnob, HardwareList, HardwareSlider, HardwarePad, HardwareVUMeter, HardwareWorkbench },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Exploratory hardware sketches for pressure-testing the physical-device design language. Core component documentation lives under Components.",
      },
    },
  },
} satisfies Meta<typeof HardwarePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const articulations = [
  { id: "c-sharp-1", eyebrow: "C#1", label: "1 Handmade A" },
  { id: "d-1", eyebrow: "D1", label: "Vibrato Standart" },
  { id: "d-sharp-1", eyebrow: "D#1", label: "Staccatto" },
  { id: "e-1", eyebrow: "E1", label: "Staccatto Soft" },
  { id: "g-1", eyebrow: "G1", label: "1 Handmade B" },
  { id: "g-sharp-1", eyebrow: "G#1", label: "1 Handmade C", selected: true },
  { id: "f-1", eyebrow: "F1", label: "1 Handmade D" },
  { id: "f-sharp-1", eyebrow: "F#1", label: "1 Handmade A" },
  { id: "c-sharp-2", eyebrow: "C#2", label: "Vibrato Standart" },
  { id: "d-2", eyebrow: "D2", label: "Staccatto" },
  { id: "d-sharp-2", eyebrow: "D#2", label: "Staccatto Tight" },
  { id: "e-2", eyebrow: "E2", label: "Legato Motion" },
];

const holdings = [
  ["IREN", "IREN Limited", "$35.45", "+73.81%", "78.21%"],
  ["SXRB", "iShares Core S&P 500", "€721.06", "+2.69%", "5.71%"],
  ["VWCE", "Vanguard FTSE All-World", "€168.54", "+1.43%", "5.34%"],
  ["AMZN", "Amazon.com Inc", "$266.43", "+10.69%", "3.61%"],
  ["MSFT", "Microsoft Corp", "$513.53", "+27.38%", "2.90%"],
  ["GOOGL", "Alphabet Inc Class A", "$346.59", "+2.26%", "2.35%"],
  ["SECO", "iShares MSCI Semiconductors", "€16.89", "-19.63%", "1.87%"],
];

export const PortfolioControlSurface: Story = {
  render: () => (
    <HardwareWorkbench>
      <HardwarePanel heading="MONOCLE">
        <div className="mds-hardware-portfolio">
          <aside className="mds-hardware-portfolio__rail" aria-label="Portfolio sections">
            {["Holdings", "Accounts", "Brokers", "Awaiting", "Records"].map((item, index) => (
              <HardwareButton key={item} active={index === 0} tone={index === 0 ? "accent" : "neutral"}>
                {item}
              </HardwareButton>
            ))}
          </aside>

          <div className="mds-hardware-portfolio__main">
            <div className="mds-hardware-portfolio__metrics">
              <HardwareDisplay eyebrow="Total value" value="€378,713.86" />
              <HardwareDisplay eyebrow="Today" value="-€41,209.31" unit="-9.81%" />
              <HardwareDisplay eyebrow="Total gain" value="+€128,786.91" unit="+51.53%" />
              <HardwareDisplay eyebrow="Cost basis" value="€249,926.95" />
            </div>

            <div className="mds-hardware-portfolio__annunciator">
              <span aria-hidden="true" />
              <strong>20,178 shares awaiting delivery</strong>
              <span>Excluded from total until settlement.</span>
            </div>

            <HardwareBay label="Value over the last year">
              <div className="mds-hardware-portfolio__scope" aria-label="Portfolio value chart">
                <svg viewBox="0 0 900 190" role="img" aria-label="Value trend">
                  <defs>
                    <linearGradient id="portfolioTraceFill" x1="0" x2="0" y1="0" y2="1">
                      <stop stopColor="currentColor" stopOpacity="0.26" />
                      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="mds-hardware-portfolio__scope-fill" d="M0 50 L54 50 L54 95 C120 84 180 89 242 82 C314 72 368 86 438 88 C490 118 552 112 626 132 C704 142 758 124 830 128 L900 126 L900 190 L0 190 Z" />
                  <path className="mds-hardware-portfolio__scope-line" d="M0 50 L54 50 L54 95 C120 84 180 89 242 82 C314 72 368 86 438 88 C490 118 552 112 626 132 C704 142 758 124 830 128 L900 126" />
                </svg>
              </div>
            </HardwareBay>

            <HardwareBay label="Market readout">
              <div className="mds-hardware-portfolio__table" role="table" aria-label="Holdings">
                <div role="row" className="mds-hardware-portfolio__row mds-hardware-portfolio__row--head">
                  <span>Holding</span>
                  <span>Price</span>
                  <span>Gain</span>
                  <span>Weight</span>
                </div>
                {holdings.map(([ticker, name, price, gain, weight]) => (
                  <div role="row" className="mds-hardware-portfolio__row" key={ticker}>
                    <span>
                      <strong>{ticker}</strong>
                      <small>{name}</small>
                    </span>
                    <span>{price}</span>
                    <span className={gain.startsWith("-") ? "is-negative" : "is-positive"}>{gain}</span>
                    <span>{weight}</span>
                  </div>
                ))}
              </div>
            </HardwareBay>

            <div className="mds-hardware-portfolio__commands">
              <span>Markets closed</span>
              <div>
                <HardwareButton active>Record trade</HardwareButton>
                <HardwareButton tone="neutral">Refresh now</HardwareButton>
              </div>
            </div>
          </div>
        </div>
      </HardwarePanel>
    </HardwareWorkbench>
  ),
};

export const EclydeStylePanel: Story = {
  name: "Instrument Panel",
  render: () => (
    <HardwareWorkbench>
      <HardwarePanel heading="MDS-01">
        <div className="mds-hardware-demo">
          <div className="mds-hardware-demo__strip">
            <HardwareButton active>Button</HardwareButton>
            <HardwareButton tone="neutral">Button</HardwareButton>
            <div className="mds-hardware-demo__preset">Menu Preset</div>
            <div className="mds-hardware-demo__steps">
              <HardwareButton size="sm" tone="neutral">
                1
              </HardwareButton>
              <HardwareButton size="sm" tone="neutral">
                2
              </HardwareButton>
              <HardwareButton size="sm" active>
                3
              </HardwareButton>
              <HardwareButton size="sm" tone="neutral">
                4
              </HardwareButton>
            </div>
          </div>

          <div className="mds-hardware-demo__columns">
            <Stack gap="md">
              <HardwareBay>
                <HardwareVUMeter />
              </HardwareBay>
              <HardwareBay label="Articulations">
                <HardwareList items={articulations} label="Articulations" />
              </HardwareBay>
            </Stack>

            <HardwareBay>
              <div className="mds-hardware-demo__knobs">
                <HardwareKnob label="Small Knob" value={0.72} />
                <HardwareKnob label="Small Knob" value={0.55} tone="neutral" />
              </div>
              <HardwareSlider label="Horizontal Slider" value={0.42} />
              <HardwareKnob label="Big Knob" value={0.64} size="lg" />
            </HardwareBay>

            <HardwareBay>
              <div className="mds-hardware-demo__right-controls">
                <div className="mds-hardware-demo__mini">
                  <HardwareKnob label="Small Knob" size="sm" value={0.69} />
                  <HardwareKnob label="Small Knob" size="sm" value={0.34} tone="neutral" />
                </div>
                <div className="mds-hardware-demo__switches" aria-label="Switch indicators">
                  <span className="is-active" />
                  <span />
                </div>
                <HardwareSlider label="Wheel" value={0.58} orientation="vertical" />
              </div>
              <div className="mds-hardware-demo__pads">
                <HardwarePad active />
                <HardwarePad />
                <HardwarePad />
                <HardwarePad active />
              </div>
              <div className="mds-hardware-label">Drum Pads</div>
            </HardwareBay>
          </div>
        </div>
      </HardwarePanel>
    </HardwareWorkbench>
  ),
};

export const Components: Story = {
  render: () => (
    <HardwareWorkbench>
      <HardwarePanel heading="Parts">
        <div className="mds-hardware-demo__parts">
          <HardwareBay label="Buttons">
            <HardwareButton active>Button</HardwareButton>
            <HardwareButton tone="neutral">Button</HardwareButton>
            <HardwareButton size="sm" active>
              3
            </HardwareButton>
          </HardwareBay>
          <HardwareBay label="Knobs">
            <div className="mds-hardware-demo__knobs">
              <HardwareKnob label="Amber" value={0.72} />
              <HardwareKnob label="Neutral" value={0.38} tone="neutral" />
            </div>
          </HardwareBay>
          <HardwareBay label="Sliders">
            <HardwareSlider value={0.55} />
            <HardwareSlider value={0.44} orientation="vertical" />
          </HardwareBay>
          <HardwareBay label="Pads">
            <div className="mds-hardware-demo__pads">
              <HardwarePad active />
              <HardwarePad />
              <HardwarePad />
              <HardwarePad active />
            </div>
          </HardwareBay>
        </div>
      </HardwarePanel>
    </HardwareWorkbench>
  ),
};

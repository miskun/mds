import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, Switch } from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Controls/Switches",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Switches represent persistent binary settings. They do not press down like tact controls; the thumb moves sideways and carries the state LED.",
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Overview: Story = {
  parameters: storyDescription("Switches represent binary settings and should read as on/off controls, not one-time actions."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
      <Switch label="System monitor" hint="Custom LED colors can match the setting domain." ledColor="#8cff5f" defaultChecked />
      <Switch label="Publish changes" error="Publishing is disabled until validation passes." />
      <Switch label="Deprecated package" disabled hint="Disabled switches keep the label and track visually muted." />
    </Stack>
  ),
};

export const States: Story = {
  parameters: storyDescription("Use states to inspect on, off, invalid, disabled, and custom LED colors."),
  render: () => (
    <Stack style={{ maxWidth: 520 }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Custom LED color" ledColor="#8cff5f" defaultChecked />
      <Switch label="Invalid" error="Resolve the blocking state first." />
      <Switch label="Disabled" disabled />
    </Stack>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Switches inherit their surface context, so controls on panels read as embedded into the raised plane."),
  render: () => (
    <SurfaceComparison
      canvas={
        <>
          <Switch label="Direct canvas control" hint="The switch reads as an object against the black surface." defaultChecked />
          <Switch label="Canvas off state" />
        </>
      }
      panel={
        <>
          <Switch label="Panel control" hint="The track recedes while the thumb stays level with the panel." defaultChecked />
          <Switch label="Panel off state" />
        </>
      }
    />
  ),
};

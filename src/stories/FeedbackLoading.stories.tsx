import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  Progress,
  Skeleton,
  Spinner,
} from "../components";
import { SurfaceComparison } from "./SurfaceComparison";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback/Loading",
  component: Progress,
  subcomponents: { Skeleton, Spinner },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Loading primitives communicate progress, waiting, and placeholder structure while keeping spacing aligned with the active MDS target.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Loading: Story = {
  parameters: storyDescription("Loading primitives cover determinate progress, spinner sizes, and skeleton placeholders."),
  render: () => (
    <Card eyebrow="Loading" title="Progress, spinner, skeleton">
      <div className="mds-stack">
        <Progress label="Story coverage" value={68} />
        <div className="mds-cluster">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
        </div>
        <div className="skeleton-stack">
          <Skeleton variant="text" style={{ width: "60%" }} />
          <Skeleton variant="text" style={{ width: "86%" }} />
          <Skeleton variant="block" />
        </div>
      </div>
    </Card>
  ),
};

export const SurfaceContext: Story = {
  parameters: storyDescription("Loading primitives can be compared on canvas and inside a raised panel."),
  render: () => (
    <SurfaceComparison
      canvas={
        <>
          <Progress label="Story coverage" value={68} />
          <div className="mds-cluster">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </div>
          <div className="skeleton-stack">
            <Skeleton variant="text" style={{ width: "60%" }} />
            <Skeleton variant="block" />
          </div>
        </>
      }
      panel={
        <>
          <Progress label="Story coverage" value={68} />
          <div className="mds-cluster">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </div>
          <div className="skeleton-stack">
            <Skeleton variant="text" style={{ width: "60%" }} />
            <Skeleton variant="block" />
          </div>
        </>
      }
    />
  ),
};

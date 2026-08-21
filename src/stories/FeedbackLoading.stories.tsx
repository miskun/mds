import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePlus2 } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  EmptyState,
  Progress,
  Skeleton,
  Spinner,
  Toast,
} from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback",
  component: Alert,
  subcomponents: { EmptyState, Progress, Skeleton, Spinner, Toast },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feedback primitives communicate state, progress, and compact metadata while keeping spacing and typography aligned with the active MDS target.",
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

export const Alerts: Story = {
  parameters: storyDescription("Alerts cover informational, success, warning, and danger tones with role behavior handled by the component."),
  render: () => (
    <div className="feedback-grid">
      <Alert tone="info" title="Component indexed">
        Search metadata has been refreshed for the active target.
      </Alert>
      <Alert tone="success" title="Published">
        The component is available in Storybook.
      </Alert>
      <Alert tone="warning" title="Missing states">
        Add disabled and invalid examples before marking stable.
      </Alert>
      <Alert tone="danger" title="Build failed">
        Resolve TypeScript errors before publishing.
      </Alert>
    </div>
  ),
};

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

export const EmptyAndToast: Story = {
  parameters: storyDescription("Empty states and toasts show recovery actions, optional dismissal, and compact feedback copy."),
  render: () => (
    <div className="feedback-grid">
      <EmptyState
        title="No components found"
        description="Try a different target or clear active filters."
        icon={<FilePlus2 size={22} />}
        action={<Button>Create component</Button>}
      />
      <Toast title="Saved" action={<Button size="sm" variant="secondary">Undo</Button>} onDismiss={() => undefined}>
        Component settings updated.
      </Toast>
    </div>
  ),
};

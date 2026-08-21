import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePlus2 } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  Divider,
  EmptyState,
  Kbd,
  Progress,
  Skeleton,
  Spinner,
  StatusDot,
  Tag,
  Toast,
} from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Feedback + Loading",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Alerts: Story = {
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

export const InlineStatus: Story = {
  render: () => (
    <Card eyebrow="Inline" title="Small feedback primitives">
      <div className="mds-stack">
        <div className="mds-cluster">
          <StatusDot tone="success" label="Online" />
          <StatusDot tone="warning" label="Review" />
          <StatusDot tone="danger" label="Blocked" />
          <StatusDot label="Draft" />
        </div>
        <Divider />
        <div className="mds-cluster">
          <Tag>admin</Tag>
          <Tag removable onRemove={() => undefined}>desktop</Tag>
          <Tag>editorial</Tag>
        </div>
        <Divider />
        <div className="mds-cluster">
          <span className="feedback-copy">Open command menu</span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>
    </Card>
  ),
};

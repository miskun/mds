import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback/Alerts",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alerts communicate important system or user state with semantic tone and status or alert roles.",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const AlertTones: Story = {
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

export const RecoveryAlert: Story = {
  parameters: storyDescription("Alert copy should name the state and give the next useful step when recovery is possible."),
  render: () => (
    <Alert tone="danger" title="Unable to publish">
      Fix validation errors and run the release checklist again.
    </Alert>
  ),
};

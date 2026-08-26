import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Grid, Stack, Toast, ToastProvider, useToast } from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback/Toasts",
  component: Toast,
  subcomponents: { ToastProvider },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Toasts provide temporary feedback for completed actions and optional lightweight recovery.",
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ActionToast: Story = {
  parameters: storyDescription("Toast actions should be compact and directly related to the completed event."),
  render: () => (
    <Toast title="Saved" action={<Button size="sm" variant="secondary">Undo</Button>} onDismiss={() => undefined}>
      Component settings updated.
    </Toast>
  ),
};

export const ToastTones: Story = {
  parameters: storyDescription("Use toast tones for temporary feedback where the state changes how urgently the message should be noticed."),
  render: () => (
    <Grid minItemWidth="280px">
      <Toast title="Saved" tone="success">Portfolio settings updated.</Toast>
      <Toast title="Review needed" tone="warning">One imported record has a caveat.</Toast>
      <Toast title="Sync failed" tone="danger" onDismiss={() => undefined}>
        Try again after checking the connection.
      </Toast>
    </Grid>
  ),
};

export const ToastGroup: Story = {
  parameters: storyDescription("Use concise titles and avoid placing long workflows inside toast actions."),
  render: () => (
    <Grid minItemWidth="280px">
      <Toast title="Published">The component is visible in Storybook.</Toast>
      <Toast title="Copied" onDismiss={() => undefined}>
        Import path copied to clipboard.
      </Toast>
    </Grid>
  ),
};

export const ToastHost: Story = {
  parameters: storyDescription("Wrap an app in ToastProvider and call useToast from actions that need temporary feedback."),
  render: () => (
    <ToastProvider duration={0}>
      <ToastHostDemo />
    </ToastProvider>
  ),
};

function ToastHostDemo() {
  const { showToast, clearToasts } = useToast();

  return (
    <Stack>
      <Grid minItemWidth="180px">
        <Button onClick={() => showToast({ title: "Saved", tone: "success", children: "Changes are ready." })}>Show success</Button>
        <Button
          variant="secondary"
          onClick={() =>
            showToast({
              title: "Needs review",
              tone: "warning",
              children: "One value includes a qualification.",
            })
          }
        >
          Show warning
        </Button>
        <Button variant="danger" onClick={() => showToast({ title: "Failed", tone: "danger", children: "Could not complete the action." })}>
          Show danger
        </Button>
      </Grid>
      <Button size="sm" variant="ghost" onClick={clearToasts}>
        Clear toasts
      </Button>
    </Stack>
  );
}

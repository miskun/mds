import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Grid, Toast } from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback/Toasts",
  component: Toast,
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

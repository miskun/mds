import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePlus2, SearchX } from "lucide-react";
import { Button, EmptyState, Grid } from "../components";
import "./feedback-loading.css";

const meta = {
  title: "MDS/Components/Feedback/Empty states",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Empty states explain why content is absent and offer a next step when one is available.",
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const NoResults: Story = {
  parameters: storyDescription("Use no-results states when filters or search remove all matching records."),
  render: () => (
    <EmptyState
      title="No components found"
      description="Try a different target or clear active filters."
      icon={<SearchX size={22} />}
      action={<Button>Clear filters</Button>}
    />
  ),
};

export const EmptyStateTypes: Story = {
  parameters: storyDescription("Different absence states need different actions: create, clear, retry, or simply explain."),
  render: () => (
    <Grid minItemWidth="260px">
      <EmptyState
        title="No components yet"
        description="Create the first component in this group."
        icon={<FilePlus2 size={22} />}
        action={<Button>Create component</Button>}
      />
      <EmptyState
        title="No matching records"
        description="Change the query or remove filters."
        icon={<SearchX size={22} />}
        action={<Button variant="secondary">Reset filters</Button>}
      />
    </Grid>
  ),
};

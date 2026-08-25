import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, Cluster, PageHeader, Stack, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout/Page header",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Page header gives pages a consistent title, description, metadata, and action area.",
      },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ProductPage: Story = {
  parameters: storyDescription("Page header supports page-level actions and metadata without requiring a card wrapper."),
  render: () => (
    <Stack>
      <PageHeader
        eyebrow="Components"
        title="Data admin"
        description="Review tables, filters, bulk actions, and detail panels for admin portal workflows."
        metadata={
          <Cluster gap="xs">
            <StatusDot tone="success" label="Stable" />
            <Badge tone="accent">Admin</Badge>
          </Cluster>
        }
        actions={
          <>
            <Button variant="secondary">Preview</Button>
            <Button>Publish</Button>
          </>
        }
      />
    </Stack>
  ),
};

export const EditorialPage: Story = {
  parameters: storyDescription("Editorial pages use the same structure with larger target rhythm and fewer controls."),
  render: () => (
    <PageHeader
      eyebrow="Journal"
      title="Designing black-first interfaces"
      description="A practical look at contrast, motion, and restrained component systems for product and editorial surfaces."
      actions={<Button variant="secondary">Share</Button>}
    />
  ),
};
